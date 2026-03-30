import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function DELETE(req) {
  try {
    const url = new URL(req.url)
    const parts = url.pathname.split('/')
    const id = parseInt(parts[parts.length - 1])

    await prisma.message.deleteMany({ where: { listingId: id } })
    await prisma.booking.deleteMany({ where: { listingId: id } })
    await prisma.review.deleteMany({ where: { listingId: id } })
    await prisma.listing.delete({ where: { id } })

    return NextResponse.json({ message: 'Listing deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}