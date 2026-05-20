import { Cookie } from "lucide-react"
import { Button } from "@ui/button"
import { useCookieConsent } from "./CookieProvider"
import { cn } from "@utils/cn"

export interface CookieTriggerProps {
  className?: string
  variant?: "icon" | "text" | "full"
}

export const CookieTrigger = ({ className, variant = "text" }: CookieTriggerProps) => {
  const { openSettings, state, config } = useCookieConsent()
  const label = config.labels?.trigger ?? "Cookie Settings"

  if (!state.hasConsented) {
    return null
  }

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={openSettings}
        className={cn("h-8 w-8", className)}
        aria-label={label}
      >
        <Cookie className="h-4 w-4" />
      </Button>
    )
  }

  if (variant === "full") {
    return (
      <Button variant="outline" size="sm" onClick={openSettings} className={cn("gap-2", className)}>
        <Cookie className="h-4 w-4" />
        {label}
      </Button>
    )
  }

  return (
    <button
      onClick={openSettings}
      className={cn(
        "text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors",
        className,
      )}
    >
      {label}
    </button>
  )
}

CookieTrigger.displayName = "CookieTrigger"
