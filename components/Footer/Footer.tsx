import type { ElementType } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { useConfig } from '@lib/config'

const NAV_KEYS = ['about', 'services', 'portfolio', 'testimonials', 'faq', 'contact'] as const

const SOCIAL_ICONS: Record<string, ElementType<{ className?: string }>> = {
  linkedin: ExternalLink,
  facebook: ExternalLink,
  instagram: ExternalLink,
  youtube: ExternalLink,
}

export const Footer = () => {
  const { t } = useTranslation('common')
  const config = useConfig()
  const year = new Date().getFullYear()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const activeSocials = (
    Object.entries(config.socials) as [keyof typeof SOCIAL_ICONS, string][]
  ).filter(([, url]) => url)

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={config.logoUrl}
                alt={config.companyName}
                width={32}
                height={32}
                className="h-8 w-auto"
              />
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
                  <button
                    onClick={() => scrollTo(key)}
                    className="text-sm text-foreground/70 hover:text-accent transition-colors"
                  >
                    {t(`nav.${key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <address className="not-italic text-sm text-foreground/70 space-y-1 mb-4">
              {config.phone && <p>{config.phone}</p>}
              {config.email && (
                <p>
                  <a href={`mailto:${config.email}`} className="hover:text-accent transition-colors">
                    {config.email}
                  </a>
                </p>
              )}
              {config.address && <p>{config.address}</p>}
            </address>

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
