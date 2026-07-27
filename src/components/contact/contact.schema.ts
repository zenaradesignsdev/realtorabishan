import { z } from 'zod'

export const INTEREST_OPTIONS = [
  { value: 'Buying', label: 'Buying a home' },
  { value: 'Selling', label: 'Selling a home' },
  { value: 'First-time buyer', label: 'First-time home buyer' },
  { value: 'Commercial', label: 'Commercial real estate' },
  { value: 'Investing', label: 'Real estate investing' },
  { value: 'New construction', label: 'New construction' },
  { value: 'Rentals', label: 'Property rentals' },
  { value: 'Property management', label: 'Property management' },
  { value: 'Other', label: 'Something else' },
] as const

const INTEREST_VALUES = INTEREST_OPTIONS.map((option) => option.value) as [string, ...string[]]

/**
 * The `website` field is a honeypot — it is hidden from real users via CSS.
 * Bots that fill every visible field will populate it. The honeypot check itself
 * happens explicitly in the API route (not here) — the schema only needs to let
 * a populated value pass through so the route can see it and respond with a
 * silent 200. A `.max(0)` constraint here would fail validation before the route
 * ever runs, surfacing "Bot detected" in the 422 response and defeating the point
 * of a stealth honeypot (and blocking real users whose autofill populates it).
 */
export const contactSchema = z.object({
  website: z.string().max(100).optional(),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^\+?[\d][\d\s\-().]{5,18}[\d]$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  interest: z.enum(INTEREST_VALUES, {
    message: 'Please select what you are interested in',
  }),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
