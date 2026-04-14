import { PrismaClient } from '@prisma/client'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { email, pin } = await req.json()

    if (!email || !pin) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (user.verificationPin !== pin) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 })
    }

    if (user.pinExpiry < new Date()) {
      return NextResponse.json({ error: 'Verification code has expired. Please register again.' }, { status: 400 })
    }

    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        verificationPin: null,
        pinExpiry: null
      }
    })

    await resend.emails.send({
      from: 'AgriShare <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to AgriShare! 🌱',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #15803d; padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0;">🌱 AgriShare</h1>
            <p style="color: #bbf7d0; margin: 8px 0 0;">Smarter Farming Through Sharing</p>
          </div>
          <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 12px 12px;">
            <h2 style="color: #1f2937;">Welcome to AgriShare, ${user.name}! 🎉</h2>
            <p style="color: #6b7280;">Your account has been successfully verified. You are now part of the AgriShare farming community!</p>
            <div style="background: white; border-radius: 12px; padding: 24px; margin: 24px 0;">
              <h3 style="color: #15803d; margin: 0 0 16px;">Get started today:</h3>
              <p style="color: #6b7280; margin: 8px 0;">🔍 Browse available agricultural resources near you</p>
              <p style="color: #6b7280; margin: 8px 0;">➕ List your own equipment or land for rent</p>
              <p style="color: #6b7280; margin: 8px 0;">💬 Connect with farmers in your area</p>
              <p style="color: #6b7280; margin: 8px 0;">⭐ Leave reviews and build trust</p>
            </div>
            <div style="text-align: center; margin: 24px 0;">
              <a href="http://localhost:3000/listings" style="background: #15803d; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                Browse Listings
              </a>
            </div>
            <p style="color: #9ca3af; font-size: 14px;">Happy farming! 🌾</p>
            <p style="color: #9ca3af; font-size: 14px;">The AgriShare Team</p>
          </div>
        </div>
      `
    })

    return NextResponse.json({ message: 'Email verified successfully! Welcome to AgriShare!' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}