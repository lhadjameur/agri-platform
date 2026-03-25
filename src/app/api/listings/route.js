import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      where: { available: true },
      include: { owner: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(listings)
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const { title, description, price, category, ownerId } = await req.json()

    if (!title || !description || !price || !category || !ownerId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
        ownerId: parseInt(ownerId)
      }
    })

    return NextResponse.json(listing, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}