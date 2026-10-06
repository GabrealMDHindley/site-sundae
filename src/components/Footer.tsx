import Link from "next/link";
import Logo from "./Logo";
import { ArrowUR } from "./icons";
import { CONTACT, LEGAL, MARKETS } from "@/content/site";

const COLS = [
  { title: "Sell", links: [["How it works", "/how-it-works"], ["Get offers", "/get-offer"], ["Cash advance", "/cash-advance"], ["Reviews", "/reviews"], ["Selling scam-free", "/better-way"], ["Seller FAQ", "/faq"]] },
  { title: "Invest and operate", links: [["Investor marketplace", "/investors"], ["Sundae Membership", "/membership"], ["Events", "/events"], ["Investor FAQ", "/investors#faq"]] },
  { title: "Company", links: [["Our story", "/about"], ["Leadership", "/about/leadership"], ["Dr. Phil", "/dr-phil"], ["Partners", "/partners"], ["Contact", "/contact"], ["Licensing and disclosures", "/disclosures"]] },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-gray bg-mist text-ink">
      <div className="wrap relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo className="h-[30px] w-auto" />
            <p className="display mt-7 max-w-sm text-[1.375rem] leading-snug">When investors compete, homeowners win.</p>
            <p className="mt-3 max-w-sm text-[1.0625rem] leading-relaxed">Sell as-is, pay zero fees to Sundae and move at your pace.</p>
            <div className="mt-7 grid gap-2 text-[1.0625rem]">
              <a className="font-bold text-blue hover:underline" href={CONTACT.sellerTel}>Sellers: {CONTACT.sellerPhone}</a>
              <a className="text-blue hover:underline" href={CONTACT.investorTel}>Investors: {CONTACT.investorPhone}</a>
              <a className="text-blue hover:underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {CONTACT.socials.map((s) => <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="chip transition-colors hover:border-blue hover:text-blue">{s.name}</a>)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="eyebrow">{c.title}</p>
                <ul className="mt-4 grid gap-2.5 text-[1.0625rem]">{c.links.map(([l, h]) => <li key={l}><Link href={h} className="link-u hover:text-blue">{l}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 border-t border-gray pt-8">
          <p className="eyebrow">We buy homes in</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[1.0625rem]">{MARKETS.map((m) => <Link key={m.slug} href={`/locations/${m.slug}`} className="link-u hover:text-blue">{m.name}</Link>)}</div>
        </div>
        <div className="mt-10 grid gap-3 border-t border-gray pt-8 text-base leading-relaxed">
          <p>{LEGAL.dre}. {LEGAL.cfl}</p>
          <p>{LEGAL.fees}</p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} Sundae, Inc.</span>
            <a href="https://sundae.com/terms-of-service/" target="_blank" rel="noopener noreferrer" className="text-blue underline-offset-4 hover:underline">Terms of Service</a>
            <a href="https://sundae.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-blue underline-offset-4 hover:underline">Privacy Policy</a>
            <Link href="/disclosures" className="text-blue underline-offset-4 hover:underline">Licensing and disclosures</Link>
            <a href="https://sundae.com/mail/" target="_blank" rel="noopener noreferrer" className="text-blue underline-offset-4 hover:underline">Mail opt-out</a>
            <span className="inline-flex flex-wrap items-center gap-x-1.5 rounded-xl border border-slate bg-white px-3.5 py-1">Concept rebuild for review — the live site is <a className="text-blue underline underline-offset-4" href="https://sundae.com" target="_blank" rel="noopener noreferrer">sundae.com</a><ArrowUR className="h-3.5 w-3.5" /></span>
          </p>
        </div>
      </div>
    </footer>
  );
}
