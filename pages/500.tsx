import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

// Loads translations so _app (cookie banner) has an i18n instance on the error page too.
export default function ServerError() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-8 text-center">
      <h1 className="font-heading text-4xl font-bold">500</h1>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'cs', ['common'])),
  },
})
