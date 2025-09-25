-- Add address fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN address_line_1 TEXT,
ADD COLUMN address_line_2 TEXT,
ADD COLUMN city TEXT,
ADD COLUMN county TEXT,
ADD COLUMN postal_code TEXT,
ADD COLUMN phone TEXT;