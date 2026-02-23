import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/middleware'

// obrisi komentar - samo administrator sme
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(req, ['ADMIN'])
  if (authError) return authError

  try {
    const params = await context.params
    const komentarId = parseInt(params.id)

    const komentar = await prisma.komentar.findUnique({
      where: { id: komentarId }
    })

    if (!komentar) {
      return NextResponse.json(
        { success: false, error: 'Komentar nije pronađen' },
        { status: 404 }
      )
    }

    await prisma.komentar.delete({
      where: { id: komentarId }
    })

    return NextResponse.json({
      success: true,
      message: 'Komentar je uspešno obrisan'
    })

  } catch (error) {
    console.error('Greška pri brisanju komentara:', error)
    return NextResponse.json(
      { success: false, error: 'Greška pri brisanju komentara' },
      { status: 500 }
    )
  }
}