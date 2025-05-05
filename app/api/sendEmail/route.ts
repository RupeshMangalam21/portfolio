import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    await resend.emails.send({
      from: 'onboarding@resend.dev',      
      to: ['rupeshm.cse21@gmail.com'],
      subject: `${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
