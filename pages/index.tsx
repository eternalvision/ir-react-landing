import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { generateNextSeo } from 'next-seo/pages'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Header } from '@components/Header/Header'
import { Footer } from '@components/Footer/Footer'
import { Hero } from '@components/Hero/Hero'
import { About } from '@components/About/About'
import { Services } from '@components/Services/Services'
import { Portfolio } from '@components/Portfolio/Portfolio'
import { Testimonials } from '@components/Testimonials/Testimonials'
import { FAQ } from '@components/FAQ/FAQ'
import { Contact } from '@components/Contact/Contact'
import { useConfig } from '@lib/config'

const LOCALE_NAMES: Record<string, string> = {
  en: 'en_GB',
  ru: 'ru_RU',
  cs: 'cs_CZ',
  uk: 'uk_UA',
}

const ALL_LOCALES = ['cs', 'en', 'ru', 'uk']

export default function Home() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const config = useConfig()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'
  const locale = router.locale ?? 'cs'

  const languageAlternates = ALL_LOCALES.map((loc) => ({
    hrefLang: loc,
    href: `${siteUrl}/${loc}`,
  }))
  languageAlternates.push({ hrefLang: 'x-default', href: siteUrl })
  const twitter = {
    cardType: 'summary_large_image',
    ...(config.seo.twitterHandle ? { handle: config.seo.twitterHandle } : {}),
  }

  return (
    <>
      <Head>
        {generateNextSeo({
          title: t('seo.title'),
          description: t('seo.description'),
          canonical: `${siteUrl}/${locale}`,
          openGraph: {
            title: t('seo.title'),
            description: t('seo.description'),
            url: `${siteUrl}/${locale}`,
            locale: LOCALE_NAMES[locale] ?? 'en_GB',
            images: [
              {
                url: `${siteUrl}${config.seo.ogImage}`,
                width: 1200,
                height: 630,
                alt: t('seo.title'),
              },
            ],
          },
          twitter,
          languageAlternates,
        })}
      </Head>

      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'cs', ['common'])),
  },
})
