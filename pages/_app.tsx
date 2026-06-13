import { useMemo, useState } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next/pages'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Preloader } from '@components/Preloader/Preloader'
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
import enCommon from '../public/locales/en/common.json'
import csCommon from '../public/locales/cs/common.json'
import ruCommon from '../public/locales/ru/common.json'
import ukCommon from '../public/locales/uk/common.json'

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
const COOKIE_MESSAGES: Record<string, typeof enCommon> = {
  en: enCommon,
  cs: csCommon,
  ru: ruCommon,
  uk: ukCommon,
}

function App({ Component, pageProps, router }: AppProps) {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const cookieMessages = COOKIE_MESSAGES[router.locale ?? 'cs'] ?? csCommon
  const cookieCategories = useMemo<CategoryConfig[]>(
    () =>
      COOKIE_CATEGORY_KEYS.map((key) => ({
        key,
        title: cookieMessages.cookies.categories[key].title,
        description: cookieMessages.cookies.categories[key].description,
        required: key === 'necessary',
      })),
    [cookieMessages]
  )
  const cookieLabels = useMemo<CookieConsentLabels>(
    () => ({
      bannerTitle: cookieMessages.cookies.banner.title,
      bannerDescription: cookieMessages.cookies.banner.description,
      learnMore: cookieMessages.cookies.banner.learn_more,
      customize: cookieMessages.cookies.actions.customize,
      rejectAll: cookieMessages.cookies.actions.reject_all,
      acceptAll: cookieMessages.cookies.actions.accept_all,
      settingsTitle: cookieMessages.cookies.settings.title,
      settingsDescription: cookieMessages.cookies.settings.description,
      required: cookieMessages.cookies.settings.required,
      toggleCookies: (title) => cookieMessages.cookies.settings.toggle.replace('{{title}}', title),
      savePreferences: cookieMessages.cookies.actions.save,
      readOur: cookieMessages.cookies.settings.read_our,
      privacyPolicy: cookieMessages.cookies.settings.privacy_policy,
      trigger: cookieMessages.cookies.trigger,
    }),
    [cookieMessages]
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
          {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
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
