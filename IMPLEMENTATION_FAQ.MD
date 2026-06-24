# Implementation Plan: SEO-Optimized FAQ Section & Local Business Schema Optimization

This document outlines the detailed plan to create and integrate a beautifully styled, responsive, and SEO-optimized FAQ section on the Ultimate Blend Ladies Beauty Salon website, alongside social profile linking schema optimizations.

---

## Implementation Checklist (Live)
- [x] Create `FAQ.tsx` with semantic `<section>`, `<details>`, and `<summary>` markup.
- [x] Integrate `<FAQ />` into `Index.tsx` before `<Footer />`.
- [x] Add `/faq` route scroll target in `pathToIdMap`.
- [x] Map `/faq` SEO title and description in `SEO_MAP`.
- [x] Add `sameAs` social links to `BASE_SCHEMA` in `src/lib/seo-config.ts`.
- [x] Single source of truth: `FAQ_ITEMS` in `seo-config.ts` drives UI (`FAQ.tsx`) and JSON-LD (`buildFAQPageSchema()`).
- [x] All 6 UI FAQs included in `FAQPage` schema with matching question/answer text.
- [x] `/faq` route injects `@graph` with `FAQPage` + `BeautySalon` schemas.
- [x] CTA button links to `/booking`.
- [ ] **Deferred:** Prerender/SSR so FAQ metadata is in initial HTML for all crawlers.
- [ ] **Optional:** Expand H2 to include local keywords (e.g. “Hair Braiding & Home Salon Services in Deira”) — current H2: “Frequently Asked Questions”.

---

## 1. Goal Description
Introduce a high-performance FAQ accordion that answers key client questions, maximizes local search visibility, and converts informational traffic via a CTA. Link official Instagram, Facebook, and TikTok profiles via `sameAs` in schema metadata.

---

## 2. SEO Head Optimization (Metadata Matrix)

| Element | Configuration | Status |
| :--- | :--- | :--- |
| **Primary Page Title** | Best Hair Braiding in Deira \| Ultimate Blend Ladies Salon Dubai | ✅ |
| **Meta Description** | Looking for the best hair braiding in Deira? Ultimate Blend Ladies Salon offers flawless knotless braids, Fulani cornrows, boho braids, and convenient premium home services across Dubai. Book your appointment online today! | ✅ |
| **H2 Section Header** | Frequently Asked Questions | ✅ |

---

## 3. Structured FAQ & LocalBusiness Schema Markup

**Source of truth:** `FAQ_ITEMS` in `src/lib/seo-config.ts`

### A. LocalBusiness / BeautySalon `sameAs` ✅
Instagram, TikTok, and Facebook URLs are in `BASE_SCHEMA.sameAs` and static `index.html` JSON-LD.

### B. FAQPage Schema ✅
`buildFAQPageSchema()` generates all 6 questions from `FAQ_ITEMS` with exact UI copy:

1. Do you provide the hair extensions for boho, knotless, and Fulani braids?
2. How long do braids normally take to install?
3. How do I book a home service appointment in Dubai?
4. Is there a minimum spend or travel fee for home services?
5. Do you require a booking prior or accept walk-ins?
6. What is your cancellation and rescheduling policy?

---

## 4. FAQ Content (Live — matches UI)

Content is maintained in `src/lib/seo-config.ts` (`FAQ_ITEMS`) and rendered by `src/components/site/FAQ.tsx`. The accordion shows 2 FAQs by default with a “See More” toggle for all 6.

---

## 5. Technical Implementation

### A. FAQ Component ✅
`src/components/site/FAQ.tsx` — imports `FAQ_ITEMS` from `seo-config.ts`.

### B. Integration into Pages & Navigation ✅
- `Index.tsx`: `<FAQ />`, `/faq` scroll, `SEO_MAP` entry with `buildFAQPageSchema()`.
- `BASE_SCHEMA` includes verified social links.

---

## 6. Verification Plan

### Automated
- Run `npm run build` to verify no TypeScript errors.

### Manual
- Visit `/faq` and confirm all 6 questions match JSON-LD in DevTools (`#seo-schema`).
- Test accordion expand/collapse and CTA → `/booking`.
- Validate with Google Rich Results Test (FAQPage).

### Deferred
- Prerender/SSR for non-JS crawler coverage.
