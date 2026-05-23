export interface ContactEmailData {
  name: string
  email: string
  phone?: string
  message: string
}

const tokens = {
  background: '#F8F9FA',
  surface: '#FFFFFF',
  accent: '#2563EB',
  accentForeground: '#FFFFFF',
  foreground: '#0F172A',
  border: '#E2E8F0',
  mutedForeground: '#64748B',
  secondary: '#F1F5F9',
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const formatMessage = (value: string) => escapeHtml(value).replace(/\r?\n/g, '<br />')

const renderField = (label: string, value: string) => `
  <tr>
    <td style="padding: 0 0 14px;">
      <div style="font-size: 12px; line-height: 18px; font-weight: 700; text-transform: uppercase; color: ${tokens.mutedForeground}; letter-spacing: 0;">
        ${label}
      </div>
      <div style="margin-top: 4px; font-size: 16px; line-height: 24px; color: ${tokens.foreground};">
        ${value}
      </div>
    </td>
  </tr>
`

export const renderContactEmail = ({ name, email, phone, message }: ContactEmailData) => {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = phone?.trim() ? escapeHtml(phone.trim()) : ''
  const safeMessage = formatMessage(message)
  const submittedAt = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Prague',
  }).format(new Date())

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>New contact form submission</title>
  </head>
  <body style="margin: 0; padding: 0; background: ${tokens.background}; color: ${tokens.foreground}; font-family: Inter, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width: 100%; background: ${tokens.background}; border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 640px; border-collapse: collapse;">
            <tr>
              <td style="padding: 0 0 16px;">
                <div style="font-size: 13px; line-height: 20px; font-weight: 700; color: ${tokens.accent}; text-transform: uppercase; letter-spacing: 0;">
                  InstaRum s.r.o.
                </div>
                <h1 style="margin: 8px 0 0; font-family: 'Space Grotesk', Inter, Arial, sans-serif; font-size: 30px; line-height: 36px; font-weight: 700; color: ${tokens.foreground}; letter-spacing: 0;">
                  New enquiry from ${safeName}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="background: ${tokens.surface}; border: 1px solid ${tokens.border}; padding: 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                  ${renderField('Name', safeName)}
                  ${renderField('Email', `<a href="mailto:${safeEmail}" style="color: ${tokens.accent}; text-decoration: none;">${safeEmail}</a>`)}
                  ${safePhone ? renderField('Phone', `<a href="tel:${safePhone.replace(/[^\d+]/g, '')}" style="color: ${tokens.accent}; text-decoration: none;">${safePhone}</a>`) : ''}
                  ${renderField('Submitted', escapeHtml(submittedAt))}
                  <tr>
                    <td style="padding: 4px 0 0;">
                      <div style="font-size: 12px; line-height: 18px; font-weight: 700; text-transform: uppercase; color: ${tokens.mutedForeground}; letter-spacing: 0;">
                        Message
                      </div>
                      <div style="margin-top: 8px; padding: 18px; background: ${tokens.secondary}; border-left: 4px solid ${tokens.accent}; font-size: 16px; line-height: 26px; color: ${tokens.foreground};">
                        ${safeMessage}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 18px 0 0; font-size: 13px; line-height: 20px; color: ${tokens.mutedForeground};">
                This email was sent from the website contact form.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export const renderContactEmailText = ({ name, email, phone, message }: ContactEmailData) => [
  `New enquiry from ${name}`,
  '',
  `Name: ${name}`,
  `Email: ${email}`,
  phone?.trim() ? `Phone: ${phone.trim()}` : '',
  '',
  'Message:',
  message,
].filter(Boolean).join('\n')
