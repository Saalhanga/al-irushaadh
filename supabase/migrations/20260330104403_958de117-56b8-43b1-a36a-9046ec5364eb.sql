
-- User roles (for admin access)
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Site content (multilingual text blocks)
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'dv', 'ar')),
  value TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(key, locale)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
  ON public.site_content FOR SELECT USING (true);

CREATE POLICY "Admins can manage site content"
  ON public.site_content FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Donation progress
CREATE TABLE public.donation_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  current_sqft INTEGER NOT NULL DEFAULT 0,
  total_sqft INTEGER NOT NULL DEFAULT 1320,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.donation_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read donation progress"
  ON public.donation_progress FOR SELECT USING (true);

CREATE POLICY "Admins can manage donation progress"
  ON public.donation_progress FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Bank accounts
CREATE TABLE public.bank_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bank_name TEXT NOT NULL DEFAULT '',
  account_number TEXT NOT NULL DEFAULT '',
  account_holder TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active bank accounts"
  ON public.bank_accounts FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage bank accounts"
  ON public.bank_accounts FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Project images
CREATE TABLE public.project_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view project images"
  ON public.project_images FOR SELECT USING (true);

CREATE POLICY "Admins can manage project images"
  ON public.project_images FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_donation_progress_updated_at
  BEFORE UPDATE ON public.donation_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bank_accounts_updated_at
  BEFORE UPDATE ON public.bank_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial donation progress
INSERT INTO public.donation_progress (current_sqft, total_sqft)
VALUES (320, 1320);

-- Insert initial bank account
INSERT INTO public.bank_accounts (bank_name, account_number, account_holder)
VALUES ('Bank of Maldives (BML Islamic)', '7770000012345', 'Al Irushaadh');

-- Storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

CREATE POLICY "Anyone can view project images bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));
