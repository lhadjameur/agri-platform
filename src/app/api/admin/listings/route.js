import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      include: { owner: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(listings)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}