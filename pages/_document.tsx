import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'
import { getConfig } from '@lib/config'

const cfg = getConfig()
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: cfg.companyName,
      url: siteUrl,
      telephone: cfg.phone,
      email: cfg.email,
    },
    {
      '@type': 'LocalBusiness',
      name: cfg.companyName,
      telephone: cfg.phone,
      email: cfg.email,
      url: siteUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: cfg.address,
      },
    },
  ],
}

export default class MyDocument extends Document<{ locale?: string }> {
  static override async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, locale: ctx.locale }
  }

  override render() {
    const locale = this.props.locale ?? 'cs'

    return (
      <Html suppressHydrationWarning lang={locale}>
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#001336" />
          <meta name="msapplication-TileColor" content="#001336" />
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="/config.js" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {cfg.gaId && (
            // eslint-disable-next-line @next/next/next-script-for-ga
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${cfg.gaId}`} />
          )}
          {cfg.gaId && (
            // eslint-disable-next-line @next/next/next-script-for-ga
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${cfg.gaId}');`,
              }}
            />
          )}
          {process.env.NEXT_PUBLIC_GOOGLE_TAG && (
            // eslint-disable-next-line @next/next/next-script-for-ga
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG}');`,
              }}
            />
          )}
        </Head>
        <body>
          {process.env.NEXT_PUBLIC_GOOGLE_TAG && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
