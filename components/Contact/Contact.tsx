import { useTranslation } from 'next-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@ui/button'
import { useConfig } from '@lib/config'
import { MapPin, Phone, Mail } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

type FormData = z.infer<typeof schema>

export const Contact = () => {
  const { t } = useTranslation('common')
  const shouldReduce = useReducedMotion()
  const config = useConfig()
  const phoneHref = config.phone.replace(/[^\d+]/g, '')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      toast.success(t('contact.form.success'))
      reset()
    } catch {
      toast.error(t('contact.form.error'))
    }
  }

  const inputClass =
    'w-full bg-surface border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-foreground/40'
  const errorClass = 'text-red-500 text-xs mt-1'

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 bg-background">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            {t('contact.label')}
          </p>
          <h2 id="contact-heading" className="font-heading font-bold text-4xl md:text-5xl mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                    {t('contact.form.name')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder={t('contact.form.name_placeholder')}
                    className={inputClass}
                    {...register('name')}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className={errorClass} role="alert">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                    {t('contact.form.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t('contact.form.email_placeholder')}
                    className={inputClass}
                    {...register('email')}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className={errorClass} role="alert">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                    {t('contact.form.phone')}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder={t('contact.form.phone_placeholder')}
                    className={inputClass}
                    {...register('phone')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder={t('contact.form.message_placeholder')}
                    className={inputClass}
                    {...register('message')}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className={errorClass} role="alert">{errors.message.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold h-12 cursor-pointer"
                >
                  {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.aside
            initial={shouldReduce ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            aria-label="Location information"
          >
            {config.addressIframe && (
              <iframe
                src={config.addressIframe}
                title="Company location map"
                className="w-full h-64 border-0 mb-6"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}

            <address className="not-italic space-y-4">
              {config.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" aria-hidden />
                  <a
                    href={config.addressUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/70 hover:text-accent transition-colors"
                  >
                    {config.address}
                  </a>
                </div>
              )}
              {config.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent shrink-0" aria-hidden />
                  <a href={`tel:${phoneHref}`} className="text-sm text-foreground/70 hover:text-accent transition-colors">
                    {config.phone}
                  </a>
                </div>
              )}
              {config.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent shrink-0" aria-hidden />
                  <a href={`mailto:${config.email}`} className="text-sm text-foreground/70 hover:text-accent transition-colors">
                    {config.email}
                  </a>
                </div>
              )}
            </address>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

Contact.displayName = 'Contact'
