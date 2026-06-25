# Post-Deployment Validation Checks

Perform these checks immediately after deploying the codebase to verify all SEO, AEO, and GEO optimization improvements are active and valid.

## 1. Edge Middleware & Metadata Checks
Run a curl command simulation of Googlebot to verify that Vercel Edge Middleware correctly intercepts the request and injects route-specific SEO tags before returning the HTML.

- **Check Commands:**
  ```bash
  # Check index metadata
  curl -s -A "Googlebot" https://www.ultimateblendladiessalon.com/ | grep -i "<title>"
  
  # Check deep link metadata (e.g. Services)
  curl -s -A "Googlebot" https://www.ultimateblendladiessalon.com/services/knotless-braids | grep -i "<title>"
  ```
- **Expectation**: 
  - Home page returns: `<title>Ultimate Blend Ladies Beauty Salon | Best Hair & Braiding Salon in Dubai</title>`
  - Knotless page returns: `<title>Knotless Braids Services | Ultimate Blend Ladies Beauty Salon Dubai</title>`

## 2. 301 Redirect Consolidation Checks
Verify that the consolidated duplicate routes successfully redirect to their canonical equivalents.

- **Check URLs:**
  - `https://www.ultimateblendladiessalon.com/gallery` -> Should redirect immediately to `https://www.ultimateblendladiessalon.com/ourwork`
  - `https://www.ultimateblendladiessalon.com/deira` -> Should redirect immediately to `https://www.ultimateblendladiessalon.com/contactus`
- **Verification Tool:** Use the Network tab of browser DevTools (select "Preserve log") and check for `301 Moved Permanently` headers.

## 3. www Domain Unification Check
Verify that all requests to the non-www domain automatically force-redirect to the www domain.

- **Check URL:**
  - `https://ultimateblendladiessalon.com/` -> Should redirect immediately to `https://www.ultimateblendladiessalon.com/`

## 4. Structured Schema Validation
- Go to the **Google Rich Results Test** (`https://search.google.com/test/rich-results`) or **Schema Markup Validator** (`https://validator.schema.org/`).
- Test these URLs:
  - `https://www.ultimateblendladiessalon.com/` (Should detect `BeautySalon`, `FAQPage`, `BreadcrumbList`, and `VideoObject` schemas with zero warnings or errors).
  - `https://www.ultimateblendladiessalon.com/services/knotless-braids` (Should detect `Service` and `BreadcrumbList` schemas).

## 5. XML Sitemaps Verification
- Verify that both the standard sitemap and the dedicated video sitemap load successfully and return valid XML structure.
- **URLs:**
  - `https://www.ultimateblendladiessalon.com/sitemap.xml`
  - `https://www.ultimateblendladiessalon.com/video-sitemap.xml`
- **Search Console Submission**: Log into Google Search Console and submit/refresh both sitemap indexes to trigger a priority recrawl of the new URLs and video assets.
