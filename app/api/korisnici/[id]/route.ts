import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser, requireAuth } from '@/lib/middleware'

// DELETE /api/korisnici/[id] - Obriši korisnika
// ADMIN može da briše bilo koga
// KORISNIK može da briše samo sebe
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(req, ['KORISNIK', 'ADMIN'])
  if (authError) return authError

  try {
    const user = getAuthUser(req)!
    const params = await context.params
    const korisnikId = parseInt(params.id)

    // Proveri da li korisnik postoji
    const korisnik = await prisma.korisnik.findUnique({
      where: { id: korisnikId }
    })

    if (!korisnik) {
      return NextResponse.json(
        { success: false, error: 'Korisnik nije pronađen' },
        { status: 404 }
      )
    }

    // Proveri dozvole:
    // - ADMIN može da briše bilo koga
    // - KORISNIK može da briše samo sebe
    if (user.uloga !== 'ADMIN' && user.userId !== korisnikId) {
      return NextResponse.json(
        { success: false, error: 'Nemate dozvolu da obrišete ovog korisnika' },
        { status: 403 }
      )
    }

    // Obriši korisnika (cascade će obrisati sve povezano)
    await prisma.korisnik.delete({
      where: { id: korisnikId }
    })

    return NextResponse.json({
      success: true,
      message: 'Korisnik je uspešno obrisan'
    })

  } catch (error) {
    console.error('Greška pri brisanju korisnika:', error)
    return NextResponse.json(
      { success: false, error: 'Greška pri brisanju korisnika' },
      { status: 500 }
    )
  }
}