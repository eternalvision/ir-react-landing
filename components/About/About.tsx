import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next/pages'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

interface Stat {
  value: number
  suffix: string
  label: string
}

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) {
      setCount(value)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        let start = 0
        const step = value / 60
        const timer = setInterval(() => {
          start += step
          if (start >= value) {
            setCount(value)
            clearInterval(timer)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, shouldReduce])

  return <span ref={ref}>{count}{suffix}</span>
}

Counter.displayName = 'Counter'

export const About = () => {
  const { t } = useTranslation('common')
  const shouldReduce = useReducedMotion()
  const stats = t('about.stats', { returnObjects: true }) as Stat[]

  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 bg-surface">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              {t('about.label')}
            </p>
            <h2 id="about-heading" className="font-heading font-bold text-4xl md:text-5xl mb-6 leading-tight">
              {t('about.title')}
            </h2>
            <p className="text-foreground/70 text-lg leading-relaxed mb-10">
              {t('about.text')}
            </p>
            <dl className="grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={shouldReduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <dt className="text-3xl font-heading font-bold text-accent">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dt>
                  <dd className="text-sm text-foreground/60 mt-1">{stat.label}</dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          <motion.figure
            className="relative m-0"
            initial={shouldReduce ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <div
              className="relative overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}
            >
              <Image
                src="/portfolio/bier.jpg"
                alt={t('about.title')}
                width={600}
                height={500}
                className="aspect-[6/5] h-auto w-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 -z-10"
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
              aria-hidden
            />
            <figcaption className="sr-only">{t('about.title')}</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  )
}

About.displayName = 'About'
