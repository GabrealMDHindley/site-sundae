import type { Metadata } from "next";
import FaqExplorer from "@/components/FaqExplorer";
import { CtaBand, PageHero } from "@/components/ui";
import AskButton from "@/components/AskButton";
import { Phone } from "@/components/icons";
import { CONTACT, INVESTOR_FAQ, SELLER_FAQ } from "@/content/site";

export const metadata: Metadata = { title: "FAQ", description: "Answers about selling as-is with Sundae, offers, closing, the marketplace, and buying as an investor." };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Frequently asked questions" title="Everything you / *wanted to ask.*" sub="Search below, or ask the Sundae assistant — it’s trained on everything on this site.">
        <div className="flex flex-wrap gap-3"><AskButton q="What should I know before selling my house with Sundae?" label="Ask the assistant" className="btn btn-red !text-white" /><a href={CONTACT.sellerTel} className="btn btn-line"><Phone /> {CONTACT.sellerPhone}</a></div>
      </PageHero>
      <section className="wrap"><FaqExplorer sets={[{ key: "sellers", label: "Selling", groups: SELLER_FAQ }, { key: "investors", label: "Investing", groups: INVESTOR_FAQ }]} /></section>
      <CtaBand />
    </>
  );
}
