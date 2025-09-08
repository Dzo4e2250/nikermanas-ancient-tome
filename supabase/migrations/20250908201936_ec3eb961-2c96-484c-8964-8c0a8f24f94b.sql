-- Fix security warnings: Set proper search_path for functions

-- Fix the has_role function (already exists but needs search_path fix)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Fix the prevent_booking_spam function with proper search_path
CREATE OR REPLACE FUNCTION public.prevent_booking_spam()
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
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = 'public', 'pg_temp';

-- Create the trigger for spam prevention
CREATE TRIGGER booking_spam_prevention
  BEFORE INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_booking_spam();