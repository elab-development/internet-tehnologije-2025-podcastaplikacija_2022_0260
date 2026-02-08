import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser, requireAuth } from '@/lib/middleware'

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }  // ← PROMENJENO
) {
  const authError = requireAuth(req, ['KORISNIK', 'ADMIN'])
  if (authError) return authError

  try {
    const user = getAuthUser(req)!
    const params = await context.params  // ← AWAIT OVDE
    const podcastId = parseInt(params.id)

    const existingFavorit = await prisma.favorit.findUnique({
      where: {
        korisnikId_podcastId: {
          korisnikId: user.userId,
          podcastId: podcastId
        }
      }
    })

    if (existingFavorit) {
      await prisma.favorit.delete({
        where: { id: existingFavorit.id }
      })

      return NextResponse.json({
        success: true,
        favorited: false,
        message: 'Uklonjeno iz favorita'
      })
    } else {
      await prisma.favorit.create({
        data: {
          korisnikId: user.userId,
          podcastId: podcastId
        }
      })

      return NextResponse.json({
        success: true,
        favorited: true,
        message: 'Dodato u favorite'
      })
    }

  } catch (error) {
    console.error('Greška pri toggle favorite:', error)
    return NextResponse.json(
      { success: false, error: 'Greška pri obradi favorita' },
      { status: 500 }
    )
  }
}