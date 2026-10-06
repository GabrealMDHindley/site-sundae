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

// A white bar on every page (there are no dark heroes): the red wordmark sits at a modest
// 30px with clear space well beyond the height of its "u" on every side.
export default function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { document.documentElement.style.overflow = open ? "hidden" : ""; }, [open]);
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className={`fixed inset-x-0 top-0 bg-white transition-shadow duration-300 ${open ? "z-[65]" : "z-50"} ${scrolled || open ? "nav-solid" : ""}`}>
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between gap-6 px-5 md:h-[84px] md:px-8">
        <Link href="/" className="shrink-0 py-3" aria-label="Sundae home"><Logo className="h-[28px] w-auto md:h-[30px]" /></Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {MENU.map((m) => (
            <div key={m.label} className="group relative">
              <Link href={m.href} className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[1.0625rem] font-bold text-ink transition-colors hover:text-blue ${active(m.href) ? "after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-[3px] after:bg-red" : ""}`} aria-current={active(m.href) ? "page" : undefined}>
                {m.label}
                {m.items && <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform group-hover:rotate-180" aria-hidden><path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" /></svg>}
              </Link>
              {m.items && (
                <div className="invisible absolute left-1/2 top-full w-[580px] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-gray bg-white p-3 shadow-[0_30px_60px_-30px_rgba(74,74,74,.45)]">
                    {m.items.map((it) => (
                      <Link key={it.href + it.label} href={it.href} className="rounded-xl px-4 py-3 transition-colors hover:bg-mist">
                        <div className="text-[1.0625rem] font-bold text-ink">{it.label}</div>
                        <div className="mt-0.5 text-base leading-snug text-ink">{it.note}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={CONTACT.sellerTel} className="hidden items-center gap-2 rounded-full px-3 py-2 text-[1.0625rem] font-bold tabular-nums text-ink hover:text-blue xl:flex"><Phone className="h-4 w-4 text-blue" />{CONTACT.sellerPhone}</a>
          <Link href="/get-offer" className="btn btn-blue hidden !px-5 !py-3 !text-base sm:inline-flex">Get my cash offer <Arrow /></Link>
          <button className="relative flex h-12 w-12 items-center justify-center rounded-full hover:bg-mist lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mnav" aria-label={open ? "Close menu" : "Open menu"}>
            <span className={`absolute h-[2px] w-6 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[7px]"}`} />
            <span className={`absolute h-[2px] w-6 bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-[2px] w-6 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[7px]"}`} />
          </button>
        </div>
      </div>
      <div id="mnav" data-lenis-prevent className={`fixed inset-x-0 bottom-0 top-[76px] overflow-y-auto border-t border-gray bg-white px-5 pb-8 pt-6 transition-all duration-500 md:top-[84px] md:px-8 lg:hidden ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"}`}>
        <nav className="grid gap-7" aria-label="Mobile">
          {MENU.map((m) => (
            <div key={m.label}>
              <Link href={m.href} className="display text-[1.75rem]">{m.label}</Link>
              {m.items && <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">{m.items.map((it) => <Link key={it.label} href={it.href} className="text-[1.0625rem] text-ink">{it.label}</Link>)}</div>}
            </div>
          ))}
        </nav>
        <div className="mt-9 grid gap-3">
          <Link href="/get-offer" className="btn btn-blue w-full">Get my cash offer <Arrow /></Link>
          <a href={CONTACT.sellerTel} className="btn btn-outline w-full"><Phone /> {CONTACT.sellerPhone}</a>
        </div>
      </div>
    </header>
  );
}
