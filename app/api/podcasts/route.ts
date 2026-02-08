import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser, requireAuth } from '@/lib/middleware'

export async function GET() {
  try {
    const podcasts = await prisma.podcast.findMany({
      include: {
        kreira: {
          select: {
            ime: true,
            prezime: true,
          },
        },
        komentari: {
          include: {
            korisnik: {
              select: {
                ime: true,
                prezime: true,
              },
            },
          },
        },
        favoriti: {
          select: {
            korisnikId: true,
          }
        }
      },
      orderBy: {
        datumKreiranja: 'desc',
      },
    })
    return NextResponse.json(podcasts)
  } catch (error) {
    console.error('Greška prilikom dohvata podcastova:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

/////////////////// dodatak za autentifikaciju i CRUD operacije ////////////////////////////
export async function POST(req: NextRequest) {
  const authError = requireAuth(req, ['KORISNIK', 'ADMIN'])
  if (authError) return authError

  try {
    const user = getAuthUser(req)!
    const { naslov, opis, audioUrl, coverUrl } = await req.json()

    if (!naslov || !opis || !audioUrl) {
      return NextResponse.json(
        { success: false, error: 'Naslov, opis i audio URL su obavezni' },
        { status: 400 }
      )
    }

    const podcast = await prisma.podcast.findMany({
      include: {
        kreira: {
          select: {
            ime: true,
            prezime: true,
          },
        },
        komentari: {
          include: {
            korisnik: {
              select: {
                ime: true,
                prezime: true,
              },
            },
          },
        },
        favoriti: {
          select: {
            korisnikId: true,
          },
        },
      },
      orderBy: {
        datumKreiranja: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      data: podcast
    }, { status: 201 })

  } catch (error) {
    console.error('Greška pri kreiranju podcasta:', error)
    return NextResponse.json(
      { success: false, error: 'Greška pri kreiranju podcasta' },
      { status: 500 }
    )
  }
}