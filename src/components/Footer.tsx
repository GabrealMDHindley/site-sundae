import Link from "next/link";
import Logo from "./Logo";
import { ArrowUR } from "./icons";
import { CONTACT, LEGAL, MARKETS } from "@/content/site";

const COLS = [
  { title: "Sell", links: [["How it works", "/how-it-works"], ["Get offers", "/get-offer"], ["Cash advance", "/cash-advance"], ["Reviews", "/reviews"], ["Selling scam-free", "/better-way"], ["Seller FAQ", "/faq"]] },
  { title: "Invest & operate", links: [["Investor marketplace", "/investors"], ["Sundae Membership", "/membership"], ["Events", "/events"], ["Investor FAQ", "/investors#faq"]] },
  { title: "Company", links: [["Our story", "/about"], ["Leadership", "/about/leadership"], ["Dr. Phil", "/dr-phil"], ["Partners", "/partners"], ["Contact", "/contact"], ["Licensing & disclosures", "/disclosures"]] },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-white/80">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-red/20 blur-[120px]" />
      <div className="wrap relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo white className="h-9 w-auto" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/60">When investors compete, homeowners win. Sell as-is, pay zero fees to Sundae, and move at your pace.</p>
            <div className="mt-7 grid gap-1.5 text-sm">
              <a className="font-semibold text-white" href={CONTACT.sellerTel}>Sellers · {CONTACT.sellerPhone}</a>
              <a className="text-white/70 hover:text-white" href={CONTACT.investorTel}>Investors · {CONTACT.investorPhone}</a>
              <a className="text-white/70 hover:text-white" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {CONTACT.socials.map((s) => <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-white/70 transition-colors hover:border-white/50 hover:text-white">{s.name}</a>)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">{c.title}</p>
                <ul className="mt-4 grid gap-2.5 text-[0.93rem]">{c.links.map(([l, h]) => <li key={l}><Link href={h} className="link-u text-white/75 hover:text-white">{l}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">We buy homes in</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">{MARKETS.map((m) => <Link key={m.slug} href={`/locations/${m.slug}`} className="link-u text-white/70 hover:text-white">{m.name}</Link>)}</div>
        </div>
        <div className="mt-10 grid gap-3 border-t border-white/10 pt-8 text-[0.75rem] leading-relaxed text-white/45">
          <p>{LEGAL.dre}. {LEGAL.cfl}</p>
          <p>{LEGAL.fees}</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} Sundae, Inc.</span>
            <a href="https://sundae.com/terms-of-service/" target="_blank" rel="noopener noreferrer" className="link-u">Terms of Service</a>
            <a href="https://sundae.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="link-u">Privacy Policy</a>
            <Link href="/disclosures" className="link-u">Licensing & disclosures</Link>
            <a href="https://sundae.com/mail/" target="_blank" rel="noopener noreferrer" className="link-u">Mail opt-out</a>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-0.5 text-white/55">Concept rebuild for review — the live site is <a className="underline" href="https://sundae.com" target="_blank" rel="noopener noreferrer">sundae.com</a><ArrowUR className="h-3 w-3" /></span>
          </p>
        </div>
      </div>
    </footer>
  );
}
