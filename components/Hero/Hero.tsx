import { useTranslation } from 'next-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Clock, ShieldCheck, Wrench } from 'lucide-react';
import { Button } from '@ui/button'

interface HeroHighlight {
  label: string
  value: string
}

const FEATURE_ICONS = [ShieldCheck, Clock, Wrench]

export const Hero = () => {
  const { t } = useTranslation('common');
  const shouldReduce = useReducedMotion();
  const highlights = t('hero.highlights', { returnObjects: true }) as HeroHighlight[]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeUp = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: 'easeOut' as const },
        };

  return (
    <section
      id="hero"
      aria-label={t('hero.title')}
      className="relative min-h-[calc(100svh-1px)] overflow-hidden bg-background"
    >
      <div className="absolute inset-x-0 top-0 h-20 border-b border-border bg-surface/70" aria-hidden />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-surface" aria-hidden />

      <div className="relative container mx-auto grid min-h-screen min-w-0 grid-cols-1 items-center gap-12 pt-28 pb-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:pt-24">
        <div className="min-w-0">
          <motion.div
            {...fadeUp(0)}
            className="mb-6 flex w-fit max-w-full items-start gap-2 border border-border bg-surface px-3 py-2 text-xs font-semibold uppercase text-foreground/70"
          >
            <span className="mt-1 h-2 w-2 shrink-0 bg-accent" aria-hidden />
            <span className="min-w-0 break-words">{t('hero.eyebrow')}</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="max-w-4xl break-words font-heading text-4xl font-bold leading-[0.98] text-foreground sm:text-6xl lg:text-7xl"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-2xl text-base leading-8 text-foreground/70 sm:text-lg"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              size="lg"
              onClick={() => scrollTo('contact')}
              className="h-12 w-full cursor-pointer gap-2 bg-accent px-6 text-base font-semibold text-white hover:bg-accent/90 sm:w-auto"
            >
              {t('hero.cta_contact')}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo('portfolio')}
              className="h-12 w-full cursor-pointer border-accent bg-surface px-6 text-base font-semibold text-accent hover:bg-accent hover:text-white sm:w-auto"
            >
              {t('hero.cta_portfolio')}
            </Button>
          </motion.div>

          <motion.ul
            {...fadeUp(0.32)}
            className="mt-10 grid max-w-3xl grid-cols-1 gap-3 p-0 sm:grid-cols-3"
          >
            {highlights.map((item, index) => {
              const Icon = FEATURE_ICONS[index] ?? ShieldCheck
              return (
                <li key={item.label} className="list-none border border-border bg-surface p-4">
                  <Icon className="mb-3 h-5 w-5 text-accent" aria-hidden />
                  <div className="font-heading text-2xl font-bold leading-none text-foreground">
                    {item.value}
                  </div>
                  <div className="mt-2 text-sm leading-5 text-foreground/60">
                    {item.label}
                  </div>
                </li>
              )
            })}
          </motion.ul>
        </div>

        <motion.div
          {...fadeUp(0.18)}
          className="relative hidden min-h-[520px] min-w-0 lg:block lg:min-h-[640px]"
          aria-hidden
        >
          <div className="absolute right-0 top-0 h-[72%] w-[78%] overflow-hidden border border-border bg-surface shadow-2xl shadow-slate-950/10">
            <Image
              src="/portfolio/metall-pipes.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 92vw"
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-8 left-0 h-[45%] w-[54%] overflow-hidden border border-border bg-surface shadow-xl shadow-slate-950/10">
            <Image
              src="/portfolio/pump.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 28vw, 60vw"
              className="object-cover"
            />
          </div>


          <div className="absolute left-[12%] top-12 border border-border bg-surface p-4 shadow-lg shadow-slate-950/10">
            <div className="flex items-center gap-3">
              <Wrench className="h-5 w-5 text-accent" />
              <span className="text-sm font-semibold text-foreground">{t('services.items.0.title')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';
