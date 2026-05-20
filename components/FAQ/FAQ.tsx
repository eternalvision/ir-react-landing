import { useTranslation } from 'next-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ui/accordion'

interface FaqItem {
  question: string
  answer: string
}

export const FAQ = () => {
  const { t } = useTranslation('common')
  const shouldReduce = useReducedMotion()
  const items = t('faq.items', { returnObjects: true }) as FaqItem[]

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 bg-surface">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          className="text-center mb-14"
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            {t('faq.label')}
          </p>
          <h2 id="faq-heading" className="font-heading font-bold text-4xl md:text-5xl">
            {t('faq.title')}
          </h2>
        </motion.div>

        <dl>
          <Accordion className="space-y-3">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={shouldReduce ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border border-border bg-background px-6 data-open:border-accent rounded-none"
                >
                  <dt>
                    <AccordionTrigger className="font-heading font-semibold text-left hover:no-underline py-5">
                      {item.question}
                    </AccordionTrigger>
                  </dt>
                  <AccordionContent>
                    <dd className="text-foreground/70 leading-relaxed pb-4 m-0">
                      {item.answer}
                    </dd>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </dl>
      </div>
    </section>
  )
}

FAQ.displayName = 'FAQ'
