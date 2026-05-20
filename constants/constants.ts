export const DEFAULT_LOCALE = 'en';
export const LOCALES = ['en', 'ru', 'cs', 'uk'] as const;
export type Locale = (typeof LOCALES)[number];
