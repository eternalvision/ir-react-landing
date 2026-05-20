declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_COMPANY_NAME?: string
    readonly NEXT_PUBLIC_PHONE?: string
    readonly NEXT_PUBLIC_EMAIL?: string
    readonly NEXT_PUBLIC_ADDRESS?: string
    readonly NEXT_PUBLIC_GOOGLE_TAG?: string
    readonly NEXT_PUBLIC_SITE_URL?: string
    readonly RESEND_API_KEY?: string
    readonly RESEND_TO?: string
  }
}
