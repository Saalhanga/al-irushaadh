export type ContentType =
  | 'audio'
  | 'video'
  | 'article'
  | 'pdf'
  | 'image'
  | 'qna'
  | 'quran'
  | 'dua'
  | 'interview'
  | 'discussion'
  | 'short_clip'
  | 'lecture_series'
  | 'course'
  | 'collection';

export type ContentState = 'draft' | 'pending_review' | 'published' | 'unavailable' | 'archived' | 'rejected';

export type ProfileRole = 'admin' | 'editor' | 'moderator' | 'reviewer';

export interface Sheikh {
  id: string;
  name: string;
  photo_url: string | null;
  short_bio: string;
  languages: string[];
  topics: string[];
  visibility: 'visible' | 'hidden';
  created_at: string;
  updated_at: string;
}

export interface Content {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  sheikh_id: string | null;
  topics: string[];
  tags: string[];
  language: string;
  event: string | null;
  location: string | null;
  date: string | null;
  source_url: string | null;
  source_platform: string | null;
  publisher: string | null;
  added_at: string;
  state: ContentState;
  file_path: string | null;
  external_url: string | null;
  duration: number | null;
  page_count: number | null;
  metadata: Record<string, any>;
  soft_deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  item_count: number | null;
  date_range: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CollectionItem {
  id: string;
  collection_id: string;
  content_id: string;
  sort_order: number;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  locale: string;
  description: string | null;
}

export interface Event {
  id: string;
  name: string;
  date: string | null;
  location: string | null;
  description: string | null;
}

export interface Submission {
  id: string;
  url: string | null;
  file_path: string | null;
  sheikh_id: string | null;
  type: ContentType;
  title: string;
  date: string | null;
  event: string | null;
  location: string | null;
  description: string;
  contact_email: string | null;
  notes: string | null;
  state: 'new' | 'needs_review' | 'approved' | 'rejected';
  created_at: string;
  reviewed_at: string | null;
}

export interface Review {
  id: string;
  item_type: 'submission' | 'detected' | 'broken_source' | 'missing_metadata' | 'suggested_tags' | 'missing_translation';
  item_id: string;
  state: 'pending' | 'reviewed' | 'actioned';
  notes: string | null;
  created_at: string;
}

export interface FeaturedItem {
  id: string;
  content_id: string;
  slot: 'primary' | 'supporting';
  sort_order: number;
  enabled: boolean;
}

export interface AnalyticsEvent {
  id: string;
  content_id: string | null;
  event_type: 'view' | 'play' | 'download' | 'share';
  duration_seconds: number | null;
  device_type: string | null;
  browser: string | null;
  country: string | null;
  referral: string | null;
  date_time: string;
}

export interface Profile {
  id: string;
  email: string;
  role: ProfileRole;
  created_at: string;
}
