import Head from 'next/head'
import { useRouter } from 'next/router'
import { generateNextSeo } from 'next-seo/pages'
import { getConfig } from '@lib/config'
import { OG_LOCALES, SITE_URL, languageAlternates, localizedUrl } from '@lib/seo'

interface SeoProps {
  title: string
  description: string
  /** '' for home, '/sluzby/x' for subpages */
  path?: string
  jsonLd?: object[]
  noindex?: boolean
}

export const Seo = ({ title, description, path = '', jsonLd = [], noindex = false }: SeoProps) => {
  const { locale = 'cs' } = useRouter()
  const cfg = getConfig()
  const url = localizedUrl(locale, path)

  return (
    <Head>
      {generateNextSeo({
        title,
        description,
        ...(noindex ? {} : { canonical: url }),
        noindex,
        openGraph: {
          type: 'website',
          siteName: cfg.companyName,
          title,
          description,
          url,
          locale: OG_LOCALES[locale] ?? 'cs_CZ',
          images: [
            {
              url: `${SITE_URL}${cfg.seo.ogImage}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        },
        twitter: { cardType: 'summary_large_image' },
        languageAlternates: noindex ? [] : languageAlternates(path),
      })}
      {jsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': jsonLd }),
          }}
        />
      )}
    </Head>
  )
}

Seo.displayName = 'Seo'
