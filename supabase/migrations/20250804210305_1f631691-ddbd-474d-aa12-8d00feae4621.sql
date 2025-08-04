-- Check if events table exists and recreate if needed
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'events') THEN
        CREATE TABLE public.events (
            id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            event_date DATE NOT NULL,
            start_time TIME NOT NULL,
            end_time TIME NOT NULL,
            location TEXT,
            price NUMERIC DEFAULT 0,
            max_participants INTEGER DEFAULT 20,
            image_url TEXT,
            is_active BOOLEAN DEFAULT true,
            created_by UUID,
            created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        );

        -- Enable RLS
        ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

        -- Create policies
        CREATE POLICY "Events are viewable by everyone" 
        ON public.events 
        FOR SELECT 
        USING (true);

        CREATE POLICY "Only admins can manage events" 
        ON public.events 
        FOR ALL 
        USING (has_role(auth.uid(), 'admin'::app_role));

        -- Add update trigger
        CREATE TRIGGER update_events_updated_at
        BEFORE UPDATE ON public.events
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END
$$;