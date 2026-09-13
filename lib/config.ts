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
  gaId: string
  resendTo: string
  seo: {
    ogImage: string
    twitterHandle: string
  }
}

// Business data must be identical in SSR HTML, JSON-LD, Google Business Profile and Firmy.cz (NAP consistency).
const defaults: SiteConfig = {
  companyName: 'InstaRum s.r.o.',
  tagline: '',
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico',
  phone: '+420 724 257 857',
  email: 'instarumcz@gmail.com',
  address: 'Vorařská 2386/1, 143 00 Praha 12-Belárie',
  addressUrl:
    'https://www.google.com/maps/search/?api=1&query=Vora%C5%99sk%C3%A1%202386%2F1%2C%20143%2000%20Praha%2012-Bel%C3%A1rie',
  addressIframe:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.8655216007774!2d14.396870212054791!3d50.01387571858328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b96b93378abd9%3A0x44336a8de4d3dbb5!2zVm9yYcWZc2vDoSAyMzg2LzEsIDE0MyAwMCBQcmFoYSAxMi1CZWzDoXJpZQ!5e0!3m2!1sru!2scz!4v1780949433986!5m2!1sru!2scz',
  ico: '22348760',
  dic: 'CZ22348760',
  dataBox: 'ehjy4t5',
  socials: { linkedin: '', facebook: '', instagram: '', youtube: '' },
  googleTag: '',
  gaId: '',
  resendTo: '',
  seo: { ogImage: '/api/og', twitterHandle: '' },
}

declare global {
  interface Window {
    config?: Partial<SiteConfig>
  }
}

function envBase(): Partial<SiteConfig> {
  const v = <T>(val: T | undefined) => (val !== undefined && val !== '' ? val : undefined)
  return Object.fromEntries(
    Object.entries({
      companyName: v(process.env.NEXT_PUBLIC_COMPANY_NAME),
      email:       v(process.env.NEXT_PUBLIC_EMAIL),
      googleTag:   v(process.env.NEXT_PUBLIC_GOOGLE_TAG),
      gaId:        v(process.env.NEXT_PUBLIC_GA_ID),
    }).filter(([, val]) => val !== undefined)
  ) as Partial<SiteConfig>
}

export const getConfig = (): SiteConfig => {
  return { ...defaults, ...envBase() }
}

function getBrowserConfig(): SiteConfig {
  return { ...getConfig(), ...(window.config ?? {}) }
}

export const useConfig = (): SiteConfig => {
  const [config, setConfig] = useState<SiteConfig>(() => getConfig())

  useEffect(() => {
    setConfig(getBrowserConfig())
  }, [])

  return config
}
