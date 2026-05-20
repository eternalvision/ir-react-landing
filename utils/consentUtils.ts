import type { ConsentCategories, ConsentState } from "@components/CookieConsent/types"

const STORAGE_KEY = "cookie-consent"
const VISITOR_ID_KEY = "cookie-consent-visitor-id"

export const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const getVisitorId = (): string => {
  if (typeof window === "undefined") {
    return generateUUID()
  }

  let visitorId = localStorage.getItem(VISITOR_ID_KEY)
  if (!visitorId) {
    visitorId = generateUUID()
    localStorage.setItem(VISITOR_ID_KEY, visitorId)
  }
  return visitorId
}

export const getDefaultCategories = (): ConsentCategories => {
  return {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  }
}

export const getAllAcceptedCategories = (): ConsentCategories => {
  return {
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
  }
}

export const saveConsentState = (state: ConsentState): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const loadConsentState = (): ConsentState | null => {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored) as ConsentState
  } catch {
    return null
  }
}

export const clearConsentState = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}

export const calculateExpirationDate = (days: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

export const isConsentExpired = (expiresAt: string): boolean => {
  return new Date(expiresAt) < new Date()
}

export const isGoogleScript = (script: { src?: string; content?: string }): boolean => {
  if (script.src) {
    const srcLower = script.src.toLowerCase()
    const googleDomains = [
      "googletagmanager.com",
      "google-analytics.com",
      "googleadservices.com",
      "google.com/analytics",
      "google.com/ads",
      "doubleclick.net",
      "googleapis.com/gtag",
    ]

    const isGoogleDomain = googleDomains.some((domain) => {
      const domainLower = domain.toLowerCase()
      if (domainLower.includes("/")) {
        return srcLower.includes(domainLower)
      } else {
        const domainPattern = new RegExp(
          `(^|//|\\.)${domainLower.replace(/\./g, "\\.")}(/|:|$|\\?)`,
          "i"
        )
        return domainPattern.test(srcLower)
      }
    })

    if (isGoogleDomain) {
      return true
    }
  }

  if (script.content) {
    const contentLower = script.content.toLowerCase()
    const googlePatterns = [
      "googletagmanager.com",
      "google-analytics.com",
      "gtag(",
      "datalayer",
      "ga(",
      "google-analytics",
    ]
    return googlePatterns.some((pattern) => contentLower.includes(pattern.toLowerCase()))
  }

  return false
}
