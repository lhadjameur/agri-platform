import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: { select: { name: true, email: true } },
        listing: { select: { title: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
