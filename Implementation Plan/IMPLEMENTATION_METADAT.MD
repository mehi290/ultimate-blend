# Metadata & Social Preview Implementation Plan

## Implementation Checklist (Live)
- [x] Audit current metadata and social tags in `index.html`.
- [x] Remove Lovable Open Graph/Twitter preview references.
- [x] Add robust OG metadata set (`og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`, image tags).
- [x] Add robust Twitter card metadata (`summary_large_image`, title, description, image, image alt).
- [x] Add core SEO tags (`title`, `description`, canonical, robots, theme-color).
- [x] Add JSON-LD structured data for `BeautySalon` (including `sameAs` social links).
- [x] Add `public/sitemap.xml`.
- [x] Update `public/robots.txt` to include sitemap reference and `Disallow: /admin`.
- [x] Point OG/Twitter images and JSON-LD URLs to production domain (`www.ultimateblendladiessalon.com`).
- [x] Sync dynamic `SEO.tsx` defaults with production domain and full OG/Twitter tag updates per route.
- [x] Add `noindex` for admin and transactional booking confirmation/cancel pages.
- [ ] **Deferred:** Prerender/SSR so non-JS crawlers receive per-route metadata (architectural — not in scope).
- [ ] **Optional:** Replace `about%20image.png` with a dedicated branded `og-image.jpg` (1200×630) when a final asset is ready.
- [ ] **Optional:** Add square `1200×1200` social fallback image.
- [ ] **Manual post-deploy:** Validate social previews in Facebook, LinkedIn, X, WhatsApp, and Telegram debuggers after each metadata/image change.

## Objective
Replace the current Lovable social preview metadata with branded Tres Beaux metadata and a real website snapshot image, then harden SEO/social sharing coverage for production (including social platforms and search engines).

## Current State (Audit)
- Metadata is in `index.html` and updated per route via `src/components/site/SEO.tsx`.
- Open Graph, Twitter, canonical, and JSON-LD use `https://www.ultimateblendladiessalon.com`.
- Shared SEO constants live in `src/lib/seo-config.ts`.
- `robots.txt` references sitemap and blocks `/admin`.
- Social preview image uses production-hosted `about%20image.png` at 1200×630 dimensions in meta tags.

## Implementation Scope
- Core metadata in `index.html`
- Social preview image asset generation and placement in `public` (optional upgrade)
- Search/indexing support files (sitemap, robots updates)
- Structured data (JSON-LD) for local business visibility
- Validation workflow for deploy/share previews

## Deliverables
1. New preview image generated from an actual website snapshot. *(optional upgrade — using production `about%20image.png` until replaced)*
2. Updated Open Graph metadata. ✅
3. Updated Twitter Card metadata. ✅
4. Canonical URL and foundational SEO tags. ✅
5. Local business structured data (`BeautySalon` schema with `sameAs`). ✅
6. Verification checklist for Vercel deployment and social debuggers. *(manual, run after deploy)*

## Success Criteria
- URL previews across social platforms show branded snapshot on production domain.
- No Lovable preview metadata remains.
- Metadata is complete, production-ready, and consistent across SEO + social channels.
- Prerender/SSR remains a separate future decision if non-JS crawler coverage is required.
