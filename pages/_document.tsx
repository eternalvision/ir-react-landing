import { Html, Head, Main, NextScript } from 'next/document'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Company Name',
      url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com',
      telephone: process.env.NEXT_PUBLIC_PHONE ?? '',
      email: process.env.NEXT_PUBLIC_EMAIL ?? '',
    },
    {
      '@type': 'LocalBusiness',
      name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Company Name',
      telephone: process.env.NEXT_PUBLIC_PHONE ?? '',
      email: process.env.NEXT_PUBLIC_EMAIL ?? '',
      url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: process.env.NEXT_PUBLIC_ADDRESS ?? '',
      },
    },
  ],
}

export default function Document() {
  return (
    <Html suppressHydrationWarning lang="en">
      <Head>
        <script src="/config.js" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GOOGLE_TAG && (
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
        <Main />
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
        <NextScript />
      </body>
    </Html>
  )
}
