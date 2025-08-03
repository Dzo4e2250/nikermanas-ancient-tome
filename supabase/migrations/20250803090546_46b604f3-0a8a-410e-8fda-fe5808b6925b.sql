-- Najprej posodobi CHECK constraint za services tabelo
ALTER TABLE public.services DROP CONSTRAINT services_type_check;
ALTER TABLE public.services ADD CONSTRAINT services_type_check 
  CHECK (type IN ('individual', 'group_live', 'group_online', 'group', 'assessment'));

-- Sedaj dodaj brezplačno terapijsko storitev
INSERT INTO public.services (name, description, type, duration_minutes, price, max_participants) VALUES
('Brezplačna terapijska ocena', 'Celovita ocena vašega čustvenega in duševnega stanja z osebnim poročilom', 'assessment', 0, 0.00, 1);

-- Dodaj diagnostični vprašalnik za brezplačno storitev
INSERT INTO public.sales_funnel_questions (service_id, question_text, question_type, order_index, options) VALUES
((SELECT id FROM public.services WHERE type = 'assessment'), 'Kako bi ocenili svoje trenutno čustveno stanje?', 'multiple_choice', 1, '["Odlično - počutim se zelo dobro", "Dobro - večinoma sem zadovoljen/a", "Povprečno - gor pa dol", "Slabo - pogosto se počutim preveč obremenjeno", "Zelo slabo - potrebujem pomoč"]'),

((SELECT id FROM public.services WHERE type = 'assessment'), 'Kako pogosto doživljate stres ali anksioznost?', 'multiple_choice', 2, '["Nikoli ali redko", "Občasno (1-2x na teden)", "Pogosto (3-4x na teden)", "Skoraj vsak dan", "Ves čas"]'),

((SELECT id FROM public.services WHERE type = 'assessment'), 'Kako kakovostno spite?', 'multiple_choice', 3, '["Odlično - spim globoko in se zbujam spočit", "Dobro - večinoma dobro spim", "Povprečno - včasih težave", "Slabo - pogosto se težko zaspim ali se prebujam", "Zelo slabo - kronične težave s spanjem"]'),

((SELECT id FROM public.services WHERE type = 'assessment'), 'Kako se počutite v odnosih z drugimi?', 'multiple_choice', 4, '["Zelo povezan/a in podprt/a", "Večinoma dobri odnosi", "Povprečni odnosi", "Pogosto se počutim osamljeno", "Zelo izolirano in nepovezano"]'),

((SELECT id FROM public.services WHERE type = 'assessment'), 'Kako obvladate izzive in težave?', 'multiple_choice', 5, '["Odlično - imam dobre strategije", "Dobro - večinoma se dobro spopadem", "Povprečno - včasih se počutim preveč obremenjeno", "Slabo - pogosto me prevevajo težave", "Zelo slabo - ne vem kako naj se spopadem"]'),

((SELECT id FROM public.services WHERE type = 'assessment'), 'Ali se spopadate z določenimi travmami ali težkimi izkušnjami iz preteklosti?', 'boolean', 6, NULL),

((SELECT id FROM public.services WHERE type = 'assessment'), 'Kaj je vaš glavni razlog za iskanje pomoči?', 'text', 7, NULL),

((SELECT id FROM public.services WHERE type = 'assessment'), 'Kaj bi radi dosegli s terapijo?', 'text', 8, NULL);