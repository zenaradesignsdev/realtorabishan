import { businessInfo } from '@/lib/metadata'

export interface ServiceEntry {
  /** Stable slug — used as a React key and as the anchor id on /services. */
  slug: string
  title: string
  /** One-line summary for the index rows. */
  summary: string
  /** Full paragraph for the services page. */
  description: string
  /** Thumbnail revealed on hover in the index. */
  image: string
  imageAlt: string
  linkHref?: string
  linkLabel?: string
}

/**
 * Single source of truth for the service list — the home page index and the
 * services page both read this, so the order can never drift between them.
 *
 * Order is deliberate and set in .claude/CLAUDE.md: leasing for tenants, then
 * landlords, then property management, commercial, buying, selling, first-time
 * buyers, new construction. Leasing leads because leasing is the practice.
 */
export const SERVICES: ServiceEntry[] = [
  {
    slug: 'leasing-tenants',
    title: 'Leasing for tenants',
    summary: 'A shortlist that fits, not a flood of listings.',
    description:
      'You describe the place you actually want and the budget you actually have, and you get a filtered shortlist instead of a feed. Viewings are booked around your schedule, applications and references are prepared properly the first time, and lease terms get read line by line before you sign anything.',
    image: '/images/pexels-19836798.jpg',
    imageAlt: 'Bright rental living room with a light sofa and warm terracotta cushions',
  },
  {
    slug: 'leasing-landlords',
    title: 'Leasing for landlords',
    summary: 'Priced, marketed, shown, and screened — then filled.',
    description:
      'Your unit gets priced against what is actually leasing on your street, photographed and listed properly, and shown by someone who is there in person. Applications are screened on credit, employment, and references, and the lease paperwork is completed correctly so there is nothing to unwind later.',
    image: '/images/pexels-5071177.jpg',
    imageAlt: 'Detached two-storey home with a covered front porch on a quiet residential street',
  },
  {
    slug: 'property-management',
    title: 'Property management',
    summary: 'Kept occupied and running between tenancies.',
    description:
      'For owners who would rather not field the calls: connection to the right people to keep a property maintained, occupied, and turning over smoothly between tenancies.',
    image: '/images/pexels-31651009.jpg',
    imageAlt: 'Hand holding a set of house keys inside a bright modern home',
    linkHref: businessInfo.rentalManagementUrl,
    linkLabel: 'Visit AirFVH',
  },
  {
    slug: 'commercial',
    title: 'Commercial leasing & sales',
    summary: 'Office, retail, and mixed-use across the GTA.',
    description:
      'Representation on office, retail, and mixed-use space, whether you are taking a unit, listing one, or buying. Location, term length, and what the lease actually commits you to all get weighed together rather than one at a time.',
    image: '/images/pexels-2478248.jpg',
    imageAlt: 'Downtown Toronto office towers lit up at dusk',
  },
  {
    slug: 'buying',
    title: 'Buying',
    summary: 'From first search to keys in hand.',
    description:
      'Search, financing referrals, showings, offers, and negotiation — with straight answers about what a place is worth and what is wrong with it. The goal is the right home at a price that still looks right in three years.',
    image: '/images/neighbourhood.jpg',
    imageAlt: 'Aerial view of a leafy Toronto-area residential neighbourhood',
  },
  {
    slug: 'selling',
    title: 'Selling',
    summary: 'Positioned properly, then negotiated hard.',
    description:
      'Pricing strategy grounded in comparable sales, honest advice on what to fix and what to leave, professional marketing, and negotiation that holds its position. You will know what every offer really means before you respond to it.',
    image: '/images/toronto-skyline.jpg',
    imageAlt: 'Toronto skyline at sunset seen across the lake',
  },
  {
    slug: 'first-time-buyers',
    title: 'First-time buyers',
    summary: 'Every step explained, none of them rushed.',
    description:
      'A slower, more explained version of the buying process: what you can actually afford, which programs and rebates apply to you, what a home inspection is really telling you, and what happens on closing day.',
    image: '/images/pexels-31651009.jpg',
    imageAlt: 'Hand holding a set of house keys inside a bright modern home',
  },
  {
    slug: 'new-construction',
    title: 'New construction',
    summary: 'Pre-construction and builder purchases, decoded.',
    description:
      'Floor plans, deposit structures, occupancy periods, and builder amendments are their own language. Guidance through pre-construction and builder purchases so you know what you are agreeing to before the deposit cheque goes in.',
    image: '/images/modern-living-room.jpg',
    imageAlt: 'Bright, modern living room with clean lines and natural light',
  },
]

/**
 * Where Abishan actually works. Used by the marquee band and the contact page —
 * concrete place names do more for local credibility than "the GTA" alone.
 */
export const SERVICE_AREAS = [
  'Toronto',
  'Scarborough',
  'North York',
  'Etobicoke',
  'East York',
  'Markham',
  'Vaughan',
  'Richmond Hill',
  'Mississauga',
  'Brampton',
  'Pickering',
  'Ajax',
  'Whitby',
  'Oshawa',
] as const
