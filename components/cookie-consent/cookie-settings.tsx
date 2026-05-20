"use client"

import * as React from "react"
import { Check, Shield } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog"
import { Button } from "@ui/button"
import { Switch } from "@ui/switch"
import { Label } from "@ui/label"
import { Separator } from "@ui/separator"
import { useCookieConsent, defaultCategories } from "./cookie-provider"
import type { ConsentCategories, ConsentCategory } from "./types"
import { getDefaultCategories, getAllAcceptedCategories } from "./utils"
import { cn } from "@utils/cn"

export interface CookieSettingsProps {
  className?: string
}

export function CookieSettings({ className }: CookieSettingsProps) {
  const { isSettingsOpen, closeSettings, state, updateConsent, config, acceptAll, rejectAll } = useCookieConsent()
  const labels = config.labels

  const categories = config.categories ?? defaultCategories

  const [localCategories, setLocalCategories] = React.useState<ConsentCategories>(state.categories)

  // Sync local state when modal opens or when state changes
  React.useEffect(() => {
    if (isSettingsOpen) {
      setLocalCategories(state.categories)
    }
  }, [isSettingsOpen, state.categories])

  const handleToggle = (key: ConsentCategory, checked: boolean) => {
    setLocalCategories((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  const handleSave = async () => {
    await updateConsent(localCategories)
    closeSettings()
  }

  const handleAcceptAll = async () => {
    const allAccepted = getAllAcceptedCategories()
    // Update local state immediately for UI feedback
    setLocalCategories(allAccepted)
    await acceptAll()
    closeSettings()
  }

  const handleRejectAll = async () => {
    const defaultCats = getDefaultCategories()
    // Update local state immediately for UI feedback
    setLocalCategories(defaultCats)
    await rejectAll()
    closeSettings()
  }

  return (
    <Dialog open={isSettingsOpen} onOpenChange={(open) => !open && closeSettings()}>
      <DialogContent className={cn("sm:max-w-lg", className)}>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Shield className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <DialogTitle>{labels?.settingsTitle ?? "Cookie Settings"}</DialogTitle>
              <DialogDescription>
                {labels?.settingsDescription ?? "Manage your cookie preferences below."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
          {categories.map((category) => {
            const isEnabled = localCategories[category.key]
            const isRequired = category.required

            return (
              <div
                key={category.key}
                className={cn(
                  "flex items-start justify-between gap-4 rounded-lg border p-4 transition-colors",
                  isEnabled ? "border-primary/20 bg-primary/5" : "border-border",
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`cookie-${category.key}`} className="text-sm font-medium cursor-pointer">
                      {category.title}
                    </Label>
                    {isRequired && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {labels?.required ?? "Required"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                </div>
                <Switch
                  id={`cookie-${category.key}`}
                  checked={isEnabled}
                  onCheckedChange={(checked) => handleToggle(category.key, checked)}
                  disabled={isRequired}
                  aria-label={
                    labels?.toggleCookies?.(category.title) ?? `Toggle ${category.title} cookies`
                  }
                />
              </div>
            )
          })}
        </div>

        <Separator />

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" size="sm" onClick={handleRejectAll} className="w-full sm:w-auto bg-transparent">
            {labels?.rejectAll ?? "Reject All"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleAcceptAll} className="w-full sm:w-auto bg-transparent">
            {labels?.acceptAll ?? "Accept All"}
          </Button>
          <Button size="sm" onClick={handleSave} className="w-full sm:w-auto gap-2">
            <Check className="h-4 w-4" />
            {labels?.savePreferences ?? "Save Preferences"}
          </Button>
        </DialogFooter>

        {config.privacyPolicyUrl && (
          <p className="text-xs text-center text-muted-foreground">
            {labels?.readOur ?? "Read our"}{" "}
            <a
              href={config.privacyPolicyUrl}
              className="underline underline-offset-4 hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {labels?.privacyPolicy ?? "Privacy Policy"}
            </a>
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
