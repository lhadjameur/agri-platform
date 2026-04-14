import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser && existingUser.isVerified) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    const pin = Math.floor(100000 + Math.random() * 900000).toString()
    const pinExpiry = new Date(Date.now() + 1000 * 60 * 10)
    const hashedPassword = await bcrypt.hash(password, 10)

    if (existingUser && !existingUser.isVerified) {
      await prisma.user.update({
        where: { email },
        data: {
          name,
          password: hashedPassword,
          role: role || 'farmer',
          verificationPin: pin,
          pinExpiry
        }
      })
    } else {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: role || 'farmer',
          isVerified: false,
          verificationPin: pin,
          pinExpiry
        }
      })
    }

    await resend.emails.send({
      from: 'AgriShare <onboarding@resend.dev>',
      to: email,
      subject: 'Your AgriShare Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #15803d; padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0;">🌱 AgriShare</h1>
            <p style="color: #bbf7d0; margin: 8px 0 0;">Smarter Farming Through Sharing</p>
          </div>
          <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 12px 12px;">
            <h2 style="color: #1f2937;">Hello ${name}! 👋</h2>
            <p style="color: #6b7280;">Thank you for joining AgriShare. Please use the verification code below to confirm your email address.</p>
            <div style="background: white; border: 2px dashed #15803d; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
              <p style="color: #6b7280; margin: 0 0 8px;">Your verification code is:</p>
              <h1 style="color: #15803d; font-size: 48px; letter-spacing: 8px; margin: 0;">${pin}</h1>
              <p style="color: #9ca3af; font-size: 14px; margin: 8px 0 0;">This code expires in 10 minutes</p>
            </div>
            <p style="color: #9ca3af; font-size: 14px;">If you did not create an account, please ignore this email.</p>
            <p style="color: #9ca3af; font-size: 14px;">The AgriShare Team 🌱</p>
          </div>
        </div>
      `
    })

    return NextResponse.json({ message: 'Verification code sent to your email!' }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}