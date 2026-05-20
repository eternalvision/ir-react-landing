import { useTranslation } from 'next-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@ui/button'

export const Hero = () => {
  const { t } = useTranslation('common');
  const shouldReduce = useReducedMotion();

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07] text-accent"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div
          className="absolute top-24 right-[10%] w-72 h-72 bg-accent/10 rotate-45"
          aria-hidden
        />
        <div
          className="absolute bottom-24 left-[8%] w-48 h-48 bg-accent/5 rotate-12"
          aria-hidden
        />
      </div>

      <div className="relative container mx-auto text-center pt-16">
        <motion.h1
          {...fadeUp(0)}
          className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-lg md:text-2xl text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          {...fadeUp(0.4)}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={() => scrollTo('contact')}
            className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 h-12 text-base cursor-pointer"
          >
            {t('hero.cta_contact')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo('portfolio')}
            className="border-accent text-accent hover:bg-accent hover:text-white font-semibold px-8 h-12 text-base cursor-pointer"
          >
            {t('hero.cta_portfolio')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';
