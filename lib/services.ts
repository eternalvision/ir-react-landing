export const SERVICE_SLUGS = [
  'instalaterske-prace',
  'havarijni-sluzba',
  'vymena-kotle',
  'tepelna-cerpadla',
  'topeni',
  'podlahove-vytapeni',
  'bojlery',
  'voda-a-kanalizace',
] as const

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export const SERVICE_IMAGES: Record<ServiceSlug, string> = {
  'instalaterske-prace': '/portfolio/bath.jpg',
  'havarijni-sluzba': '/portfolio/pump.jpg',
  'vymena-kotle': '/portfolio/boiler-room.jpg',
  'tepelna-cerpadla': '/portfolio/warm-pump.jpg',
  topeni: '/portfolio/guy-installator.jpg',
  'podlahove-vytapeni': '/portfolio/warm-floor.jpg',
  bojlery: '/portfolio/boiler-replacement.jpg',
  'voda-a-kanalizace': '/portfolio/water-supply-distribution.jpeg',
}

export const servicePath = (slug: string) => `/sluzby/${slug}`

export const isServiceSlug = (value: unknown): value is ServiceSlug =>
  typeof value === 'string' && (SERVICE_SLUGS as readonly string[]).includes(value)
