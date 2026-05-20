import { useContext } from "react"
import { CookieConsentContext } from "@components/CookieConsent/CookieProvider"
import type { ConsentCategory, CookieConsentContextValue } from "@components/CookieConsent/types"

export const useCookieConsent = (): CookieConsentContextValue => {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider")
  }
  return context
}

export const useConsentValue = (category: ConsentCategory): boolean => {
  const { hasConsent } = useCookieConsent()
  return hasConsent(category)
}

export const useConsentGate = (category: ConsentCategory): {
  isAllowed: boolean
  isLoading: boolean
} => {
  const { state } = useCookieConsent()

  return {
    isAllowed: state.categories[category] ?? false,
    isLoading: !state.hasConsented,
  }
}
