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

const defaults: SiteConfig = {
  companyName: 'InstaRum s.r.o.',
  tagline: 'Inženýrské systémy, instalatérství a topení v Praze',
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico',
  phone: '+420724257857',
  email: 'instarumcz@gmail.com',
  address: 'Holečkova 789/49, Smíchov, 150 00 Praha 5',
  addressUrl: 'https://maps.app.goo.gl/yP7oKCxygF2kKyjS9',
  addressIframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.6711157342293!2d14.389404090021332!3d50.07372064100025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b945555d766eb%3A0x49cebffa8a98e5ba!2s49%2C%20Hole%C4%8Dkova%20789%2C%20150%2000%20Praha%205-Sm%C3%ADchov!5e0!3m2!1sru!2scz!4v1779723149143!5m2!1sru!2scz',
  ico: '22348760',
  dic: 'CZ22348760',
  dataBox: 'ehjy4t5',
  socials: { linkedin: '', facebook: '', instagram: '', youtube: '' },
  googleTag: '',
  gaId: '',
  resendTo: 'instarumcz@gmail.com',
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
      phone:       v(process.env.NEXT_PUBLIC_PHONE),
      email:       v(process.env.NEXT_PUBLIC_EMAIL),
      address:     v(process.env.NEXT_PUBLIC_ADDRESS),
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
