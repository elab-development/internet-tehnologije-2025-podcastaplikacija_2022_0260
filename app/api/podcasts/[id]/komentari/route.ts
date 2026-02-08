import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser, requireAuth } from '@/lib/middleware'

// POST zahtev, dodaj komentar, samo korisnik i admin
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(req, ['KORISNIK', 'ADMIN'])
  if (authError) return authError

  try {
    const user = getAuthUser(req)!
    const params = await context.params
    const podcastId = parseInt(params.id)
    const { tekst } = await req.json()

    if (!tekst || tekst.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Komentar ne može biti prazan' },
        { status: 400 }
      )
    }

    const komentar = await prisma.komentar.create({
      data: {
        tekst: tekst.trim(),
        korisnikId: user.userId,
        podcastId: podcastId
      },
      include: {
        korisnik: {
          select: {
            ime: true,
            prezime: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: komentar,
      message: 'Komentar je uspešno dodat'
    }, { status: 201 })

  } catch (error) {
    console.error('Greška pri dodavanju komentara:', error)
    return NextResponse.json(
      { success: false, error: 'Greška pri dodavanju komentara' },
      { status: 500 }
    )
  }
}