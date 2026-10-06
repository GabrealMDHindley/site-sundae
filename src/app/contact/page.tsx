import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import AskButton from "@/components/AskButton";
import { Arrow, ArrowUR, Calendar, Mail, Phone } from "@/components/icons";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: "Reach Sundae — sellers, investors, operators and partners." };

export default function Page() {
  const cards = [
    { k: "Selling a house", t: CONTACT.sellerPhone, b: "Talk to a local Market Expert about a no-obligation cash offer.", a: <><a href={CONTACT.sellerTel} className="btn btn-blue"><Phone /> Call now</a><Link href="/get-offer" className="btn btn-outline">Request offers <Arrow /></Link></> },
    { k: "Buying as an investor", t: CONTACT.investorPhone, b: "Questions about the marketplace, offers or Sundae Funding.", a: <><a href={CONTACT.investorTel} className="btn btn-blue"><Phone /> Call</a><a href={CONTACT.marketplace} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Marketplace <ArrowUR /></a></> },
    { k: "Growing as an operator", t: "Sundae Membership", b: "Book an intro call with Victoria White, vice president of Membership.", a: <a href={CONTACT.introCall} target="_blank" rel="noopener noreferrer" className="btn btn-blue"><Calendar /> Schedule a call</a> },
    { k: "Everything else", t: CONTACT.email, b: `Partnerships, press and general questions. Funding: ${CONTACT.fundingEmail}.`, a: <><a href={`mailto:${CONTACT.email}`} className="btn btn-blue"><Mail /> Email us</a><a href={CONTACT.referral} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Referral program <ArrowUR /></a></> },
  ];
  return (
    <>
      <PageHero eyebrow="Contact Sundae" title="Real people. / *Ready* to help." sub="Pick the line that fits, or ask our assistant anything, any time.">
        <AskButton q="Who should I contact at Sundae about my situation?" label="Ask the assistant" className="btn btn-outline" />
      </PageHero>
      <section className="wrap grid gap-5 md:grid-cols-2">
        {cards.map((c, i) => (
          <article key={c.k} data-reveal data-delay={i * 0.06} className="card p-8 md:p-10">
            <p className="eyebrow">{c.k}</p>
            <h2 className="display h-bar mt-4 break-words text-[1.75rem] md:text-[2.125rem]">{c.t}</h2>
            <p className="mt-4 text-lg leading-relaxed">{c.b}</p>
            <div className="mt-7 flex flex-wrap gap-3">{c.a}</div>
          </article>
        ))}
      </section>
      <section className="wrap mt-12">
        <div className="flex flex-wrap gap-2">{CONTACT.socials.map((s) => <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="chip transition-colors hover:border-blue hover:text-blue">{s.name} <ArrowUR className="h-3.5 w-3.5" /></a>)}</div>
      </section>
    </>
  );
}
