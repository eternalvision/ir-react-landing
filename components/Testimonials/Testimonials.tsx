import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface TestimonialItem {
  name: string
  company: string
  rating: number
  text: string
}

export const Testimonials = () => {
  const { t } = useTranslation('common')
  const shouldReduce = useReducedMotion()
  const items = t('testimonials.items', { returnObjects: true }) as TestimonialItem[]

  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }),
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 3, breakpoints: { '(max-width: 768px)': { slidesToScroll: 1 } } },
    [autoplay.current],
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [snapCount, setSnapCount] = useState(0)
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setSnapCount(emblaApi.scrollSnapList().length)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', () => setSnapCount(emblaApi.scrollSnapList().length))
    onSelect()
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-24 bg-background">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            {t('testimonials.label')}
          </p>
          <h2 id="testimonials-heading" className="font-heading font-bold text-4xl md:text-5xl">
            {t('testimonials.title')}
          </h2>
        </motion.div>

        <div className="relative">
          <button
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-10 w-10 flex items-center justify-center border border-border bg-background text-foreground hover:border-accent hover:text-accent transition-colors hidden md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {items.map((item, i) => (
                <article
                  key={i}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3"
                  aria-label={`Testimonial by ${item.name}`}
                >
                  <div className="bg-surface border border-border p-8 h-full flex flex-col">
                    <div className="flex mb-4" aria-label={`Rating: ${item.rating} out of 5`}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`h-4 w-4 ${j < item.rating ? 'text-accent fill-accent' : 'text-border'}`}
                          aria-hidden
                        />
                      ))}
                    </div>
                    <blockquote className="flex-1 text-foreground/70 leading-relaxed italic mb-6">
                      &ldquo;{item.text}&rdquo;
                    </blockquote>
                    <footer>
                      <p className="font-heading font-semibold">{item.name}</p>
                      <p className="text-sm text-foreground/50">{item.company}</p>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            onClick={scrollNext}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-10 w-10 flex items-center justify-center border border-border bg-background text-foreground hover:border-accent hover:text-accent transition-colors hidden md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="h-8 w-8 flex items-center justify-center border border-border text-foreground hover:border-accent hover:text-accent transition-colors md:hidden"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Carousel navigation">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                role="tab"
                aria-selected={i === selectedIndex}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex ? 'bg-accent w-6' : 'bg-border w-2'
                }`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            aria-label="Next slide"
            className="h-8 w-8 flex items-center justify-center border border-border text-foreground hover:border-accent hover:text-accent transition-colors md:hidden"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

Testimonials.displayName = 'Testimonials'
