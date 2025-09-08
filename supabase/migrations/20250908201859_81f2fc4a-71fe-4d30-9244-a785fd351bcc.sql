-- Fix security issue: Restrict booking creation to authenticated users only
-- This prevents spam and fake bookings while ensuring data integrity

-- Drop the current overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

-- Create a new secure INSERT policy that requires authentication
CREATE POLICY "Authenticated users can create bookings" 
ON public.bookings 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Add additional validation constraints to prevent malicious data
-- Ensure email format is valid
ALTER TABLE public.bookings 
ADD CONSTRAINT valid_email_format 
CHECK (client_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Ensure phone number is reasonable length (optional field)
ALTER TABLE public.bookings 
ADD CONSTRAINT valid_phone_length 
CHECK (client_phone IS NULL OR (length(client_phone) >= 8 AND length(client_phone) <= 20));

-- Ensure client name is not empty
ALTER TABLE public.bookings 
ADD CONSTRAINT valid_client_name 
CHECK (length(trim(client_name)) >= 2);

-- Prevent excessively long notes to avoid abuse
ALTER TABLE public.bookings 
ADD CONSTRAINT reasonable_notes_length 
CHECK (notes IS NULL OR length(notes) <= 2000);

-- Add rate limiting trigger to prevent spam (max 5 bookings per user per day)
CREATE OR REPLACE FUNCTION prevent_booking_spam()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if user has made more than 5 bookings today
  IF (
    SELECT COUNT(*)
    FROM public.bookings
    WHERE created_at >= CURRENT_DATE
    AND created_at < CURRENT_DATE + INTERVAL '1 day'
  ) >= 5 THEN
    RAISE EXCEPTION 'Too many bookings created today. Please contact support if you need assistance.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;