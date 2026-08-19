Phase 1 — Fix current website functionality--------------------------
Global loading screen-----
Global error page--------
Custom 404 page----------
Fix all dead CTA buttons------
Fix Footer links--------
Fix WhatsApp/Instagram links---------
Fix Process anchor-----------
Fix ESLint errors-------


Phase 2 — Contact/security----------------
Add proper form validation--------
Escape HTML in emails-------
Add honeypot/rate protection-------
Add security headers--------
Test Resend thoroughly------


Phase 3 — SEO & launch basics--------------
Page metadata
robots.ts
sitemap.ts
Open Graph metadata
Favicon
.env.example
Proper README


Phase 4 — Content finalization--------------
Real phone number----
Real Instagram-----
Real WhatsApp-----
Real social links
Real testimonials
Decide/remove "Trusted By 250+ Companies"
Actual project images/data/URLs


Phase 5 — Final testing---------
Desktop
Tablet
Mobile 320–375px
Forms
Navigation
Links
Build
Git commit
Production deployment

Phase 6 — Future---------------
Admin dashboard
Backend/API
Database
Dynamic projects/services/testimonials


=====================================================================
FULL AUDIT — Frontend vs. docs/projectinfo.md, docs/UI_Design_System.md
Checked: Aug 18, 2026 · frontend/ only (backend is Phase 6, not built yet)
Build/Lint/TypeCheck: eslint, tsc --noEmit, next build — all pass, 0 errors
=====================================================================

SUMMARY----------------------------------------------------------------
No bug crisis — the code is clean and builds green. The real gap is
content: fake testimonials, invented client logos, a "Trusted by 250+
Companies" claim, dummy portfolio projects linking to example.com, and
a contact form that can't actually deliver email to a real visitor yet
(Resend sandbox sender). Fix those and this is close to launch-ready.


P0 — BEFORE ANYONE ELSE SEES THIS-------------------------------------

1. Rotate the Resend API key; stop leaving live keys in a readable file
   Where: frontend/.env.local
   Why:   A live RESEND_API_KEY sits in plaintext. Not git-tracked
          (correctly gitignored), but treat it as burned if it's been
          on a shared machine/screen — rotate in the Resend dashboard,
          keep the new one only in the deploy platform's secret store.

2. Verify a real sending domain in Resend — stop sending from
   onboarding@resend.dev
   Where: app/api/contact/route.ts:164, :214
   Why:   Resend's shared sandbox address can only deliver to the
          account owner's own verified email. It CANNOT send the
          client auto-reply to an arbitrary visitor's address — that
          email silently fails for every real submission today. This
          is exactly "Test Resend thoroughly" from Phase 2 above.

3. Remove or replace the fake "Trusted By 250+ Companies" marquee
   Where: components/sections/TrustedCompanies.tsx
   Why:   Homepage shows Zapier, Spotify, Zoom, Slack, Amazon, Adobe
          as logos under that badge. If ONTO DIGITAL hasn't actually
          worked with these companies, this is a false client claim,
          not unfinished content. Already flagged above as
          "Decide/remove Trusted By 250+ Companies" — decide now.


P1 — FIX BEFORE LAUNCH--------------------------------------------------

4. Replace the four fake testimonials with real client quotes (or
   remove the section)
   Where: components/sections/Testimonials.tsx:6-39
   Why:   "Dianne Russell / Velora", "Jacob Jones / Cloudix" etc. are
          stock names + stock headshots (pf1-pf4.png). Same issue
          category as item 3.

5. Replace seed project data with real portfolio entries, images, URLs
   Where: data/projects.ts
   Why:   All 9 projects link to *.example.com and reuse only 3
          screenshots (p1-p3.png) on rotation — every project card is
          a dead external link today. services/projects.ts already
          isolates this behind a clean data-access seam; swapping the
          array is a one-file change once real work exists.

6. Wire up the dead CTAs
   Where: Testimonials.tsx:94 (VIEW ALL TESTIMONIALS) ·
          Work.tsx:91 (project ↗ buttons) ·
          ServiceCollection.tsx:81 (LEARN MORE) ·
          Footer.tsx:28-29,35-36 (Blog, Careers, Documentation, Help Center)
   Why:   All render as clickable buttons/links with no onClick/href,
          or point at href:"#". Link them somewhere real or remove
          until the target exists.

7. Surface the real error message from the contact API
   Where: components/forms/ContactForm.tsx:91-96
   Why:   The API already returns specific messages ("Please enter a
          valid email address.", "Too many requests..."), but the
          form discards result.message on failure and always shows a
          generic "Unable to send your message." string.

8. Load the actual brand typefaces — Space Grotesk (headings) + Inter
   (body)
   Where: app/layout.tsx:2,9-13 · app/globals.css:5,49
   Why:   UI_Design_System.md specifies Space Grotesk for headings and
          Inter for body copy. The code loads Orbitron as
          --font-heading, and globals.css sets
          body { font-family: var(--font-heading) } — so ALL body text
          site-wide renders in Orbitron unless a component locally
          overrides with font-sans. Inter is never imported anywhere.

9. Build the missing Service Detail / Project Detail routes, or scope
   them out explicitly
   Where: app/services/ · app/projects/ (no [slug] route in either)
   Why:   projectinfo.md specifies /services/service-slug and
          /projects/project-slug detail pages. Neither exists —
          services link nowhere past the list; project cards route to
          the external websiteUrl instead. Fine to punt, but should be
          a recorded decision, not a silent gap vs. the SRS.


P2 — SEO & CONSISTENCY--------------------------------------------------

10. Add a shared Open Graph image
    Where: app/layout.tsx:26-38 · no file in public/
    Why:   Every page sets openGraph/twitter blocks but none set
           `images`, and there's no opengraph-image anywhere. Shared
           links show a blank preview card.

11. Give /projects, /privacy-policy and /terms-and-conditions the same
    metadata coverage as every other page
    Where: app/projects/page.tsx:6-10 ·
           app/privacy-policy/page.tsx:6-10 ·
           app/terms-and-conditions/page.tsx:6-10
    Why:   Home/About/Services/Contact each set alternates.canonical +
           full openGraph + twitter blocks. These three only set
           title/description.

12. Add .env.example and a real project README
    Where: frontend/ (missing) · frontend/README.md (still
           create-next-app boilerplate)
    Why:   Already listed above (Phase 3). Anyone cloning the repo has
           to reverse-engineer RESEND_API_KEY from the route handler.

13. Deduplicate the services list — it's hand-typed in three places
    Where: components/sections/Services.tsx:6-42 ·
           components/sections/ServiceCollection.tsx:3-40 ·
           data/serviceFeatures.ts
    Why:   Homepage and services page each hardcode their own copy of
           the same six services with slightly different icons/copy.
           Move into data/ next to the other content arrays.

14. Reuse the real project data on the homepage instead of a third
    hardcoded list
    Where: components/sections/Work.tsx:5-27
    Why:   Homepage "Our Work" invents its own three projects
           ("Fintech Platform", "E-Commerce Redesign", "SaaS
           Dashboard") that exist nowhere in data/projects.ts and
           don't match the Projects page.

15. Reconcile the accent green — one token, not five hand-typed hexes
    Where: styles/variables.css / app/globals.css (#39FF14) vs.
           scattered #51FF73 / #52FF2A / #5CFF72 across components
    Why:   The design system defines a specific green ramp, but most
           components use ad hoc literals instead of the CSS variables
           already defined. The green visibly shifts hue section to
           section.

16. Add the header/nav links the design system calls for
    Where: components/layout/Header.tsx ·
           config/navigation.ts (defined, never imported)
    Why:   UI_Design_System.md's navbar spec is Logo + Home/Services/
           Projects/Contact + CTA, and config/navigation.ts already
           lists exactly that. Header.tsx only renders the logo and a
           "Let's Talk" button — page nav lives only in the bottom
           FloatingNav dock. NAVIGATION is dead code either way.

17. Drop unused dependencies
    Where: frontend/package.json:15-25
    Why:   gsap, lenis, swiper, react-icons are installed but never
           imported anywhere (animation is all Framer Motion, icons
           are all lucide-react).


P3 — POLISH--------------------------------------------------------------

18. Add aria-expanded to the FAQ accordion trigger button
    Where: components/sections/FAQ.tsx:63-84

19. Sanity-check the Stats numbers ("200+ Projects Delivered", "50+
    Experts & Creatives") against what the agency can stand behind —
    same trust concern as items 3-4, lower severity
    Where: components/sections/Stats.tsx:15-44

20. Standardize page title metadata to rely on the layout's title
    template (title: "Projects") instead of re-typing the full
    "X | ONTO DIGITAL" string
    Where: app/projects/page.tsx:7 · app/privacy-policy/page.tsx:7 ·
           app/terms-and-conditions/page.tsx:7

21. Populate config/social.ts (LinkedIn, X, Dribbble, GitHub are all
    empty strings) or hide those footer icons until the accounts exist
    Where: config/social.ts · components/layout/Footer.tsx:44-47

22. Loosen or shape-check the contact form's phone-number validation —
    currently any 1-30 character string passes, including letters
    Where: app/api/contact/route.ts:38-42


SPEC COMPARISON — BUILT VS. docs/projectinfo.md-------------------------
(Only the public frontend exists so far — matches task-order.md's own
Phase 6 scoping for backend/CMS, not treated as a defect below.)

  Home/About/Services/Projects/Contact pages .... BUILT
  Privacy Policy & Terms ......................... BUILT
  Service Detail page (/services/:slug) .......... MISSING (SRS §8)
  Project Detail page (/projects/:slug) .......... MISSING — cards
                                                     link out to
                                                     external websiteUrl
  Pricing page .................................... MISSING — listed
                                                     as included V1
                                                     feature in SRS;
                                                     no route/nav/data
                                                     anywhere
  Contact form -> REST API -> email .............. PARTIAL — works
                                                     end-to-end, but no
                                                     DB persistence
                                                     layer yet (SRS has
                                                     Mongo before
                                                     email); sandbox
                                                     sender blocks real
                                                     delivery (item 2)
  SEO: metadata, robots, sitemap .................. PARTIAL — robots.ts
                                                     / sitemap.ts exist;
                                                     OG coverage
                                                     inconsistent
                                                     (item 11), no OG
                                                     image (item 10)
  Backend (NestJS + REST API) ..................... PHASE 6 — not
                                                     started, by design
  MongoDB Atlas / Mongoose collections ............ PHASE 6 — all
                                                     content is static
                                                     TS data in data/
  Admin Dashboard (auth, CMS, leads) .............. PHASE 6 —
                                                     app/admin/ is an
                                                     empty directory
  Cloudinary image storage ........................ PHASE 6 — all
                                                     images are static
                                                     files in public/


SPEC COMPARISON — BUILT VS. docs/UI_Design_System.md---------------------

  Heading font: Space Grotesk/700 ................. OFF-SPEC — actual
                                                     is Orbitron,
                                                     applied to body
                                                     text too
  Body font: Inter/400 ............................. OFF-SPEC — not
                                                     imported; falls
                                                     back to Orbitron
  Primary accent #39FF14 ........................... DRIFTING — token
                                                     is correct, but
                                                     #51FF73/#52FF2A/
                                                     #5CFF72 hand-typed
                                                     across components
  Icon library: Lucide React ....................... MATCHES
  Animation library: Framer Motion ................. MATCHES (+ unused
                                                     GSAP dependency)
  Nav: Logo + Home/Services/Projects/Contact + CTA . SPLIT — Logo + CTA
                                                     in header only,
                                                     page links live in
                                                     the bottom dock
  Card radius/border/hover glow .................... MATCHES
  Form inputs: 56px height, 12px radius, green focus MATCHES


ALSO WORTH KNOWING — WHAT'S ALREADY SOLID--------------------------------

  - Zero lint/type/build errors right now (eslint, tsc --noEmit,
    next build all pass clean).
  - Contact API is genuinely well-hardened: Zod schema validation,
    HTML-escaping before email interpolation, a fixed-window IP rate
    limiter, and a content-type check, all server-side.
  - Branded error/404/loading states already exist (error.tsx,
    not-found.tsx, loading.tsx) — Phase 1 items above, done.
  - Clean data-access seam in services/projects.ts — swapping local
    seed data for a real API later is a one-file change, with the
    comment spelling out exactly what that change looks like.
  - Accessible-by-default form fields: proper label/htmlFor pairing
    (visually hidden, not removed), focus-visible rings, aria-labels
    on icon-only buttons throughout.
  - Responsive breakpoints track the 320/768/1024/1280px scale from
    the design doc consistently across sections.


Audit performed against the working tree at commit 233adae (branch
master). Line references may drift slightly after edits — re-check the
anchor, not just the number.