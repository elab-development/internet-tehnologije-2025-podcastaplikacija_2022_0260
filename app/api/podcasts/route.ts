import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


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
        komentari: true,
        favoriti: true,
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
