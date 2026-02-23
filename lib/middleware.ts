import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './auth'

export function getAuthUser(req: NextRequest) {

  const authHeader = req.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.replace('Bearer ', '')
  return verifyToken(token)
} 

export function requireAuth(req: NextRequest, allowedRoles?: string[]) {
  const user = getAuthUser(req)

  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Morate biti prijavljeni' },
      { status: 401 }
    )
  }

  if (allowedRoles && !allowedRoles.includes(user.uloga)) {
    return NextResponse.json(
      { success: false, error: 'Nemate dozvolu za ovu akciju' },
      { status: 403 }
    )
  }

  return null
}