import type { GetStaticProps } from 'next'
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { useTranslation } from 'next-i18next/pages'
import { Header } from '@components/Header/Header'
import { Footer } from '@components/Footer/Footer'
import { Seo } from '@components/Seo/Seo'
import { SERVICE_SLUGS, servicePath } from '@lib/services'

export default function NotFound() {
  const { t } = useTranslation('common')

  return (
    <>
      <Seo title={`${t('not_found.title')} | InstaRum`} description={t('not_found.text')} noindex />
      <Header />
      <main id="main-content" className="bg-background pt-32 pb-24">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="font-heading text-6xl font-bold text-accent">404</p>
          <h1 className="mt-4 font-heading text-4xl font-bold">{t('not_found.title')}</h1>
          <p className="mt-4 text-lg text-foreground/70">{t('not_found.text')}</p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center bg-accent px-6 font-semibold text-white hover:bg-accent/90"
          >
            {t('not_found.cta')}
          </Link>
          <ul className="mt-12 grid grid-cols-1 gap-3 list-none p-0 text-left sm:grid-cols-2">
            {SERVICE_SLUGS.map((slug) => (
              <li key={slug}>
                <Link
                  href={servicePath(slug)}
                  className="block border border-border bg-surface p-4 font-semibold hover:border-accent hover:text-accent"
                >
                  {t(`service_nav.${slug}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
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
