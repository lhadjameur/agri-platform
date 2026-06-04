import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      include: { owner: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(listings)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
export async function POST(req) {
  try {
    const body = await req.json()
    const { title, description, price, currency, pricePeriod, category, ownerId, imageUrl, images, location, tags } = body

    if (!title || !description || !price || !category || !ownerId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        currency: currency || 'USD',
        pricePeriod: pricePeriod || 'day',
        category,
        ownerId: parseInt(ownerId),
        imageUrl: imageUrl || null,
        images: images || [],
        location: location || null,
        tags: tags || []
      }
    })

    return NextResponse.json(listing, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}