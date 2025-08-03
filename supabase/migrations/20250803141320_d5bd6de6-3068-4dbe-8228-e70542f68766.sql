-- Promote the first user to admin role
-- Find the user ID and give them admin rights
DO $$
DECLARE
    first_user_id uuid;
BEGIN
    -- Get the first user ID (or you can specify the exact email)
    SELECT user_id INTO first_user_id 
    FROM public.profiles 
    ORDER BY created_at ASC 
    LIMIT 1;
    
    IF first_user_id IS NOT NULL THEN
        -- Update their role to admin
        INSERT INTO public.user_roles (user_id, role)
        VALUES (first_user_id, 'admin'::app_role)
        ON CONFLICT (user_id, role) DO NOTHING;
        
        RAISE NOTICE 'User % promoted to admin', first_user_id;
    END IF;
END $$;