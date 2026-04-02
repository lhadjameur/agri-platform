import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { rating, comment, userId, listingId } = await req.json()

    if (!rating || !comment || !userId || !listingId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        rating: parseInt(rating),
        comment,
        userId: parseInt(userId),
        listingId: parseInt(listingId)
      }
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const listingId = searchParams.get('listingId')

    const reviews = await prisma.review.findMany({
      where: { listingId: parseInt(listingId) },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}