-- Posodobi storitve - združi skupinske v eno
UPDATE public.services 
SET name = 'Skupinska terapija', 
    description = 'Terapija v skupini - na voljo so dogodki v živo in online',
    type = 'group'
WHERE type IN ('group_live', 'group_online');

-- Izbriši podvojene skupinske storitve
DELETE FROM public.services 
WHERE type = 'group_online';

-- Posodobi tip storitve
UPDATE public.services 
SET type = 'group' 
WHERE type = 'group_live';

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