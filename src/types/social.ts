export interface SocialPost {
  id: string;
  url: string;
  title: string;
  excerpt?: string;
  imageUrl?: string;
  publishedAt: string;
  tag?: string;
}

export interface SocialFeedPayload {
  instagram: {
    source: 'instagram_api' | 'curated_fallback';
    profileUrl: string;
    items: SocialPost[];
  };
  linkedin: {
    source: 'curated_manual';
    profileUrl: string;
    items: SocialPost[];
    lastUpdated: string;
  };
}
