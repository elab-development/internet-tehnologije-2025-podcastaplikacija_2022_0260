import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser, requireAuth } from '@/lib/middleware'

// GET /api/podcasts/[id]
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const params = await context.params 
    const podcast = await prisma.podcast.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        kreira: {
          select: {
            ime: true,
            prezime: true
          }
        },
        komentari: {
          include: {
            korisnik: {
              select: {
                ime: true,
                prezime: true
              }
            }
          }
        },
        favoriti: {
          select: { 
            id: true,
            korisnikId: true 
          }
        }
      }
    })

    if (!podcast) {
      return NextResponse.json(
        { success: false, error: 'Podcast nije pronađen' },
        { status: 404 }
      )
    }

    return NextResponse.json(podcast)
  } catch (error) {
    console.error('Greška prilikom dohvata podcasta:', error)
    return NextResponse.json(
      { success: false, error: 'Greška pri učitavanju podcasta' },
      { status: 500 }
    )
  }
}

// PUT /api/podcasts/[id]
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  const authError = requireAuth(req, ['KORISNIK', 'ADMIN'])
  if (authError) return authError

  try {
    const user = getAuthUser(req)!
    const params = await context.params 
    const { naslov, opis, audioUrl, coverUrl } = await req.json()

    const podcast = await prisma.podcast.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!podcast) {
      return NextResponse.json(
        { success: false, error: 'Podcast nije pronađen' },
        { status: 404 }
      )
    }

    if (podcast.kreiraId !== user.userId && user.uloga !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Nemate dozvolu da menjate ovaj podcast' },
        { status: 403 }
      )
    }

    const updatedPodcast = await prisma.podcast.update({
      where: { id: parseInt(params.id) },
      data: {
        naslov,
        opis,
        audioUrl,
        coverUrl
      },
      include: {
        kreira: {
          select: {
            ime: true,
            prezime: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedPodcast
    })

  } catch (error) {
    console.error('Greška pri izmeni podcasta:', error)
    return NextResponse.json(
      { success: false, error: 'Greška pri izmeni podcasta' },
      { status: 500 }
    )
  }
}

// DELETE /api/podcasts/[id]
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }  
) {
  const authError = requireAuth(req, ['KORISNIK', 'ADMIN'])
  if (authError) return authError

  try {
    const user = getAuthUser(req)!
    const params = await context.params 

    const podcast = await prisma.podcast.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!podcast) {
      return NextResponse.json(
        { success: false, error: 'Podcast nije pronađen' },
        { status: 404 }
      )
    }

    // if (podcast.kreiraId !== user.userId && user.uloga !== 'ADMIN') {
    //   return NextResponse.json(
    //     { success: false, error: 'Nemate dozvolu da obrišete ovaj podcast' },
    //     { status: 403 }
    //   )
    // }

    await prisma.podcast.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({
      success: true,
      message: 'Podcast je uspešno obrisan'
    })

  } catch (error) {
    console.error('Greška pri brisanju podcasta:', error)
    return NextResponse.json(
      { success: false, error: 'Greška pri brisanju podcasta' },
      { status: 500 }
    )
  }
}