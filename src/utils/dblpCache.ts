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

export interface PublicationsPayload {
  source: string;
  pid: string;
  fetchedAt: string;
  totalCount: number;
  publications: Publication[];
}

interface LocalCache {
  payload: PublicationsPayload;
  cachedAt: number;
  expiresAt: number;
}

const CACHE_KEY = 'dblp_publications_cache_v2';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week
const STATIC_URL = '/content/publications.json';
const MIN_PLAUSIBLE_COUNT = 50;

const isPlausible = (publications: Publication[] | undefined | null): publications is Publication[] =>
  Array.isArray(publications) && publications.length >= MIN_PLAUSIBLE_COUNT;

const writeLocalCache = (payload: PublicationsPayload): void => {
  const cache: LocalCache = {
    payload,
    cachedAt: Date.now(),
    expiresAt: Date.now() + CACHE_DURATION,
  };
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Quota / private mode — ignore; static JSON is still the source of truth.
  }
};

const readLocalCache = (): LocalCache | null => {
  try {
    // Drop the old poisoned v1 cache if it is still around.
    localStorage.removeItem('dblp_publications_cache');

    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache: LocalCache = JSON.parse(raw);
    if (!isPlausible(cache.payload?.publications)) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cache;
  } catch {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
};

/** Instant paint path: valid localStorage only (no network). */
export const peekLocalPublications = (): PublicationsPayload | null => {
  const cache = readLocalCache();
  if (!cache) return null;
  return cache.payload;
};

export const loadStaticPublications = async (
  bustCache = false
): Promise<PublicationsPayload> => {
  const url = bustCache
    ? `${STATIC_URL}?t=${Date.now()}`
    : STATIC_URL;
  const response = await fetch(url, { cache: bustCache ? 'no-store' : 'default' });
  if (!response.ok) {
    throw new Error(`Static publications file returned ${response.status}`);
  }
  const payload: PublicationsPayload = await response.json();
  if (!isPlausible(payload.publications)) {
    throw new Error(
      `Static publications file looks incomplete (${payload.publications?.length ?? 0} entries)`
    );
  }
  writeLocalCache(payload);
  return payload;
};

/**
 * Load publications for the page. Prefer localStorage for instant paint on
 * return visits; otherwise the shipped weekly snapshot. Never hits DBLP in the
 * browser (no CORS) — freshness comes from CI / build, not client scraping.
 */
export const getCachedPublications = async (): Promise<PublicationsPayload> => {
  const cache = readLocalCache();
  if (cache && Date.now() < cache.expiresAt) {
    return cache.payload;
  }

  try {
    return await loadStaticPublications(false);
  } catch (error) {
    if (cache) {
      console.warn('Using stale local publications cache after static load failed');
      return cache.payload;
    }
    throw error;
  }
};

export const getCacheInfo = (): {
  lastUpdated: Date | null;
  expiresAt: Date | null;
  isExpired: boolean;
} => {
  const cache = readLocalCache();
  if (!cache) {
    return { lastUpdated: null, expiresAt: null, isExpired: true };
  }
  const lastUpdated = cache.payload.fetchedAt
    ? new Date(cache.payload.fetchedAt)
    : new Date(cache.cachedAt);
  return {
    lastUpdated,
    expiresAt: new Date(cache.expiresAt),
    isExpired: Date.now() >= cache.expiresAt,
  };
};

export const clearCache = (): void => {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem('dblp_publications_cache');
};

/** Re-fetch the shipped snapshot (cache-busted). */
export const refreshCache = async (): Promise<PublicationsPayload> => {
  clearCache();
  return loadStaticPublications(true);
};
