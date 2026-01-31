import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, createToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Validacija
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email i lozinka su obavezni' },
        { status: 400 }
      )
    }

    // Pronađi korisnika
    const korisnik = await prisma.korisnik.findUnique({
      where: { email }
    })

    if (!korisnik) {
      return NextResponse.json(
        { success: false, error: 'Neispravni kredencijali' },
        { status: 401 }
      )
    }

    // Proveri lozinku
    const validnaLozinka = await verifyPassword(password, korisnik.lozinkaHash)

    if (!validnaLozinka) {
      return NextResponse.json(
        { success: false, error: 'Neispravni kredencijali' },
        { status: 401 }
      )
    }

    // Kreiraj token
    const token = createToken(korisnik.id, korisnik.uloga)

    return NextResponse.json({
      success: true,
      data: {
        korisnik: {
          id: korisnik.id,
          ime: korisnik.ime,
          prezime: korisnik.prezime,
          email: korisnik.email,
          uloga: korisnik.uloga
        },
        token
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Greška pri prijavljivanju' },
      { status: 500 }
    )
  }
}