import {
  CASH_ADVANCE_MAX, CASH_ADVANCE_STEPS, CONTACT, DIFFERENCE, DRPHIL, EVENT, INVESTOR_FAQ, LEADERS, LEGAL, MARKETPLACE_STEPS,
  MARKETS, MEMBERSHIP, PARTNERS, PROMISE, RATING, SELLER_FAQ, SITUATIONS, STEPS, STORY, TESTIMONIALS, VALUES,
} from "./site";

// The assistant "learns" the website by reading it: every chunk below is generated from the
// same content the pages render, so the site and the bot can never disagree.
export type Doc = { id: string; title: string; url: string; text: string; label: string; answer?: string; weight?: number };

export function buildDocs(): Doc[] {
  const d: Doc[] = [];
  const clean = (t: string) => t.replace(/\s+/g, " ").trim();
  const add = (id: string, title: string, url: string, text: string, o: { label?: string; answer?: string; weight?: number } = {}) =>
    d.push({ id, title, url, text: clean(text), label: o.label || title, answer: o.answer && clean(o.answer), weight: o.weight });

  add("overview", "What Sundae is", "/", `Sundae is an off-market real estate marketplace that helps homeowners sell a house as-is — no repairs, cleanings or showings, zero fees paid to Sundae, fast closing. Sundae connects home sellers with a network of 20,000+ property investors; investors compete in an auction so the seller gets competitive cash offers. "When investors compete, homeowners win." Call ${CONTACT.sellerPhone} for a no-obligation cash offer, or request offers at /get-offer. Reviews: ${RATING.score}/5 average across ${RATING.count} reviews on ${RATING.source}. As seen on Dr. Phil, Fox 40, Yahoo, CNN, Forbes and NBC.`);
  add("promise", "The Sundae Promise", "/", PROMISE.map((p) => `${p.title}: ${p.body}`).join(" "));
  add("how", "How Sundae works — how selling with Sundae works", "/how-it-works", `How does selling with Sundae work? Selling with Sundae takes three steps. ${STEPS.map((s, i) => `Step ${i + 1} — ${s.title}: ${s.body}`).join(" ")}`, { label: "How it works", weight: 1.25 });
  add("how-detail", "The selling process in detail", "/how-it-works", "The marketplace selling process, step by step: " + MARKETPLACE_STEPS.map((s, i) => `${i + 1}) ${s.title}: ${s.body}`).join(" "), { label: "How it works" });
  add("as-is", "Selling as-is: no repairs, cleaning or showings", "/how-it-works", "Do I need to make repairs or clean before selling? Will Sundae buy a house that needs a lot of work? Sundae buys homes in all conditions, and you sell as-is: no cleanings, repairs or updates, and no showings or open houses. Sundae is the only one who visits, once, to take photos, a 3D tour and order an inspection. You can leave behind as much personal property as you want and you are not responsible for those expenses. Houses that need updates or repairs are exactly what Sundae specializes in.", { label: "How it works", weight: 1.15 });
  add("situations", "When to turn to Sundae", "/how-it-works", "Sundae buys homes in all conditions and helps homeowners in situations like: " + SITUATIONS.map((s) => s.label).join("; ") + ".");
  add("difference", "Sundae vs. a traditional sale vs. a property investor", "/how-it-works", `With Sundae: ${DIFFERENCE.sundae.join("; ")}. Traditional sales process: ${DIFFERENCE.traditional.join("; ")}. Typical single property investor: ${DIFFERENCE.investor.join("; ")}.`);
  for (const g of SELLER_FAQ) for (const [i, qa] of g.items.entries()) add(`sfaq-${g.group}-${i}`, `Seller FAQ — ${qa.q}`, "/faq", `${qa.q} ${qa.a}`, { label: "Seller FAQ", answer: qa.a });
  for (const g of INVESTOR_FAQ) for (const [i, qa] of g.items.entries()) add(`ifaq-${g.group}-${i}`, `Investor FAQ — ${qa.q}`, "/investors#faq", `${qa.q} ${qa.a}`, { label: "Investor FAQ", answer: qa.a });
  add("investors", "For investors: the Sundae Marketplace", "/investors", `Property investors join the Sundae Marketplace at ${CONTACT.marketplace} (self-service sign-up) to access off-market, as-is homes Sundae sources through TV, radio, search and direct mail. Investor line: ${CONTACT.investorPhone}. Two-round offers: round one is open, and the top three are invited to a blind, final round two. Asking-price certainty. $1,000 admin fee; EMD due within 24 hours. Sundae Funding offers business-purpose loans, including for properties sourced outside the marketplace (${CONTACT.fundingEmail}).`);
  add("cash-advance", "Sundae Cash Advance", "/cash-advance", `Qualifying sellers may receive a cash advance on their sale proceeds of up to ${CASH_ADVANCE_MAX} before closing. Your Closing Manager confirms the amount you qualify for. Ask your Closing Manager as early as possible. Steps: ${CASH_ADVANCE_STEPS.map((s, i) => `${i + 1}) ${s}`).join(" ")} Funds are part of, not in addition to, your sale proceeds. Not currently available for tenant-occupied properties.`);
  const intro = `Schedule an intro call with Victoria White, vice president of Membership: ${CONTACT.introCall}. Membership fees, territory sizes and terms are discussed on the intro call and are not published on the website.`;
  add("membership", "Sundae Membership — what it is", "/membership", `Sundae Membership is for experienced real estate operators such as wholesalers, flippers and investors. ${MEMBERSHIP.headline} ${MEMBERSHIP.sub} ${MEMBERSHIP.intro} ${MEMBERSHIP.market.title} ${MEMBERSHIP.market.body} ${intro}`, { label: "Sundae Membership", weight: 1.1 });
  add("membership-engine", "Sundae Membership — the Sundae Engine", "/membership", `The Sundae Engine behind Membership: ${MEMBERSHIP.engine.map((e) => `${e.title}. ${e.body}`).join(" ")}`, { label: "Sundae Membership" });
  add("membership-together", "Sundae Membership — what you bring and what Sundae brings", "/membership", `Better together: you know your market; Sundae brings the systems to help you scale it. You bring ${MEMBERSHIP.youBring.join(", ")}. Sundae brings ${MEMBERSHIP.sundaeBrings.join(", ")}. Together: ${MEMBERSHIP.together.join(", ")}.`, { label: "Sundae Membership" });
  add("membership-fit", "Sundae Membership — who it's right for", "/membership", `Sundae Membership is right for you if you have: ${MEMBERSHIP.fit.join("; ")}. ${intro}`, { label: "Sundae Membership" });
  add("membership-how", "Sundae Membership — how it works", "/membership", `How Membership works: ${MEMBERSHIP.steps.map((s, i) => `${i + 1}) ${s.title} — ${s.body}`).join(" ")} ${intro}`, { label: "Sundae Membership" });
  add("membership-why", "Sundae Membership — why operators choose Sundae", "/membership", `Why operators choose Sundae: ${MEMBERSHIP.why.map((w) => `${w.title} (${w.body})`).join("; ")}.`, { label: "Sundae Membership" });
  // AP style; the timing line is the confirmed invitation itinerary, verbatim (BRAND-SPEC section 6).
  const timing = EVENT.timing.map(([t, v]) => `${t} ${v}`).join(" · ");
  add("event", "Upcoming event: Private Dinner & Dialogue (Manhattan Beach)", "/events", `The ${EVENT.title} is a private dinner event on ${EVENT.whenText}, held at ${EVENT.venue}, ${EVENT.address}. Event timing and schedule for the evening: ${timing}. ${EVENT.body} RSVP at ${CONTACT.eventSite}. ${EVENT.past}`, { label: "Upcoming event: Private Dinner & Dialogue (Manhattan Beach)", weight: 1.2 });
  STORY.forEach((s, i) => add(`story-${i}`, `The Sundae story — ${s.title}`, "/about", s.body, { label: "Our story" }));
  add("advocates", "We're your advocates", "/about", "Our founding team has over 35 years of experience in the real estate industry. For too long we’ve seen owners of dated and damaged homes get a bad deal, settling for less than what they deserve. We created Sundae to change that. For homeowners weighing selling on or off-market, we help advise on that decision. Our home assessment, scope of work for necessary repairs and offer are free.", { label: "Our story" });
  add("mission", "Mission and values", "/about", "Our mission is to help homeowners get a better outcome when it’s time to sell a house that needs some love. Values: " + VALUES.map((v) => `${v.title} — ${v.body}`).join(" ") + ` Careers: ${CONTACT.careers}.`);
  for (const l of LEADERS) add(`leader-${l.name}`, `Leadership — ${l.name}, ${l.role}`, "/about/leadership", `${l.name}, ${l.role}. ${l.bio.join(" ")}`, { label: "Leadership", weight: 0.55 });
  add("markets", "Where Sundae buys homes — locations", "/locations", "Where does Sundae buy houses? Sundae buys homes and currently helps homeowners sell in: " + MARKETS.map((m) => `${m.name}, ${m.state}`).join("; ") + ". Sundae is planning to expand to new cities in the near future.", { label: "Locations" });
  for (const m of MARKETS) add(`market-${m.slug}`, `Selling in ${m.name}`, `/locations/${m.slug}`, `Sundae buys homes in ${m.name}, ${m.state}. ${m.blurb} Sell as-is, pay zero fees to Sundae and close in as little as 10 days or up to 60. Call ${CONTACT.sellerPhone}.`);
  add("reviews", "Reviews and customer stories", "/reviews", `Sundae averages ${RATING.score}/5 across ${RATING.count} reviews on ${RATING.source}, and 4.6+ stars across Yelp, BBB, Google and Reviews.io. Customer quotes: ` + TESTIMONIALS.map((t) => `${t.name} (${t.place}): “${t.quote}”`).join(" "));
  add("drphil", "Dr. Phil and Sundae", "/dr-phil", `Dr. Phil and Sundae are teaming up to develop resources so homeowners can avoid stress and sell worry-free. “${DRPHIL.quote1}” “${DRPHIL.quote2}” Download Dr. Phil's Scamfinder Checklist. ${DRPHIL.disclosure}`);
  add("better-way", "Selling scam-free", "/better-way", "Sundae's mission is to end the scam culture in the industry, one enlightened home-seller at a time. Predatory wholesalers and “we buy houses” buyers often lowball sellers in difficult situations; Sundae creates competition among investors so sellers get competitive offers. Guides cover real estate wholesaling, avoiding “we buy houses” scams, fair offer prices and selling as-is.");
  add("partners", "Trusted partners", "/partners", PARTNERS.map((p) => `${p.name} (${p.area}): ${p.body}`).join(" "));
  add("contact", "Contact Sundae", "/contact", `Sellers: ${CONTACT.sellerPhone}. Investors: ${CONTACT.investorPhone}. Email ${CONTACT.email}. Funding: ${CONTACT.fundingEmail}. Referral program: ${CONTACT.referral}. Social: Facebook, Instagram, X and YouTube @SundaeHQ.`);
  add("legal", "Licensing and disclosures", "/disclosures", `${LEGAL.dre}. ${LEGAL.cfl} ${LEGAL.fees} ${LEGAL.homelove} ${LEGAL.noAdvice}`);
  return d;
}

export const DOCS = buildDocs();

export function kbText() {
  return DOCS.map((x) => `## ${x.title}\nPage: ${x.url}\n${x.text}`).join("\n\n");
}

// ---- local retrieval (BM25) — used for source links, and to answer on its own when no API key is set
const STOP = new Set("a an and are as at be but by can do does for from how i if in into is it its me my of on or our so that the their them there these they this to was we what when where which who why will with you your yours sundae".split(" "));
// light stemming so buys/buy, houses/house, selling/sell, offers/offer land on the same token
const stem = (w: string) => {
  if (w.length > 6) w = w.replace(/(ing|ers|er|ed)$/, "");
  if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
  if (w.length > 4 && w.endsWith("e")) w = w.slice(0, -1);
  return w;
};
const tok = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9$ ]+/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w)).map(stem);

const index = (() => {
  const docs = DOCS.map((x) => tok(x.title + " " + x.title + " " + x.text));
  const df = new Map<string, number>();
  for (const t of docs) for (const w of new Set(t)) df.set(w, (df.get(w) || 0) + 1);
  const avg = docs.reduce((a, t) => a + t.length, 0) / docs.length;
  return { docs, df, avg };
})();

export function search(query: string, k = 4) {
  const q = tok(query);
  const N = index.docs.length;
  const scored = index.docs.map((t, i) => {
    const tf = new Map<string, number>();
    for (const w of t) tf.set(w, (tf.get(w) || 0) + 1);
    let s = 0;
    for (const w of q) {
      const f = tf.get(w); if (!f) continue;
      const n = index.df.get(w) || 0;
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
      s += idf * ((f * 2.2) / (f + 1.2 * (0.25 + 0.75 * (t.length / index.avg))));
    }
    let w = DOCS[i].weight ?? 1;
    // investor questions should land on investor answers, city questions on that city's page
    if (DOCS[i].id.startsWith("ifaq") && q.some((x) => ["investor", "invest", "bid", "emd", "admin"].includes(x))) w *= 1.35;
    const titleHits = tok(DOCS[i].title).filter((x) => q.includes(x) && !["sell", "home", "hous", "offer", "faq"].includes(x)).length;
    s += titleHits * 1.2;
    // a person's bio only leads when the question names them
    if (w < 1 && tok(DOCS[i].title.replace(/^Leadership — /, "").split(",")[0]).some((n) => q.includes(n))) w = 1.3;
    return { doc: DOCS[i], score: s * w };
  });
  return scored.filter((x) => x.score > 0.8).sort((a, b) => b.score - a.score).slice(0, k);
}

// Confidence gate for answering without the model: the best match has to be strong, not incidental.
export function confident(query: string, res: { score: number }[]) {
  return res.length > 0 && res[0].score >= Math.max(3, 1.4 * Math.min(tok(query).length, 4));
}

// Pull the 2–3 sentences of a chunk that best match the question.
export function extract(doc: Doc, query: string, max = 3) {
  const q = new Set(tok(query));
  // don't break after AP abbreviations such as "7 p.m.", "Oct. 8", "N. Valley Drive" or "Dr. Phil"
  const sents = (doc.answer || doc.text).split(/(?<=[.!?)])(?<!\b(?:[ap]\.m|Jan|Feb|Aug|Sept|Oct|Nov|Dec|Dr|St|Mr|Ms|Mrs|Jr|Sr|Inc|vs|[A-Z])\.)\s+(?=[A-Z0-9“"($])/).filter((x) => !x.trim().endsWith("?"));
  const ranked = sents.map((s, i) => ({ s: s.trim(), i, score: tok(s).filter((w) => q.has(w)).length })).sort((a, b) => b.score - a.score || a.i - b.i);
  // nothing in the chunk echoes the question's words: lead with its opening sentences instead
  if (!ranked.length || ranked[0].score === 0) return sents.slice(0, max).map((x) => x.trim()).join(" ");
  const keep = ranked.slice(0, max).filter((x, j) => j === 0 || x.score > 0).sort((a, b) => a.i - b.i);
  let out = keep.map((x) => x.s).join(" ");
  // a lone short match ("…takes three steps.") reads better with the sentences that follow it
  for (let i = keep[keep.length - 1].i + 1, n = keep.length; out.length < 300 && i < sents.length && n < max + 1; i++, n++) out += " " + sents[i].trim();
  return out;
}
