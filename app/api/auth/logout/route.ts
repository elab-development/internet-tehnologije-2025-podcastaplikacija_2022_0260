import { NextResponse } from 'next/server'

export async function POST() {
  // Logout se obično radi na frontend-u (brisanje tokena iz localStorage)
  // Ali možemo da vratimo success response
  return NextResponse.json({
    success: true,
    message: 'Uspešno ste se odjavili'
  })
}