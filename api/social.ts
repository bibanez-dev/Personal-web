import { SOCIAL_FALLBACK_DATA } from '../src/data/socialFallback';
import type { SocialContentState, SocialFeedPayload, SocialPost } from '../src/types/social';

export const config = {
  runtime: 'edge',
};

type InstagramApiItem = {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
};

const API_VERSION = 'v23.0';
const DEFAULT_LIMIT = 6;

const toIsoDate = (dateValue: string | undefined): string => {
  if (!dateValue) return new Date().toISOString().slice(0, 10);
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
};

const mapInstagramItems = (items: InstagramApiItem[]): SocialPost[] =>
  items
    .filter((item) => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM' || item.media_type === 'VIDEO')
    .map((item, index) => ({
      id: item.id,
      url: item.permalink ?? SOCIAL_FALLBACK_DATA.instagram.profileUrl,
      title: item.caption?.split('\n').at(0)?.slice(0, 84) || `Instagram post ${index + 1}`,
      excerpt: item.caption?.slice(0, 160),
      imageUrl: item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url,
      publishedAt: toIsoDate(item.timestamp),
      tag: 'Instagram',
    }))
    .filter((item) => Boolean(item.imageUrl));

const resolveSource = (items: SocialPost[]): SocialContentState => (items.length > 0 ? 'real_content' : 'no_recent_content');

const buildPayload = (
  instagramItems: SocialPost[],
  overrides: { instagramProfileUrl?: string; linkedinProfileUrl?: string },
): SocialFeedPayload => {
  const linkedinItems = SOCIAL_FALLBACK_DATA.linkedin.items;

  return {
    instagram: {
      source: resolveSource(instagramItems),
      profileUrl: overrides.instagramProfileUrl || SOCIAL_FALLBACK_DATA.instagram.profileUrl,
      items: instagramItems,
    },
    linkedin: {
      ...SOCIAL_FALLBACK_DATA.linkedin,
      source: resolveSource(linkedinItems),
      profileUrl: overrides.linkedinProfileUrl || SOCIAL_FALLBACK_DATA.linkedin.profileUrl,
      items: linkedinItems,
    },
  };
};

const getInstagramFeed = async (): Promise<SocialPost[] | null> => {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
  const accessToken = env.INSTAGRAM_ACCESS_TOKEN;
  const instagramUserId = env.INSTAGRAM_USER_ID;

  if (!accessToken || !instagramUserId) {
    return null;
  }

  const url = new URL(`https://graph.facebook.com/${API_VERSION}/${instagramUserId}/media`);
  url.searchParams.set('fields', 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp');
  url.searchParams.set('limit', String(DEFAULT_LIMIT));
  url.searchParams.set('access_token', accessToken);

  const response = await fetch(url.toString(), { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`Instagram API error (${response.status})`);
  }

  const payload = (await response.json()) as { data?: InstagramApiItem[] };
  return mapInstagramItems(payload.data ?? []);
};

export default async function handler(): Promise<Response> {
  try {
    const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
    const instagramProfileUrl = env.INSTAGRAM_PROFILE_URL;
    const linkedinProfileUrl = env.LINKEDIN_PROFILE_URL;

    const instagramItems = (await getInstagramFeed()) ?? [];

    const payload = buildPayload(instagramItems, { instagramProfileUrl, linkedinProfileUrl });

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
    const safeFallback = buildPayload([], {
      instagramProfileUrl: env.INSTAGRAM_PROFILE_URL,
      linkedinProfileUrl: env.LINKEDIN_PROFILE_URL,
    });

    return new Response(JSON.stringify(safeFallback), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, s-maxage=900, stale-while-revalidate=3600',
      },
    });
  }
}
