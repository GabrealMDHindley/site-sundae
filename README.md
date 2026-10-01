# Sundae — website rebuild (concept for review)

Next.js 16 · React 19 · Tailwind v4 · React Three Fiber (3D auction hero) · GSAP ScrollTrigger + Lenis · Claude-powered site assistant.

All copy, numbers, reviews and photos come from sundae.com (captured 2026-10-01). Content lives in
`src/content/site.ts`; the assistant's knowledge base (`src/content/kb.ts`) is generated from the same file,
so the site and the assistant never disagree. `robots: noindex` until Sundae approves.

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | What it does | Without it |
|---|---|---|
| `ANTHROPIC_API_KEY` | Site assistant answers with Claude (`claude-opus-5-5`, server-side fallbacks), grounded only in the site content | Assistant answers from on-site retrieval (exact sentences from the site + links) |
| `LEAD_WEBHOOK_URL` | `/get-offer` posts each seller lead (JSON) to Sundae's CRM / Zapier / GHL webhook | The form says plainly that it is not connected and sends people to 1-800-214-4426 or sundae.com/get-offer |

## Items for Sundae to confirm
- Cash advance maximum: the live site says both $20,000 and $10,000 (this build shows $20,000 and the assistant defers to the Closing Manager).
- Reviews.io shows 4.85 / 536 reviews; the newest review there is from 2023 — confirm the current review source.
- Photo/media rights for images reused from sundae.com.

## Develop
`npm install && npm run dev` · `npm run build`
