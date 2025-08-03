-- Posodobi opise storitev z daljšimi in bolj privlačnimi besedili
UPDATE public.services 
SET description = 'Osebna terapevtska pot, prilagojena izključno vam. V varnem prostoru raziskujte svoje notranje sile, odkrijte skrite zmožnosti in premagajte ovire, ki vas omejujejo pri življenju v polni meri. Naša metoda združuje tradicionalne pristope s sodobnimi tehnikami za globoko preobrazbo.'
WHERE type = 'individual' AND name = 'Individualna terapija';

UPDATE public.services 
SET description = 'Specializiran pristop za ozdravljanje globokih ran preteklosti. Z nežnostjo in strokovnostjo vas bomo vodili skozi proces obdelave travmatskih izkušenj, da boste lahko ponovno zaživeli v miru s seboj. Varno okolje za deljenje in ozdravljanje najglobljih bolečin.'
WHERE type = 'individual' AND name = 'Paraterapija individualno';

UPDATE public.services 
SET description = 'Pridružite se našim intimnim skupinam, kjer se ustvarjajo čudovite povezave med ljudmi na podobni poti. Delite izkušnje, se učite drug od drugega in odkrivajte moč skupnosti. Na voljo so dogodki v živo in online - izberite način, ki vam najbolj ustreza.'
WHERE type = 'group' AND name = 'Skupinska terapija';

UPDATE public.services 
SET description = 'Odkrijte svoje skrivnosti z našo poglobljeno analizo duševnega in čustvenega stanja. Izpolnite celosten vprašalnik in prejmite personalizirano poročilo z natančnimi smernicami za vaš nadaljnji razvoj. Prvi korak na poti k boljšemu razumevanju sebe - popolnoma brezplačno.'
WHERE type = 'assessment' AND name = 'Brezplačna terapijska ocena';