import { cn } from "@utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useCookieConsent } from "./CookieProvider";

export interface CookieBannerBackdropProps {
  className?: string;
  closeOnClick?: boolean;
  blur?: string;
  opacity?: number;
}

export const CookieBannerBackdrop = ({
  className,
  closeOnClick = false,
  blur = "4px",
  opacity = 0.5,
}: CookieBannerBackdropProps) => {
  const { isBannerVisible, rejectAll } = useCookieConsent();

  const handleClick = () => {
    if (closeOnClick) {
      rejectAll();
    }
  };

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={handleClick}
          className={cn(
            "fixed inset-0 z-40 bg-black/50",
            closeOnClick && "cursor-pointer",
            className
          )}
          style={{
            backgroundColor: `rgba(0, 0, 0, ${opacity})`,
            backdropFilter: `blur(${blur})`,
            WebkitBackdropFilter: `blur(${blur})`,
          }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
};

CookieBannerBackdrop.displayName = "CookieBannerBackdrop";
