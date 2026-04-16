import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const search = searchParams.get('search')

    const where = { available: true }
    if (category && category !== '') where.category = category
    if (location && location !== '') where.location = { contains: location, mode: 'insensitive' }
    if (search && search !== '') where.title = { contains: search, mode: 'insensitive' }

    const listings = await prisma.listing.findMany({
      where,
      include: { owner: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(listings)
  } catch (error) {
    console.error('GET listings error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { title, description, price, currency, pricePeriod, category, ownerId, imageUrl, images, location } = body

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
        location: location || null
      }
    })

    return NextResponse.json(listing, { status: 201 })
  } catch (error) {
    console.error('POST listing error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}