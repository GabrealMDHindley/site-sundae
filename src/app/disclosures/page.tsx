import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ArrowUR } from "@/components/icons";
import { LEGAL } from "@/content/site";

export const metadata: Metadata = { title: "Licensing and disclosures" };

const SECTIONS = [
  { h: "About the Sundae Companies", p: ["Sundae, Inc. and its affiliated companies are collectively the “Sundae Companies.” The Sundae Companies disclose any and all affiliated business arrangements between the parties to sellers and buyers of real property at the outset of any real estate transaction."] },
  { h: "Sundae, Inc.", p: ["Sundae, Inc., a Delaware corporation, is the owner, host, manager and provider of sundae.com and its subdomains, including marketplace.sundae.com (the “Sundae Marketplace”)."] },
  { h: "Sundae Funding, Inc.", p: ["Any and all real estate brokerage services advertised, offered, performed or completed through the Sundae Marketplace, or outside its scope, are solely advertised, offered, performed or completed by Sundae Funding, Inc., doing business as Sundae, a wholly owned subsidiary of Sundae, Inc.", LEGAL.dre + "."] },
  { h: "HomeLove Companies", p: [LEGAL.homelove + " These entities are not licensed to practice real estate and act solely as principals."] },
  { h: "Sundae Marketplace", p: ["Sellers who list on the Sundae Marketplace grant permission for Sundae to require that offers be as-is, all cash, and free of contingencies. Some buyers may submit offers with different terms; all terms are ultimately negotiable and sellers are not required to accept any offer. Agency relationships are disclosed as required by state law. Sundae Funding requests that buyers pay its real estate compensation at closing, and may charge different fees to different buyers and sellers. Commission rates are not fixed by law and may be negotiable."] },
  { h: "Real-time offer feedback", p: ["Sundae Funding notifies all buyers who submit offers whether they are the “highest offer” or “not the highest offer,” and notifies the top two offerors when their position changes, until an offer is accepted."] },
  { h: "Lending activities", p: [LEGAL.cfl, "Nothing in any marketing material is a commitment to lend. All potential loans are subject to underwriting and due diligence until a definitive loan agreement is signed."] },
  { h: "No legal, tax, or investment advice", p: [LEGAL.noAdvice + " Published articles and resources are for informational purposes only. No warranties are made as to the accuracy of descriptions of real property listed on the Sundae Marketplace."] },
  { h: "Seller fees", p: [LEGAL.fees] },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Licensing & disclosures" title="The fine print, / *in plain view.*" sub="A summary of the Sundae family of companies and the disclosures that may be relevant to you. The authoritative version lives on sundae.com.">
        <a href="https://sundae.com/disclosures/" target="_blank" rel="noopener noreferrer" className="btn btn-line">Full disclosures on sundae.com <ArrowUR /></a>
      </PageHero>
      <section className="wrap grid max-w-4xl gap-10">
        {SECTIONS.map((s) => <div key={s.h} data-reveal className="border-t border-line pt-8"><h2 className="display text-2xl">{s.h}</h2>{s.p.map((t) => <p key={t.slice(0, 24)} className="mt-3 leading-relaxed text-muted">{t}</p>)}</div>)}
      </section>
    </>
  );
}
