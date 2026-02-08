-- CreateEnum
CREATE TYPE "Uloga" AS ENUM ('GOST', 'KORISNIK', 'ADMIN');

-- CreateTable
CREATE TABLE "korisnici" (
    "id" SERIAL NOT NULL,
    "ime" TEXT NOT NULL,
    "prezime" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "lozinkaHash" TEXT NOT NULL,
    "uloga" "Uloga" NOT NULL DEFAULT 'KORISNIK',
    "profilnaSlika" TEXT,
    "datumKreiranja" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "korisnici_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "podcasts" (
    "id" SERIAL NOT NULL,
    "naslov" TEXT NOT NULL,
    "opis" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "coverUrl" TEXT,
    "brojPregleda" INTEGER NOT NULL DEFAULT 0,
    "datumKreiranja" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kreiraId" INTEGER NOT NULL,

    CONSTRAINT "podcasts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "komentari" (
    "id" SERIAL NOT NULL,
    "tekst" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "azuriran" TIMESTAMP(3) NOT NULL,
    "korisnikId" INTEGER NOT NULL,
    "podcastId" INTEGER NOT NULL,

    CONSTRAINT "komentari_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favoriti" (
    "id" SERIAL NOT NULL,
    "datumDodavanja" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "korisnikId" INTEGER NOT NULL,
    "podcastId" INTEGER NOT NULL,

    CONSTRAINT "favoriti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slike_profila" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "korisnikId" INTEGER NOT NULL,

    CONSTRAINT "slike_profila_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sesije" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "datumIsteka" TIMESTAMP(3) NOT NULL,
    "korisnikId" INTEGER NOT NULL,

    CONSTRAINT "sesije_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "korisnici_email_key" ON "korisnici"("email");

-- CreateIndex
CREATE UNIQUE INDEX "favoriti_korisnikId_podcastId_key" ON "favoriti"("korisnikId", "podcastId");

-- CreateIndex
CREATE UNIQUE INDEX "sesije_token_key" ON "sesije"("token");

-- AddForeignKey
ALTER TABLE "podcasts" ADD CONSTRAINT "podcasts_kreiraId_fkey" FOREIGN KEY ("kreiraId") REFERENCES "korisnici"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "komentari" ADD CONSTRAINT "komentari_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "korisnici"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "komentari" ADD CONSTRAINT "komentari_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "podcasts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriti" ADD CONSTRAINT "favoriti_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "korisnici"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriti" ADD CONSTRAINT "favoriti_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "podcasts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slike_profila" ADD CONSTRAINT "slike_profila_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "korisnici"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesije" ADD CONSTRAINT "sesije_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "korisnici"("id") ON DELETE CASCADE ON UPDATE CASCADE;