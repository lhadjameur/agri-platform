import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'agrisharesecret')
    const userId = decoded.userId

    const listings = await prisma.listing.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(listings)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}