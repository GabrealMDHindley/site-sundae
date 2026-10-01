"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Arrow, Phone } from "./icons";
import { CONTACT } from "@/content/site";

const MENU = [
  { label: "Sell", href: "/how-it-works", items: [
    { label: "How it works", href: "/how-it-works", note: "Three steps to a competitive cash offer" },
    { label: "Get offers", href: "/get-offer", note: "Start with your address" },
    { label: "Cash advance", href: "/cash-advance", note: "Get part of your proceeds before closing" },
    { label: "Locations", href: "/locations", note: "12 metro areas and growing" },
    { label: "Selling scam-free", href: "/better-way", note: "Spot predatory buyers" },
    { label: "Reviews", href: "/reviews", note: "Real sellers, verbatim" },
  ] },
  { label: "Investors", href: "/investors" },
  { label: "Membership", href: "/membership" },
  { label: "About", href: "/about", items: [
    { label: "Our story", href: "/about", note: "Why we started Sundae" },
    { label: "Leadership", href: "/about/leadership", note: "The team behind the marketplace" },
    { label: "Events", href: "/events", note: "Private operator dinners" },
    { label: "Dr. Phil", href: "/dr-phil", note: "Partners with a purpose" },
    { label: "Partners", href: "/partners", note: "Help with the whole move" },
    { label: "Contact", href: "/contact", note: "Sellers, investors, operators" },
  ] },
  { label: "FAQ", href: "/faq" },
];

export default function Nav() {
  const path = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { document.documentElement.style.overflow = open ? "hidden" : ""; }, [open]);
  // pages whose hero is dark keep the frosted pill from the start so links stay readable
  const darkHero = path === "/membership" || /^\/locations\/.+/.test(path);
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5">
      <div className={`mx-auto flex max-w-[1320px] items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 md:px-6 ${solid || open || darkHero ? "nav-solid" : ""}`}>
        <Link href="/" className="shrink-0" aria-label="Sundae home"><Logo className="h-7 w-auto md:h-8" /></Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {MENU.map((m) => (
            <div key={m.label} className="group relative">
              <Link href={m.href} className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors hover:bg-ink/5 ${active(m.href) ? "text-red" : "text-ink"}`}>
                {m.label}
                {m.items && <svg viewBox="0 0 12 12" className="h-3 w-3 opacity-50 transition-transform group-hover:rotate-180" aria-hidden><path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>}
              </Link>
              {m.items && (
                <div className="invisible absolute left-1/2 top-full w-[520px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-1 rounded-3xl border border-line bg-white p-2.5 shadow-[0_30px_70px_-30px_rgba(27,20,22,.35)]">
                    {m.items.map((it) => (
                      <Link key={it.href + it.label} href={it.href} className="rounded-2xl px-4 py-3 transition-colors hover:bg-cream">
                        <div className="text-[0.92rem] font-semibold">{it.label}</div>
                        <div className="mt-0.5 text-[0.8rem] text-muted">{it.note}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={CONTACT.sellerTel} className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.9rem] font-semibold tabular-nums hover:bg-ink/5 xl:flex"><Phone className="h-4 w-4 text-red" />{CONTACT.sellerPhone}</a>
          <Link href="/get-offer" className="btn btn-red hidden !py-3 !text-[0.9rem] sm:inline-flex">Get my cash offer <Arrow /></Link>
          <button className="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-ink/5 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mnav" aria-label={open ? "Close menu" : "Open menu"}>
            <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-[1.5px] w-5 bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>
      <div id="mnav" data-lenis-prevent className={`fixed inset-x-3 top-[4.6rem] bottom-3 overflow-y-auto rounded-[2rem] border border-line bg-paper p-6 shadow-2xl transition-all duration-500 lg:hidden ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"}`}>
        <nav className="grid gap-6" aria-label="Mobile">
          {MENU.map((m) => (
            <div key={m.label}>
              <Link href={m.href} className="display text-3xl">{m.label}</Link>
              {m.items && <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">{m.items.map((it) => <Link key={it.label} href={it.href} className="text-[0.95rem] text-muted">{it.label}</Link>)}</div>}
            </div>
          ))}
        </nav>
        <div className="mt-8 grid gap-3">
          <Link href="/get-offer" className="btn btn-red w-full">Get my cash offer <Arrow /></Link>
          <a href={CONTACT.sellerTel} className="btn btn-line w-full"><Phone /> {CONTACT.sellerPhone}</a>
        </div>
      </div>
    </header>
  );
}
