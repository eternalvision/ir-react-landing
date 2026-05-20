import { useEffect } from "react"

export interface GoogleConsentModeDefaults {
  analytics_storage?: "granted" | "denied"
  ad_storage?: "granted" | "denied"
  ad_user_data?: "granted" | "denied"
  ad_personalization?: "granted" | "denied"
  functionality_storage?: "granted" | "denied"
  personalization_storage?: "granted" | "denied"
  security_storage?: "granted" | "denied"
}

export interface GoogleConsentModeProps {
  defaults?: GoogleConsentModeDefaults
  waitForUpdate?: number
  regions?: string[]
}

export const GoogleConsentMode = ({
  defaults = {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  },
  waitForUpdate = 500,
  regions,
}: GoogleConsentModeProps) => {
  useEffect(() => {
    if (typeof window === "undefined") return

    window.dataLayer = window.dataLayer || []

    if (!window.gtag) {
      window.gtag = function gtag(...args: unknown[]) {
        if (window.dataLayer) {
          window.dataLayer.push(args)
        }
      }
    }

    if (window.gtag) {
      window.gtag("consent", "default", {
        ...defaults,
        wait_for_update: waitForUpdate,
        ...(regions?.length ? { region: regions } : {}),
      })
    }
  }, [defaults, waitForUpdate, regions])

  return null
}

GoogleConsentMode.displayName = "GoogleConsentMode"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}
