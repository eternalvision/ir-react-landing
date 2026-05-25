/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

const alternateRefs = [
  { href: siteUrl,         hreflang: 'cs',        hrefIsAbsolute: true },
  { href: `${siteUrl}/en`, hreflang: 'en',        hrefIsAbsolute: true },
  { href: `${siteUrl}/ru`, hreflang: 'ru',        hrefIsAbsolute: true },
  { href: `${siteUrl}/uk`, hreflang: 'uk',        hrefIsAbsolute: true },
  { href: siteUrl,         hreflang: 'x-default', hrefIsAbsolute: true },
]

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  transform: async (_config, path) => ({ loc: path, alternateRefs }),
}
