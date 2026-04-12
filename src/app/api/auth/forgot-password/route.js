import { PrismaClient } from '@prisma/client'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ message: 'If this email exists, a reset link has been sent.' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiry = new Date(Date.now() + 1000 * 60 * 60)

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: expiry
      }
    })

    const resetUrl = `http://localhost:3000/reset-password?token=${token}`

    await resend.emails.send({
      from: 'AgriShare <onboarding@resend.dev>',
      to: email,
      subject: 'Reset Your AgriShare Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #15803d; padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0;">🌱 AgriShare</h1>
            <p style="color: #bbf7d0; margin: 8px 0 0;">Smarter Farming Through Sharing</p>
          </div>
          <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 12px 12px;">
            <h2 style="color: #1f2937;">Reset Your Password</h2>
            <p style="color: #6b7280;">Hello ${user.name},</p>
            <p style="color: #6b7280;">We received a request to reset your password. Click the button below to create a new password. This link will expire in 1 hour.</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}" style="background: #15803d; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                Reset Password
              </a>
            </div>
            <p style="color: #9ca3af; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
            <p style="color: #9ca3af; font-size: 14px;">The AgriShare Team</p>
          </div>
        </div>
      `
    })

    return NextResponse.json({ message: 'If this email exists, a reset link has been sent.' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}