-- Najprej posodobi CHECK constraint za services tabelo
ALTER TABLE public.services DROP CONSTRAINT services_type_check;
ALTER TABLE public.services ADD CONSTRAINT services_type_check 
  CHECK (type IN ('individual', 'group_live', 'group_online', 'group'));

-- Nato posodobi CHECK constraint za therapist_availability tabelo
ALTER TABLE public.therapist_availability DROP CONSTRAINT therapist_availability_service_type_check;
ALTER TABLE public.therapist_availability ADD CONSTRAINT therapist_availability_service_type_check 
  CHECK (service_type IN ('individual', 'group_live', 'group_online', 'group'));

-- Sedaj posodobi storitve - združi skupinske v eno
UPDATE public.services 
SET name = 'Skupinska terapija', 
    description = 'Terapija v skupini - na voljo so dogodki v živo in online',
    type = 'group'
WHERE type IN ('group_live', 'group_online');

-- Izbriši podvojene skupinske storitve (ohrani samo eno)
DELETE FROM public.services 
WHERE type = 'group' AND id NOT IN (
  SELECT MIN(id) FROM public.services WHERE type = 'group'
);

-- Posodobi tudi therapist_availability tabelo
UPDATE public.therapist_availability 
SET service_type = 'group' 
WHERE service_type IN ('group_live', 'group_online');

-- Vstavi primere prihajajočih dogodkov
INSERT INTO public.therapist_availability (therapist_name, date, start_time, end_time, service_type, max_bookings) VALUES
('tanja', '2025-01-15', '18:00', '19:30', 'group', 8),
('edo', '2025-01-18', '19:00', '20:30', 'group', 10),
('tanja', '2025-01-22', '17:00', '18:30', 'group', 8),
('edo', '2025-01-25', '18:30', '20:00', 'group', 12),
('tanja', '2025-01-29', '18:00', '19:30', 'group', 8),
('edo', '2025-02-01', '19:00', '20:30', 'group', 10),
('tanja', '2025-02-05', '17:30', '19:00', 'group', 8),
('edo', '2025-02-08', '18:00', '19:30', 'group', 10),
('tanja', '2025-02-12', '18:30', '20:00', 'group', 8),
('edo', '2025-02-15', '19:00', '20:30', 'group', 12);