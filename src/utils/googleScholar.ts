export interface GoogleScholarStats {
  totalCitations: number;
  hIndex: number;
  i10Index: number;
  totalPublications: number;
  lastUpdated: Date;
}

interface ScholarStatsPayload {
  totalCitations: number;
  hIndex: number;
  i10Index: number;
  totalPublications?: number;
  fetchedAt: string;
  source?: string;
}

interface LocalCache {
  stats: GoogleScholarStats;
  fetchedAt: string;
  cachedAt: number;
  expiresAt: number;
}

const SCHOLAR_CACHE_KEY = 'google_scholar_cache_v2';
const SCHOLAR_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week
const STATIC_URL = '/content/scholar-stats.json';

/** Embedded fallback if the static file is missing (should not happen in prod). */
const FALLBACK_STATS: ScholarStatsPayload = {
  totalCitations: 21261,
  hIndex: 61,
  i10Index: 162,
  totalPublications: 265,
  fetchedAt: '2026-05-17T00:00:00.000Z',
  source: 'fallback',
};

const toStats = (payload: ScholarStatsPayload): GoogleScholarStats => ({
  totalCitations: payload.totalCitations,
  hIndex: payload.hIndex,
  i10Index: payload.i10Index,
  totalPublications: payload.totalPublications ?? 0,
  lastUpdated: new Date(payload.fetchedAt),
});

const writeLocalCache = (payload: ScholarStatsPayload): void => {
  const stats = toStats(payload);
  const cache: LocalCache = {
    stats,
    fetchedAt: payload.fetchedAt,
    cachedAt: Date.now(),
    expiresAt: Date.now() + SCHOLAR_CACHE_DURATION,
  };
  try {
    localStorage.setItem(SCHOLAR_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // ignore
  }
};

const readLocalCache = (): LocalCache | null => {
  try {
    localStorage.removeItem('google_scholar_cache');
    const raw = localStorage.getItem(SCHOLAR_CACHE_KEY);
    if (!raw) return null;
    const cache: LocalCache = JSON.parse(raw);
    if (!cache.stats?.hIndex) {
      localStorage.removeItem(SCHOLAR_CACHE_KEY);
      return null;
    }
    // Revive Date
    cache.stats.lastUpdated = new Date(cache.stats.lastUpdated);
    return cache;
  } catch {
    localStorage.removeItem(SCHOLAR_CACHE_KEY);
    return null;
  }
};

export const peekLocalScholarStats = (): GoogleScholarStats | null => {
  const cache = readLocalCache();
  return cache?.stats ?? null;
};

export const loadStaticScholarStats = async (
  bustCache = false
): Promise<GoogleScholarStats> => {
  try {
    const url = bustCache ? `${STATIC_URL}?t=${Date.now()}` : STATIC_URL;
    const response = await fetch(url, { cache: bustCache ? 'no-store' : 'default' });
    if (!response.ok) {
      throw new Error(`scholar-stats.json returned ${response.status}`);
    }
    const payload: ScholarStatsPayload = await response.json();
    if (!payload.hIndex || !payload.totalCitations) {
      throw new Error('scholar-stats.json missing required fields');
    }
    writeLocalCache(payload);
    return toStats(payload);
  } catch (error) {
    console.warn('Falling back to embedded Scholar stats:', error);
    writeLocalCache(FALLBACK_STATS);
    return toStats(FALLBACK_STATS);
  }
};

/**
 * Load citation stats from the weekly shipped snapshot. Does not scrape Google
 * Scholar in the browser (proxies are slow and unreliable).
 */
export const getCachedScholarStats = async (): Promise<GoogleScholarStats> => {
  const cache = readLocalCache();
  if (cache && Date.now() < cache.expiresAt) {
    return cache.stats;
  }
  return loadStaticScholarStats(false);
};

export const getScholarCacheInfo = (): {
  lastUpdated: Date | null;
  expiresAt: Date | null;
  isExpired: boolean;
} => {
  const cache = readLocalCache();
  if (!cache) {
    return { lastUpdated: null, expiresAt: null, isExpired: true };
  }
  return {
    lastUpdated: cache.stats.lastUpdated,
    expiresAt: new Date(cache.expiresAt),
    isExpired: Date.now() >= cache.expiresAt,
  };
};

export const clearScholarCache = (): void => {
  localStorage.removeItem(SCHOLAR_CACHE_KEY);
  localStorage.removeItem('google_scholar_cache');
};

export const refreshScholarCache = async (): Promise<GoogleScholarStats> => {
  clearScholarCache();
  return loadStaticScholarStats(true);
};
