# Sundae — website rebuild (concept for review)

Next.js 16 · React 19 · Tailwind v4 · React Three Fiber (3D auction hero) · GSAP ScrollTrigger + Lenis · Claude-powered site assistant.

All copy, numbers, reviews and photos come from sundae.com (captured 2026-10-01). Content lives in
`src/content/site.ts`; the assistant's knowledge base (`src/content/kb.ts`) is generated from the same file,
so the site and the assistant never disagree. `robots: noindex` until Sundae approves.

## Brand
Styled to Sundae's Creative Guidelines (2022 agency deck; summary in the studio's
`clients/sundae/BRAND-SPEC.md`): Merriweather headlines + Lato everything else (`next/font/google`),
palette `#DB3D55` red (wordmark, shapes, accent bars — never text), `#1C51A0` blue (buttons, links, feature
bands), `#4A4A4A` copy, `#F4CCCC` / `#F4F7F9` / `#E6E6E6` / `#C9D2E0` secondary; white space first, light
heroes only. Copy is AP style (including times and dates), avoids superlatives in our own words (verbatim
reviews and quotes stay as written) and presents offer counts as averages.

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | What it does | Without it |
|---|---|---|
| `ANTHROPIC_API_KEY` | Site assistant answers with Claude (`claude-opus-5-5`, server-side fallbacks), grounded only in the site content | Assistant answers from on-site retrieval (exact sentences from the site + links) |
| `LEAD_WEBHOOK_URL` | `/get-offer` posts each seller lead (JSON) to Sundae's CRM / Zapier / GHL webhook | The form says plainly that it is not connected and sends people to 800-214-4426 or sundae.com/get-offer |

## Items for Sundae to confirm
- Cash advance maximum: this build shows $20,000, which Sundae's November 2025 direct mail (in its Creative Guidelines, pages 26-27) also states ("Cash advance up to $20,000"); one sundae.com seller FAQ answer still says $10,000, so the assistant defers to the Closing Manager.
- Reviews.io shows 4.85 / 536 reviews; the newest review there is from 2023 — confirm the current review source.
- Photo/media rights for images reused from sundae.com.

## Develop
`npm install && npm run dev` · `npm run build`
