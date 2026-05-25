# ENTERPRISE TECHNICAL SEO & GSC RECOVERY ARCHITECTURE
## HẢI LAM ENGINEERING & CONSTRUCTION (HLEC)
**Domain:** `https://hailamec.com/`

---

## 1. RESOLVING GSC SITEMAP "COULDN'T FETCH" ERRORS
The "Couldn't fetch" error in Google Search Console for WordPress + Cloudflare + LiteSpeed setups is almost always caused by a firewall block, caching conflict, or incorrect HTTP headers.

### Step-by-Step Fix:
1. **Cloudflare Bot Fight Mode**: Go to Cloudflare > Security > Bots. Ensure "Bot Fight Mode" is not blocking Googlebot. Go to WAF (Web Application Firewall) and add a rule to **Allow** known bots (Googlebot, Bingbot).
2. **LiteSpeed Cache Exclusions**: In LiteSpeed, navigate to Cache > Excludes. Add `sitemap\.xml` and `sitemap_index\.xml` to **Do Not Cache URIs**. Sitemaps must *always* be generated dynamically by RankMath SEO or Yoast.
3. **RankMath Sitemap Flush**: Go to RankMath > Sitemap Settings. Change "Links Per Sitemap" to `200` (from the default default). Save changes. Go to Settings > Permalinks and simply click "Save Changes" to flush rewrite rules.
4. **Nginx/Apache Rules**: Ensure your server isn't caching XML globally.
5. **GSC Re-submission**: In GSC, type the exact URL `https://hailamec.com/sitemap_index.xml` (do not submit `sitemap.xml` directly if you use RankMath, it outputs `sitemap_index.xml`).

---

## 2. OPTIMIZED ROBOTS.TXT (WordPress + AI JS)
Place this in your virtual robots.txt (via RankMath > General Settings > Edit robots.txt):

```text
User-agent: *
Disallow: /wp-admin/
Disallow: /wp-login.php
Disallow: /?s=
Disallow: /search/
Allow: /wp-admin/admin-ajax.php
Allow: /assets/ # Ensure JS chunks for AI widgets can be crawled
Allow: /wp-content/uploads/

# Sitemaps
Sitemap: https://hailamec.com/sitemap_index.xml
```

---

## 3. HOMEPAGE SEO REWRITE & ENTITY STRUCTURE
**Meta Title:** Industrial Automation & PLC SCADA Integrator Vietnam | Hải Lam E&C
**Meta Description:** Leading AI engineering and industrial automation contractor in Vietnam. HLEC specializes in PLC/SCADA, Smart Factory IoT, and Electrical Instrumentation.

**H1:** Hải Lam Engineering & Construction (HLEC) - Advancing Vietnam's Industrial Automation
**H2:** Comprehensive PLC/SCADA & Smart Factory Solutions
**H3:** Siemens, Schneider, and Rockwell Integration Experts
**H2:** Industrial IoT, AI Analytics & Predictive Maintenance
**H2:** Electrical Engineering & Control Panel Manufacturing
**H2:** Precision Instrumentation & Calibration
**H2:** Try Our AI Engineering Assistant & Calculators

---

## 4. ENTITY SEO: JSON-LD ORGANIZATION SCHEMA
Inject this via RankMath or Header script to strictly define the brand entity. Google must know HLEC is Hải Lam E&C.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://hailamec.com/#organization",
      "name": "Hải Lam Engineering & Construction",
      "alternateName": ["HLEC", "Hải Lam E&C", "Hải Lam Engineering", "HLEC Vietnam", "Hải Lam Automation"],
      "url": "https://hailamec.com/",
      "logo": "https://hailamec.com/wp-content/uploads/logo.png",
      "sameAs": [
        "https://www.linkedin.com/company/hailamec/",
        "https://www.facebook.com/hailamec",
        "https://www.youtube.com/@hailamec"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+84-xxx-xxx-xxx",
        "contactType": "customer service",
        "areaServed": "VN",
        "availableLanguage": ["en", "vi"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://hailamec.com/#website",
      "url": "https://hailamec.com/",
      "name": "Hải Lam Engineering & Construction",
      "publisher": {
        "@id": "https://hailamec.com/#organization"
      }
    }
  ]
}
```

---

## 5. JAVASCRIPT SEO & AI WIDGET OPTIMIZATION
Googlebot uses Headless Chromium to render JS, but it has a timeout constraint. 

**Fixing Delayed Hydration for Googlebot:**
1. **Don't block Googlebot from JS:** The React assets (`.js`, `.css`) in your Vite build MUST be crawlable. (Added to robots.txt).
2. **Text Fallbacks:** The Flatsome HTML element containing the AI Widget or Calculators MUST have text fallbacks.
   ```html
   <div id="calculators-root" style="min-height: 500px">
      <h2>Engineering Calculators for Electrical Systems</h2>
      <p>Use HLEC's advanced engineering calculators for voltage drop, cable sizing, and motor full load currents.</p>
   </div>
   ```
   *Google reads the H2 and P tag immediately. When the JS loads, it replaces the div, but Google has already indexed the context.*
3. **Internal Linking for Programmatic SEO:** Give calculators static URLs (e.g., `hailamec.com/tools/cable-size`) and link to them from standard WordPress menu/footer links so Google discovers them natively without needing to execute JS.

---

## 6. LITESPEED & CLOUDFLARE OPTIMIZATION FOR SEO
**LiteSpeed Cache:**
- **Guest Mode:** Turn ON (servers localized cached pages super fast to first-time visitors/bots).
- **JS Defer:** Turn ON, but EXCLUDE the Vite applet script (`index-*.js`, `main-*.js`) so the calculator mounts reliably. (Defined in INTEGRATION_WP.md).
- **CSS Asynchronous:** Turn ON. Use Flatsome's Critical CSS generator.

**Cloudflare:**
- **Caching Level:** Standard.
- **Browser Cache TTL:** 1 Year (for static assets).
- **Always Online:** ON.
- **Crawler Hints:** ON (Proactively tells Google when content changes).

---

## 7. GSC WORKFLOW & RECOVERY TIMELINE
1. **Apply the Cache Exclusions** in Cloudflare and LiteSpeed for XML sitemaps.
2. Go to **RankMath > Sitemap**, save to flush.
3. Open **GSC > URL Inspection**, enter `https://hailamec.com/sitemap_index.xml` and click **Test Live URL**. Verify it returns a 200 OK, not a 403 (Cloudflare block) or 404.
4. **Submit Sitemap:** Add `sitemap_index.xml` in GSC.
5. **Force Homepage Crawl:** Inspect `https://hailamec.com/` and click "Request Indexing".
6. **Deploy SEO Landing Pages:** Add standard WordPress pages for each service (`/plc-scada-vietnam`) and submit them for indexing.

By treating "HLEC" as a semantic entity across Schema, GBP (Google Business Profile), and GSC, Google will interlink the acronym "HLEC" seamlessly to "Hải Lam Engineering & Construction".
