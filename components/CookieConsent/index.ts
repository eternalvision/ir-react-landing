export { ConsentScript } from "./ConsentScript";
export { CookieBanner } from "./CookieBanner";
export { CookieBannerBackdrop } from "./CookieBannerBackdrop";
export {
  CookieConsentProvider,
  defaultCategories,
  useCookieConsent,
} from "./CookieProvider";
export { CookieSettings } from "./CookieSettings";
export { CookieTrigger } from "./CookieTrigger";
export { GoogleConsentMode } from "./GoogleConsentMode";
export { useConsentScript } from "@hooks/useConsentScript";
export { useConsentGate, useConsentValue } from "@hooks/useCookieConsent";

export type {
  BannerPosition,
  CategoryConfig,
  ConsentAction,
  ConsentCategories,
  ConsentCategory,
  ConsentChangeEvent,
  ConsentRecord,
  ConsentScope,
  ConsentScopeConfig,
  ConsentState,
  CookieConsentConfig,
  CookieConsentContextValue,
  CookieConsentLabels,
  GoogleConsentModeConfig,
  ScriptConfig,
  TraceabilityConfig,
} from "./types";

export {
  getLoadedScripts,
  hasGoogleScripts,
  loadScript,
  registerCleanup,
  registerScript,
  scriptCleanupHelpers,
  unloadScript,
  unregisterScript,
} from "@lib/scriptManager";
export { retryFailedRecords, trackConsent } from "@lib/tracker";
export { generateUUID, getVisitorId, isGoogleScript } from "@utils/consentUtils";
