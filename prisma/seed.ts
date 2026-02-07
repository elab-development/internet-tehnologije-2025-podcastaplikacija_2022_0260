import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Početak seed-ovanja')

  // Obriši postojeće podatke
  await prisma.favorit.deleteMany()
  await prisma.komentar.deleteMany()
  await prisma.podcast.deleteMany()
  await prisma.sesija.deleteMany()
  await prisma.slikaProfila.deleteMany()
  await prisma.korisnik.deleteMany()

  console.log('Kreiram korisnike')

  const password = await bcrypt.hash('lozinka123', 10)

  const admin = await prisma.korisnik.create({
    data: {
      ime: 'tea',
      prezime: 'manja',
      email: 'tea@tunein.com',
      lozinkaHash: password,
      uloga: 'ADMIN',
      profilnaSlika: 'https://picsum.photos/id/103/200/300',
    },
  })

  const kreator1 = await prisma.korisnik.create({
    data: {
      ime: 'nikola',
      prezime: 'manja',
      email: 'nikola@tunein.com',
      lozinkaHash: password,
      uloga: 'KORISNIK',
      profilnaSlika: 'https://picsum.photos/id/177/200/300',
    },
  })

  const kreator2 = await prisma.korisnik.create({
    data: {
      ime: 'neko',
      prezime: 'nekic',
      email: 'neko@tunein.com',
      lozinkaHash: password,
      uloga: 'KORISNIK',
      profilnaSlika: 'https://picsum.photos/id/193/200/300',
    },
  })

  const gost = await prisma.korisnik.create({
    data: {
      ime: 'gost',
      prezime: 'gostic',
      email: 'gost@tunein.com', //ovo nema smisla, promeniti
      lozinkaHash: password,
      uloga: 'GOST',
    },
  })

  console.log('Kreiram podcastove')

  const podcast1 = await prisma.podcast.create({
    data: {
      naslov: 'Od FON-ove diplome do prvog posla',
      opis: 'U ovom podcastu razgovaramo o traženju posla nakon studiranja.',
      audioUrl: '',  //pitati mentorku oko audio fajlova?
      coverUrl: 'https://picsum.photos/id/3/200/300',
      brojPregleda: 150,
      kreiraId: kreator1.id,
    },
  })

  const podcast2 = await prisma.podcast.create({
    data: {
      naslov: 'Zdravlje i Fitness',
      opis: 'Praktični saveti za početnike koji žele da uvedu fitness u svoju rutinu.',
      audioUrl: '', //???
      coverUrl: 'https://picsum.photos/id/13/200/300',
      brojPregleda: 289,
      kreiraId: kreator2.id,
    },
  })

  const podcast3 = await prisma.podcast.create({
    data: {
      naslov: 'Priče iz Srbije',
      opis: 'Zanimljive priče iz srpske istorije i kulture.',
      audioUrl: '', //???
      coverUrl: 'https://picsum.photos/id/380/200/300',
      brojPregleda: 234,
      kreiraId: kreator1.id,
    },
  })

  console.log('Kreiram komentare')

  await prisma.komentar.createMany({
    data: [
      {
        tekst: 'Odličan podcast! Naučio sam puno novih stvari.',
        korisnikId: kreator2.id,
        podcastId: podcast1.id,
      },
      {
        tekst: 'Jako korisni saveti, hvala!',
        korisnikId: kreator1.id,
        podcastId: podcast2.id,
      },
      {
        tekst: 'Zanimljiva tema, jedva čekam sledeću epizodu!',
        korisnikId: admin.id,
        podcastId: podcast3.id,
      },
    ],
  })

  console.log('Kreiram favorite')

  await prisma.favorit.createMany({
    data: [
      { korisnikId: kreator1.id, podcastId: podcast2.id },
      { korisnikId: kreator2.id, podcastId: podcast1.id },
     
    ],
  })

  console.log('Kreiram slike profila')

  await prisma.slikaProfila.createMany({
    data: [
      { url: 'https://picsum.photos/id/103/200/300', format: 'jpg', korisnikId: admin.id },
      { url: 'https://picsum.photos/id/177/200/300', format: 'jpg', korisnikId: kreator1.id },
      { url: 'https://picsum.photos/id/193/200/300', format: 'jpg', korisnikId: kreator2.id },
    ],
  })

  console.log('Seed završen!')
  console.log('\n Kredencijali za testiranje:')
  console.log('  Email: tea@tunein.com | nikola@tunein.com | neko@tunein.com | gost@tunein.com')
  console.log('  Lozinka: lozinka123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })