import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const [users, listings, bookings, messages] = await Promise.all([
      prisma.user.count(),
      prisma.listing.count(),
      prisma.booking.count(),
      prisma.message.count()
    ])

    return NextResponse.json({ users, listings, bookings, messages })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}