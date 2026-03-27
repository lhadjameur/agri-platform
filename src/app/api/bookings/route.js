import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { listingId, userId, startDate, endDate } = await req.json()

    if (!listingId || !userId || !startDate || !endDate) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const booking = await prisma.booking.create({
      data: {
        listingId,
        userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'pending'
      }
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        listing: { select: { title: true } },
        user: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}