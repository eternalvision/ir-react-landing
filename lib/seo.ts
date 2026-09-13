import { DEFAULT_LOCALE, LOCALES } from '@constants/constants'
import { getConfig } from '@lib/config'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.instarum.cz'

export const BUSINESS_ID = `${SITE_URL}/#business`

export const OG_LOCALES: Record<string, string> = {
  cs: 'cs_CZ',
  en: 'en_GB',
  ru: 'ru_RU',
  uk: 'uk_UA',
}

/** Absolute URL of `path` ('' for home, '/sluzby/x' otherwise) in the given locale. */
export const localizedUrl = (locale: string, path = '') =>
  `${SITE_URL}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${path}`

export const languageAlternates = (path = '') => [
  ...LOCALES.map((loc) => ({ hrefLang: loc, href: localizedUrl(loc, path) })),
  { hrefLang: 'x-default', href: localizedUrl(DEFAULT_LOCALE, path) },
]

interface ServiceRef {
  name: string
  url: string
}

export const businessJsonLd = (locale: string, description: string, services: ServiceRef[]) => {
  const cfg = getConfig()

  return {
    '@type': ['Plumber', 'HVACBusiness'],
    '@id': BUSINESS_ID,
    name: cfg.companyName,
    description,
    url: localizedUrl(locale),
    logo: `${SITE_URL}${cfg.logoUrl}`,
    image: `${SITE_URL}${cfg.seo.ogImage}`,
    telephone: cfg.phone.replace(/\s/g, ''),
    email: cfg.email,
    vatID: cfg.dic,
    identifier: { '@type': 'PropertyValue', propertyID: 'IČO', value: cfg.ico },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vorařská 2386/1',
      addressLocality: 'Praha 12-Belárie',
      postalCode: '143 00',
      addressRegion: 'Hlavní město Praha',
      addressCountry: 'CZ',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 50.0139, longitude: 14.3969 },
    hasMap: cfg.addressUrl,
    areaServed: [
      { '@type': 'City', name: 'Praha' },
      { '@type': 'AdministrativeArea', name: 'Středočeský kraj' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    knowsLanguage: ['cs', 'en', 'ru', 'uk'],
    foundingDate: '2024',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: cfg.companyName,
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.name, url: service.url },
      })),
    },
  }
}

export const faqJsonLd = (items: { question: string; answer: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
})
