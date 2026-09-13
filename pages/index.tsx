import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { useTranslation } from 'next-i18next/pages'
import { useRouter } from 'next/router'
import { Header } from '@components/Header/Header'
import { Footer } from '@components/Footer/Footer'
import { Hero } from '@components/Hero/Hero'
import { About } from '@components/About/About'
import { Services } from '@components/Services/Services'
import { Portfolio } from '@components/Portfolio/Portfolio'
import { FAQ } from '@components/FAQ/FAQ'
import { Contact } from '@components/Contact/Contact'
import { Seo } from '@components/Seo/Seo'
import { businessJsonLd, faqJsonLd, localizedUrl } from '@lib/seo'
import { SERVICE_SLUGS, servicePath } from '@lib/services'

export default function Home() {
  const { t } = useTranslation('common')
  const { locale = 'cs' } = useRouter()
  const faqItems = t('faq.items', { returnObjects: true }) as { question: string; answer: string }[]
  const services = SERVICE_SLUGS.map((slug) => ({
    name: t(`service_nav.${slug}`),
    url: localizedUrl(locale, servicePath(slug)),
  }))

  return (
    <>
      <Seo
        title={t('seo.title')}
        description={t('seo.description')}
        jsonLd={[businessJsonLd(locale, t('seo.description'), services), faqJsonLd(faqItems)]}
      />

      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Portfolio />
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
