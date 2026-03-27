import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { content, senderId, receiverId, listingId } = await req.json()

    if (!content || !senderId || !receiverId || !listingId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId: parseInt(senderId),
        receiverId: parseInt(receiverId),
        listingId: parseInt(listingId)
      }
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: parseInt(userId) },
          { receiverId: parseInt(userId) }
        ]
      },
      include: {
        sender: { select: { name: true } },
        receiver: { select: { name: true } },
        listing: { select: { title: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}