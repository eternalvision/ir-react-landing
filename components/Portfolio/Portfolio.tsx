import { useState, useEffect, useCallback, useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface PortfolioItem {
  title: string
  category: string
  image: string
}

export const Portfolio = () => {
  const { t } = useTranslation('common')
  const shouldReduce = useReducedMotion()
  const items = t('portfolio.items', { returnObjects: true }) as PortfolioItem[]
  const categories = t('portfolio.categories', { returnObjects: true }) as string[]

  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const categoryCounts = useMemo(
    () =>
      categories.map((category) => ({
        category,
        count: items.filter((item) => item.category === category).length,
      })),
    [categories, items]
  )

  const filtered =
    activeCategory === 'all' ? items : items.filter((item) => item.category === activeCategory)

  const closeLightbox = () => setLightboxIndex(null)

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))
  }, [filtered.length])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))
  }, [filtered.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, prev, next])

  const currentItem = lightboxIndex !== null ? (filtered[lightboxIndex] ?? null) : null

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="py-24 bg-surface">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            {t('portfolio.label')}
          </p>
          <h2 id="portfolio-heading" className="font-heading font-bold text-4xl md:text-5xl">
            {t('portfolio.title')}
          </h2>
        </div>

        <div
          className="mx-auto mb-10 flex w-full max-w-3xl flex-wrap justify-center gap-2 border border-border bg-background p-2"
          role="group"
          aria-label="Filter projects"
        >
          <button
            onClick={() => setActiveCategory('all')}
            aria-pressed={activeCategory === 'all'}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-accent text-white'
                : 'text-foreground/70 hover:bg-surface hover:text-accent'
            }`}
          >
            <span>{t('portfolio.filter_all')}</span>
            <span className={activeCategory === 'all' ? 'text-white/80' : 'text-foreground/40'}>
              {items.length}
            </span>
          </button>
          {categoryCounts.map(({ category, count }) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-accent text-white'
                  : 'text-foreground/70 hover:bg-surface hover:text-accent'
              }`}
            >
              <span>{category}</span>
              <span className={activeCategory === category ? 'text-white/80' : 'text-foreground/40'}>
                {count}
              </span>
            </button>
          ))}
        </div>

        <motion.ul layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.li
                key={item.title}
                layout
                initial={shouldReduce ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="group relative block w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label={`View ${item.title}`}
                >
                  <figure className="m-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <figcaption className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-left">
                        <p className="text-white font-heading font-semibold">{item.title}</p>
                        <p className="text-white/70 text-xs">{item.category}</p>
                      </div>
                    </figcaption>
                  </figure>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            role="dialog"
            aria-modal
            aria-label={currentItem.title}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>
            <button
              onClick={prev}
              className="absolute left-4 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={next}
              className="absolute right-16 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <motion.figure
              key={lightboxIndex}
              initial={shouldReduce ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="m-0 max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            >
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain"
                priority
              />
              <figcaption className="mt-4 text-white/80 text-sm text-center">
                {currentItem.title}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

Portfolio.displayName = 'Portfolio'
