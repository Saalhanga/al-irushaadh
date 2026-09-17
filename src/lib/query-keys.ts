import { type QueryKey } from '@tanstack/react-query';
import type { Content, Sheikh, Topic, Collection, Event, Submission, Review, FeaturedItem, AnalyticsEvent } from '@/lib/types';

export const queryKeys = {
  content: {
    all: ['content'] as QueryKey,
    list: (filters?: Record<string, any>) => ['content', 'list', filters] as QueryKey,
    detail: (id: string) => ['content', id] as QueryKey,
    byType: (type: string) => ['content', 'type', type] as QueryKey,
    bySheikh: (sheikhId: string) => ['content', 'sheikh', sheikhId] as QueryKey,
    byTopic: (topicId: string) => ['content', 'topic', topicId] as QueryKey,
    featured: () => ['content', 'featured'] as QueryKey,
    popular: () => ['content', 'popular'] as QueryKey,
    trending: () => ['content', 'trending'] as QueryKey,
    latest: () => ['content', 'latest'] as QueryKey,
  },
  sheikhs: {
    all: ['sheikhs'] as QueryKey,
    list: (filters?: Record<string, any>) => ['sheikhs', 'list', filters] as QueryKey,
    detail: (id: string) => ['sheikhs', id] as QueryKey,
  },
  topics: {
    all: ['topics'] as QueryKey,
    list: () => ['topics', 'list'] as QueryKey,
    detail: (id: string) => ['topics', id] as QueryKey,
  },
  collections: {
    all: ['collections'] as QueryKey,
    list: () => ['collections', 'list'] as QueryKey,
    detail: (id: string) => ['collections', id] as QueryKey,
  },
  events: {
    all: ['events'] as QueryKey,
    list: () => ['events', 'list'] as QueryKey,
  },
  submissions: {
    all: ['submissions'] as QueryKey,
    list: (state?: string) => ['submissions', 'list', state] as QueryKey,
    detail: (id: string) => ['submissions', id] as QueryKey,
  },
  reviews: {
    all: ['reviews'] as QueryKey,
    list: (state?: string) => ['reviews', 'list', state] as QueryKey,
  },
  featured: {
    all: ['featured'] as QueryKey,
    list: () => ['featured', 'list'] as QueryKey,
  },
  analytics: {
    overview: ['analytics', 'overview'] as QueryKey,
    byContent: (id: string) => ['analytics', 'content', id] as QueryKey,
    bySheikh: (id: string) => ['analytics', 'sheikh', id] as QueryKey,
    byTopic: (id: string) => ['analytics', 'topic', id] as QueryKey,
    popular: ['analytics', 'popular'] as QueryKey,
    trending: ['analytics', 'trending'] as QueryKey,
  },
  search: {
    results: (query: string) => ['search', query] as QueryKey,
    suggestions: (query: string) => ['search', 'suggestions', query] as QueryKey,
  },
} as const;
