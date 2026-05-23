import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { renderContactEmail, renderContactEmailText } from '@lib/emailTemplates'
import { resend } from '@lib/resend'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() })
  }

  const { name, email, phone, message } = parsed.data
  const to = process.env.RESEND_TO ?? 'info@example.com'
  const emailData = {
    name,
    email,
    message,
    ...(phone ? { phone } : {}),
  }

  try {
    await resend.emails.send({
      from: 'Website <onboarding@resend.dev>',
      to,
      subject: `New enquiry from ${name}`,
      html: renderContactEmail(emailData),
      text: renderContactEmailText(emailData),
      replyTo: email,
    })
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
