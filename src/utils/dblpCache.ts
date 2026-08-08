interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: string;
  url?: string;
  ee?: string;
  area?: string;
}

interface DBLPCache {
  publications: Publication[];
  totalCount: number;
  lastUpdated: number;
  expiresAt: number;
  source: 'static' | 'live';
}

interface StaticPublicationsPayload {
  source: string;
  pid: string;
  fetchedAt: string;
  totalCount: number;
  publications: Publication[];
}

const CACHE_KEY = 'dblp_publications_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const STATIC_URL = '/content/publications.json';
/** Anything below this is treated as poisoned (the old 3-paper fallback). */
const MIN_PLAUSIBLE_COUNT = 50;

// Research area classification based on title and venue keywords
const classifyResearchArea = (publication: Publication): string => {
  const title = publication.title.toLowerCase();
  const venue = publication.venue.toLowerCase();

  const researchAreas = {
    'Machine Learning Systems': [
      'machine learning', 'ml', 'deep learning', 'neural network', 'tinyml', 'tiny ml',
      'inference', 'training', 'model', 'mlperf', 'benchmark', 'ai', 'artificial intelligence',
      'federated learning', 'distributed learning', 'edge ai', 'neural', 'cnn', 'rnn', 'transformer'
    ],
    'Computer Architecture': [
      'architecture', 'processor', 'cpu', 'gpu', 'accelerator', 'hardware', 'memory',
      'cache', 'pipeline', 'microarchitecture', 'performance', 'energy', 'power',
      'chip', 'silicon', 'fpga', 'asic', 'multicore', 'parallel'
    ],
    'Autonomous Agents': [
      'autonomous', 'robot', 'robotics', 'agent', 'uav', 'drone', 'vehicle', 'navigation',
      'control', 'sensing', 'perception', 'planning', 'ros', 'operating system',
      'fault', 'safety', 'reliability', 'real-time', 'multi-agent', 'coordination',
      'decision making', 'embodied', 'generative', 'co-design', 'safety-critical',
      'adaptation', 'physical interaction', 'runtime', 'feedback loop'
    ],
    'Mobile Computing': [
      'mobile', 'smartphone', 'android', 'ios', 'wireless', 'cellular', 'wifi',
      'battery', 'energy efficient', 'low power', 'embedded', 'iot', 'wearable',
      'sensor', 'ubiquitous'
    ],
    'Systems & Software': [
      'system', 'software', 'operating system', 'compiler', 'runtime', 'framework',
      'distributed', 'cloud', 'virtualization', 'container', 'scalability',
      'fault tolerance', 'debugging', 'testing'
    ],
    'Security & Privacy': [
      'security', 'privacy', 'encryption', 'attack', 'vulnerability', 'threat',
      'authentication', 'authorization', 'cryptography', 'secure', 'protection'
    ],
    'Networking': [
      'network', 'networking', 'protocol', 'communication', 'internet', 'tcp',
      'udp', 'routing', 'congestion', 'bandwidth', 'latency', 'wireless network'
    ]
  };

  const scores: { [area: string]: number } = {};

  for (const [area, keywords] of Object.entries(researchAreas)) {
    let score = 0;
    for (const keyword of keywords) {
      if (title.includes(keyword)) score += 3;
      if (venue.includes(keyword)) score += 1;
    }
    scores[area] = score;
  }

  const maxScore = Math.max(...Object.values(scores));

  if (maxScore === 0) {
    if (venue.includes('isca') || venue.includes('micro') || venue.includes('hpca') || venue.includes('asplos')) {
      return 'Computer Architecture';
    }
    if (venue.includes('mlsys') || venue.includes('neurips') || venue.includes('icml')) {
      return 'Machine Learning Systems';
    }
    if (venue.includes('mobicom') || venue.includes('mobisys') || venue.includes('sensys')) {
      return 'Mobile Computing';
    }
    if (venue.includes('sosp') || venue.includes('osdi') || venue.includes('usenix')) {
      return 'Systems & Software';
    }
    return 'Systems & Software';
  }

  const bestArea = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0];
  return bestArea || 'Systems & Software';
};

const withAreas = (publications: Publication[]): Publication[] =>
  publications.map((pub) => ({
    ...pub,
    area: pub.area || classifyResearchArea(pub),
  }));

const isPlausible = (publications: Publication[] | undefined | null): publications is Publication[] =>
  Array.isArray(publications) && publications.length >= MIN_PLAUSIBLE_COUNT;

const writeCache = (publications: Publication[], source: 'static' | 'live'): void => {
  const newCache: DBLPCache = {
    publications,
    totalCount: publications.length,
    lastUpdated: Date.now(),
    expiresAt: Date.now() + CACHE_DURATION,
    source,
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));
};

const readLocalCache = (): DBLPCache | null => {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (!cachedData) return null;
    const cache: DBLPCache = JSON.parse(cachedData);
    if (!isPlausible(cache.publications)) {
      // Drop the old 3-paper fallback (and any other poisoned cache).
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cache;
  } catch {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
};

export const loadStaticPublications = async (): Promise<Publication[]> => {
  const response = await fetch(STATIC_URL, { cache: 'no-cache' });
  if (!response.ok) {
    throw new Error(`Static publications file returned ${response.status}`);
  }
  const payload: StaticPublicationsPayload = await response.json();
  if (!isPlausible(payload.publications)) {
    throw new Error(
      `Static publications file looks incomplete (${payload.publications?.length ?? 0} entries)`
    );
  }
  return withAreas(payload.publications);
};

/**
 * Attempt a live DBLP refresh. DBLP does not send CORS headers, so this almost
 * always fails in the browser — that is expected. We keep the attempt so a
 * future proxy / edge function can plug in without changing callers.
 */
export const fetchDBLPData = async (): Promise<Publication[]> => {
  const dblpPid = '88/2610';
  const url = `https://dblp.org/pid/${dblpPid}.xml`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/xml',
    },
  });

  if (!response.ok) {
    throw new Error(`DBLP API returned ${response.status}: ${response.statusText}`);
  }

  const xmlText = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const publications: Publication[] = [];
  const publicationTypes = [
    'article',
    'inproceedings',
    'book',
    'incollection',
    'proceedings',
    'phdthesis',
    'mastersthesis',
  ];

  xmlDoc.querySelectorAll('r > *').forEach((item) => {
    if (!publicationTypes.includes(item.tagName)) return;
    const title = item.querySelector('title')?.textContent || 'Untitled';
    const authors = Array.from(item.querySelectorAll('author')).map(
      (author) => author.textContent || ''
    );
    const venue =
      item.querySelector('journal')?.textContent ||
      item.querySelector('booktitle')?.textContent ||
      'Unknown Venue';
    const year = parseInt(
      item.querySelector('year')?.textContent || new Date().getFullYear().toString(),
      10
    );
    const type = item.tagName;
    const urlAttr = item.querySelector('url')?.textContent || undefined;
    const ee = item.querySelector('ee')?.textContent || undefined;
    const pub: Publication = { title, authors, venue, year, type, url: urlAttr, ee };
    pub.area = classifyResearchArea(pub);
    publications.push(pub);
  });

  if (!isPlausible(publications)) {
    throw new Error(`Live DBLP parse returned only ${publications.length} publications`);
  }

  publications.sort((a, b) => b.year - a.year);
  return publications;
};

export const getCachedPublications = async (): Promise<Publication[]> => {
  const cache = readLocalCache();
  if (cache && Date.now() < cache.expiresAt) {
    return cache.publications;
  }

  // Prefer the build-time snapshot. Live DBLP is a best-effort upgrade.
  try {
    const live = await fetchDBLPData();
    writeCache(live, 'live');
    return live;
  } catch (liveError) {
    console.warn('Live DBLP fetch unavailable (expected without CORS):', liveError);
  }

  try {
    const staticPubs = await loadStaticPublications();
    writeCache(staticPubs, 'static');
    return staticPubs;
  } catch (staticError) {
    console.error('Failed to load static publications:', staticError);
    if (cache) {
      console.warn('Using stale local cache');
      return cache.publications;
    }
    throw staticError;
  }
};

export const getCacheInfo = (): { lastUpdated: Date | null; expiresAt: Date | null; isExpired: boolean } => {
  const cache = readLocalCache();
  if (!cache) {
    return { lastUpdated: null, expiresAt: null, isExpired: true };
  }
  return {
    lastUpdated: new Date(cache.lastUpdated),
    expiresAt: new Date(cache.expiresAt),
    isExpired: Date.now() >= cache.expiresAt,
  };
};

export const clearCache = (): void => {
  localStorage.removeItem(CACHE_KEY);
};

export const refreshCache = async (): Promise<Publication[]> => {
  clearCache();
  // Always re-read the shipped snapshot first so a refresh never strand the
  // page on an empty/poisoned state if live DBLP is unreachable.
  const staticPubs = await loadStaticPublications();
  writeCache(staticPubs, 'static');

  try {
    const live = await fetchDBLPData();
    writeCache(live, 'live');
    return live;
  } catch {
    return staticPubs;
  }
};
