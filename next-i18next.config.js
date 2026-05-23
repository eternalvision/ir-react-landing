/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en', 'ru', 'uk'],
    localeDetection: false,
  },
  defaultNS: 'common',
  localePath: './public/locales',
}
