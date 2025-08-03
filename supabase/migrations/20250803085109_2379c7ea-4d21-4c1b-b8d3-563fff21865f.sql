-- Storitve z različnimi tipi
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('individual', 'group_live', 'group_online')),
  duration_minutes INTEGER NOT NULL,
  price DECIMAL(10,2),
  max_participants INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Razpoložljivost terapevtov
CREATE TABLE public.therapist_availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  therapist_name TEXT NOT NULL CHECK (therapist_name IN ('tanja', 'edo')),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  service_type TEXT NOT NULL CHECK (service_type IN ('individual', 'group_live', 'group_online')),
  max_bookings INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(therapist_name, date, start_time, service_type)
);

-- Rezervacije
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES public.services(id) NOT NULL,
  availability_id UUID REFERENCES public.therapist_availability(id) NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  therapist_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  sales_funnel_data JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Vprašanja za prodajni lijak
CREATE TABLE public.sales_funnel_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES public.services(id) NOT NULL,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('text', 'multiple_choice', 'scale', 'boolean')),
  options JSONB, -- Za multiple choice možnosti
  order_index INTEGER NOT NULL,
  is_required BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Omogoči RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_funnel_questions ENABLE ROW LEVEL SECURITY;

-- Politike za javno branje storitev in vprašanj
CREATE POLICY "Services are viewable by everyone" 
ON public.services FOR SELECT USING (true);

CREATE POLICY "Sales funnel questions are viewable by everyone" 
ON public.sales_funnel_questions FOR SELECT USING (true);

CREATE POLICY "Therapist availability is viewable by everyone" 
ON public.therapist_availability FOR SELECT USING (true);

-- Politike za rezervacije (javno ustvarjanje, zasebno branje)
CREATE POLICY "Anyone can create bookings" 
ON public.bookings FOR INSERT WITH CHECK (true);

CREATE POLICY "Bookings are viewable by everyone" 
ON public.bookings FOR SELECT USING (true);

-- Trigger za posodabljanje timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_therapist_availability_updated_at
  BEFORE UPDATE ON public.therapist_availability
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Vstavi osnovne storitve
INSERT INTO public.services (name, description, type, duration_minutes, price, max_participants) VALUES
('Individualna terapija', 'Osebna terapija prilagojena vašim potrebam', 'individual', 60, 80.00, 1),
('Skupinska terapija v živo', 'Terapija v skupini do 8 udeležencev', 'group_live', 90, 35.00, 8),
('Skupinska terapija online', 'Terapija v skupini preko video klica', 'group_online', 90, 30.00, 8),
('Paraterapija individualno', 'Specialno delo z obdobjem po travmi', 'individual', 75, 90.00, 1),
('Delavnica osebnostne rasti', 'Skupinska delavnica za osebnostno rast', 'group_live', 120, 45.00, 12);

-- Vstavi primere vprašanj za prodajni lijak
INSERT INTO public.sales_funnel_questions (service_id, question_text, question_type, order_index) VALUES
((SELECT id FROM public.services WHERE name = 'Individualna terapija'), 'Kaj vas je pripeljalo do iskanja terapevtske pomoči?', 'text', 1),
((SELECT id FROM public.services WHERE name = 'Individualna terapija'), 'Ali ste že imeli izkušnje s terapijo?', 'boolean', 2),
((SELECT id FROM public.services WHERE name = 'Individualna terapija'), 'Na lestvici od 1 do 10, kako močno vas trenutno bremeni vaša situacija?', 'scale', 3),
((SELECT id FROM public.services WHERE name = 'Skupinska terapija v živo'), 'Kako se počutite v skupinskih situacijah?', 'multiple_choice', 1),
((SELECT id FROM public.services WHERE name = 'Skupinska terapija online'), 'Ali imate dostop do stabilne internetne povezave?', 'boolean', 1);