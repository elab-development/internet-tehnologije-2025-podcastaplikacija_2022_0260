import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser, requireAuth } from '@/lib/middleware'


export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const params = await context.params //zbog ovog nam nije radilo
  console.log("GET /api/podcasts/[id] called with id:", params.id)

  try {
    const podcast = await prisma.podcast.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        kreira: {
          select: { ime: true, prezime: true }
        },
        komentari: {
          include: {
            korisnik: { select: { ime: true, prezime: true } }
          }
        },
        favoriti: { select: { id: true } }
      }
    })

    if (!podcast) {
      console.log("Podcast not found:", params.id)
      return NextResponse.json({ success: false, error: 'Podcast nije pronađen' }, { status: 404 })
    }

    console.log("Podcast found:", podcast)
    return NextResponse.json(podcast)
  } catch (error) {
    console.error('Greška prilikom dohvata podcasta:', error)
    return NextResponse.json({ success: false, error: 'Greška pri učitavanju podcasta' }, { status: 500 })
  }
}

// PUT KACENJE PODCASTA samo korisnik ili admin
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const params = await context.params
  const authError = requireAuth(req, ['KORISNIK', 'ADMIN'])
  if (authError) return authError

  try {
    const user = getAuthUser(req)!
    console.log("Authenticated user for PUT:", user)

    const { naslov, opis, audioUrl, coverUrl } = await req.json()

    const podcast = await prisma.podcast.findUnique({ where: { id: parseInt(params.id) } })
    if (!podcast) {
      console.log("Podcast not found for PUT:", params.id)
      return NextResponse.json({ success: false, error: 'Podcast nije pronađen' }, { status: 404 })
    }

    if (podcast.kreiraId !== user.userId && user.uloga !== 'ADMIN') {
      console.log("User not authorized to update podcast:", user.userId)
      return NextResponse.json({ success: false, error: 'Nemate dozvolu da menjate ovaj podcast' }, { status: 403 })
    }

    const updatedPodcast = await prisma.podcast.update({
      where: { id: parseInt(params.id) },
      data: { naslov, opis, audioUrl, coverUrl },
      include: { kreira: { select: { ime: true, prezime: true } } }
    })

    console.log("Podcast updated:", updatedPodcast)
    return NextResponse.json({ success: true, data: updatedPodcast })
  } catch (error) {
    console.error('Greška pri izmeni podcasta:', error)
    return NextResponse.json({ success: false, error: 'Greška pri izmeni podcasta' }, { status: 500 })
  }
}

// DELETE podcastove - samo ADMINI mogu da brisu
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const params = await context.params
  console.log("DELETE /api/podcasts/[id] called with id:", params.id)

  const authError = requireAuth(req, ['KORISNIK', 'ADMIN'])
  if (authError) {
    console.log("Auth error for DELETE:", authError)
    return authError
  }

  try {
    const user = getAuthUser(req)!
    console.log("Authenticated user for DELETE:", user)

    const podcast = await prisma.podcast.findUnique({ where: { id: parseInt(params.id) } })
    console.log("Podcast to delete:", podcast)

    if (!podcast) {
      console.log("Podcast not found for DELETE:", params.id)
      return NextResponse.json({ success: false, error: 'Podcast nije pronađen' }, { status: 404 })
    }

    if (podcast.kreiraId !== user.userId && user.uloga !== 'ADMIN') {
      console.log("User not authorized to delete podcast:", user.userId)
      return NextResponse.json({ success: false, error: 'Nemate dozvolu da obrišete ovaj podcast' }, { status: 403 })
    }

    await prisma.podcast.delete({ where: { id: parseInt(params.id) } })
    console.log("Podcast successfully deleted:", params.id)

    return NextResponse.json({ success: true, message: 'Podcast je uspešno obrisan' })
  } catch (error) {
    console.error('Greška pri brisanju podcasta:', error)
    return NextResponse.json({ success: false, error: 'Greška pri brisanju podcasta' }, { status: 500 })
  }
}
