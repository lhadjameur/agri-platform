import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'agrisharesecret')
    const userId = decoded.userId

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { listing: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}