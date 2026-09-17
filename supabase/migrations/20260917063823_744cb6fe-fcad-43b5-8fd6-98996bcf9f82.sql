-- Archive schema (corrected: GRANTs added, admin checks via has_role)

-- Sheikhs
CREATE TABLE IF NOT EXISTS public.sheikhs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  photo_url TEXT,
  short_bio TEXT DEFAULT '',
  languages TEXT[] DEFAULT '{}',
  topics TEXT[] DEFAULT '{}',
  visibility TEXT NOT NULL DEFAULT 'visible',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sheikhs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.sheikhs TO authenticated;
GRANT ALL ON public.sheikhs TO service_role;
ALTER TABLE public.sheikhs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read visible sheikhs"
  ON public.sheikhs FOR SELECT
  TO anon, authenticated
  USING (visibility = 'visible' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage sheikhs"
  ON public.sheikhs FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_sheikhs_updated_at
  BEFORE UPDATE ON public.sheikhs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Topics
CREATE TABLE IF NOT EXISTS public.topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  locale TEXT NOT NULL DEFAULT 'en',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.topics TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.topics TO authenticated;
GRANT ALL ON public.topics TO service_role;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read topics"
  ON public.topics FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can manage topics"
  ON public.topics FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_topics_updated_at
  BEFORE UPDATE ON public.topics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Events
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date DATE,
  location TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.events TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read events"
  ON public.events FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can manage events"
  ON public.events FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Content
CREATE TABLE IF NOT EXISTS public.content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  sheikh_id UUID REFERENCES public.sheikhs(id) ON DELETE SET NULL,
  topics TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  language TEXT NOT NULL DEFAULT 'en',
  event TEXT,
  location TEXT,
  date DATE,
  source_url TEXT,
  source_platform TEXT,
  publisher TEXT,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  state TEXT NOT NULL DEFAULT 'draft',
  file_path TEXT,
  external_url TEXT,
  duration INTEGER,
  page_count INTEGER,
  metadata JSONB DEFAULT '{}',
  soft_deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.content TO authenticated;
GRANT ALL ON public.content TO service_role;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published content"
  ON public.content FOR SELECT
  TO anon, authenticated
  USING (state = 'published' AND soft_deleted_at IS NULL);

CREATE POLICY "Admins can manage content"
  ON public.content FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS idx_content_type ON public.content(type);
CREATE INDEX IF NOT EXISTS idx_content_state ON public.content(state);
CREATE INDEX IF NOT EXISTS idx_content_sheikh_id ON public.content(sheikh_id);
CREATE INDEX IF NOT EXISTS idx_content_language ON public.content(language);
CREATE INDEX IF NOT EXISTS idx_content_date ON public.content(date);
CREATE INDEX IF NOT EXISTS idx_content_added_at ON public.content(added_at);
CREATE INDEX IF NOT EXISTS idx_content_topics ON public.content USING GIN(topics);
CREATE INDEX IF NOT EXISTS idx_content_tags ON public.content USING GIN(tags);

CREATE TRIGGER update_content_updated_at
  BEFORE UPDATE ON public.content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Collections
CREATE TABLE IF NOT EXISTS public.collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  cover_image TEXT,
  sheikh_id UUID REFERENCES public.sheikhs(id) ON DELETE SET NULL,
  topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
  date_range TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.collections TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.collections TO authenticated;
GRANT ALL ON public.collections TO service_role;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read enabled collections"
  ON public.collections FOR SELECT
  TO anon, authenticated
  USING (enabled = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage collections"
  ON public.collections FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_collections_updated_at
  BEFORE UPDATE ON public.collections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Collection items
CREATE TABLE IF NOT EXISTS public.collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES public.content(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(collection_id, content_id)
);
GRANT SELECT ON public.collection_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.collection_items TO authenticated;
GRANT ALL ON public.collection_items TO service_role;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read collection items"
  ON public.collection_items FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can manage collection items"
  ON public.collection_items FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Submissions
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT,
  file_path TEXT,
  sheikh_id UUID REFERENCES public.sheikhs(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  date DATE,
  event TEXT,
  location TEXT,
  description TEXT DEFAULT '',
  contact_email TEXT,
  notes TEXT,
  state TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);
GRANT INSERT ON public.submissions TO anon, authenticated;
GRANT SELECT, UPDATE ON public.submissions TO authenticated;
GRANT ALL ON public.submissions TO service_role;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create submissions"
  ON public.submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read submissions"
  ON public.submissions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update submissions"
  ON public.submissions FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_type TEXT NOT NULL,
  item_id UUID NOT NULL,
  state TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read reviews"
  ON public.reviews FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage reviews"
  ON public.reviews FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Featured items
CREATE TABLE IF NOT EXISTS public.featured_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES public.content(id) ON DELETE CASCADE,
  slot TEXT NOT NULL DEFAULT 'supporting',
  sort_order INTEGER NOT NULL DEFAULT 0,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.featured_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.featured_items TO authenticated;
GRANT ALL ON public.featured_items TO service_role;
ALTER TABLE public.featured_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read featured items"
  ON public.featured_items FOR SELECT
  TO anon, authenticated
  USING (enabled = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage featured items"
  ON public.featured_items FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Analytics
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES public.content(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  duration_seconds INTEGER,
  device_type TEXT,
  browser TEXT,
  country TEXT,
  referral TEXT,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.analytics TO anon, authenticated;
GRANT SELECT ON public.analytics TO authenticated;
GRANT ALL ON public.analytics TO service_role;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analytics"
  ON public.analytics FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read analytics"
  ON public.analytics FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON public.analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_date_time ON public.analytics(date_time);
CREATE INDEX IF NOT EXISTS idx_analytics_content_id ON public.analytics(content_id);