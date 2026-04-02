ALTER TABLE public.donation_progress 
ADD COLUMN IF NOT EXISTS current_amount numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_amount numeric DEFAULT 1700000;

UPDATE public.donation_progress SET current_amount = 0, total_amount = 1700000;