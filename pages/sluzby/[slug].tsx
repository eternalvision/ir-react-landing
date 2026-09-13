import type { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { useTranslation } from 'next-i18next/pages'
import { ArrowRight, CheckCircle2, MapPin, Phone } from 'lucide-react'
import { Header } from '@components/Header/Header'
import { Footer } from '@components/Footer/Footer'
import { Contact } from '@components/Contact/Contact'
import { Seo } from '@components/Seo/Seo'
import { useConfig } from '@lib/config'
import { BUSINESS_ID, businessJsonLd, faqJsonLd, localizedUrl } from '@lib/seo'
import {
  SERVICE_IMAGES,
  SERVICE_SLUGS,
  isServiceSlug,
  servicePath,
  type ServiceSlug,
} from '@lib/services'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion'
import { Button } from '@ui/button'

interface FaqItem {
  question: string
  answer: string
}

interface ProcessStep {
  title: string
  text: string
}

interface HeroHighlight {
  label: string
  value: string
}

export default function ServicePage({ slug }: { slug: ServiceSlug }) {
  const { t } = useTranslation(['services', 'common'])
  const { locale = 'cs' } = useRouter()
  const config = useConfig()
  const phoneHref = config.phone.replace(/[^\d+]/g, '')

  const key = `items.${slug}`
  const h1 = t(`${key}.h1`)
  const description = t(`${key}.description`)
  const intro = t(`${key}.intro`, { returnObjects: true }) as string[]
  const included = t(`${key}.included`, { returnObjects: true }) as string[]
  const faq = t(`${key}.faq`, { returnObjects: true }) as FaqItem[]
  const process = t('page.process', { returnObjects: true }) as ProcessStep[]
  const highlights = t('common:hero.highlights', { returnObjects: true }) as HeroHighlight[]
  const path = servicePath(slug)
  const url = localizedUrl(locale, path)
  const related = SERVICE_SLUGS.filter((s) => s !== slug)

  const jsonLd = [
    businessJsonLd(
      locale,
      t('common:seo.description'),
      SERVICE_SLUGS.map((s) => ({
        name: t(`common:service_nav.${s}`),
        url: localizedUrl(locale, servicePath(s)),
      }))
    ),
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: h1,
      serviceType: t(`common:service_nav.${slug}`),
      description,
      url,
      provider: { '@id': BUSINESS_ID },
      areaServed: [
        { '@type': 'City', name: 'Praha' },
        { '@type': 'AdministrativeArea', name: 'Středočeský kraj' },
      ],
      availableLanguage: ['cs', 'en', 'ru', 'uk'],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('page.home'), item: localizedUrl(locale) },
        { '@type': 'ListItem', position: 2, name: t(`common:service_nav.${slug}`), item: url },
      ],
    },
    faqJsonLd(faq),
  ]

  return (
    <>
      <Seo title={t(`${key}.title`)} description={description} path={path} jsonLd={jsonLd} />

      <Header />
      <main id="main-content">
        <section className="bg-background pt-28 pb-16">
          <div className="container mx-auto">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/60 list-none m-0 p-0">
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    {t('page.home')}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-foreground">
                  {t(`common:service_nav.${slug}`)}
                </li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="min-w-0">
                <h1 className="break-words font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                  {h1}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/70">{t(`${key}.lead`)}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`tel:${phoneHref}`}
                    className="inline-flex h-12 items-center justify-center gap-2 bg-accent px-6 text-base font-semibold text-white transition-colors hover:bg-accent/90"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    {config.phone}
                  </a>
                  <Button
                    size="lg"
                    variant="outline"
                    render={<a href="#contact" />}
                    nativeButton={false}
                    className="h-12 border-accent bg-surface px-6 text-base font-semibold text-accent hover:bg-accent hover:text-white"
                  >
                    {t('page.enquiry')}
                  </Button>
                </div>

                <ul className="mt-10 grid max-w-2xl grid-cols-1 gap-3 p-0 sm:grid-cols-3">
                  {highlights.map((item) => (
                    <li key={item.label} className="list-none border border-border bg-surface p-4">
                      <div className="font-heading text-xl font-bold leading-none text-foreground">{item.value}</div>
                      <div className="mt-2 text-sm leading-5 text-foreground/60">{item.label}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden border border-border bg-surface">
                <Image
                  src={SERVICE_IMAGES[slug]}
                  alt={h1}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20" aria-labelledby="included-heading">
          <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-5 text-lg leading-8 text-foreground/70">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="flex items-start gap-3 text-base">
                <MapPin className="mt-1.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <span>
                  <strong className="text-foreground">{t('page.area_title')}:</strong> {t('page.area_text')}
                </span>
              </p>
            </div>
            <div>
              <h2 id="included-heading" className="mb-6 font-heading text-3xl font-bold">
                {t('page.included_title')}
              </h2>
              <ul className="space-y-4 list-none m-0 p-0">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-background py-20" aria-labelledby="process-heading">
          <div className="container mx-auto">
            <h2 id="process-heading" className="mb-10 font-heading text-3xl font-bold md:text-4xl">
              {t('page.process_title')}
            </h2>
            <ol className="grid grid-cols-1 gap-6 list-none m-0 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((step, i) => (
                <li key={step.title} className="border border-border bg-surface p-6">
                  <span className="font-heading text-3xl font-bold text-accent">{i + 1}</span>
                  <h3 className="mt-3 mb-2 font-heading text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/60">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-surface py-20" aria-labelledby="service-faq-heading">
          <div className="container mx-auto max-w-3xl">
            <h2 id="service-faq-heading" className="mb-10 text-center font-heading text-3xl font-bold md:text-4xl">
              {t('page.faq_title')}
            </h2>
            <Accordion className="space-y-3">
              {faq.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${i}`}
                  className="border border-border bg-background px-6 data-open:border-accent rounded-none"
                >
                  <AccordionTrigger className="font-heading font-semibold text-left hover:no-underline py-5">
                    <h3 className="m-0 text-base">{item.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-foreground/70 leading-relaxed pb-4 m-0">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-background py-20" aria-labelledby="related-heading">
          <div className="container mx-auto">
            <h2 id="related-heading" className="mb-8 font-heading text-3xl font-bold">
              {t('page.related_title')}
            </h2>
            <ul className="grid grid-cols-1 gap-3 list-none m-0 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((s) => (
                <li key={s}>
                  <Link
                    href={servicePath(s)}
                    className="flex h-full items-center justify-between gap-3 border border-border bg-surface p-4 font-semibold transition-colors hover:border-accent hover:text-accent"
                  >
                    {t(`common:service_nav.${s}`)}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['cs'] }) => ({
  paths: locales.flatMap((locale) => SERVICE_SLUGS.map((slug) => ({ params: { slug }, locale }))),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({ locale = 'cs', params }) => {
  const slug = params?.slug
  if (!isServiceSlug(slug)) return { notFound: true }

  return {
    props: {
      slug,
      ...(await serverSideTranslations(locale, ['common', 'services'])),
    },
  }
}
