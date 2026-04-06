import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(req) {
  try {
    const { message, history } = await req.json()

    const listings = await prisma.listing.findMany({
      where: { available: true },
      select: { title: true, category: true, price: true, location: true },
      take: 10
    })

    const listingsSummary = listings.map(l =>
      `- ${l.title} (${l.category}) - $${l.price}/day${l.location ? ` in ${l.location}` : ''}`
    ).join('\n')

    const systemPrompt = `You are AgriShare Assistant, a helpful AI for the AgriShare platform — a web-based platform for sharing and renting agricultural resources among farmers.

Your role is to:
1. Help users navigate and use the AgriShare platform
2. Answer questions about agriculture, farming equipment, and best practices
3. Provide advice on pricing, equipment selection, and resource sharing
4. Be friendly, professional, and knowledgeable about farming

About AgriShare platform:
- Farmers can list and rent equipment, land, labor and advisory services
- Users can book resources, send messages to owners, and leave reviews
- The platform supports multiple categories: Equipment, Land, Labor, Advisory
- Users can register as farmers or vendors

Current available listings on the platform:
${listingsSummary}

Important guidelines:
- Always be helpful and friendly
- Keep responses concise and practical
- If asked about specific listings, refer to the ones listed above
- Respond in the same language the user writes in`

    const messages = [
      ...(history || []).slice(-10),
      { role: 'user', content: message }
    ]

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 500,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ]
    })

    return NextResponse.json({
      reply: response.choices[0].message.content
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}