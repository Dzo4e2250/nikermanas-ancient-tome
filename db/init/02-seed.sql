-- Nikrmana — začetni podatki: storitve in vprašanja (končno stanje prejšnjih migracij)

INSERT INTO services (name, description, type, duration_minutes, price, max_participants) VALUES
('Individualna terapija',
 'Osebna terapevtska pot, prilagojena izključno vam. V varnem prostoru raziskujte svoje notranje sile, odkrijte skrite zmožnosti in premagajte ovire, ki vas omejujejo pri življenju v polni meri. Naša metoda združuje tradicionalne pristope s sodobnimi tehnikami za globoko preobrazbo.',
 'individual', 60, 80.00, 1),
('Skupinska terapija',
 'Pridružite se našim intimnim skupinam, kjer se ustvarjajo čudovite povezave med ljudmi na podobni poti. Delite izkušnje, se učite drug od drugega in odkrivajte moč skupnosti. Na voljo so dogodki v živo in online - izberite način, ki vam najbolj ustreza.',
 'group', 90, 35.00, 8),
('Paraterapija individualno',
 'Specializiran pristop za ozdravljanje globokih ran preteklosti. Z nežnostjo in strokovnostjo vas bomo vodili skozi proces obdelave travmatskih izkušenj, da boste lahko ponovno zaživeli v miru s seboj. Varno okolje za deljenje in ozdravljanje najglobljih bolečin.',
 'individual', 75, 90.00, 1),
('Brezplačna terapijska ocena',
 'Odkrijte svoje skrivnosti z našo poglobljeno analizo duševnega in čustvenega stanja. Izpolnite celosten vprašalnik in prejmite personalizirano poročilo z natančnimi smernicami za vaš nadaljnji razvoj. Prvi korak na poti k boljšemu razumevanju sebe - popolnoma brezplačno.',
 'assessment', 0, 0.00, 1);

INSERT INTO sales_funnel_questions (service_id, question_text, question_type, order_index, options) VALUES
((SELECT id FROM services WHERE name = 'Individualna terapija'), 'Kaj vas je pripeljalo do iskanja terapevtske pomoči?', 'text', 1, NULL),
((SELECT id FROM services WHERE name = 'Individualna terapija'), 'Ali ste že imeli izkušnje s terapijo?', 'boolean', 2, NULL),
((SELECT id FROM services WHERE name = 'Individualna terapija'), 'Na lestvici od 1 do 10, kako močno vas trenutno bremeni vaša situacija?', 'scale', 3, NULL),
((SELECT id FROM services WHERE name = 'Skupinska terapija'), 'Kako se počutite v skupinskih situacijah?', 'multiple_choice', 1, NULL),
((SELECT id FROM services WHERE name = 'Skupinska terapija'), 'Ali imate dostop do stabilne internetne povezave?', 'boolean', 2, NULL),

((SELECT id FROM services WHERE type = 'assessment'), 'Kako bi ocenili svoje trenutno čustveno stanje?', 'multiple_choice', 1,
 '["Odlično - počutim se zelo dobro", "Dobro - večinoma sem zadovoljen/a", "Povprečno - gor pa dol", "Slabo - pogosto se počutim preveč obremenjeno", "Zelo slabo - potrebujem pomoč"]'),
((SELECT id FROM services WHERE type = 'assessment'), 'Kako pogosto doživljate stres ali anksioznost?', 'multiple_choice', 2,
 '["Nikoli ali redko", "Občasno (1-2x na teden)", "Pogosto (3-4x na teden)", "Skoraj vsak dan", "Ves čas"]'),
((SELECT id FROM services WHERE type = 'assessment'), 'Kako kakovostno spite?', 'multiple_choice', 3,
 '["Odlično - spim globoko in se zbujam spočit", "Dobro - večinoma dobro spim", "Povprečno - včasih težave", "Slabo - pogosto se težko zaspim ali se prebujam", "Zelo slabo - kronične težave s spanjem"]'),
((SELECT id FROM services WHERE type = 'assessment'), 'Kako se počutite v odnosih z drugimi?', 'multiple_choice', 4,
 '["Zelo povezan/a in podprt/a", "Večinoma dobri odnosi", "Povprečni odnosi", "Pogosto se počutim osamljeno", "Zelo izolirano in nepovezano"]'),
((SELECT id FROM services WHERE type = 'assessment'), 'Kako obvladate izzive in težave?', 'multiple_choice', 5,
 '["Odlično - imam dobre strategije", "Dobro - večinoma se dobro spopadem", "Povprečno - včasih se počutim preveč obremenjeno", "Slabo - pogosto me prevevajo težave", "Zelo slabo - ne vem kako naj se spopadem"]'),
((SELECT id FROM services WHERE type = 'assessment'), 'Ali se spopadate z določenimi travmami ali težkimi izkušnjami iz preteklosti?', 'boolean', 6, NULL),
((SELECT id FROM services WHERE type = 'assessment'), 'Kaj je vaš glavni razlog za iskanje pomoči?', 'text', 7, NULL),
((SELECT id FROM services WHERE type = 'assessment'), 'Kaj bi radi dosegli s terapijo?', 'text', 8, NULL);
