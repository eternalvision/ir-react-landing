# Restructure construction-site to match lvu-react-landing

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align folder structure, imports, exports, and TypeScript config of `construction-site` with `lvu-react-landing`, without touching tailwind.

**Architecture:** Every section component moves from `components/layout/` or `components/sections/` into `components/Name/Name.tsx` with a named export + `.displayName`. All shadcn primitives move from `components/ui/` to `ui/`. The single `@/*` tsconfig alias is removed; all files use explicit aliases (`@components/*`, `@ui/*`, etc.). TypeScript is set to lvu's strict mode.

**Tech Stack:** Next.js 15, TypeScript, next-i18next, next-themes, framer-motion, shadcn/base-ui, embla-carousel, Zod

---

## File Map

| Old path | New path | Change |
|---|---|---|
| `components/ui/accordion.tsx` | `ui/accordion.tsx` | cn import |
| `components/ui/badge.tsx` | `ui/badge.tsx` | cn import |
| `components/ui/button.tsx` | `ui/button.tsx` | cn import |
| `components/ui/card.tsx` | `ui/card.tsx` | cn import |
| `components/ui/carousel.tsx` | `ui/carousel.tsx` | cn + button import |
| `components/ui/dropdown-menu.tsx` | `ui/dropdown-menu.tsx` | cn import |
| `components/ui/sonner.tsx` | `ui/sonner.tsx` | no change |
| `ui/Logo.tsx` | `ui/Logo.tsx` | stays, already correct |
| `components/layout/Header.tsx` | `components/Header/Header.tsx` | named export, imports |
| `components/layout/Footer.tsx` | `components/Footer/Footer.tsx` | named export, imports |
| `components/sections/Hero.tsx` | `components/Hero/Hero.tsx` | named export, imports |
| `components/sections/About.tsx` | `components/About/About.tsx` | named export |
| `components/sections/Services.tsx` | `components/Services/Services.tsx` | named export, imports |
| `components/sections/Portfolio.tsx` | `components/Portfolio/Portfolio.tsx` | named export, strict TS fix |
| `components/sections/Testimonials.tsx` | `components/Testimonials/Testimonials.tsx` | named export |
| `components/sections/FAQ.tsx` | `components/FAQ/FAQ.tsx` | named export, imports |
| `components/sections/Contact.tsx` | `components/Contact/Contact.tsx` | named export, imports |
| `tsconfig.json` | `tsconfig.json` | strict mode + aliases |
| `components.json` | `components.json` | ui path |
| `pages/index.tsx` | `pages/index.tsx` | imports |
| `pages/_app.tsx` | `pages/_app.tsx` | css import |
| `pages/api/contact.ts` | `pages/api/contact.ts` | resend import |
| `lib/utils.ts` | deleted | duplicate of utils/cn.ts |
| `components/layout/` | deleted | moved |
| `components/sections/` | deleted | moved |
| `components/ui/` | deleted | moved |
| old `components/{Header,Footer,About,...}/` | deleted | previous partial migration artifacts |

---

## Task 1: Move shadcn UI components to `ui/`

**Files:**
- Create: `ui/accordion.tsx`
- Create: `ui/badge.tsx`
- Create: `ui/button.tsx`
- Create: `ui/card.tsx`
- Create: `ui/carousel.tsx`
- Create: `ui/dropdown-menu.tsx`
- Create: `ui/sonner.tsx`

The only changes are: replace `from "@/lib/utils"` with `from '@utils/cn'` in all files.
In `carousel.tsx` also replace `from "@/components/ui/button"` with `from '@ui/button'`.

- [ ] **Write `ui/accordion.tsx`**

```tsx
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from '@utils/cn'
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

- [ ] **Write `ui/badge.tsx`**

```tsx
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from '@utils/cn'

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
```

- [ ] **Write `ui/button.tsx`**

```tsx
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from '@utils/cn'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

- [ ] **Write `ui/card.tsx`**

```tsx
import * as React from "react"

import { cn } from '@utils/cn'

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
```

- [ ] **Write `ui/carousel.tsx`** (two import changes: cn + button)

```tsx
import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"

import { cn } from '@utils/cn'
import { Button } from '@ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => { api?.scrollPrev() }, [api])
  const scrollNext = React.useCallback(() => { api?.scrollNext() }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); scrollPrev() }
      else if (event.key === "ArrowRight") { event.preventDefault(); scrollNext() }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)
    return () => { api?.off("select", onSelect) }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()
  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()
  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()
  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRightIcon />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
}
```

- [ ] **Write `ui/dropdown-menu.tsx`**

```tsx
"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from '@utils/cn'
import { ChevronRightIcon, CheckIcon } from "lucide-react"

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", className)}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & { inset?: boolean; variant?: "default" | "destructive" }) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex items-center justify-center" data-slot="dropdown-menu-checkbox-item-indicator">
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex items-center justify-center" data-slot="dropdown-menu-radio-item-indicator">
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground", className)}
      {...props}
    />
  )
}

export {
  DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
}
```

- [ ] **Write `ui/sonner.tsx`** (no import changes needed)

```tsx
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)",
      } as React.CSSProperties}
      toastOptions={{ classNames: { toast: "cn-toast" } }}
      {...props}
    />
  )
}

export { Toaster }
```

- [ ] **Commit**

```bash
git add ui/accordion.tsx ui/badge.tsx ui/button.tsx ui/card.tsx ui/carousel.tsx ui/dropdown-menu.tsx ui/sonner.tsx
git commit -m "refactor: move shadcn ui components to ui/, update cn import path"
```

---

## Task 2: Convert Header component

**Files:**
- Modify: `components/Header/Header.tsx` (canonical source: `components/layout/Header.tsx`)

Changes from `components/layout/Header.tsx`:
- `@/components/ui/button` → `@ui/button`
- `@/components/ui/dropdown-menu` → `@ui/dropdown-menu`
- `@/lib/config` → `@lib/config`
- `export default function Header()` → `export const Header = () =>`
- Add `Header.displayName = 'Header'`

- [ ] **Write `components/Header/Header.tsx`**

```tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Globe } from 'lucide-react'
import { Button } from '@ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu'
import { getConfig } from '@lib/config'

const LOCALES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'cs', label: 'CS', flag: '🇨🇿' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'uk', label: 'UK', flag: '🇺🇦' },
]

const NAV_KEYS = ['about', 'services', 'portfolio', 'testimonials', 'faq', 'contact'] as const

export const Header = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const config = getConfig()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const switchLocale = (locale: string) => {
    void router.push(router.pathname, router.asPath, { locale, scroll: false })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          aria-label={`${config.companyName} — home`}
        >
          <Image
            src={config.logoUrl}
            alt={config.companyName}
            width={36}
            height={36}
            className="h-9 w-auto"
            priority
          />
          <span className="font-heading font-bold text-lg hidden sm:block">
            {config.companyName}
          </span>
        </button>

        <nav aria-label="Main navigation">
          <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
            {NAV_KEYS.map((key) => (
              <li key={key}>
                <button
                  onClick={() => scrollTo(key)}
                  className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  {t(`nav.${key}`)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1.5 font-medium text-sm px-3 py-1.5 rounded-md hover:bg-accent/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <Globe className="h-4 w-4" aria-hidden />
              {LOCALES.find((l) => l.code === router.locale)?.label ?? 'EN'}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LOCALES.map((locale) => (
                <DropdownMenuItem
                  key={locale.code}
                  onClick={() => switchLocale(locale.code)}
                  className={router.locale === locale.code ? 'text-accent font-semibold' : ''}
                >
                  <span aria-hidden>{locale.flag}</span>
                  <span className="ml-2">{locale.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Sun className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Moon className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

Header.displayName = 'Header'
```

- [ ] **Commit**

```bash
git add components/Header/Header.tsx
git commit -m "refactor: convert Header to named export with lvu-style imports"
```

---

## Task 3: Convert Footer component

**Files:**
- Modify: `components/Footer/Footer.tsx` (canonical source: `components/layout/Footer.tsx`)

Changes: `@/lib/config` → `@lib/config`, `export default function Footer()` → named export + displayName.

- [ ] **Write `components/Footer/Footer.tsx`**

```tsx
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { getConfig } from '@lib/config'

const NAV_KEYS = ['about', 'services', 'portfolio', 'testimonials', 'faq', 'contact'] as const

const SOCIAL_ICONS: Record<string, typeof ExternalLink> = {
  linkedin: ExternalLink,
  facebook: ExternalLink,
  instagram: ExternalLink,
  youtube: ExternalLink,
}

export const Footer = () => {
  const { t } = useTranslation('common')
  const config = getConfig()
  const year = new Date().getFullYear()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const activeSocials = (
    Object.entries(config.socials) as [keyof typeof SOCIAL_ICONS, string][]
  ).filter(([, url]) => url)

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={config.logoUrl}
                alt={config.companyName}
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="font-heading font-bold text-lg">{config.companyName}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 gap-2 list-none m-0 p-0">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <button
                    onClick={() => scrollTo(key)}
                    className="text-sm text-foreground/70 hover:text-accent transition-colors"
                  >
                    {t(`nav.${key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <address className="not-italic text-sm text-foreground/70 space-y-1 mb-4">
              {config.phone && <p>{config.phone}</p>}
              {config.email && (
                <p>
                  <a href={`mailto:${config.email}`} className="hover:text-accent transition-colors">
                    {config.email}
                  </a>
                </p>
              )}
              {config.address && <p>{config.address}</p>}
            </address>

            {activeSocials.length > 0 && (
              <div className="flex gap-3" role="list" aria-label="Social media links">
                {activeSocials.map(([name, url]) => {
                  const Icon = SOCIAL_ICONS[name]
                  if (!Icon) return null
                  return (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      role="listitem"
                      className="text-foreground/50 hover:text-accent transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {year} {config.companyName}. {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'
```

- [ ] **Commit**

```bash
git add components/Footer/Footer.tsx
git commit -m "refactor: convert Footer to named export with lvu-style imports"
```

---

## Task 4: Convert Hero component

**Files:**
- Modify: `components/Hero/Hero.tsx` (canonical source: `components/sections/Hero.tsx`)

Changes: `@/components/ui/button` → `@ui/button`, named export + displayName.

- [ ] **Write `components/Hero/Hero.tsx`**

```tsx
import { useTranslation } from 'next-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@ui/button'

export const Hero = () => {
  const { t } = useTranslation('common')
  const shouldReduce = useReducedMotion()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const fadeUp = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: 'easeOut' as const },
        }

  return (
    <section
      id="hero"
      aria-label={t('hero.title')}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07] text-accent"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute top-24 right-[10%] w-72 h-72 bg-accent/10 rotate-45" aria-hidden />
        <div className="absolute bottom-24 left-[8%] w-48 h-48 bg-accent/5 rotate-12" aria-hidden />
      </div>

      <div className="relative container mx-auto text-center pt-16">
        <motion.h1
          {...fadeUp(0)}
          className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-lg md:text-2xl text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => scrollTo('contact')}
            className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 h-12 text-base cursor-pointer"
          >
            {t('hero.cta_contact')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo('portfolio')}
            className="border-accent text-accent hover:bg-accent hover:text-white font-semibold px-8 h-12 text-base cursor-pointer"
          >
            {t('hero.cta_portfolio')}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

Hero.displayName = 'Hero'
```

- [ ] **Commit**

```bash
git add components/Hero/Hero.tsx
git commit -m "refactor: convert Hero to named export with lvu-style imports"
```

---

## Task 5: Convert About component

**Files:**
- Modify: `components/About/About.tsx` (canonical source: `components/sections/About.tsx`)

Changes: named export + displayName only (no UI imports to fix).

- [ ] **Write `components/About/About.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
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
                src="/portfolio/project-1.jpg"
                alt={t('about.title')}
                width={600}
                height={500}
                className="w-full h-[500px] object-cover"
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
```

Note: `entry?.isIntersecting` uses optional chaining to satisfy `noUncheckedIndexedAccess` from the IntersectionObserver callback destructuring.

- [ ] **Commit**

```bash
git add components/About/About.tsx
git commit -m "refactor: convert About to named export"
```

---

## Task 6: Convert Services component

**Files:**
- Modify: `components/Services/Services.tsx` (canonical source: `components/sections/Services.tsx`)

Changes: `@/components/ui/card` → `@ui/card`, named export + displayName.

- [ ] **Write `components/Services/Services.tsx`**

```tsx
import { useTranslation } from 'next-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Card, CardContent } from '@ui/card'
import { Building2, Home, Hammer, Layers, Shield, Leaf, type LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = { Building2, Home, Hammer, Layers, Shield, Leaf }

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
            const Icon = ICON_MAP[item.icon] ?? Building2
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
```

- [ ] **Commit**

```bash
git add components/Services/Services.tsx
git commit -m "refactor: convert Services to named export with lvu-style imports"
```

---

## Task 7: Convert Portfolio component

**Files:**
- Modify: `components/Portfolio/Portfolio.tsx` (canonical source: `components/sections/Portfolio.tsx`)

Changes: named export + displayName. Also fix `noUncheckedIndexedAccess` TS issue: extract `currentItem` before rendering the lightbox image, guarding against undefined.

- [ ] **Write `components/Portfolio/Portfolio.tsx`**

```tsx
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface PortfolioItem {
  title: string
  category: string
  image: string
}

export const Portfolio = () => {
  const { t } = useTranslation('common')
  const shouldReduce = useReducedMotion()
  const items = t('portfolio.items', { returnObjects: true }) as PortfolioItem[]
  const categories = t('portfolio.categories', { returnObjects: true }) as string[]

  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered =
    activeCategory === 'all' ? items : items.filter((item) => item.category === activeCategory)

  const closeLightbox = () => setLightboxIndex(null)

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))
  }, [filtered.length])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))
  }, [filtered.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, prev, next])

  const currentItem = lightboxIndex !== null ? (filtered[lightboxIndex] ?? null) : null

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="py-24 bg-surface">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            {t('portfolio.label')}
          </p>
          <h2 id="portfolio-heading" className="font-heading font-bold text-4xl md:text-5xl">
            {t('portfolio.title')}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label="Filter projects">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 text-sm font-medium border transition-all ${
              activeCategory === 'all'
                ? 'bg-accent text-white border-accent'
                : 'border-border hover:border-accent hover:text-accent'
            }`}
          >
            {t('portfolio.filter_all')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-medium border transition-all ${
                activeCategory === cat
                  ? 'bg-accent text-white border-accent'
                  : 'border-border hover:border-accent hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.ul layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.li
                key={item.title}
                layout
                initial={shouldReduce ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="group relative block w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label={`View ${item.title}`}
                >
                  <figure className="m-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <figcaption className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-left">
                        <p className="text-white font-heading font-semibold">{item.title}</p>
                        <p className="text-white/70 text-xs">{item.category}</p>
                      </div>
                    </figcaption>
                  </figure>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            role="dialog"
            aria-modal
            aria-label={currentItem.title}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>
            <button
              onClick={prev}
              className="absolute left-4 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={next}
              className="absolute right-16 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <motion.figure
              key={lightboxIndex}
              initial={shouldReduce ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="m-0 max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            >
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain"
                priority
              />
              <figcaption className="mt-4 text-white/80 text-sm text-center">
                {currentItem.title}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

Portfolio.displayName = 'Portfolio'
```

- [ ] **Commit**

```bash
git add components/Portfolio/Portfolio.tsx
git commit -m "refactor: convert Portfolio to named export, fix noUncheckedIndexedAccess"
```

---

## Task 8: Convert Testimonials component

**Files:**
- Modify: `components/Testimonials/Testimonials.tsx` (canonical source: `components/sections/Testimonials.tsx`)

Changes: named export + displayName only (no UI imports to fix).

- [ ] **Write `components/Testimonials/Testimonials.tsx`**

```tsx
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Star } from 'lucide-react'

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
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  )
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

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

        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Carousel navigation">
          {items.map((_, i) => (
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
      </div>
    </section>
  )
}

Testimonials.displayName = 'Testimonials'
```

- [ ] **Commit**

```bash
git add components/Testimonials/Testimonials.tsx
git commit -m "refactor: convert Testimonials to named export"
```

---

## Task 9: Convert FAQ component

**Files:**
- Modify: `components/FAQ/FAQ.tsx` (canonical source: `components/sections/FAQ.tsx`)

Changes: `@/components/ui/accordion` → `@ui/accordion`, named export + displayName.

- [ ] **Write `components/FAQ/FAQ.tsx`**

```tsx
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
```

- [ ] **Commit**

```bash
git add components/FAQ/FAQ.tsx
git commit -m "refactor: convert FAQ to named export with lvu-style imports"
```

---

## Task 10: Convert Contact component

**Files:**
- Modify: `components/Contact/Contact.tsx` (canonical source: `components/sections/Contact.tsx`)

Changes: `@/components/ui/button` → `@ui/button`, `@/lib/config` → `@lib/config`, named export + displayName.

- [ ] **Write `components/Contact/Contact.tsx`**

```tsx
import { useTranslation } from 'next-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@ui/button'
import { getConfig } from '@lib/config'
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
  const config = getConfig()

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
                className="w-full h-64 border-0 mb-6 grayscale"
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
                  <a href={`tel:${config.phone}`} className="text-sm text-foreground/70 hover:text-accent transition-colors">
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
```

- [ ] **Commit**

```bash
git add components/Contact/Contact.tsx
git commit -m "refactor: convert Contact to named export with lvu-style imports"
```

---

## Task 11: Update tsconfig.json and add my-env.d.ts

**Files:**
- Modify: `tsconfig.json`
- Create: `my-env.d.ts`

- [ ] **Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],

    "module": "ESNext",
    "moduleResolution": "bundler",
    "moduleDetection": "force",
    "jsx": "preserve",
    "jsxImportSource": "react",

    "baseUrl": "./",
    "paths": {
      "@components/*": ["components/*"],
      "@constants/*": ["constants/*"],
      "@lib/*":        ["lib/*"],
      "@pages/*":      ["pages/*"],
      "@ui/*":         ["ui/*"],
      "@utils/*":      ["utils/*"]
    },

    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitOverride": true,
    "useUnknownInCatchVariables": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,

    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "allowJs": false,
    "checkJs": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,

    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "incremental": true,
    "noEmit": true,

    "types": ["node"],
    "typeRoots": ["./node_modules/@types"],
    "plugins": [{ "name": "next" }]
  },
  "include": [
    "next-env.d.ts",
    "my-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules", ".next"]
}
```

- [ ] **Write `my-env.d.ts`**

```ts
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_COMPANY_NAME?: string
    readonly NEXT_PUBLIC_PHONE?: string
    readonly NEXT_PUBLIC_EMAIL?: string
    readonly NEXT_PUBLIC_ADDRESS?: string
    readonly NEXT_PUBLIC_GOOGLE_TAG?: string
    readonly NEXT_PUBLIC_SITE_URL?: string
    readonly RESEND_API_KEY?: string
    readonly RESEND_TO?: string
  }
}
```

- [ ] **Commit**

```bash
git add tsconfig.json my-env.d.ts
git commit -m "refactor: update tsconfig to lvu strict mode, add env type declarations"
```

---

## Task 12: Update components.json

**Files:**
- Modify: `components.json`

- [ ] **Write `components.json`**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@components",
    "utils": "@utils/cn",
    "ui": "@ui",
    "lib": "@lib",
    "hooks": "@lib/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}
```

- [ ] **Commit**

```bash
git add components.json
git commit -m "refactor: update components.json aliases to match new directory structure"
```

---

## Task 13: Update pages/index.tsx

**Files:**
- Modify: `pages/index.tsx`

All `@/...` imports replaced with named aliases. Section components imported from their new `@components/Name/Name` paths with named imports.

- [ ] **Write `pages/index.tsx`**

```tsx
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { generateNextSeo } from 'next-seo/pages'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Header } from '@components/Header/Header'
import { Footer } from '@components/Footer/Footer'
import { Hero } from '@components/Hero/Hero'
import { About } from '@components/About/About'
import { Services } from '@components/Services/Services'
import { Portfolio } from '@components/Portfolio/Portfolio'
import { Testimonials } from '@components/Testimonials/Testimonials'
import { FAQ } from '@components/FAQ/FAQ'
import { Contact } from '@components/Contact/Contact'
import { getConfig } from '@lib/config'

const LOCALE_NAMES: Record<string, string> = {
  en: 'en_GB',
  ru: 'ru_RU',
  cs: 'cs_CZ',
  uk: 'uk_UA',
}

const ALL_LOCALES = ['en', 'ru', 'cs', 'uk']

export default function Home() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const config = getConfig()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'
  const locale = router.locale ?? 'en'

  const languageAlternates = ALL_LOCALES.map((loc) => ({
    hrefLang: loc,
    href: `${siteUrl}/${loc}`,
  }))
  languageAlternates.push({ hrefLang: 'x-default', href: siteUrl })

  return (
    <>
      <Head>
        {generateNextSeo({
          title: t('seo.title'),
          description: t('seo.description'),
          canonical: `${siteUrl}/${locale}`,
          openGraph: {
            title: t('seo.title'),
            description: t('seo.description'),
            url: `${siteUrl}/${locale}`,
            locale: LOCALE_NAMES[locale] ?? 'en_GB',
            images: [
              {
                url: `${siteUrl}${config.seo.ogImage}`,
                width: 1200,
                height: 630,
                alt: t('seo.title'),
              },
            ],
          },
          twitter: {
            cardType: 'summary_large_image',
            handle: config.seo.twitterHandle || undefined,
          },
          languageAlternates,
        })}
      </Head>

      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})
```

- [ ] **Commit**

```bash
git add pages/index.tsx
git commit -m "refactor: update pages/index.tsx to named imports with correct aliases"
```

---

## Task 14: Update pages/_app.tsx and pages/api/contact.ts

**Files:**
- Modify: `pages/_app.tsx`
- Modify: `pages/api/contact.ts`

- [ ] **Write `pages/_app.tsx`** (change `'@/styles/globals.css'` → relative `'../styles/globals.css'`)

```tsx
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Toaster } from '@ui/sonner'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <Component {...pageProps} />
        <Toaster richColors position="top-right" />
      </div>
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
```

- [ ] **Write `pages/api/contact.ts`** (change `'@/lib/resend'` → `'@lib/resend'`)

```ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { resend } from '@lib/resend'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() })
  }

  const { name, email, phone, message } = parsed.data
  const to = process.env.RESEND_TO ?? 'info@example.com'

  try {
    await resend.emails.send({
      from: 'Website <onboarding@resend.dev>',
      to,
      subject: `New enquiry from ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
      replyTo: email,
    })
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
```

- [ ] **Commit**

```bash
git add pages/_app.tsx pages/api/contact.ts
git commit -m "refactor: update _app.tsx and contact API to use named aliases"
```

---

## Task 15: Delete old directories and files

**Files to remove:**
- `components/layout/` (Header and Footer moved to `components/Header/` and `components/Footer/`)
- `components/sections/` (all sections moved to `components/<Name>/`)
- `components/ui/` (all shadcn moved to `ui/`)
- `lib/utils.ts` (duplicate of `utils/cn.ts`)
- Old partial-migration stubs: verify content first, then delete `components/About/About.tsx` (old), `components/Services/Services.tsx` (old), `components/Portfolio/Portfolio.tsx` (old), `components/Testimonials/Testimonials.tsx` (old)

- [ ] **Delete old directories and files**

```bash
rm -rf components/layout
rm -rf components/sections
rm -rf components/ui
rm -f lib/utils.ts
```

- [ ] **Verify no other files reference `components/ui/`, `components/layout/`, `components/sections/`, or `lib/utils`**

```bash
grep -r "components/ui\|components/layout\|components/sections\|lib/utils" --include="*.ts" --include="*.tsx" . --exclude-dir=node_modules --exclude-dir=.next
```

Expected output: no results. If any results appear, update those imports before continuing.

- [ ] **Commit**

```bash
git add -A
git commit -m "refactor: delete old components/ui, components/layout, components/sections, lib/utils"
```

---

## Task 16: Fix TypeScript strict mode errors

After all the above changes, run the TypeScript compiler and fix any remaining errors.

- [ ] **Run type check**

```bash
cd /Users/sasha/Documents/construction-site && npx tsc --noEmit 2>&1
```

- [ ] **Fix `exactOptionalPropertyTypes` in `lib/config.ts`**

The spread of `Partial<SiteConfig>` over `SiteConfig` with `exactOptionalPropertyTypes: true` requires filtering `undefined` values first. Update `lib/config.ts`:

```ts
export interface SiteConfig {
  companyName: string
  tagline: string
  logoUrl: string
  faviconUrl: string
  phone: string
  email: string
  address: string
  addressUrl: string
  addressIframe: string
  socials: {
    linkedin: string
    facebook: string
    instagram: string
    youtube: string
  }
  googleTag: string
  resendTo: string
  seo: {
    ogImage: string
    twitterHandle: string
  }
}

const defaults: SiteConfig = {
  companyName: 'Construction Co.',
  tagline: 'Building the future',
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico',
  phone: '',
  email: '',
  address: '',
  addressUrl: '#',
  addressIframe: '',
  socials: { linkedin: '', facebook: '', instagram: '', youtube: '' },
  googleTag: '',
  resendTo: '',
  seo: { ogImage: '/og-image.jpg', twitterHandle: '' },
}

declare global {
  interface Window {
    config?: Partial<SiteConfig>
  }
}

function stripUndefined<T extends object>(obj: Partial<T>): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>
}

function envBase(): Partial<SiteConfig> {
  const v = (val: string | undefined) => (val !== undefined && val !== '' ? val : undefined)
  return stripUndefined({
    companyName: v(process.env.NEXT_PUBLIC_COMPANY_NAME),
    phone:       v(process.env.NEXT_PUBLIC_PHONE),
    email:       v(process.env.NEXT_PUBLIC_EMAIL),
    address:     v(process.env.NEXT_PUBLIC_ADDRESS),
    googleTag:   v(process.env.NEXT_PUBLIC_GOOGLE_TAG),
  })
}

export function getConfig(): SiteConfig {
  const base = { ...defaults, ...envBase() } as SiteConfig
  if (typeof window === 'undefined') return base
  return { ...base, ...stripUndefined(window.config ?? {}) } as SiteConfig
}
```

- [ ] **Fix any remaining `noUnusedLocals` / `noUnusedParameters` errors**

For any unused import or parameter, either remove it or prefix with `_` if intentional.

Common case in `pages/api/hello.ts` — the `req` parameter is unused, which breaks `noUnusedParameters`. Either delete it (it's a scaffold):
```bash
rm pages/api/hello.ts
```

Or fix it by prefixing with `_`:
```ts
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { name: string }

export default function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' })
}
```

- [ ] **Run type check again to confirm zero errors**

```bash
npx tsc --noEmit 2>&1
```

Expected: no output (zero errors).

- [ ] **Commit**

```bash
git add lib/config.ts
git commit -m "fix: update config.ts for exactOptionalPropertyTypes compatibility"
```

---

## Task 17: Final verification

- [ ] **Run dev build to confirm no runtime errors**

```bash
npm run build 2>&1 | tail -30
```

Expected: `✓ Compiled successfully` with no errors.

- [ ] **Run dev server and verify site loads**

```bash
npm run dev
```

Open `http://localhost:3000` in browser. Verify:
- Page loads without console errors
- Theme switcher works
- Language switcher works
- All sections render (Hero, About, Services, Portfolio, Testimonials, FAQ, Contact)

- [ ] **Commit if any final fixes were needed**

```bash
git add -A
git commit -m "fix: final adjustments after restructuring"
```
