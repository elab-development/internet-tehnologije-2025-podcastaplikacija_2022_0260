INSERT INTO favoriti ("korisnikId","podcastId","datumDodavanja")
SELECT k.id, p.id, NOW()
FROM korisnici k
CROSS JOIN podcasts p 
WHERE k.email = 'marko@tunein.com'
LIMIT 1;