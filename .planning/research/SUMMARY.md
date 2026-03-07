# Project Research Summary

**Project:** Juamez Landing Page (Professional Export Company Website)
**Domain:** B2B Agricultural Export Company Website
**Researched:** 2026-03-07
**Confidence:** HIGH

## Executive Summary

Juamez is a B2B agricultural export company website focusing on Colombian coffee and agricultural products for international buyers and Colombian suppliers. Expert consensus strongly recommends a **static-first (JAMstack) architecture** using Next.js 16 with Static Site Generation, prioritizing SEO performance and credibility over interactive features. The site succeeds or fails on trust signals—international buyers need proof of legitimacy (certifications, years in business, testimonials, real photos) before they'll submit an inquiry.

The recommended approach is **Next.js 16 + TypeScript + Tailwind CSS v4** deployed on Vercel, with a contact form handled via serverless functions and Resend for email delivery. This stack delivers 98-100 Lighthouse scores, sub-2-second load times, and perfect SEO while remaining simple enough for a small landing page. The critical path is: establish credibility through design and trust signals → make contact friction-free → optimize for international discoverability through technical SEO.

Key risks center on **credibility and performance**. Missing trust signals (no certifications displayed, stock photos instead of real products, unclear value proposition) cause immediate bounce. Poor mobile experience or slow load times lose 50%+ of international traffic. Content that doesn't clearly address dual audiences (buyers vs suppliers) confuses visitors. All of these are preventable through proper planning in Phase 1 (Content Strategy) and mobile-first development in Phase 2.

## Key Findings

### Recommended Stack

For a B2B credibility-focused site like Juamez, the optimal stack is **modern JAMstack with static-first architecture**. This prioritizes SEO performance, international accessibility, and minimal maintenance overhead over complex interactivity the site doesn't need.

**Core technologies:**
- **Next.js 16.1+**: React framework with SSR/SSG — industry standard for SEO-critical sites with automatic optimization, 98-100 Lighthouse scores, used by major brands
- **TypeScript 5.8+**: Type-safe JavaScript — reduces debugging time by 60%, prevents runtime errors, real-time IDE error detection
- **Tailwind CSS 4.2+**: Utility-first CSS framework — modern v4 with CSS variables, P3 colors, <10kB bundle size, 5x faster builds, mobile-first design system
- **React Hook Form 7.x+**: Form state management — minimal re-renders, lightweight, 1800ms mount vs 2070ms Formik, zero dependencies
- **Zod 3.24+**: Runtime validation — TypeScript-first, automatic type inference, <0.1ms validation overhead for contact forms
- **Resend**: Transactional email API — developer-friendly for contact form submissions, faster DX than SendGrid/Mailgun
- **Vercel**: Hosting and deployment — built by Next.js creators, 20-45s deploys, edge network, free tier sufficient

**Critical version requirements:**
- Next.js 16 includes React 19.2, providing Server Components that reduce JavaScript bundle size
- Tailwind CSS v4 brings significant performance improvements with Rust engine
- TypeScript 5.8+ required for compatibility with Next.js 16

**What to avoid:**
- Create React App (no longer maintained, no SSR/SSG)
- Gatsby (declining adoption, 3x slower builds)
- Client-side only React (terrible SEO, search engines see empty HTML)
- Styled Components/Emotion (runtime CSS-in-JS hurts performance)

### Expected Features

Research shows clear distinction between table stakes (missing these = incomplete product) and differentiators (set you apart from competitors).

**Must have (table stakes):**
- **Company Overview & History** — international buyers judge credibility on longevity and experience
- **Product Catalog/Showcase** — high-quality images, product categories (coffee, agricultural products), basic specifications
- **Contact/Inquiry Form** — primary CTA for B2B, 5-7 fields maximum (name, company, email, inquiry type, message)
- **Services Page** — export services offered, handling capabilities, target markets
- **Professional Mobile Design** — 75% of users judge credibility on design, 60%+ research happens on mobile
- **Trust Signals/Certifications** — ISO certifications, industry memberships, export licenses displayed prominently
- **Company Contact Information** — physical address, phone, email with company domain, business hours
- **Basic SEO** — meta tags, proper heading structure, descriptive content for international discoverability

**Should have (competitive advantages):**
- **Dual Audience Messaging** — clear paths for international buyers vs Colombian suppliers
- **Downloadable Product Specifications** — PDF datasheets with HS codes, certifications, detailed specs reduce back-and-forth
- **Customer Testimonials** — social proof from real buyers with photos, names, company names, countries
- **Supply Chain Transparency** — map/timeline showing process from Colombian farms → processing → export
- **Certifications Showcase** — Rainforest Alliance, Fair Trade, organic, specialty coffee certifications
- **Export Documentation Capabilities** — list of documentation handled (certificates of origin, phytosanitary, quality certs)

**Defer (v2+):**
- **Multilingual Support (ES/EN)** — add after analytics show international traffic or feedback requests it
- **Client Portal** — scoped as separate future project per PROJECT.md
- **Blog/News Section** — only if company has content to share (harvest updates, certifications)
- **Video Content** — facility tours, process videos have high production cost, evaluate ROI first
- **Live Chat** — only if inquiry volume justifies staffing requirements

**Anti-features (commonly requested but problematic):**
- E-commerce/online ordering — B2B export requires negotiation, not one-click checkout
- Real-time inventory/pricing — agricultural exports have variable pricing, seasonal availability
- Client portal in Phase 1 — premature for landing page, adds complexity
- Automated chatbot — B2B requires human expertise, complex questions, relationship building
- Auto-playing media — annoys users, hurts UX, increases bounce rate

### Architecture Approach

Static Site Generation (SSG) with Island Hydration is the optimal pattern for B2B credibility sites where content changes infrequently. Pre-render all pages to static HTML at build time, add minimal interactive "islands" only where needed (contact form). This delivers near-instant load times, excellent SEO, minimal server costs, and maximum security.

**Major components:**
1. **Shared Layout (Header/Footer)** — consistent navigation and footer across all pages, single source of truth
2. **Page Components** — static-first pages with unique hero sections and content (Home, About, Services, Products, Contact)
3. **Reusable Sections** — modular components (Hero, Product Grid, Social Proof, CTA sections) composed differently on each page
4. **Contact Form** — only interactive element, validated form with serverless backend integration
5. **Content Collections** — separate content from code using markdown/JSON for products, services, company info

**Project structure:**
```
src/
├── pages/ (each file = one route, pre-rendered at build)
├── components/layout/ (Header, Footer, Layout wrapper)
├── components/sections/ (Hero, ProductGrid, SocialProof, CTASection)
├── components/forms/ (ContactForm)
├── content/ (products/, services/, company/ in markdown/JSON)
└── assets/ (images, logos)
api/ (serverless contact form handler)
```

**Key architectural decisions:**
- **Static-First:** All pages pre-rendered for maximum SEO and performance
- **Component-Driven:** Atomic design principles for consistency across multi-page site
- **Headless Content:** Separate content from code for easier updates (optional CMS in v2)
- **Serverless Backend:** Contact form handler only, keeps main site static

**Scaling considerations:**
Reality check for B2B export sites: likely 0-10k visitors/month for years. Optimizing for massive scale is unnecessary. First bottleneck will be form spam (add CAPTCHA), second will be image load times (optimize to WebP/AVIF).

### Critical Pitfalls

Research identified 8 major pitfalls. Top 5 most critical for Juamez:

1. **Unclear Value Proposition and Generic Copy** — visitors can't determine in 5 seconds what makes Juamez different from any export company. State specific value in hero: "Colombian Coffee Exporter with 15+ Years Experience Serving 30+ Countries" not vague "Quality agricultural exports." Address both audiences explicitly. Test with 5-second rule.

2. **Missing or Inadequate Trust Signals** — 55% of B2B buyers don't trust website content without verification. Without visible certifications, years in business, client testimonials, physical location, and real photos, site feels like potential scam. Display physical address prominently, showcase years in business, include real client testimonials with photos and names, show certifications, use actual product photos not stock imagery.

3. **Performance Issues Destroying First Impressions** — site taking >3 seconds causes 53% abandonment before seeing content. Compress all images to <200KB, use WebP/AVIF formats, implement lazy loading, choose lightweight stack (static site generator), test on throttled 3G/4G connections common in agricultural regions. Aim for <2s initial load.

4. **Mobile Experience as Afterthought** — 60%+ of B2B research happens on mobile, but site only tested in browser DevTools not real devices. Design mobile-first, test on actual iOS/Android devices, ensure touch targets ≥44px, simplify contact forms for mobile, make phone numbers tappable (tel: links), verify forms work with mobile keyboards.

5. **Contact Form Mistakes Losing Qualified Leads** — form asks for unnecessary information, lacks privacy notice, fails silently without confirmation, or isn't GDPR compliant. Keep initial form minimal (name, email, company, country, message), add clear privacy notice, use explicit opt-in for marketing, implement spam protection (honeypot + reCAPTCHA fallback), show success message after submission, send confirmation email, ensure GDPR compliance.

**Additional critical pitfalls:**
6. **Poor SEO Foundation** — missing/duplicate title tags, no meta descriptions, images without alt text, poor URL structure
7. **Content Not Addressing Dual Audiences** — trying to speak to buyers AND suppliers with muddled generic content
8. **Launch Without Analytics** — no visibility into what's working, can't track contact form submissions or conversions

## Implications for Roadmap

Based on research findings, a 4-phase roadmap is optimal. This structure follows dependency chains from ARCHITECTURE.md, addresses pitfalls in order of criticality, and groups features logically.

### Phase 1: Foundation & Content Strategy (Week 1)

**Rationale:** Content strategy must come first. Pitfall #1 (unclear value proposition) and #7 (dual audience confusion) destroy credibility before design even matters. Architecture research shows design tokens and content structure enable all subsequent work. Can't build pages without knowing what they say.

**Delivers:**
- Clear value proposition and messaging architecture
- Dual-audience content strategy (buyers vs suppliers)
- Content requirements document (what content needed, format, who provides)
- Information architecture and URL structure
- Keyword research for SEO foundation
- Design system requirements (colors, typography, spacing)

**Addresses features:**
- Company Overview & History (define what to communicate)
- Services Page (map service offerings to audiences)
- Trust Signals strategy (identify what certifications/testimonials to gather)
- Dual Audience Messaging (create separate value props)

**Avoids pitfalls:**
- Pitfall #1: Unclear value proposition — define specific messaging upfront
- Pitfall #7: Dual audience confusion — map content to buyer vs supplier journeys
- Pitfall #6: Poor SEO — keyword research and URL structure planned from start

**Research flag:** Standard patterns, skip `/gsd:research-phase`. Content strategy for B2B export companies is well-documented.

---

### Phase 2: Design & Core Development (Week 1-2)

**Rationale:** Architecture research indicates build order: design tokens → layout → reusable components → pages. Mobile-first development prevents Pitfall #4. Performance requirements prevent Pitfall #3. Building foundation correctly enables parallel content work later.

**Delivers:**
- Design system implementation (Tailwind CSS v4 configuration)
- Shared Layout (Header with navigation, Footer with contact info)
- Reusable section components (Hero, Content blocks, Product Grid, Social Proof)
- All static pages (Home, About, Services, Products skeleton)
- Mobile-responsive design tested on real devices
- Performance optimization (image optimization, lazy loading)
- SEO technical foundation (metadata API, sitemap, robots.txt)
- Analytics implementation (Google Analytics or Plausible)

**Uses stack:**
- Next.js 16 with Static Site Generation (all pages pre-rendered)
- TypeScript 5.8+ (type safety)
- Tailwind CSS 4.2+ (design system)

**Implements architecture:**
- Static-First pattern (JAMstack)
- Component-Driven architecture (Atomic Design)
- Shared Layout component system

**Avoids pitfalls:**
- Pitfall #3: Performance issues — built-in optimization, tested before Phase 3
- Pitfall #4: Mobile afterthought — mobile-first development, real device testing
- Pitfall #6: Poor SEO foundation — technical SEO implemented from start
- Pitfall #8: No analytics — implemented before content population

**Research flag:** Standard patterns, skip `/gsd:research-phase`. Next.js + Tailwind setup is well-documented with extensive resources.

---

### Phase 3: Content Population & Trust Building (Week 2)

**Rationale:** With structure built, focus shifts to credibility. Pitfall #2 (missing trust signals) is addressed by gathering and displaying real content. Content must be ready before contact form to avoid launching with incomplete credibility.

**Delivers:**
- All page content written and populated
- Product descriptions and imagery (real photos, not stock)
- Company history and team information (with real team photos if available)
- Certifications and trust signals prominently displayed
- Service descriptions for both audiences
- Customer testimonials (gather from existing clients)
- Privacy policy and legal pages
- SEO-optimized content (unique titles, meta descriptions, alt text)

**Addresses features:**
- Product Catalog/Showcase (populate with actual products and images)
- Company Overview & History (complete with real content)
- Services Page (detailed service offerings)
- Trust Signals/Certifications (display prominently)
- Company Contact Information (complete and accurate)

**Avoids pitfalls:**
- Pitfall #2: Missing trust signals — real testimonials, photos, certifications gathered
- Pitfall #6: Poor SEO — all pages have unique metadata, optimized content
- Technical debt: Stock photos — replaced with real product/team photos where critical

**Research flag:** Standard patterns, skip `/gsd:research-phase`. B2B content best practices are well-established.

---

### Phase 4: Contact Form & Launch Readiness (Week 2-3)

**Rationale:** Contact form is the conversion point—must work perfectly. Pitfall #5 (form mistakes) can lose qualified leads. Launch only after comprehensive testing prevents Pitfall #8 (no tracking). This phase bundles all "looks done but isn't" checklist items.

**Delivers:**
- Contact form component (frontend with React Hook Form + Zod validation)
- Serverless contact form handler (API route)
- Email integration (Resend for delivery)
- Form spam protection (honeypot fields + Turnstile/reCAPTCHA)
- GDPR compliance (privacy notice, explicit consent, secure handling)
- Contact page (form + complete contact information)
- Comprehensive testing (cross-browser, mobile devices, form submission end-to-end)
- Performance verification (PageSpeed Insights, Core Web Vitals)
- Analytics verification (events firing, goals tracked)
- Pre-launch checklist completion

**Uses stack:**
- React Hook Form 7.x+ (form state management)
- Zod 3.24+ (validation)
- Resend (email delivery)
- Next.js Server Actions (form submission)

**Implements architecture:**
- Serverless contact form handler
- Client-side validation with server-side verification

**Avoids pitfalls:**
- Pitfall #5: Contact form mistakes — GDPR compliant, tested end-to-end, clear UX
- Pitfall #8: No analytics — verified tracking before launch
- All "looks done but isn't" checklist items — comprehensive testing

**Research flag:** May need `/gsd:research-phase` for email deliverability and spam protection strategies. Form submission patterns are well-documented, but GDPR compliance nuances and Resend integration may benefit from focused research.

---

### Phase Ordering Rationale

**Why this order:**
1. **Content before design:** Can't design pages without knowing what they say (ARCHITECTURE build order)
2. **Foundation before specifics:** Design system and layout enable parallel component work (dependency chains)
3. **Static before dynamic:** Build static pages before adding form complexity (ARCHITECTURE static-first pattern)
4. **Core before polish:** Get pages functional, then optimize performance and test (pitfall prevention sequence)
5. **Trust before conversion:** Establish credibility through content before asking for contact info (PITFALLS research)

**Why this grouping:**
- **Phase 1 isolated:** Content strategy is prerequisite for everything else
- **Phase 2 parallel-friendly:** Once design system exists, components can be built concurrently
- **Phase 3 content-focused:** Non-technical team can provide content while developers prepare Phase 4
- **Phase 4 integration:** Contact form touches multiple systems (validation, email, privacy), bundle together

**How this avoids pitfalls:**
- Addressing content strategy first prevents most critical pitfalls (#1, #7)
- Mobile-first development in Phase 2 prevents #4
- Performance built-in from Phase 2 prevents #3
- Content population in Phase 3 prevents #2
- Thorough testing in Phase 4 prevents #5, #8
- SEO woven throughout all phases prevents #6

### Research Flags

**Phases needing deeper research during planning:**
- **Phase 4 (Contact Form):** May benefit from `/gsd:research-phase` focused on:
  - Email deliverability best practices (SPF/DKIM configuration, avoiding spam filters)
  - Spam protection strategies (comparing honeypot, Turnstile, reCAPTCHA approaches)
  - GDPR compliance specifics for contact forms (data minimization, consent patterns)
  - Resend integration patterns and error handling

**Phases with standard patterns (skip research):**
- **Phase 1 (Content Strategy):** B2B content strategy is well-documented across sources
- **Phase 2 (Design & Development):** Next.js + Tailwind setup has extensive official documentation and tutorials
- **Phase 3 (Content Population):** Standard content writing and SEO optimization, no special research needed

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Official Next.js docs, Vercel benchmarks, extensive community validation. Stack recommendations are battle-tested for this use case. |
| Features | MEDIUM | Strong consensus on table stakes from B2B research, but specific agricultural export nuances come from fewer sources. MVP definition is solid. |
| Architecture | HIGH | Static-first JAMstack for credibility sites is well-established pattern. Component structure follows proven Atomic Design principles. Clear build order from dependency analysis. |
| Pitfalls | HIGH | Pitfalls are validated across multiple sources (PageSpeed Insights stats, GDPR compliance requirements, B2B trust research). Prevention strategies are proven. |

**Overall confidence:** HIGH

Research converges on clear recommendations across all four areas. The stack is industry-standard for this use case, architecture patterns are proven for B2B landing pages, and pitfalls are well-documented with established prevention strategies. Medium confidence on Features reflects that agricultural export is a specific niche, but core B2B patterns apply.

### Gaps to Address

**Stack-related:**
- **Image optimization tooling:** Research recommends WebP/AVIF formats and compression to <200KB, but doesn't specify exact Next.js image optimization configuration or build-time vs runtime optimization strategy. Address during Phase 2 implementation by consulting Next.js Image documentation.

**Feature-related:**
- **Multilingual timing:** Research suggests deferring ES/EN multilingual support to v1.x, but doesn't provide clear decision criteria for when to add it. Address by tracking analytics post-launch—if >30% traffic from international markets or user feedback requests it, prioritize in v1.1.
- **Product specification format:** Research recommends downloadable PDFs with HS codes and certifications, but actual HS codes and detailed specs must come from Juamez team. Gather during Phase 3 content population.

**Architecture-related:**
- **CMS decision point:** Research mentions optional headless CMS (Sanity, Contentful) for future, but doesn't provide decision criteria. Address by evaluating during Phase 3—if non-technical team members struggle with markdown updates, plan CMS integration for v2.

**Pitfall-related:**
- **Spam protection choice:** Research suggests honeypot fields + Turnstile/reCAPTCHA, but doesn't definitively recommend one approach. Consider `/gsd:research-phase` in Phase 4 to evaluate privacy-friendly options (Turnstile is invisible and GDPR-friendly vs reCAPTCHA requiring consent).
- **GDPR compliance specifics:** Research identifies requirements (privacy notice, explicit consent, data minimization) but doesn't provide implementation details for Resend integration. Address during Phase 4 by consulting GDPR-compliant form builder examples and Resend documentation.

**Content-related:**
- **Trust signal availability:** Research emphasizes displaying certifications, testimonials with photos, years in business, but actual availability must be confirmed with Juamez team. If certifications are in-progress or testimonials don't exist yet, pivot to emphasizing years in business and team expertise.

## Sources

All sources aggregated from four research files. See individual files for complete source lists.

### Primary (HIGH confidence)
- **Next.js Official Documentation** — framework features, performance benchmarks, SSG/SSR patterns
- **TypeScript 5.8 Release Announcement** — version compatibility, features
- **Tailwind CSS Official Documentation** — v4 features, configuration
- **React Hook Form Official Documentation** — form state management patterns
- **Zod Official Documentation** — validation schemas
- **Motion Official Website** — animation library features
- **Resend Official Website** — email API integration

### Secondary (MEDIUM confidence)
- **Astro vs Next.js comparison articles** — framework performance benchmarks, use case recommendations
- **TypeScript Best Practices 2026** — development patterns, strict mode configuration
- **Tailwind CSS v4 Migration guides** — v4 features, best practices
- **Best React form libraries 2026** — form library comparisons, performance benchmarks
- **B2B Website Trust Signals research** — credibility requirements, trust signal effectiveness
- **Core Web Vitals Optimization Guide 2026** — performance thresholds, optimization strategies
- **GDPR-compliant form builders** — privacy compliance patterns
- **Multilingual SEO best practices** — hreflang implementation, localization
- **Landing page conversion research** — B2B best practices, CTA optimization
- **Import/Export company website analysis** — industry-specific patterns
- **Agricultural export best practices** — traceability, supply chain transparency

### Tertiary (LOW confidence, needs validation)
- Some coffee export company examples referenced for feature patterns
- General B2B website mistake compilations (broad advice, not export-specific)

---

*Research completed: 2026-03-07*
*Ready for roadmap: yes*
