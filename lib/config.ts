import { useEffect, useState } from 'react'

export interface SiteConfig {
  companyName: string
  tagline: string
  logoUrl: string
  faviconUrl: string
  phone: string
  email: string
  address: string
  addressUrl: string
  addressIframe: string
  ico: string
  dic: string
  dataBox: string
  socials: {
    linkedin: string
    facebook: string
    instagram: string
    youtube: string
  }
  googleTag: string
  resendTo: string
  seo: {
    ogImage: string
    twitterHandle: string
  }
}

const defaults: SiteConfig = {
  companyName: 'InstaRum s.r.o.',
  tagline: 'Stavební, technické a realitní služby v Praze',
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico',
  phone: '',
  email: '',
  address: 'Holečkova 789/49, Smíchov, 150 00 Praha 5',
  addressUrl: 'https://www.google.com/maps/search/?api=1&query=Hole%C4%8Dkova%20789%2F49%2C%20Sm%C3%ADchov%2C%20150%2000%20Praha%205',
  addressIframe: '',
  ico: '22348760',
  dic: 'CZ22348760',
  dataBox: 'ehjy4t5',
  socials: { linkedin: '', facebook: '', instagram: '', youtube: '' },
  googleTag: '',
  resendTo: '',
  seo: { ogImage: '/og-image.jpg', twitterHandle: '' },
}

declare global {
  interface Window {
    config?: Partial<SiteConfig>
  }
}

// NEXT_PUBLIC_* vars are inlined at build time — same value on server and client.
// This is the SSR-safe base that avoids hydration mismatches.
// window.config (loaded via config.js before the bundle) can override on client.
function envBase(): Partial<SiteConfig> {
  const v = <T>(val: T | undefined) => (val !== undefined && val !== '' ? val : undefined)
  return Object.fromEntries(
    Object.entries({
      companyName: v(process.env.NEXT_PUBLIC_COMPANY_NAME),
      phone:       v(process.env.NEXT_PUBLIC_PHONE),
      email:       v(process.env.NEXT_PUBLIC_EMAIL),
      address:     v(process.env.NEXT_PUBLIC_ADDRESS),
      googleTag:   v(process.env.NEXT_PUBLIC_GOOGLE_TAG),
    }).filter(([, val]) => val !== undefined)
  ) as Partial<SiteConfig>
}

export function getConfig(): SiteConfig {
  return { ...defaults, ...envBase() }
}

function getBrowserConfig(): SiteConfig {
  return { ...getConfig(), ...(window.config ?? {}) }
}

export function useConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(() => getConfig())

  useEffect(() => {
    setConfig(getBrowserConfig())
  }, [])

  return config
}
