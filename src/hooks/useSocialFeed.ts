import { useEffect, useState } from 'react';
import { SOCIAL_FALLBACK_DATA } from '../data/socialFallback';
import type { SocialFeedPayload } from '../types/social';

interface UseSocialFeedResult {
  data: SocialFeedPayload;
  loading: boolean;
  error: string | null;
}

export function useSocialFeed(): UseSocialFeedResult {
  const [data, setData] = useState<SocialFeedPayload>(SOCIAL_FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadFeed = async () => {
      try {
        const response = await fetch('/api/social');
        if (!response.ok) {
          throw new Error(`Social API returned ${response.status}`);
        }

        const payload = (await response.json()) as SocialFeedPayload;
        if (!cancelled) {
          setData(payload);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to load social feed';
          setError(message);
          setData(SOCIAL_FALLBACK_DATA);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadFeed();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
