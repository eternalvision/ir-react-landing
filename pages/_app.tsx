import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next'
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

const COOKIE_CATEGORIES: Record<string, CategoryConfig[]> = {
  en: [
    {
      key: 'necessary',
      title: 'Necessary',
      description: 'Essential cookies required for the website to function properly. These cannot be disabled.',
      required: true,
    },
    {
      key: 'analytics',
      title: 'Analytics',
      description: 'Cookies that help us understand how visitors use the website.',
    },
    {
      key: 'marketing',
      title: 'Marketing',
      description: 'Cookies used for advertising and measuring campaigns.',
    },
    {
      key: 'preferences',
      title: 'Preferences',
      description: 'Cookies that remember your settings and choices.',
    },
  ],
  cs: [
    {
      key: 'necessary',
      title: 'Nezbytné',
      description: 'Cookies nezbytné pro správné fungování webu. Tyto cookies nelze vypnout.',
      required: true,
    },
    {
      key: 'analytics',
      title: 'Analytické',
      description: 'Cookies, které nám pomáhají pochopit, jak návštěvníci používají web.',
    },
    {
      key: 'marketing',
      title: 'Marketingové',
      description: 'Cookies používané pro reklamu a měření kampaní.',
    },
    {
      key: 'preferences',
      title: 'Preferenční',
      description: 'Cookies, které si pamatují vaše nastavení a volby.',
    },
  ],
  ru: [
    {
      key: 'necessary',
      title: 'Необходимые',
      description: 'Cookies, необходимые для корректной работы сайта. Их нельзя отключить.',
      required: true,
    },
    {
      key: 'analytics',
      title: 'Аналитика',
      description: 'Cookies, которые помогают понять, как посетители используют сайт.',
    },
    {
      key: 'marketing',
      title: 'Маркетинг',
      description: 'Cookies для рекламы и измерения кампаний.',
    },
    {
      key: 'preferences',
      title: 'Предпочтения',
      description: 'Cookies, которые запоминают ваши настройки и выбор.',
    },
  ],
  uk: [
    {
      key: 'necessary',
      title: 'Необхідні',
      description: 'Cookies, необхідні для коректної роботи сайту. Їх не можна вимкнути.',
      required: true,
    },
    {
      key: 'analytics',
      title: 'Аналітика',
      description: 'Cookies, які допомагають зрозуміти, як відвідувачі користуються сайтом.',
    },
    {
      key: 'marketing',
      title: 'Маркетинг',
      description: 'Cookies для реклами та вимірювання кампаній.',
    },
    {
      key: 'preferences',
      title: 'Налаштування',
      description: 'Cookies, які запам’ятовують ваші налаштування та вибір.',
    },
  ],
}

const COOKIE_LABELS: Record<string, CookieConsentLabels> = {
  en: {
    bannerTitle: 'Cookie Preferences',
    bannerDescription:
      'We use necessary cookies to run the website and optional cookies to improve analytics, preferences and marketing.',
    learnMore: 'Learn more',
    customize: 'Customize',
    rejectAll: 'Reject All',
    acceptAll: 'Accept All',
    settingsTitle: 'Cookie Settings',
    settingsDescription: 'Manage your cookie preferences below.',
    required: 'Required',
    toggleCookies: (title) => `Toggle ${title} cookies`,
    savePreferences: 'Save Preferences',
    readOur: 'Read our',
    privacyPolicy: 'Privacy Policy',
    trigger: 'Cookie Settings',
  },
  cs: {
    bannerTitle: 'Nastavení cookies',
    bannerDescription:
      'Používáme nezbytné cookies pro fungování webu a volitelné cookies pro analytiku, preference a marketing.',
    learnMore: 'Více informací',
    customize: 'Upravit',
    rejectAll: 'Odmítnout vše',
    acceptAll: 'Přijmout vše',
    settingsTitle: 'Nastavení cookies',
    settingsDescription: 'Níže můžete spravovat své preference cookies.',
    required: 'Povinné',
    toggleCookies: (title) => `Přepnout cookies ${title}`,
    savePreferences: 'Uložit nastavení',
    readOur: 'Přečtěte si naše',
    privacyPolicy: 'Zásady ochrany osobních údajů',
    trigger: 'Nastavení cookies',
  },
  ru: {
    bannerTitle: 'Настройки cookies',
    bannerDescription:
      'Мы используем необходимые cookies для работы сайта и дополнительные cookies для аналитики, предпочтений и маркетинга.',
    learnMore: 'Подробнее',
    customize: 'Настроить',
    rejectAll: 'Отклонить все',
    acceptAll: 'Принять все',
    settingsTitle: 'Настройки cookies',
    settingsDescription: 'Ниже можно изменить ваши предпочтения по cookies.',
    required: 'Обязательно',
    toggleCookies: (title) => `Переключить cookies ${title}`,
    savePreferences: 'Сохранить настройки',
    readOur: 'Прочитайте нашу',
    privacyPolicy: 'Политику конфиденциальности',
    trigger: 'Настройки cookies',
  },
  uk: {
    bannerTitle: 'Налаштування cookies',
    bannerDescription:
      'Ми використовуємо необхідні cookies для роботи сайту та додаткові cookies для аналітики, налаштувань і маркетингу.',
    learnMore: 'Докладніше',
    customize: 'Налаштувати',
    rejectAll: 'Відхилити всі',
    acceptAll: 'Прийняти всі',
    settingsTitle: 'Налаштування cookies',
    settingsDescription: 'Нижче можна змінити ваші налаштування cookies.',
    required: 'Обов’язково',
    toggleCookies: (title) => `Перемкнути cookies ${title}`,
    savePreferences: 'Зберегти налаштування',
    readOur: 'Прочитайте нашу',
    privacyPolicy: 'Політику конфіденційності',
    trigger: 'Налаштування cookies',
  },
}

function App({ Component, pageProps, router }: AppProps) {
  const locale = router.locale ?? 'en'
  const cookieCategories = COOKIE_CATEGORIES[locale] ?? COOKIE_CATEGORIES.en!
  const cookieLabels = COOKIE_LABELS[locale] ?? COOKIE_LABELS.en!

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
