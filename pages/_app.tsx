import { useMemo } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { appWithTranslation, useTranslation } from 'next-i18next/pages'
import { Inter, Space_Grotesk } from 'next/font/google'
import {
  CookieBanner,
  CookieConsentProvider,
  CookieSettings,
  CookieTrigger,
  type CategoryConfig,
  type CookieConsentLabels,
} from '@components/CookieConsent'
import { Toaster } from '@ui/sonner'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const COOKIE_CATEGORY_KEYS = ['necessary', 'analytics', 'marketing', 'preferences'] as const

function App({ Component, pageProps }: AppProps) {
  // Only the current locale's messages are loaded (via getStaticProps), not all four bundled into JS.
  const { t } = useTranslation('common')
  const cookieCategories = useMemo<CategoryConfig[]>(
    () =>
      COOKIE_CATEGORY_KEYS.map((key) => ({
        key,
        title: t(`cookies.categories.${key}.title`),
        description: t(`cookies.categories.${key}.description`),
        required: key === 'necessary',
      })),
    [t]
  )
  const cookieLabels = useMemo<CookieConsentLabels>(
    () => ({
      bannerTitle: t('cookies.banner.title'),
      bannerDescription: t('cookies.banner.description'),
      learnMore: t('cookies.banner.learn_more'),
      customize: t('cookies.actions.customize'),
      rejectAll: t('cookies.actions.reject_all'),
      acceptAll: t('cookies.actions.accept_all'),
      settingsTitle: t('cookies.settings.title'),
      settingsDescription: t('cookies.settings.description'),
      required: t('cookies.settings.required'),
      toggleCookies: (title) => t('cookies.settings.toggle', { title }),
      savePreferences: t('cookies.actions.save'),
      readOur: t('cookies.settings.read_our'),
      privacyPolicy: t('cookies.settings.privacy_policy'),
      trigger: t('cookies.trigger'),
    }),
    [t]
  )

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <CookieConsentProvider
        config={{
          consentVersion: '2026-05-20',
          expirationDays: 180,
          position: 'bottom',
          categories: cookieCategories,
          labels: cookieLabels,
          googleConsentMode: {
            enabled: Boolean(process.env.NEXT_PUBLIC_GOOGLE_TAG),
          },
        }}
      >
        <div className={`${inter.variable} ${spaceGrotesk.variable}`}>
          <Component {...pageProps} />
          <CookieBanner />
          <CookieSettings />
          <div className="fixed bottom-4 left-4 z-40">
            <CookieTrigger variant="icon" />
          </div>
          <Toaster richColors position="top-right" />
        </div>
      </CookieConsentProvider>
      <Analytics />
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
