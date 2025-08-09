-- 1) Tighten RLS on bookings (remove public SELECT)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'bookings' AND policyname = 'Bookings are viewable by everyone'
  ) THEN
    EXECUTE 'DROP POLICY "Bookings are viewable by everyone" ON public.bookings';
  END IF;
END $$;

-- Allow only admins to view bookings
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'bookings' AND policyname = 'Only admins can view bookings'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Only admins can view bookings"
      ON public.bookings
      FOR SELECT
      USING (public.has_role(auth.uid(), 'admin'::app_role));
    $$;
  END IF;
END $$;

-- 2) Restrict profiles visibility
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Users can view all profiles'
  ) THEN
    EXECUTE 'DROP POLICY "Users can view all profiles" ON public.profiles';
  END IF;
END $$;

-- Users can view their own profile
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Users can view own profile'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Users can view own profile"
      ON public.profiles
      FOR SELECT
      USING (auth.uid() = user_id);
    $$;
  END IF;
END $$;

-- Admins can view all profiles
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Admins can view all profiles'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Admins can view all profiles"
      ON public.profiles
      FOR SELECT
      USING (public.has_role(auth.uid(), 'admin'::app_role));
    $$;
  END IF;
END $$;

-- 3) Restrict user_roles visibility
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_roles' AND policyname = 'Everyone can view roles'
  ) THEN
    EXECUTE 'DROP POLICY "Everyone can view roles" ON public.user_roles';
  END IF;
END $$;

-- Users can view their own roles
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_roles' AND policyname = 'Users can view own roles'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Users can view own roles"
      ON public.user_roles
      FOR SELECT
      USING (auth.uid() = user_id);
    $$;
  END IF;
END $$;

-- Admins can view all roles
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_roles' AND policyname = 'Admins can view all roles'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Admins can view all roles"
      ON public.user_roles
      FOR SELECT
      USING (public.has_role(auth.uid(), 'admin'::app_role));
    $$;
  END IF;
END $$;

-- 4) Storage policies: public read, admin write for service-images and event-images
-- Allow public read
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public can read service & event images'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Public can read service & event images"
      ON storage.objects
      FOR SELECT
      USING (bucket_id IN ('service-images', 'event-images'));
    $$;
  END IF;
END $$;

-- Admin insert
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can upload service & event images'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Admins can upload service & event images"
      ON storage.objects
      FOR INSERT
      WITH CHECK (
        bucket_id IN ('service-images', 'event-images')
        AND public.has_role(auth.uid(), 'admin'::app_role)
      );
    $$;
  END IF;
END $$;

-- Admin update
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can update service & event images'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Admins can update service & event images"
      ON storage.objects
      FOR UPDATE
      USING (
        bucket_id IN ('service-images', 'event-images')
        AND public.has_role(auth.uid(), 'admin'::app_role)
      );
    $$;
  END IF;
END $$;

-- Admin delete
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can delete service & event images'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Admins can delete service & event images"
      ON storage.objects
      FOR DELETE
      USING (
        bucket_id IN ('service-images', 'event-images')
        AND public.has_role(auth.uid(), 'admin'::app_role)
      );
    $$;
  END IF;
END $$;