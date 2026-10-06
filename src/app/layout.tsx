import type { Metadata, Viewport } from "next";
import { Lato, Merriweather } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import ChatWidget from "@/components/ChatWidget";
import { CONTACT, RATING } from "@/content/site";

// Sundae brand fonts (Creative Guidelines p.7): Merriweather for headlines and callouts, Lato for everything else.
const merriweather = Merriweather({ subsets: ["latin"], variable: "--font-merriweather", display: "swap" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-lato", display: "swap" });

const title = "Sundae — Sell your house as-is. When investors compete, homeowners win.";
const description = "Sell as-is with zero fees paid to Sundae. 20,000+ investors compete for your house on the Sundae Marketplace, so you get competitive cash offers. Close in as little as 10 days or up to 60.";

export const metadata: Metadata = {
  metadataBase: new URL("https://site-sundae-xi.vercel.app"),
  title: { default: title, template: "%s · Sundae" },
  description,
  openGraph: { title, description, type: "website", siteName: "Sundae", images: ["/media/people/sold-sign-couple.jpg"] },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: false, follow: false }, // concept rebuild for review — never compete with sundae.com in search
};
export const viewport: Viewport = { themeColor: "#ffffff" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Sundae",
  url: "https://sundae.com",
  telephone: CONTACT.sellerPhoneLd,
  email: CONTACT.email,
  aggregateRating: { "@type": "AggregateRating", ratingValue: RATING.score, reviewCount: RATING.count },
  sameAs: CONTACT.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${merriweather.variable} ${lato.variable}`}>
      <body className="min-h-screen overflow-x-clip">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-blue focus:px-5 focus:py-3 focus:font-bold focus:text-white">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
        <ScrollFx />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
