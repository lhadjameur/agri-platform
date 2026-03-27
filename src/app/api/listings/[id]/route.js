import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const parts = url.pathname.split('/')
    const id = parseInt(parts[parts.length - 1])

    const listing = await prisma.listing.findUnique({
      where: { id: id },
      include: { owner: { select: { name: true } } }
    })

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    return NextResponse.json(listing)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}