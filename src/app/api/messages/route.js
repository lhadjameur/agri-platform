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

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: {
        sender: { select: { id: true, name: true, email: true } },
        receiver: { select: { id: true, name: true, email: true } },
        listing: { select: { id: true, title: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const { content, senderId, receiverId, listingId } = await req.json()

    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        receiverId,
        listingId
      },
      include: {
        sender: { select: { id: true, name: true } },
        receiver: { select: { id: true, name: true } },
        listing: { select: { id: true, title: true } }
      }
    })

    return NextResponse.json(message)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}