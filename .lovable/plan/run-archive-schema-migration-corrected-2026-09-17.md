# Run archive schema migration (corrected)

## Goal
Create the media-archive database schema (sheikhs, topics, events, content, collections, collection items, submissions, reviews, featured items, analytics) so the existing archive pages and admin panel can read/write real data.

## What changes vs. the pasted SQL file
The migration runs through the managed database pipeline, not a manual SQL editor. Two corrections are required for it to work securely here:

1. **GRANT statements** — every new table must explicitly grant access to the app's roles (`anon`, `authenticated`, `service_role`) or all queries from the app fail with permission errors, regardless of row-security rules.
2. **Admin checks** — the pasted file invents a `profiles` table with a role column and checks admins via `auth.uid() IN (SELECT id FROM profiles)`. This project already has a secure role system (`user_roles` table + `has_role()` function, with your admin user `uis.org@gmail.com` already assigned). Storing roles on a profile table is a known privilege-escalation risk, so all admin policies will use `has_role(auth.uid(), 'admin')` instead. The `profiles` table is dropped from the migration entirely — nothing needs to change in the app code, which already authenticates via `user_roles`.

## Migration contents
- Create tables: `sheikhs`, `topics`, `events`, `content`, `collections`, `collection_items`, `submissions`, `reviews`, `featured_items`, `analytics` — same columns and indexes as the pasted file (content has type/title/sheikh/topics/tags/language/state/file_path/external_url/duration/page_count/metadata/soft-delete; analytics logs views, plays, downloads, shares).
- `updated_at` triggers on tables that need them (reusing the existing `update_updated_at_column()` function).
- Row-security policies:
  - Public (no sign-in): read visible sheikhs, topics, events, published/non-deleted content, enabled collections and their items, enabled featured items; create submissions; log analytics events.
  - Admins only: full management of all archive tables, read/update submissions, read analytics.
- Grants matching those policies (public read where policies allow it, `service_role` full access everywhere).

## Verification
- Re-read the generated database types to confirm all tables are visible.
- Spot-check that public pages can read (e.g. featured/collections queries) and that admin-only writes still require the admin role.
