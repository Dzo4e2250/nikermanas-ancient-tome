-- Further strengthen RLS policies for bookings table to address remaining security warning
-- Drop existing policies to recreate them with tighter security
DROP POLICY IF EXISTS "Users can create their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can delete bookings" ON public.bookings;

-- Create ultra-secure RLS policies that strictly enforce user ownership
CREATE POLICY "Authenticated users can create only their own bookings" 
ON public.bookings 
FOR INSERT 
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND auth.uid() = user_id 
  AND user_id IS NOT NULL
);

CREATE POLICY "Users can view only their own bookings" 
ON public.bookings 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND (
    (auth.uid() = user_id AND user_id IS NOT NULL) 
    OR has_role(auth.uid(), 'admin'::app_role)
  )
);

CREATE POLICY "Users can update only their own bookings" 
ON public.bookings 
FOR UPDATE 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND (
    (auth.uid() = user_id AND user_id IS NOT NULL) 
    OR has_role(auth.uid(), 'admin'::app_role)
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND user_id IS NOT NULL 
  AND (
    auth.uid() = user_id 
    OR has_role(auth.uid(), 'admin'::app_role)
  )
);

CREATE POLICY "Only admins can delete bookings" 
ON public.bookings 
FOR DELETE 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Ensure the user_id column cannot be null for future bookings
ALTER TABLE public.bookings 
ALTER COLUMN user_id SET NOT NULL;

-- Add a check constraint to ensure user_id matches authenticated user for new bookings
-- This provides additional protection beyond RLS
CREATE OR REPLACE FUNCTION public.validate_booking_ownership()
RETURNS TRIGGER AS $$
BEGIN
  -- Only allow if user_id matches authenticated user or if user is admin
  IF NEW.user_id != auth.uid() AND NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Booking can only be created for authenticated user';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to validate booking ownership on insert/update
DROP TRIGGER IF EXISTS validate_booking_ownership_trigger ON public.bookings;
CREATE TRIGGER validate_booking_ownership_trigger
  BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_booking_ownership();