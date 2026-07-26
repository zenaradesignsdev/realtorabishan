# Abishan Umashanker, Realtor® — Project Context
# .claude/CLAUDE.md | Project-level Claude instructions

---

## Client

- **Name**: Abishan Umashanker
- **Industry**: Residential & commercial real estate — REALTOR®, Royal LePage Ignite Realty Brokerage
- **Website**: TBD (placeholder `abishanrealtor.ca` used in `siteConfig.url` until a domain is chosen)
- **Primary contact**: Abishan Umashanker

---

## Design Personality

Calm, trustworthy, editorial-minimal — a premium real estate brochure, not a listings portal.
Typography-first: Space Grotesk display headings do the heavy lifting, generous whitespace,
restrained motion (fade/slide-up on scroll only, never decorative). Converted from a
Claude Design export (`AbishanClaudeDesignExport.zip`) — the "Teal" direction was selected
over the default navy/gold and the "B" navy-hero layout variant.

---

## Colour Palette

Set in `src/app/globals.css` (`:root`) and exposed via `tailwind.config.ts`.

| Token | Hex (source) | HSL | Use |
|---|---|---|---|
| `--brand` | `#0E3B36` (deep teal) | `173 62% 14%` | Primary CTAs, headings, nav |
| `--brand-foreground` | `#FAFAFA` | `0 0% 98%` | Text on brand background |
| `--terracotta` | `#C96F4A` | `17 54% 54%` | Decorative only — eyebrows, icons, thin borders (fails 4.5:1 on white as text) |
| `--terracotta-solid` | `#A55331` | `17 54% 42%` | Solid CTA fills needing white text — contrast-checked ≥ 4.5:1 |
| `--surface` | `#FBFAF7` | `45 33% 98%` | Alternating warm-cream section backgrounds |

The export's default (navy `#0B2545` + gold `#C2A05A`) and "B" layout variant were not used —
see the root `AbishanClaudeDesignExport.zip` export if either is needed later.

---

## Typography

Set in `src/lib/fonts.ts`.

| Role | Font | Weight |
|---|---|---|
| Display (`--font-display`) | Space Grotesk | 500, 600, 700 |
| Body (`--font-sans`) | Manrope | 400–700 |

---

## CMS

- **Platform**: None — all copy is static JSX/TS content colocated with each page's components.

---

## Pages

- [x] Home (`/`)
- [x] About (`/about`)
- [x] Services (`/services`)
- [x] Contact (`/contact`)

---

## Content & Copy

- **Tone**: Warm but professional, client-first, no pressure/urgency language.
- **Never say**: "empowering", "synergy", "cutting-edge", "AI-powered" — trust-critical real estate copy stays plain and human.
- **Preferred terms**: "REALTOR®" (registered mark, always capitalized with ®), "the GTA" for Greater Toronto Area.
- **Legal**: REALTOR® trademark disclaimer required in the footer (CREA membership mark). Brokerage name
  (Royal LePage Ignite Realty Brokerage) must appear per RECO marketing rules — already wired into
  `businessInfo` in `src/lib/metadata.ts` and rendered in the footer/JSON-LD.

---

## Images

- Use `<Image />` from `@/components/ui/image` for all rendered images — never raw `<img>`
- Source photos live in `public/images/` — Abishan's portrait (`abishan.webp`), Toronto skyline and
  neighbourhood shots are licensed Pexels photos carried over from the design export
- The export's `luxury-interior.jpg` was a Pngtree image (requires a paid commercial licence) —
  it was swapped for a vetted, licence-free Pexels photo (`pexels-34688219.jpg`) instead
- Set `priority` on the hero portrait/image per page (LCP element)
- OG image: add a real `1200×630` asset at `public/og-image.jpg` before launch (currently missing —
  build/lint will not catch this, check manually)

---

## Stack Additions

| Package | Reason |
|---|---|
| _(none yet)_ | Built entirely on boilerplate dependencies — lucide-react icons replace the export's hand-drawn CSS-shape icons |

---

## Environment Variables

Actual values belong in the Vercel dashboard — never committed. See `.env.local.example`.

- `RESEND_API_KEY` — not yet configured, get from Abishan/Zenara's Resend account
- `CONTACT_TO_EMAIL` — Abishan's intake inbox (TBD)
- `NEXT_PUBLIC_SITE_URL` — set once a domain is chosen; placeholder is `https://abishanrealtor.ca`

---

## Notes

- **Brokerage logo**: Abishan is with Royal LePage Ignite Realty Brokerage. No official logo asset was
  supplied, and a real-world corporate trademark logo should come from the brokerage's own brand
  portal (or Abishan directly) rather than being sourced from a web search — the footer currently
  renders a plain text wordmark as a placeholder. Swap in the real SVG/PNG once supplied.
- Contact form's service-interest field (`interest`) was added on top of the boilerplate's
  `contactSchema` — see `src/components/contact/contact.schema.ts`.
