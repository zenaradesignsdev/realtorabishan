# Abishan Umashanker, Realtor® — Project Context
# .claude/CLAUDE.md | Project-level Claude instructions

---

## Client

- **Name**: Abishan Umashanker
- **Industry**: Residential & commercial real estate — REALTOR®, Royal LePage Ignite Realty Brokerage
- **Focus**: **Leasing is the lead service** — tenants and landlords across the GTA. Buying and
  selling are full, credible secondary services, never the headline. Real estate *investing* was
  deliberately removed as a service in Sept 2026; do not reintroduce it, or the language around it
  ("portfolio", "cash flow", "investment property") anywhere in site copy.
- **Website**: `theleaseman.ca` (set as the `siteConfig.url` placeholder — confirm before launch;
  the visible wordmark is still "Abishan Umashanker, REALTOR®", not "The Lease Man")
- **Primary contact**: Abishan Umashanker

---

## Design Personality

**Dark-led editorial.** Rebuilt Sept 2026 from the original Claude Design export, which had
drifted into a generic realtor template (eyebrow → heading → rounded-card grid, repeated in
every section).

The current direction: a premium property brochure. Every page opens on a full-bleed dark
hero; sections then alternate ink → cream → white so the page has a rhythm rather than one
continuous scroll. **Hairline rules replace card borders** — the `.rule` / `.rule-dark`
utilities in `globals.css` are the structural device, and reintroducing `rounded-2xl border
bg-white` card grids is the single fastest way to make this look generic again. Fraunces
display type does the heavy lifting at large sizes. Motion is restrained and purposeful:
per-word headline reveals, one continuous marquee band, a scroll-linked parallax, and
count-up figures — nothing decorative.

The original export's default (navy `#0B2545` + gold `#C2A05A`) and "B" layout variant were
never used — see the root `AbishanClaudeDesignExport.zip` if either is needed later.

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
| `--ink` | `#050F0E` | `174 50% 4%` | The dark bands' floor — heroes, footer, dark sections |
| `--teal-950` | `#0A201D` | `172 52% 8%` | Body of a dark section |
| `--teal-700` | `#155048` | `172 58% 20%` | Lifted edge a dark gradient runs toward |

A dark band should layer `ink`/`teal-950`/`teal-700` rather than sit on one flat fill —
that layering is what stops a large dark area reading as a solid rectangle.

The export's default (navy `#0B2545` + gold `#C2A05A`) and "B" layout variant were not used —
see the root `AbishanClaudeDesignExport.zip` export if either is needed later.

---

## Typography

Set in `src/lib/fonts.ts`.

| Role | Font | Notes |
|---|---|---|
| Display (`--font-display`) | Fraunces (variable) | Axes `SOFT`, `WONK`, `opsz` are loaded |
| Body (`--font-sans`) | Manrope | 400–700 |

Space Grotesk was replaced in the Sept 2026 rebuild — it reads as a tech/startup face, and a
high-contrast editorial serif is what makes a property site read premium.

Fraunces is variable on four axes, so **use the type utilities in `globals.css` rather than
`font-display` directly** — they set the right optical size per role, and `SOFT`/`WONK` stay
at 0 (any softness or the quirky single-storey `g` pushes Fraunces toward its playful "Funk"
personality, which is wrong for a trust-critical brand):

| Utility | Use |
|---|---|
| `.type-display` | Page headlines and oversized figures (`opsz` 144) |
| `.type-heading` | Section headings, names, sub-headings (`opsz` 96) |
| `.type-label` | Small-caps eyebrows, index numbers, field labels (Manrope, not Fraunces) |

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
- **Order of services**: leasing (tenant, then landlord) → property management → commercial →
  buying → selling → first-time buyers → new construction. The list lives once in
  `src/lib/services.ts` (`SERVICES`) and is read by both the home page index and the services
  page, so the order cannot drift between them. Keep the contact form's `INTEREST_OPTIONS`
  (`contact.schema.ts`) in the same order by hand — it is a separate list.
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
- Home page's `ShowcaseBand` ("From first homes to luxury listings") originally used
  `modern-living-room.jpg`; swapped for `pexels-19836798.jpg` (licence-free Pexels photo,
  warm-neutral living room with terracotta accents) for a more premium feel matching the palette
- `abishan-avatar.webp` is a 320×320 head-and-shoulders crop of `abishan.webp`, generated with
  sharp for small circular avatars — the 680×1020 full-length original renders the face far too
  small below about 80px. Regenerate it from the original if the portrait is ever replaced.
- Each of the four heroes uses a different background image on purpose; if you reassign one,
  check the others still differ.
- **Known gap**: the licensed stock is generic North American, not Toronto — `pexels-5071177.jpg`
  (used for the landlord sections) is a US-style suburban street. GTA-specific photography, and
  real shots of units Abishan has leased, would lift the site further than any code change.
- Set `priority` on the hero portrait/image per page (LCP element)

### Delivery

Handled once in `src/components/ui/image.tsx` and `next.config.mjs` — AVIF/WebP negotiation,
a one-year `minimumCacheTTL`, and an automatic blur placeholder. Per-usage, three things matter:

- **`sizes` must describe the rendered box, not the source.** Without it next/image builds the
  srcset from the `width` prop and the browser takes the largest candidate — the brokerage mark
  is a 600px source drawn at 67px and was pulling the 640w derivative (7KB) on every page load.
  When `sizes` contains a viewport unit next/image uses `deviceSizes` only, so a fixed-px value
  is what unlocks the smaller `imageSizes` rungs.
- **`quality` is tiered by role**, because most photography here is deliberately obscured:
  `55` for a hero backdrop sitting at 30–40% opacity under an ink gradient, `70` for a
  full-bleed image that is actually meant to be looked at (home hero, `ShowcaseBand`), and the
  wrapper's `85` default for content photos on cream or white. The veiled tier costs about a
  third of q=85 and is visually identical once the gradient is over it.
- **A `Parallax` child paints wider than its container** — it is scaled by `1 + amount/100` so
  the drift never exposes an edge — so its `sizes` has to include that (`114vw`, not `100vw`).

Blur placeholders are precomputed into `src/lib/image-blur.ts` by
`scripts/generate-image-blur.mjs`; **re-run it after adding or replacing anything in
`public/images/`**. next/image generates these automatically only for statically imported
images, and this project references photos by public path.

**Open**: several sources are cropped hard by `object-cover`. `pexels-19836798.jpg` is a
1920x2880 portrait shown in a 16/10 box, so more than half of every byte fetched is for pixels
that are never painted. Pre-cropping it (and `pexels-5071177.jpg`, the heaviest content image
on the site at 101KB) to the aspect they are displayed at would roughly halve them. That means
editing files in `public/` — ask first.
- OG image: `public/og-image.jpg` is in place at 1200×630. If it is ever replaced, keep those
  exact dimensions — `generateMetadata` hard-codes them in the `og:image` tags.

---

## Stack Additions

| Package | Reason |
|---|---|
| _(none yet)_ | Built entirely on boilerplate dependencies — lucide-react icons replace the export's hand-drawn CSS-shape icons |

---

## Environment Variables

Actual values belong in the Vercel dashboard — never committed. See `.env.local.example`.

| Variable | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | yes | From Abishan/Zenara's Resend account. Without it the form returns 500 and logs `[contact] Not configured`. |
| `CONTACT_TO_EMAIL` | yes | Abishan's intake inbox (TBD). |
| `CONTACT_FROM_EMAIL` | no | Falls back to `onboarding@resend.dev`, Resend's shared sender — no DNS setup, but it **only delivers to the Resend account owner's own address**. Fine for a smoke test, not for launch. Set it to an address on a domain verified at resend.com/domains. |
| `NEXT_PUBLIC_SITE_URL` | no | Set once the domain is confirmed. Falls back to Vercel's stable production domain, then to the `https://theleaseman.ca` placeholder. |

**Env vars are read at build time, not request time.** `siteConfig.url`, `robots.txt` and
`sitemap.xml` are all statically generated, so changing a variable in the Vercel dashboard does
nothing until the next deploy. Redeploy after setting the real domain.

---

## Production

- **Preview deployments are excluded from search.** `robots.ts` emits `Disallow: /` whenever
  `VERCEL_ENV` is set to anything other than `production`. Vercel gives every preview a public
  hostname, and a crawler that finds one would index a byte-identical duplicate of the live site.
  `VERCEL_ENV` is unset off-Vercel, so local and self-hosted production builds crawl normally.
- **Canonicals always point at production.** When `NEXT_PUBLIC_SITE_URL` is unset,
  `resolveSiteUrl()` falls back to `VERCEL_PROJECT_PRODUCTION_URL` — the project's *stable* domain,
  which Vercel exposes to previews too — rather than to the deployment's own throwaway hostname.
- **Contact route defences**, in the order they run (`src/app/api/contact/route.ts`): per-IP rate
  limit → `Content-Length` cap → JSON parse → Zod → honeypot. The rate limiter is an in-memory
  `Map`, so it is per-instance and resets on a cold start; it sweeps expired entries once it
  reaches `RATE_LIMIT_MAX_ENTRIES` so a varied-IP flood cannot grow it without bound. Swap in
  Upstash Redis only if a hard global limit is ever needed.
- **`headerSafe()` strips control characters from `name` before it reaches the Subject header.**
  Zod caps the length but permits `\r\n`, which is the classic email header-injection vector.
  Do not remove it, and do not interpolate any other user-supplied field into a header.
- **CSP keeps `script-src 'unsafe-inline'`** deliberately. Removing it needs per-request nonces,
  which means middleware and dynamic rendering — that would drop all four pages out of static
  generation. Not worth it for a site with no third-party scripts and no user-generated content.
- `global-error.tsx` is styled inline rather than with Tailwind classes: it replaces the root
  layout, so it cannot assume the stylesheet or the font variables loaded.

---

## Motion

All scroll-driven motion lives in `src/components/motion/` and shares one rule: **never use
IntersectionObserver or framer-motion's `whileInView`/`useScroll` for this site.**

`html` carries a non-visible `overflow-x` (see the long note in `globals.css`), which makes
framer resolve the root element as the scroll container — `useScroll` then computes offsets
against a static container and pins progress at a constant, so the animation silently never
runs. Separately, an IntersectionObserver only reports crossings it can catch between two
paints: a single-frame scroll jump (scrollbar drag-to-bottom, an instant `scrollTo`, an
anchor `scrollIntoView`) can carry a section from below the viewport to above it with no
intersecting frame, leaving it stuck at `opacity: 0` until reload.

Both problems go away by measuring `getBoundingClientRect()` on every scroll/resize event.
`useRevealOnce` (`src/hooks/`) is the shared primitive; `Parallax` does the same inline and
writes its transform straight to the node rather than through state.

| Component | Use |
|---|---|
| `Reveal` | The default section fade/slide-up. Reveals once, stays revealed. |
| `WordReveal` | Per-word headline entrance. Plain strings only — it splits on spaces. |
| `Marquee` | CSS-keyframe infinite track; duplicate copy is `aria-hidden`. |
| `CountUp` | Figures that count up in view. Renders the final value on the server. |
| `Parallax` | Scroll-linked drift for full-bleed imagery. |

Every one of them collapses to a static state under `prefers-reduced-motion`.

---

## Mobile

Most traffic is mobile, so every layout decision is checked at 320 / 360 / 390 / 414 / 768
plus a 740x360 landscape handset before it is considered done.

- **Touch targets are 44px minimum.** Several links here are visually small on purpose
  (underlined text + arrow, the services jump chips, the `md:` nav row). Grow the *box* with
  `py-*` or `min-h-[44px]` and pull it back out of the flow with a negative margin — never
  scale the type up to reach the target.
- **The `md:` nav row appears at 768px, which is a tablet** — it is touched, not clicked.
  Its links carry `min-h-[44px]`, not just padding.
- **The mobile menu scrolls.** Its content is ~720px tall, so on a short viewport (iPhone
  SE/8/mini, or any phone in landscape) a plain `justify-center` pushed the brokerage row past
  both edges with no way to reach it — the page scroll is locked while the menu is open. It is
  `overflow-y-auto` with `my-auto` + `min-h-full` on the inner block, which centres it when it
  fits and scrolls when it does not. Keep both.
- **`short:` is a height breakpoint**, defined in `tailwind.config.ts` as
  `(max-height: 480px) and (orientation: landscape)`. Width breakpoints alone treat a 740x360
  handset as a tablet and hand it `sm:`/`md:` display type in a 360px-tall window. All four
  heroes use it to step the headline down.
- **Use `svh`, not `vh`.** `100vh` is taller than the visible viewport while the mobile URL bar
  is showing, which pushes content underneath it.
- Form controls must stay at **16px or larger** — anything smaller makes iOS Safari zoom the
  page on focus. The contact fields are `text-base` for this reason, not for the type scale.
- `type-label` renders at 11px. It is for tracked-out eyebrows and index numbers only — never
  body copy — and should not be pushed below that.
- A long testimonial cannot go in the featured pull-quote slot: set in Fraunces at `text-[1.6rem]`
  a ~650-character review runs about fifteen lines on a phone. Home features index 3, About
  index 2; the long one stays in the marquee where it reads at body size.

---

## Notes

- **Brokerage logo**: Abishan is with Royal LePage Ignite Realty Brokerage. No official logo asset was
  supplied, and a real-world corporate trademark logo should come from the brokerage's own brand
  portal (or Abishan directly) rather than being sourced from a web search — the footer currently
  renders a plain text wordmark as a placeholder. Swap in the real SVG/PNG once supplied.
- Contact form's service-interest field (`interest`) was added on top of the boilerplate's
  `contactSchema` — see `src/components/contact/contact.schema.ts`.
