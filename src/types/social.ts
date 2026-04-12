export interface SocialPost {
  id: string;
  url: string;
  title: string;
  excerpt?: string;
  imageUrl?: string;
  publishedAt: string;
  tag?: string;
}

export type SocialContentState = 'real_content' | 'no_recent_content';

export interface SocialFeedPayload {
  instagram: {
    source: SocialContentState;
    profileUrl: string;
    items: SocialPost[];
  };
  linkedin: {
    source: SocialContentState;
    profileUrl: string;
    items: SocialPost[];
    lastUpdated: string;
  };
}
