/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.instarum.cz'

const DEFAULT_LOCALE = 'cs'
const LOCALES = ['cs', 'en', 'ru', 'uk']

const localizedUrl = (locale, basePath) =>
  `${siteUrl}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${basePath}`

// '/en/sluzby/x' -> '/sluzby/x', '/en' -> '', '/' -> ''
const stripLocale = (path) => {
  const match = path.match(/^\/(en|ru|uk)(\/.*)?$/)
  const basePath = match ? (match[2] ?? '') : path
  return basePath === '/' ? '' : basePath
}

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/404', '/*/404', '/500', '/*/500', '/api/*'],
  transform: async (_config, path) => {
    const basePath = stripLocale(path)

    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: basePath === '' ? 'weekly' : 'monthly',
      priority: basePath === '' ? 1.0 : 0.8,
      alternateRefs: [
        ...LOCALES.map((locale) => ({
          href: localizedUrl(locale, basePath),
          hreflang: locale,
          hrefIsAbsolute: true,
        })),
        { href: localizedUrl(DEFAULT_LOCALE, basePath), hreflang: 'x-default', hrefIsAbsolute: true },
      ],
    }
  },
}
