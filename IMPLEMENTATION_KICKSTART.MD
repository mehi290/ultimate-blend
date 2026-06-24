# Implementation Plan: SEO Structure & Schematic Layout Optimization

This document outlines the design and technical steps for implementing a robust, dynamic Search Engine Optimization (SEO) system, semantic HTML restructuring, and metadata handling across all routes of the Ultimate Blend Ladies Beauty Salon application.

---

## Implementation Checklist (Live)
- [x] Create `SEO.tsx` with dynamic title, description, canonical, OG, Twitter, and JSON-LD injection.
- [x] Refactor `Index.tsx` with `SEO_MAP` for marketing routes and dynamic `/services/:category` SEO.
- [x] Add `<SEO>` to `Booking.tsx`, `BookingConfirm.tsx`, `BookingCancel.tsx`, and `NotFound.tsx`.
- [x] Section IDs for homepage deep linking (`#about`, `#services`, `#faq`, etc.).
- [x] Single `<h1>` in `Hero.tsx`; section headers use `<h2>`.
- [x] `<main>` wrapper around primary homepage content in `Index.tsx`.
- [x] `<footer>` and `<nav>` semantic landmarks in `Footer.tsx` and `Sidebar.tsx`.
- [x] JSON-LD schemas for marketing routes via `SEO_MAP` and `src/lib/seo-config.ts`.
- [x] `WebPage` schema on booking flow pages; `noindex` on confirm/cancel and 404.
- [x] `noindex` on all `/admin/*` routes.
- [x] `robots.txt` `Disallow: /admin`.
- [x] Production domain unified in `index.html`, `SEO.tsx`, and `seo-config.ts`.
- [ ] **Deferred:** Prerender/SSR for per-route HTML metadata without JavaScript.
- [ ] **Optional:** `Review` / `AggregateRating` schema on testimonials route.
- [ ] **Optional:** Systematic unique `id` attributes on all interactive CTAs (accessibility audit).

---

## 1. Goal Description
The objective is to optimize the application for search engine visibility and accessibility. This is achieved by:
- Dynamically updating page titles and meta descriptions for each SPA route.
- Restructuring components to follow a strict semantic HTML schematic layout (e.g., proper header-main-footer structure, single `<h1>` tag per page, section-level tags, unique interactive component IDs).
- Ensuring rich metadata including Open Graph (OG), Twitter Cards, and canonical URLs are updated appropriately per page.
- Implementing dynamic JSON-LD structured data/schema injection depending on the active page or context.

---

## 2. Proposed Architecture & Changes

### A. Core SEO Utility Component
`src/components/site/SEO.tsx` — implemented. Uses `useEffect` to update:
- `document.title`
- `meta[name="description"]`
- `meta[name="robots"]`
- `link[rel="canonical"]`
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name`, `og:locale`, image dimensions/alt)
- Twitter tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`)
- Dynamic `<script type="application/ld+json" id="seo-schema">` (removes static `static-schema` on hydration)

Shared constants: `src/lib/seo-config.ts`

### B. Schematic Layout Restructuring
- **`Index.tsx` / Home Sections**: Each section uses `<section>` tags with distinct IDs. ✅
- **Heading Hierarchy**: Single `<h1>` in `Hero.tsx`; sections use `<h2>`. ✅
- **Landmark Elements**: `<main>` in `Index.tsx`; `<nav>` in `Sidebar.tsx`; `<footer>` in `Footer.tsx`. ✅
- **Interactive Component IDs**: Partial — optional future audit.

---

## 3. SEO Metadata Map

| Route Path | Page Title | Meta Description | Primary Schema Type | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Ultimate Blend Ladies Beauty Salon \| Best Hair & Braiding Salon in Dubai | Welcome to Ultimate Blend Ladies Beauty Salon in Dubai... | `BeautySalon` | ✅ |
| `/about` | About Us \| Ultimate Blend Ladies Beauty Salon Dubai | Learn more about Ultimate Blend Ladies Beauty Salon... | `AboutPage` | ✅ |
| `/services` | Beauty Services in Dubai \| Ultimate Blend Ladies Beauty Salon | Explore our wide range of professional beauty services... | `WebPage` | ✅ |
| `/testimonials` | Client Reviews & Testimonials \| Ultimate Blend Ladies Beauty Salon | See what our happy clients say... | `WebPage` | ✅ |
| `/ourwork` / `/gallery` | Gallery & Portfolio \| Ultimate Blend Ladies Beauty Salon Dubai | Browse our portfolio... | `ImageGallery` | ✅ |
| `/contactus` / `/deira` | Contact & Location in Deira, Dubai \| Ultimate Blend Ladies Beauty Salon | Find our salon in Naif, Deira, Dubai... | `ContactPage` | ✅ |
| `/home-service-dubai` | Premium Home Beauty Services in Dubai \| Ultimate Blend Ladies Beauty Salon | Enjoy luxury beauty services in the comfort of your home... | `Service` | ✅ |
| `/salon-near-me` | Beauty Salon Near Me in Deira, Dubai \| Ultimate Blend Ladies Salon | Looking for a top-rated ladies beauty salon near you... | `BeautySalon` | ✅ |
| `/faq` | Best Hair Braiding in Deira \| Ultimate Blend Ladies Salon Dubai | Looking for the best hair braiding in Deira?... | `FAQPage` + `BeautySalon` | ✅ |
| `/booking` | Book an Appointment \| Ultimate Blend Ladies Beauty Salon Dubai | Easily book your hairdressing, braiding... | `WebPage` | ✅ |
| `/booking/confirm` | Booking Confirmed \| Ultimate Blend Ladies Beauty Salon | Your appointment has been successfully booked!... | `WebPage` (`noindex`) | ✅ |
| `/booking/cancel` | Booking Canceled \| Ultimate Blend Ladies Beauty Salon | Your appointment booking has been canceled... | `WebPage` (`noindex`) | ✅ |
| `/admin/*` | Admin \| Ultimate Blend Ladies Beauty Salon | Admin dashboard. | — (`noindex`) | ✅ |

---

## 4. Step-by-Step Implementation

### Step 1: Create the SEO Component ✅
### Step 2: Refactor Client Pages ✅
### Step 3: Semantic Structure Audits & Restructuring ✅ (core items)

---

## 5. Verification Plan

### Automated Checks
- Run `npm run build` to verify there are no compilation or bundling errors.

### Manual SEO & Schema Verification
- Inspect the `<head>` on different routes to ensure tags update correctly.
- Validate JSON-LD in the DOM (Google Rich Results Test).
- Confirm `/faq` FAQPage schema lists all 6 UI questions from `FAQ_ITEMS` in `seo-config.ts`.

### Deferred
- Prerender/SSR evaluation for crawlers that do not execute JavaScript.
