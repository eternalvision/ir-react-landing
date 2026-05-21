import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@ui/Logo'

type Props = { onComplete?: () => void }

export const Preloader = ({ onComplete }: Props) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, 2200)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'var(--background)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } }}
          >
            <Logo size={200} animate />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

Preloader.displayName = 'Preloader'
