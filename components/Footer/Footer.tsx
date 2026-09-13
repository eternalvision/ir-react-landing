import type { ElementType } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next/pages'
import { ExternalLink } from 'lucide-react'
import { LOCALES } from '@constants/constants'
import { useConfig } from '@lib/config'
import { SERVICE_SLUGS, servicePath } from '@lib/services'
import { Logo } from '@ui/Logo'
import { PersonalBadge } from './PersonalBadge'

const NAV_KEYS = ['about', 'services', 'portfolio', 'faq', 'contact'] as const

const LOCALE_LABELS: Record<string, string> = {
  cs: 'Čeština',
  en: 'English',
  ru: 'Русский',
  uk: 'Українська',
}

const SOCIAL_ICONS: Record<string, ElementType<{ className?: string }>> = {
  linkedin: ExternalLink,
  facebook: ExternalLink,
  instagram: ExternalLink,
  youtube: ExternalLink,
}

const linkClass = 'text-sm text-foreground/70 hover:text-accent transition-colors'

export const Footer = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const config = useConfig()
  const year = new Date().getFullYear()
  const currentPath = router.asPath.split(/[?#]/)[0] ?? '/'

  const activeSocials = (
    Object.entries(config.socials) as [keyof typeof SOCIAL_ICONS, string][]
  ).filter(([, url]) => url)

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size={55} className="shrink-0" />
              <span className="font-heading font-bold text-lg">{config.companyName}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 gap-2 list-none m-0 p-0">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <Link href={`/#${key}`} className={linkClass}>
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services-title">
            <p id="footer-services-title" className="font-heading font-semibold mb-3">
              {t('footer.services_title')}
            </p>
            <ul className="space-y-2 list-none m-0 p-0">
              {SERVICE_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={servicePath(slug)} className={linkClass}>
                    {t(`service_nav.${slug}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <address className="not-italic text-sm text-foreground/70 space-y-1 mb-4">
              {config.phone && (
                <p>
                  <a href={`tel:${config.phone.replace(/[^\d+]/g, '')}`} className="hover:text-accent transition-colors">
                    {config.phone}
                  </a>
                </p>
              )}
              {config.email && (
                <p>
                  <a href={`mailto:${config.email}`} className="hover:text-accent transition-colors">
                    {config.email}
                  </a>
                </p>
              )}
              {config.address && <p>{config.address}</p>}
              {config.ico && <p>IČO {config.ico}</p>}
            </address>

            <nav aria-labelledby="footer-languages-title" className="mb-4">
              <p id="footer-languages-title" className="sr-only">
                {t('footer.languages_title')}
              </p>
              <ul className="flex flex-wrap gap-x-3 gap-y-1 list-none m-0 p-0">
                {LOCALES.map((locale) => (
                  <li key={locale}>
                    <Link
                      href={currentPath}
                      locale={locale}
                      hrefLang={locale}
                      className={`${linkClass} ${router.locale === locale ? 'text-accent font-semibold' : ''}`}
                    >
                      {LOCALE_LABELS[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {activeSocials.length > 0 && (
              <div className="flex gap-3" role="list" aria-label="Social media links">
                {activeSocials.map(([name, url]) => {
                  const Icon = SOCIAL_ICONS[name]
                  if (!Icon) return null
                  return (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      role="listitem"
                      className="text-foreground/50 hover:text-accent transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            )}
            <PersonalBadge />
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {year} {config.companyName}. {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'
