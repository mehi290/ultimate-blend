# Metadata & Social Preview Implementation Plan

## Implementation Checklist (Live)
- [x] Audit current metadata and social tags in `index.html`.
- [x] Remove Lovable Open Graph/Twitter preview references.
- [x] Add robust OG metadata set (`og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`, image tags).
- [x] Add robust Twitter card metadata (`summary_large_image`, title, description, image, image alt).
- [x] Add core SEO tags (`title`, `description`, canonical, robots, theme-color).
- [x] Add JSON-LD structured data for `BeautySalon`.
- [x] Add `public/sitemap.xml`.
- [x] Update `public/robots.txt` to include sitemap reference.
- [ ] Replace temporary social preview asset with a final homepage snapshot image at social dimensions (`1200x630`) and update `og:image` / `twitter:image`.
- [ ] Validate social previews in Facebook, LinkedIn, X, WhatsApp, and Telegram debuggers.
- [ ] Confirm/update production domain in canonical, OG URL, sitemap, robots sitemap line, and JSON-LD URL/image if custom domain differs from Vercel URL.

## Objective
Replace the current Lovable social preview metadata with branded Tres Beaux metadata and a real website snapshot image, then harden SEO/social sharing coverage for production (including social platforms and search engines).

## Current State (Audit)
- Metadata is currently in `index.html`.
- Existing Open Graph and Twitter images point to Lovable-hosted URL:
  - `https://lovable.dev/opengraph-image-p98pqg.png`
- No dedicated social preview image asset currently exists in `public` for sharing.
- `robots.txt` exists, but sitemap and broader metadata coverage are not yet in place.

## Implementation Scope
- Core metadata in `index.html`
- Social preview image asset generation and placement in `public`
- Search/indexing support files (sitemap, robots updates if needed)
- Optional structured data (JSON-LD) for local business visibility
- Validation workflow for deploy/share previews

## Deliverables
1. New preview image generated from an actual website snapshot.
2. Updated Open Graph metadata.
3. Updated Twitter Card metadata.
4. Canonical URL and foundational SEO tags.
5. Optional local business structured data (`BeautySalon` schema).
6. Verification checklist for Vercel deployment and social debuggers.

## Detailed Plan

### 1) Create Branded Social Preview Image
- Capture a high-quality snapshot of the live homepage hero/branding area.
- Create final social image with recommended dimensions:
  - Primary: `1200x630` (Open Graph/Twitter large card)
  - Optional fallback square: `1200x1200`
- Save final file in `public`, example:
  - `/og-tres-beaux.jpg` (or `.png` if needed)
- Ensure file size is optimized (target roughly 150KB–400KB where possible for fast sharing fetches).

### 2) Replace Existing OG/Twitter Tags in `index.html`
- Update/remove Lovable references and replace with Tres Beaux values:
  - `og:title`
  - `og:description`
  - `og:type`
  - `og:url`
  - `og:site_name`
  - `og:image`
  - `og:image:width`
  - `og:image:height`
  - `og:image:alt`
- Update Twitter tags:
  - `twitter:card` (`summary_large_image`)
  - `twitter:title`
  - `twitter:description`
  - `twitter:image`
  - `twitter:image:alt`
  - `twitter:site` (only if official handle exists; otherwise omit)

### 3) Strengthen Core SEO Metadata
- Ensure the following are set and brand-consistent:
  - `<title>`
  - `meta description`
  - canonical link (`<link rel="canonical" ...>`)
  - `meta robots` (index/follow)
- Confirm `lang="en"` and viewport remain correct.

### 4) Add Local Business Structured Data (Recommended)
- Add JSON-LD in `index.html` for `BeautySalon` (or `LocalBusiness`) with:
  - Business name
  - URL
  - Logo/image
  - Address
  - Phone
  - Opening hours
  - SameAs social links (if available)
- This supports richer search understanding and local relevance.

### 5) Search Engine Discovery Files
- Keep/verify `public/robots.txt`.
- Add `public/sitemap.xml` with homepage URL (and key pages if expanded later).
- Ensure `robots.txt` references sitemap URL.

### 6) Vercel Compatibility & Caching Considerations
- Use absolute URLs in OG/Twitter tags for production domain (e.g. `https://yourdomain.com/og-tres-beaux.jpg`).
- Confirm asset path resolves correctly after deploy.
- If social preview seems stale after updates, bust cache by:
  - changing image filename (e.g., `og-tres-beaux-v2.jpg`)
  - or using debugger refresh tools.

### 7) Validation Checklist (Post-Implementation)
- Verify rendered head tags in deployed page source.
- Validate on:
  - Facebook Sharing Debugger
  - LinkedIn Post Inspector
  - X/Twitter Card Validator
  - WhatsApp/Telegram real-share test
- Confirm preview shows:
  - correct title
  - correct description
  - new website snapshot image
  - no Lovable branding.

## Content Inputs Needed Before Implementation
- Final production domain (for canonical/`og:url` absolute links)
- Preferred title and description copy (or approval to draft)
- Official social handles/URLs (Instagram, Facebook, X, etc.)
- Final chosen snapshot image file (or approval for me to define/crop one)

## Suggested Rollout Order
1. Produce/finalize snapshot image
2. Update metadata tags
3. Add structured data
4. Add sitemap/robots linkage
5. Deploy to Vercel
6. Run social preview validators and cache refresh

## Success Criteria
- URL previews across social platforms show Tres Beaux branded snapshot.
- No Lovable preview metadata remains.
- Metadata is complete, production-ready, and consistent across SEO + social channels.
