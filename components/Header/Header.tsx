import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next/pages';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Sun, Moon, Globe } from 'lucide-react';
import { Button } from '@ui/button'
import { Logo } from '@ui/Logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu'
import { useConfig } from '@lib/config';

const LOCALES = [
  { code: 'cs', label: 'CS', flag: '🇨🇿' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'uk', label: 'UK', flag: '🇺🇦' },
];

const NAV_KEYS = ['about', 'services', 'portfolio', 'testimonials', 'faq', 'contact'] as const;

const StickyCallButton = ({ href, label }: { href: string; label: string }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry?.isIntersecting),
      { threshold: 0.02, rootMargin: '-72px 0px 120px 0px' }
    )

    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      href={href}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed inset-x-4 bottom-4 z-50 flex h-14 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-base font-bold text-white shadow-lg shadow-slate-950/20 transition-all duration-300 ease-out hover:bg-accent/90 md:hidden ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Phone className="h-5 w-5" aria-hidden />
      {label}
    </a>
  )
}

export const Header = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const config = useConfig();
  const phoneHref = config.phone.replace(/[^\d+]/g, '')

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const switchLocale = (locale: string) => {
    void router.push(router.pathname, router.asPath, { locale, scroll: false })
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label={`${config.companyName} — home`}
          >
            <Logo size={55} className="shrink-0" />
            <span className="font-heading font-bold text-lg hidden sm:block">
              {config.companyName}
            </span>
          </button>

          <nav aria-label="Main navigation">
            <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <button
                    onClick={() => scrollTo(key)}
                    className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  >
                    {t(`nav.${key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            {config.phone && (
              <a
                href={`tel:${phoneHref}`}
                className="hidden h-9 items-center gap-2 rounded-lg bg-accent px-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90 xl:inline-flex"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {config.phone}
              </a>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1.5 font-medium text-sm px-3 py-1.5 rounded-md hover:bg-accent/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <Globe className="h-4 w-4" aria-hidden />
                {LOCALES.find((l) => l.code === router.locale)?.label ?? 'EN'}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LOCALES.map((locale) => (
                  <DropdownMenuItem
                    key={locale.code}
                    onClick={() => switchLocale(locale.code)}
                    className={router.locale === locale.code ? 'text-accent font-semibold' : ''}
                  >
                    <span aria-hidden>{locale.flag}</span>
                    <span className="ml-2">{locale.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Sun className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Moon className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            )}
          </div>
        </div>
      </header>
      {config.phone && (
        <StickyCallButton href={`tel:${phoneHref}`} label={t('hero.cta_call')} />
      )}
    </>
  );
};

Header.displayName = 'Header';
