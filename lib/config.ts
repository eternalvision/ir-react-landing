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
  companyName: '',
  tagline: '',
  logoUrl: '',
  faviconUrl: '',
  phone: '',
  email: '',
  address: '',
  addressUrl: '',
  addressIframe: '',
  ico: '',
  dic: '',
  dataBox: '',
  socials: { linkedin: '', facebook: '', instagram: '', youtube: '' },
  googleTag: '',
  gaId: '',
  resendTo: '',
  seo: { ogImage: '', twitterHandle: '' },
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
