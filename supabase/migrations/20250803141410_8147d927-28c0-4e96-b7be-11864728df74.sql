-- Promote specific user ristovgeorge@gmail.com to admin role
DO $$
DECLARE
    target_user_id uuid;
BEGIN
    -- Find user by email in auth.users table and get corresponding profile
    SELECT p.user_id INTO target_user_id 
    FROM public.profiles p
    JOIN auth.users u ON p.user_id = u.id
    WHERE u.email = 'ristovgeorge@gmail.com';
    
    IF target_user_id IS NOT NULL THEN
        -- Give them admin role
        INSERT INTO public.user_roles (user_id, role)
        VALUES (target_user_id, 'admin'::app_role)
        ON CONFLICT (user_id, role) DO NOTHING;
        
        RAISE NOTICE 'User ristovgeorge@gmail.com (%) promoted to admin', target_user_id;
    ELSE
        RAISE NOTICE 'User ristovgeorge@gmail.com not found';
    END IF;
END $$;