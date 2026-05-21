import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Star } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/dialog'
import { Button } from '@ui/button'

interface ReviewModalProps {
  open: boolean
  onClose: () => void
}

export const ReviewModal = ({ open, onClose }: ReviewModalProps) => {
  const { t } = useTranslation('common')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setRating(0)
      setHover(0)
      setName('')
      setMessage('')
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('testimonials.review_modal.title')}</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-5 w-5 text-accent fill-accent" aria-hidden />
              ))}
            </div>
            <p className="font-heading font-semibold text-lg">
              {t('testimonials.review_modal.success_title')}
            </p>
            <p className="text-sm text-foreground/60">
              {t('testimonials.review_modal.success_text')}
            </p>
            <Button onClick={handleClose} className="mt-2">OK</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-1">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">
                {t('testimonials.review_modal.name_label')}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('testimonials.review_modal.name_placeholder')}
                className="border border-border bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                {t('testimonials.review_modal.rating_label')}
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`${star} star${star !== 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`h-7 w-7 transition-colors ${
                        star <= (hover || rating) ? 'text-accent fill-accent' : 'text-border'
                      }`}
                      aria-hidden
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">
                {t('testimonials.review_modal.message_label')}
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('testimonials.review_modal.message_placeholder')}
                rows={4}
                className="border border-border bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-none"
              />
            </div>

            <Button type="submit" disabled={rating === 0} className="w-full">
              {t('testimonials.review_modal.submit')}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

ReviewModal.displayName = 'ReviewModal'
