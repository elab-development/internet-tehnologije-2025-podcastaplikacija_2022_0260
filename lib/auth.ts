import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10) 
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function createToken(userId: number, uloga: string): string {
  return jwt.sign({ userId, uloga }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: number; uloga: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number; uloga: string }
  } catch {
    return null
  }
}