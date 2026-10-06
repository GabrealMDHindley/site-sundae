/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import OfferForm from "@/components/OfferForm";
import { RatingBadge } from "@/components/ui";
import { Check, Phone } from "@/components/icons";
import { CONTACT, PROMISE, TESTIMONIALS } from "@/content/site";

export const metadata: Metadata = { title: "Get my cash offer", description: "Request a no-obligation cash offer. Sell as-is, pay zero fees to Sundae and close in as little as 10 days or up to 60." };

export default function Page() {
  const t = TESTIMONIALS[0];
  return (
    <section className="relative overflow-clip bg-white pb-10 pt-32 md:pt-40">
      <div className="wrap relative grid gap-12 lg:grid-cols-[1fr_1.12fr] lg:gap-16">
        <div className="lg:pt-4">
          <p className="eyebrow rise">No-obligation cash offer</p>
          <h1 className="display h-bar h-bar-lg rise rise-1 mt-5 text-[clamp(2.25rem,4.4vw,3.75rem)]">Let’s see<br /> what investors<br /> <span className="hl">will offer.</span></h1>
          <p className="lede rise rise-2 mt-7">Answer a few quick questions. A local Market Expert will confirm Sundae is a good fit, visit once and bring you competitive offers, usually within four business days of the inspection.</p>
          <ul className="rise rise-3 mt-8 grid gap-4">{PROMISE.map((p) => <li key={p.title} className="flex gap-3.5 text-lg leading-relaxed"><span className="tick mt-1"><Check className="h-3.5 w-3.5" /></span><span><strong>{p.title}.</strong> {p.body}</span></li>)}</ul>
          <div className="rise rise-4 mt-9 flex flex-wrap items-center gap-5"><RatingBadge /><a href={CONTACT.sellerTel} className="inline-flex items-center gap-2 text-lg font-bold text-blue underline-offset-4 hover:underline"><Phone className="h-5 w-5" /> Prefer to talk? {CONTACT.sellerPhone}</a></div>
          <figure className="rise rise-5 mt-10 hidden items-start gap-4 rounded-[1.25rem] bg-mist p-6 lg:flex">
            <img src={t.img} alt="" className="h-14 w-14 rounded-full object-cover" />
            <div><blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote><figcaption className="mt-2 text-base font-bold">{t.name} · {t.place}</figcaption></div>
          </figure>
        </div>
        <div className="rise rise-2 relative self-start lg:sticky lg:top-28">
          <div aria-hidden className="dots pointer-events-none absolute -right-5 -top-5 hidden h-20 w-20 lg:block" />
          <div className="card relative p-6 shadow-[0_40px_90px_-50px_rgba(74,74,74,.5)] md:p-10"><OfferForm /></div>
        </div>
      </div>
    </section>
  );
}
