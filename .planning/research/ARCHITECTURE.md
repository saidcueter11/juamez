# Architecture Research

**Domain:** Professional Multi-Page B2B Export Company Website
**Researched:** 2026-03-07
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │  Home   │  │  About  │  │Services │  │ Contact │        │
│  │  Page   │  │  Page   │  │  Page   │  │  Page   │        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│       │            │            │            │              │
├───────┴────────────┴────────────┴────────────┴──────────────┤
│                   COMPONENT LIBRARY                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Shared   │  │  Hero    │  │  Social  │  │  Contact │    │
│  │ Layout   │  │ Section  │  │  Proof   │  │   Form   │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
│       │             │              │             │          │
├───────┴─────────────┴──────────────┴─────────────┴──────────┤
│                      DATA LAYER                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Static Content (MD/JSON/CMS)                │    │
│  │   • Page Content  • Product Info  • Company Data    │    │
│  └─────────────────────────────────────────────────────┘    │
│                            ↓                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Contact Form Handler (Serverless)           │    │
│  │   • Validation  • Email Service  • CRM Integration  │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Shared Layout** | Global navigation, footer, common UI elements | React/Vue/Svelte layout wrapper with consistent header/footer |
| **Page Components** | Page-specific content and structure | Static-first pages with unique hero, content sections |
| **Hero Section** | Above-fold content with CTA | Reusable component with configurable messaging and visuals |
| **Social Proof** | Trust signals (years in business, certifications, testimonials) | Component displaying company credibility markers |
| **Contact Form** | Lead capture and inquiry handling | Validated form with serverless backend integration |
| **Product Showcase** | Display product range with imagery | Grid/card layout component for agricultural products |
| **Content Sections** | Modular page sections | Reusable blocks (text + image, feature grid, etc.) |

## Recommended Project Structure

### Static-First (JAMstack) Architecture

For a B2B credibility-focused site like Juamez, the **Static-First (JAMstack)** architecture is optimal:

```
juamez-website/
├── src/
│   ├── pages/              # Individual page routes
│   │   ├── index.astro     # Home page
│   │   ├── about.astro     # About page
│   │   ├── services.astro  # Services page
│   │   └── contact.astro   # Contact page
│   ├── components/         # Reusable UI components
│   │   ├── layout/         # Layout components
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── Layout.astro
│   │   ├── sections/       # Page section components
│   │   │   ├── Hero.astro
│   │   │   ├── ProductGrid.astro
│   │   │   ├── SocialProof.astro
│   │   │   └── CTASection.astro
│   │   └── forms/          # Form components
│   │       └── ContactForm.astro
│   ├── content/            # Content collections (markdown/JSON)
│   │   ├── products/       # Product descriptions
│   │   ├── services/       # Service offerings
│   │   └── company/        # Company info, history
│   ├── assets/             # Images, brand assets
│   │   ├── images/
│   │   └── logos/
│   └── styles/             # Global styles, tokens
│       ├── global.css
│       └── tokens.css      # Design tokens (colors, spacing)
├── api/                    # Serverless functions
│   └── contact.js          # Contact form handler
└── public/                 # Static assets served as-is
    ├── favicon.ico
    └── robots.txt
```

### Structure Rationale

- **pages/:** Each file = one route. Clear 1:1 mapping. Pre-rendered at build time for maximum performance and SEO.
- **components/layout/:** Shared across all pages. Single source of truth for navigation and footer consistency.
- **components/sections/:** Modular, reusable page sections. Can be composed differently on each page while maintaining visual consistency.
- **content/:** Separates content from presentation. Allows non-technical updates to product/service info without touching code.
- **api/:** Serverless functions for dynamic needs (contact form submission). Keeps main site static while enabling interactivity.

## Architectural Patterns

### Pattern 1: Static Site Generation (SSG) with Island Hydration

**What:** Pre-render all pages to static HTML at build time. Add minimal interactive "islands" only where needed (e.g., contact form).

**When to use:** B2B marketing sites, landing pages, company credibility sites where content changes infrequently (daily/weekly, not real-time).

**Trade-offs:**
- **Pros:** Near-instant load times, excellent SEO, minimal server costs, maximum security
- **Cons:** Requires rebuild to update content, not suitable for real-time personalization

**Recommended for Juamez:** Yes. Content (products, services, company history) changes infrequently. Contact form is the only interactive element.

**Example:**
```typescript
// pages/index.astro - Pre-rendered at build time
---
import Layout from '../components/layout/Layout.astro';
import Hero from '../components/sections/Hero.astro';
import ProductGrid from '../components/sections/ProductGrid.astro';
import { getCollection } from 'astro:content';

const products = await getCollection('products');
---

<Layout title="Juamez - Colombian Agricultural Exports">
  <Hero
    title="Premium Colombian Agricultural Exports"
    subtitle="Trusted partner for international buyers and Colombian suppliers"
    ctaText="Learn More"
  />
  <ProductGrid products={products} />
</Layout>
```

### Pattern 2: Component-Driven Architecture with Atomic Design

**What:** Break UI into small, reusable components organized by complexity (atoms → molecules → organisms → templates → pages).

**When to use:** Any project requiring design consistency across multiple pages.

**Trade-offs:**
- **Pros:** Maximum reusability, consistent design, easier maintenance, testable components
- **Cons:** Initial setup overhead, can be overkill for single-page sites

**Recommended for Juamez:** Yes. Multi-page site requires consistent components (navigation, hero, product cards, CTAs).

**Example:**
```typescript
// components/sections/Hero.astro - Organism level
---
interface Props {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink?: string;
  backgroundImage?: string;
}

const { title, subtitle, ctaText, ctaLink = '/contact', backgroundImage } = Astro.props;
---

<section class="hero" style={backgroundImage ? `background-image: url(${backgroundImage})` : ''}>
  <div class="hero-content">
    <h1>{title}</h1>
    <p class="subtitle">{subtitle}</p>
    <a href={ctaLink} class="cta-button">{ctaText}</a>
  </div>
</section>
```

### Pattern 3: Headless Content Management with Git-Based CMS

**What:** Separate content from code. Store content in markdown/JSON files managed through a Git-based CMS (e.g., Decap CMS, Tina CMS) or traditional headless CMS.

**When to use:** When non-technical team members need to update content without developer involvement.

**Trade-offs:**
- **Pros:** Content team autonomy, version control for content, preview before publish
- **Cons:** Additional setup complexity, requires CMS configuration

**Recommended for Juamez:** Optional for Phase 1, beneficial for Phase 2+. If Juamez team needs to update product listings or service descriptions regularly without developer help.

**Example:**
```yaml
# content/products/colombian-coffee.md
---
title: "Colombian Arabica Coffee"
category: "Coffee"
description: "Premium single-origin Arabica coffee from Colombian highlands"
certifications: ["Fair Trade", "Organic"]
image: "/images/products/coffee-arabica.jpg"
---

Our flagship product, sourced from sustainable farms in Colombia's coffee triangle...
```

## Data Flow

### Request Flow (Static-First)

```
[User Request: /about]
    ↓
[CDN serves pre-built HTML] ← (Built at deploy time)
    ↓
[Browser renders page instantly]
    ↓
[Optional: Hydrate interactive islands (contact form)]
```

### Contact Form Submission Flow

```
[User fills contact form]
    ↓
[Client-side validation]
    ↓
[Submit to /api/contact]
    ↓
[Serverless function validates]
    ↓
[Send email via service (SendGrid/Resend)]
    ↓
[Optional: Add to CRM]
    ↓
[Return success/error to user]
```

### Content Update Flow

```
[Developer/CMS updates content]
    ↓
[Git commit triggers build]
    ↓
[Build process: Generate static pages]
    ↓
[Deploy to CDN]
    ↓
[Users see updated content on next visit]
```

### Key Data Flows

1. **Page Load:** User requests page → CDN serves static HTML → Browser renders immediately (no server processing)
2. **Form Submission:** User submits → Serverless function processes → Email sent → Response to user
3. **Content Update:** Content changes → Rebuild triggered → New static files deployed to CDN

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-10k visitors/month | Static site on CDN (Vercel/Netlify). Single contact form handler. No optimization needed. |
| 10k-100k visitors/month | Add image optimization (WebP, lazy loading). Consider form spam protection (Turnstile/reCAPTCHA). Monitor serverless function costs. |
| 100k+ visitors/month | Implement edge caching strategies. Add rate limiting to form endpoint. Consider upgrading to professional CDN tier. |

### Scaling Priorities

1. **First bottleneck:** Form spam/abuse. Add CAPTCHA or honeypot fields to contact form.
2. **Second bottleneck:** Image load times. Implement responsive images, WebP format, CDN-based image optimization.
3. **Third bottleneck (unlikely for B2B site):** CDN bandwidth costs. Optimize asset sizes, implement aggressive caching.

**Reality check:** A B2B export company credibility site will likely stay in the 0-10k range for years. Over-engineering for scale is unnecessary.

## Anti-Patterns

### Anti-Pattern 1: Over-Engineering with Complex State Management

**What people do:** Implement Redux/Zustand/Pinia for a static multi-page marketing site.

**Why it's wrong:** Marketing sites have minimal state (maybe theme preference, language selection). Complex state management adds unnecessary complexity, bundle size, and maintenance burden for zero benefit.

**Do this instead:** Use browser-native features (localStorage for preferences, URL parameters for state). If framework state needed, use built-in solutions (React Context, Vue provide/inject).

### Anti-Pattern 2: Client-Side Rendering (SPA) for SEO-Critical Pages

**What people do:** Build as a single-page React/Vue app with client-side routing.

**Why it's wrong:** B2B buyers and international partners discover companies through Google. SPAs require JavaScript to render content, hurting SEO and initial load performance. Search engines can crawl them, but static HTML is always better.

**Do this instead:** Use SSG or SSR. Pre-render all pages to HTML. Reserve client-side interactivity for specific components (forms, modals).

### Anti-Pattern 3: Building Custom CMS from Scratch

**What people do:** Create admin panel with database for managing simple content like "About Us" or product listings.

**Why it's wrong:** Massive development overhead for features that Git-based or headless CMS provide out of the box. Security burden. Maintenance nightmare.

**Do this instead:** Use markdown files in Git (simplest), or adopt a headless CMS (Decap CMS, Sanity, Contentful). For Juamez's scale, markdown files are likely sufficient.

### Anti-Pattern 4: Not Separating Content from Code

**What people do:** Hard-code all content (product descriptions, company history) directly in component files.

**Why it's wrong:** Every content change requires developer involvement, code review, deployment. Non-scalable. Couples content updates to code changes.

**Do this instead:** Extract content to separate files (markdown, JSON) or CMS. Developers build structure once, content team updates content independently.

### Anti-Pattern 5: Treating All Pages the Same

**What people do:** Apply same rendering strategy (SSR, SSG, or CSR) to all pages regardless of characteristics.

**Why it's wrong:** Different pages have different needs. Home/About pages are static and SEO-critical (use SSG). Contact form needs interactivity (hybrid with island hydration). Future customer portal needs authentication (SSR or CSR).

**Do this instead:** Choose rendering strategy per page based on update frequency, interactivity needs, and SEO importance.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Email Service** (SendGrid, Resend, AWS SES) | Serverless function calls API on form submission | Use environment variables for API keys. Implement retry logic. |
| **Analytics** (Google Analytics, Plausible) | Client-side script tag or server-side tracking | Privacy-focused analytics (Plausible, Fathom) better for GDPR compliance. |
| **Headless CMS** (Optional: Decap, Sanity, Contentful) | Fetch content at build time via API | Cache responses. Use webhooks to trigger rebuilds on content changes. |
| **Form Spam Protection** (Cloudflare Turnstile, hCaptcha) | Client-side widget + server-side verification | Turnstile is invisible and privacy-friendly. Verify token server-side. |
| **CRM** (Optional: HubSpot, Salesforce) | Serverless function sends lead data to CRM API | Async operation. Don't block form submission on CRM success. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Pages ↔ Components** | Props/attributes | One-way data flow. Pages pass data down to presentational components. |
| **Components ↔ Content** | Build-time imports or content collections | Content fetched at build time, passed to components as props. |
| **Client ↔ API** | HTTP POST (JSON) | Contact form submits to serverless function. Validate client-side AND server-side. |
| **Layout ↔ Pages** | Framework-specific layout system | Layout wraps pages. Navigation state managed in layout component. |

## Build Order Implications for Roadmap

### Suggested Component Build Order

Based on dependencies and reusability, build in this sequence:

**Phase 1: Foundation (Week 1)**
1. **Design tokens** (colors, typography, spacing) → Everything depends on this
2. **Shared Layout** (Header, Footer, navigation) → Needed for all pages
3. **Basic page structure** (Home page skeleton) → Validates layout system

**Phase 2: Core Components (Week 1-2)**
4. **Hero component** → Most pages start with hero
5. **Content section components** (text + image blocks, grids) → Reused across pages
6. **Social proof component** (trust signals) → Critical for credibility

**Phase 3: Content Pages (Week 2)**
7. **Home page** (assemble with existing components)
8. **About page** (company history, team)
9. **Services page** (export services, product range)

**Phase 4: Interactivity (Week 2-3)**
10. **Contact form component** (frontend validation)
11. **Contact form API** (serverless function, email integration)
12. **Contact page** (form + contact info)

**Phase 5: Polish (Week 3)**
13. **Image optimization** (responsive images, lazy loading)
14. **SEO metadata** (OpenGraph, meta tags)
15. **Performance optimization** (minimize bundles, check Core Web Vitals)

### Why This Order

- **Foundation first:** Design tokens and layout enable parallel work on components
- **Reusable before specific:** Hero, content sections used on multiple pages
- **Static before dynamic:** Build static pages before adding form complexity
- **Core before polish:** Get pages functional before optimizing performance

### Dependencies Between Components

```
Design Tokens
    ↓
Layout (Header/Footer)
    ↓
┌───────────┬───────────┬───────────┐
│   Hero    │  Content  │  Social   │
│ Component │ Sections  │   Proof   │
└─────┬─────┴─────┬─────┴─────┬─────┘
      │           │           │
      └───────────┴───────────┴──────→ Pages (Home, About, Services)
                                            ↓
                                       Contact Form
                                            ↓
                                       Contact Page
```

## Sources

### Architecture Patterns
- [The Complete Guide to Frontend Architecture Patterns in 2026](https://dev.to/sizan_mahmud0_e7c3fd0cb68/the-complete-guide-to-frontend-architecture-patterns-in-2026-3ioo)
- [A guide to modern frontend architecture patterns - LogRocket Blog](https://blog.logrocket.com/guide-modern-frontend-architecture-patterns/)
- [Exploring Modern Web App Architectures: Trends and Best Practices for 2026](https://tech-stack.com/blog/modern-application-development/)

### B2B Website Best Practices
- [B2B Web Design Trends, Best Practices & Examples in 2026](https://www.windmillstrategy.com/top-9-b2b-web-design-trends/)
- [18 Best B2B Websites in 2026: Examples & Best Practices](https://www.tilipmandigital.com/resource-center/articles/best-b2b-websites)
- [B2B Website Best Practices 2026: Design for Lead Generation](https://websmitherz.com/business-solutions-performance/b2b-website-best-practices-2026/)
- [Guide to B2B Website Design: Structure, Content, and Best Practices](https://beetlebeetle.com/post/b2b-website-design-guide-structure-content-best-practices)

### Landing Page Architecture
- [10 Best Landing Page Designs in 2026](https://www.thethunderclap.com/blog/best-landing-page-designs)
- [What makes a good landing page in 2026? - 9 Components](https://landingi.com/blog/components-of-an-effective-landing-page/)
- [High-Converting SaaS Landing Pages: 2026 Best Practices](https://www.saashero.net/design/enterprise-landing-page-design-2026/)

### Static Site Generation & Headless CMS
- [Headless CMS vs. static site generator: how to get the best of both worlds](https://www.contentstack.com/cms-guides/headless-cms-vs-static-site-generator)
- [Our Top 12 picks for Static Site Generators (SSGs) in 2026](https://hygraph.com/blog/top-12-ssgs)
- [Headless CMS Architecture Guide for Multisite and Modern Frontends](https://focusreactive.com/blog/headless-cms-architecture/)

### Component Architecture & Design Systems
- [Building the Ultimate Design System: A Complete Architecture Guide for 2026](https://medium.com/@padmacnu/building-the-ultimate-design-system-a-complete-architecture-guide-for-2026-6dfcab0e9999)
- [A Complete Introduction to Web Components in 2026](https://kinsta.com/blog/web-components/)
- [Dealing with Dependencies Inside Design Systems](https://medium.com/eightshapes-llc/dealing-with-dependencies-inside-design-systems-aa6ce2cf7bc3)

### Agricultural Export Company Best Practices
- [Farming and Agriculture Website Design Examples](https://muffingroup.com/blog/agriculture-websites/)
- [Traceability, Authenticity, and the Fight Against Counterfeits: Building Trust in Modern Agriculture](https://elevatozagritech.com/resources/blog/traceability-authenticity-and-the-fight-against-counterfeits-building-trust-in-modern-agriculture)

---
*Architecture research for: Professional Multi-Page B2B Export Company Website*
*Researched: 2026-03-07*
