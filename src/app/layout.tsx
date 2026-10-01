import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import ChatWidget from "@/components/ChatWidget";
import { CONTACT, RATING } from "@/content/site";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = "Sundae — Sell your house as-is, for the best price";
const description = "Sell as-is with zero fees paid to Sundae. 20,000+ investors compete for your house on the Sundae Marketplace, so you get the highest off-market price. Close in 10–60 days.";

export const metadata: Metadata = {
  metadataBase: new URL("https://site-sundae-xi.vercel.app"),
  title: { default: title, template: "%s · Sundae" },
  description,
  openGraph: { title, description, type: "website", siteName: "Sundae", images: ["/media/people/sold-sign-couple.jpg"] },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: false, follow: false }, // concept rebuild for review — never compete with sundae.com in search
};
export const viewport: Viewport = { themeColor: "#fffbf7" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Sundae",
  url: "https://sundae.com",
  telephone: CONTACT.sellerPhone,
  email: CONTACT.email,
  aggregateRating: { "@type": "AggregateRating", ratingValue: RATING.score, reviewCount: RATING.count },
  sameAs: CONTACT.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable} ${inter.variable}`}>
      <body className="min-h-screen overflow-x-clip">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
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
