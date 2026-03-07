# Stack Research

**Domain:** Professional Landing Page / Company Website
**Researched:** 2026-03-07
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Next.js** | 16.1+ | React framework with SSR/SSG | Industry standard for SEO-critical sites. Automatic image/font/script optimization, built-in metadata APIs, 98-100 Lighthouse scores. Used by Netflix, TikTok, Uber, Nike, Starbucks. Turbopack provides 5-10x faster Fast Refresh. |
| **React** | 19.2+ | UI library | Ships with Next.js 16. Server Components reduce JavaScript bundle size dramatically, improving Core Web Vitals (critical for SEO ranking). |
| **TypeScript** | 5.8+ | Type-safe JavaScript | Reduces debugging time by 60% compared to plain JavaScript. IDE integration with real-time error detection. Strict mode prevents runtime errors. Compatible with all modern frameworks. |
| **Tailwind CSS** | 4.2+ | Utility-first CSS framework | Modern v4 uses CSS variables for theming, supports P3 wide-gamut colors, cascade layers for specificity control. Most projects ship <10kB CSS. 5x faster builds with Rust engine. Mobile-first, professional design system out of the box. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **React Hook Form** | 7.x+ | Form state management | Contact forms and lead generation. Minimal re-renders (1800ms mount vs 2070ms Formik). Lightweight with zero dependencies. Uncontrolled components by default. |
| **Zod** | 3.24+ | Runtime validation | Validate contact form inputs and API data. TypeScript-first with automatic type inference. <0.1ms validation overhead. 40M+ weekly downloads. |
| **Motion (Framer Motion)** | 11.x+ | Animation library | Professional page transitions, scroll animations, micro-interactions. GPU-accelerated 120fps animations. Gestures, springs, layout transitions included. 30.7k GitHub stars, 3.6M weekly downloads. |
| **next-seo** | 6.x+ | SEO metadata management | Simplifies Open Graph tags, Twitter cards, JSON-LD structured data. Server-side metadata rendering for optimal SEO. |
| **Resend** | Latest | Transactional email API | Contact form submissions. Developer-friendly API with React email templates. Official SDKs for Node.js. Fastest DX in category (vs SendGrid/Mailgun). |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| **Vercel** | Hosting & deployment | Built by Next.js creators. 20-45s average deploy time. Edge network for global performance. Free tier sufficient for landing pages. |
| **ESLint** | Code linting | Next.js comes with ESLint config. Enforce consistent code style. |
| **Prettier** | Code formatting | Auto-format on save. Integrates with ESLint. |
| **Storybook** | Component development | Develop UI components in isolation. Test variants, states, accessibility. |

## Installation

```bash
# Create Next.js project with TypeScript and Tailwind
npx create-next-app@latest juamez --typescript --tailwind --app --eslint

# Core dependencies
npm install react-hook-form zod @hookform/resolvers
npm install motion
npm install next-seo
npm install resend

# Dev dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D prettier eslint-config-prettier
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| **Next.js 16** | Astro 5 | If site is 100% static with zero interactivity. Astro is 2-3x faster for pure content sites (0.5s vs 1.5s first render). But Next.js provides more flexibility for future features (contact forms, CMS integration). |
| **Next.js 16** | Gatsby | AVOID. Slower builds (3x slower than Next.js), declining adoption, maintenance concerns. Next.js dominates the React SSG/SSR space. |
| **Vercel** | Netlify | If you need built-in form handling, A/B testing, or prefer commercial-friendly free tier. Netlify has more built-in features but slower deploys (68s vs 20-45s). |
| **Resend** | SendGrid | If you need enterprise features like dedicated IPs, advanced analytics, or high-volume sending (100K+/month). SendGrid is feature-rich but worse developer experience. |
| **Tailwind CSS** | CSS Modules | If team strongly prefers traditional CSS or has existing CSS design system. But Tailwind v4 provides superior DX and performance. |
| **React Hook Form** | Formik | AVOID. Formik is slower (2070ms mount vs 1800ms) and has more re-renders. React Hook Form is the current standard. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **Create React App** | No longer maintained. No SSR/SSG support = poor SEO. React team recommends frameworks instead. | Next.js 16 |
| **Gatsby** | Declining adoption, slow builds for static sites, GraphQL overhead for simple content. | Next.js 16 or Astro 5 |
| **Formik** | Slower performance, more re-renders, larger bundle size than React Hook Form. | React Hook Form |
| **Styled Components / Emotion** | Runtime CSS-in-JS hurts performance. Adds JavaScript overhead. | Tailwind CSS v4 |
| **SendGrid (for small projects)** | Complex API, poor DX, overkill for contact forms. Verified sender requirements add friction. | Resend |
| **Client-side only React** | Search engines see empty HTML shell. Terrible for SEO. No pre-rendering = slow initial load. | Next.js with SSR/SSG |

## Stack Patterns by Use Case

**If building multi-page company website with SEO priority:**
- Use Next.js 16 App Router with Static Site Generation (SSG)
- generateStaticParams for all pages
- Metadata API for SEO tags
- next/image for automatic optimization
- Because: Pre-rendered pages = instant load + perfect SEO

**If content will be managed by non-technical users (future CMS):**
- Add Sanity or Contentful headless CMS
- Use Next.js ISR (Incremental Static Regeneration)
- Webhook-based revalidation on content changes
- Because: Editors update content, site rebuilds automatically

**If forms are critical (lead generation focus):**
- React Hook Form + Zod for validation
- Resend for email delivery
- Server Actions for form submission (no API routes needed)
- Because: Type-safe, fast, great UX with inline validation

**If animation/interactivity is important for brand:**
- Motion (Framer Motion) for page transitions
- Scroll-triggered animations for product showcases
- Micro-interactions on buttons/cards
- Because: Professional polish without performance penalty

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Next.js 16.1+ | React 19.2+ | Next.js 16 includes React 19.2 |
| TypeScript 5.8+ | Next.js 16.1+ | Next.js has built-in TypeScript support |
| Tailwind CSS 4.2+ | Next.js 16+ | Configured automatically with create-next-app |
| React Hook Form 7.x+ | React 19.2+ | Full compatibility with React 19 |
| Zod 3.24+ | TypeScript 5.5+ | Tested against TS 5.5+, works with 5.8+ |
| Motion 11.x+ | React 19+ | Supports React Server Components |

## Performance Benchmarks (2026)

| Metric | Next.js 16 + This Stack | Industry Average |
|--------|-------------------------|------------------|
| Lighthouse Score | 98-100 | 80-90 |
| First Contentful Paint | 0.5-1.0s | 1.5-2.5s |
| Cumulative Layout Shift | <0.09 | 0.15-0.25 |
| JavaScript Bundle | 50-80kB | 150-300kB |
| CSS Bundle | <10kB (Tailwind) | 50-100kB |
| Build Time (10 pages) | 5-15s (Turbopack) | 30-60s |
| Deploy Time | 20-45s (Vercel) | 60-120s |

## SEO Optimization Stack

| Feature | Implementation | Why |
|---------|---------------|-----|
| **Metadata** | Next.js Metadata API + next-seo | Server-rendered meta tags, OG images, Twitter cards |
| **Sitemap** | Next.js sitemap.ts | Auto-generated XML sitemap for search engines |
| **Robots.txt** | Next.js robots.ts | Control crawler access |
| **Structured Data** | JSON-LD via next-seo | Rich snippets in search results |
| **Image Optimization** | next/image component | Automatic WebP/AVIF, lazy loading, responsive sizes |
| **Performance** | Next.js built-in optimization | Core Web Vitals optimization (ranking factor) |

## Project-Specific Recommendations for Juamez

Based on the project requirements (professional export company landing page):

### Must Have:
1. **Next.js 16 with Static Generation** - All pages pre-rendered for maximum SEO
2. **Tailwind CSS v4** - Professional design system, mobile-first
3. **TypeScript** - Prevent bugs, improve maintainability
4. **React Hook Form + Zod** - Contact form with validation
5. **Resend** - Email delivery for contact inquiries
6. **Vercel** - Free hosting, automatic deployments from Git
7. **next-seo** - Metadata management for international discoverability

### Nice to Have:
1. **Motion (Framer Motion)** - Subtle animations for professionalism
2. **Sanity CMS** - If non-technical team members need to update content later

### Skip for MVP:
1. **Storybook** - Overkill for small landing page
2. **i18n** - Wait until Colombian suppliers vs international buyers need separate languages
3. **Analytics** - Add Vercel Analytics later when measuring traffic
4. **A/B testing** - Premature optimization for MVP

## Sources

**Framework & Performance:**
- [Astro vs Next.js: Which Framework Should You Use in 2026?](https://pagepro.co/blog/astro-nextjs/) — MEDIUM confidence
- [Next.js 16 Official Announcement](https://nextjs.org/blog/next-16) — HIGH confidence
- [Next.js Official Documentation](https://nextjs.org/) — HIGH confidence
- [Astro vs. Next.js: Features, performance, and use cases compared](https://www.contentful.com/blog/astro-next-js-compared/) — MEDIUM confidence

**TypeScript & Development:**
- [TypeScript Best Practices for 2026](https://www.bacancytechnology.com/blog/typescript-best-practices) — MEDIUM confidence
- [TypeScript 5.8 Release Announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-5-8/) — HIGH confidence
- [Web Development Best Practices 2026](https://pagepro.co/blog/web-development-best-practices/) — MEDIUM confidence

**Styling & UI:**
- [Tailwind CSS Official Documentation](https://tailwindcss.com/) — HIGH confidence
- [Tailwind CSS v4 2026: Migration Best Practices](https://www.digitalapplied.com/blog/tailwind-css-v4-2026-migration-best-practices) — MEDIUM confidence
- [Tailwind CSS Best Practices 2025-2026](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns) — MEDIUM confidence

**Forms & Validation:**
- [The best React form libraries of 2026](https://blog.croct.com/post/best-react-form-libraries) — MEDIUM confidence
- [React Hook Form Official Documentation](https://react-hook-form.com/) — HIGH confidence
- [Zod Official Documentation](https://zod.dev/) — HIGH confidence
- [How to Validate API Requests with Zod in Node.js (2026 Guide)](https://dev.to/1xapi/how-to-validate-api-requests-with-zod-in-nodejs-2026-guide-3ibm) — MEDIUM confidence

**Animation:**
- [Motion Official Website](https://motion.dev/) — HIGH confidence
- [Comparing the best React animation libraries for 2026](https://blog.logrocket.com/best-react-animation-libraries/) — MEDIUM confidence

**Email & Hosting:**
- [Resend Official Website](https://resend.com) — HIGH confidence
- [Resend vs SendGrid: Developer Email Showdown 2026](https://xmit.sh/versus/resend-vs-sendgrid) — MEDIUM confidence
- [Vercel vs Netlify in 2026: Features, Pricing & Use Cases](https://www.clarifai.com/blog/vercel-vs-netlify) — MEDIUM confidence

**CMS & Content:**
- [Headless CMS 2026: Sanity vs Contentful vs Payload](https://www.digitalapplied.com/blog/headless-cms-2026-sanity-contentful-payload-comparison) — MEDIUM confidence
- [Best Headless CMS for Developers in 2026](https://prismic.io/blog/best-headless-cms-for-developers) — MEDIUM confidence

**SEO:**
- [Next.js SEO Optimization Guide (2026 Edition)](https://www.djamware.com/post/697a19b07c935b6bb054313e/next-js-seo-optimization-guide--2026-edition) — MEDIUM confidence
- [React SEO Guide: SSR, Performance & Rankings (2026)](https://www.linkgraph.com/blog/seo-for-react-applications/) — MEDIUM confidence

---
*Stack research for: Juamez Landing Page (Professional Export Company Website)*
*Researched: 2026-03-07*
