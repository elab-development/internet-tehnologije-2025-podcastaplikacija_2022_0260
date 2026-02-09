import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/middleware'

// GET /api/korisnici - Lista svih korisnika (samo ADMIN)
export async function GET(req: NextRequest) {
  const authError = requireAuth(req, ['ADMIN'])
  if (authError) return authError

  try {
    const korisnici = await prisma.korisnik.findMany({
      select: {
        id: true,
        ime: true,
        prezime: true,
        email: true,
        uloga: true,
        datumKreiranja: true
      },
      orderBy: {
        datumKreiranja: 'desc'
      }
    })

    return NextResponse.json(korisnici)
  } catch (error) {
    console.error('Greška pri učitavanju korisnika:', error)
    return NextResponse.json(
      { success: false, error: 'Greška pri učitavanju korisnika' },
      { status: 500 }
    )
  }
}