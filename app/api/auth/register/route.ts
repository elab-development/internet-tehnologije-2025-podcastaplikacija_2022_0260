import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, createToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { ime, prezime, email, password } = await req.json()

    // Validacija
    if (!ime || !prezime || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Sva polja su obavezna' },
        { status: 400 }
      )
    }

    // Proveri da li korisnik postoji
    const postojeciKorisnik = await prisma.korisnik.findUnique({
      where: { email }
    })

    if (postojeciKorisnik) {
      return NextResponse.json(
        { success: false, error: 'Email već postoji' },
        { status: 400 }
      )
    }

    // Hashuj lozinku
    const lozinkaHash = await hashPassword(password)

    // Kreiraj korisnika
    const korisnik = await prisma.korisnik.create({
      data: {
        ime,
        prezime,
        email,
        lozinkaHash,
        uloga: 'KORISNIK' // Default uloga
      },
      select: {
        id: true,
        ime: true,
        prezime: true,
        email: true,
        uloga: true,
        datumKreiranja: true
      }
    })

    // Kreiraj token
    const token = createToken(korisnik.id, korisnik.uloga)

    return NextResponse.json({
      success: true,
      data: { korisnik, token }
    }, { status: 201 })

  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { success: false, error: 'Greška pri registraciji' },
      { status: 500 }
    )
  }
}