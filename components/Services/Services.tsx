import { useTranslation } from 'next-i18next/pages'
import { motion, useReducedMotion } from 'framer-motion'
import { Card, CardContent } from '@ui/card'
import {
  Droplets,
  Factory,
  Flame,
  Hammer,
  Settings,
  ShieldAlert,
  ThermometerSun,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  Droplets,
  Factory,
  Flame,
  Hammer,
  Settings,
  ShieldAlert,
  ThermometerSun,
  Wrench,
  Zap,
}

interface ServiceItem {
  icon: string
  title: string
  description: string
}

export const Services = () => {
  const { t } = useTranslation('common')
  const shouldReduce = useReducedMotion()
  const items = t('services.items', { returnObjects: true }) as ServiceItem[]

  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            {t('services.label')}
          </p>
          <h2 id="services-heading" className="font-heading font-bold text-4xl md:text-5xl">
            {t('services.title')}
          </h2>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Wrench
            return (
              <motion.li
                key={i}
                initial={shouldReduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card className="group h-full border border-border bg-surface hover:border-accent transition-all duration-300 hover:-translate-y-1 rounded-none">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                      <Icon className="h-6 w-6 text-accent" aria-hidden />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-3">{item.title}</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

Services.displayName = 'Services'
