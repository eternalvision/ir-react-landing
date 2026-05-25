import { ImageResponse } from 'next/og'

export const config = { runtime: 'edge' }

export default function handler() {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'InstaRum s.r.o.'
  const phone       = process.env.NEXT_PUBLIC_PHONE          ?? '+420724257857'
  const email       = process.env.NEXT_PUBLIC_EMAIL          ?? 'instarumcz@gmail.com'
  const domain      = (process.env.NEXT_PUBLIC_SITE_URL ?? 'instarum.cz').replace(/^https?:\/\//, '')

  const DARK  = '#0A0F1E'
  const SURF  = '#111827'
  const BLUE  = '#2563EB'
  const TEXT  = '#F1F5F9'
  const MUTED = '#94A3B8'
  const DIM   = '#1E293B'

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: DARK,
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(${DIM} 1px, transparent 1px), linear-gradient(90deg, ${DIM} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            opacity: 0.4,
            display: 'flex',
          }}
        />

        {/* Blue radial glow top-right */}
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: -120,
            width: 560,
            height: 560,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Left accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 5,
            height: '100%',
            background: BLUE,
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '68px 80px 60px 90px',
            width: '100%',
          }}
        >
          {/* Top */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 10, height: 10, background: BLUE, display: 'flex' }} />
              <span
                style={{
                  color: BLUE,
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Instalatérství · Topení · Voda · Plyn
              </span>
            </div>

            {/* Company name */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
              <span
                style={{
                  color: TEXT,
                  fontSize: 96,
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {companyName.replace(/\s+s\.r\.o\..*/, '')}
              </span>
              <span
                style={{
                  color: MUTED,
                  fontSize: 36,
                  fontWeight: 400,
                  marginLeft: 12,
                  paddingBottom: 12,
                }}
              >
                s.r.o.
              </span>
            </div>

            {/* Tagline */}
            <span
              style={{
                color: MUTED,
                fontSize: 30,
                fontWeight: 400,
                lineHeight: 1.45,
                maxWidth: 680,
              }}
            >
              Inženýrské systémy, instalatérství a topení v Praze
            </span>
          </div>

          {/* Bottom bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Divider */}
            <div style={{ width: '100%', height: 1, background: DIM, display: 'flex' }} />

            {/* Contact row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Left: phone + email + city */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 7, height: 7, background: BLUE, display: 'flex' }} />
                  <span style={{ color: TEXT, fontSize: 22 }}>{phone}</span>
                </div>

                {/* Sep */}
                <div style={{ width: 1, height: 22, background: DIM, margin: '0 28px', display: 'flex' }} />

                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 7, height: 7, background: BLUE, display: 'flex' }} />
                  <span style={{ color: TEXT, fontSize: 22 }}>{email}</span>
                </div>

                {/* Sep */}
                <div style={{ width: 1, height: 22, background: DIM, margin: '0 28px', display: 'flex' }} />

                {/* City only */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 7, height: 7, background: BLUE, display: 'flex' }} />
                  <span style={{ color: MUTED, fontSize: 22 }}>Praha 5</span>
                </div>
              </div>

              {/* Domain */}
              <div
                style={{
                  background: SURF,
                  border: `1px solid ${DIM}`,
                  padding: '8px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ width: 7, height: 7, background: BLUE, display: 'flex' }} />
                <span style={{ color: MUTED, fontSize: 20 }}>{domain}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
