/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  alternateRefs: [
    { href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/en`, hreflang: 'en' },
    { href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/ru`, hreflang: 'ru' },
    { href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/cs`, hreflang: 'cs' },
    { href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/uk`, hreflang: 'uk' },
  ],
}
