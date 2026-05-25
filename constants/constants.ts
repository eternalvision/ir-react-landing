export const DEFAULT_LOCALE = 'cs';
export const LOCALES = ['cs', 'en', 'ru', 'uk'] as const;
export type Locale = (typeof LOCALES)[number];
