import Link from "next/link";
import { Arrow } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col items-start justify-center pt-32">
      <p className="eyebrow">404</p>
      <h1 className="display h-bar h-bar-lg mt-4 text-[clamp(2.4rem,5vw,4.25rem)]">This page needs <span className="hl">some love.</span></h1>
      <p className="lede mt-6">We couldn’t find what you were looking for.</p>
      <div className="mt-9 flex flex-wrap gap-3"><Link href="/" className="btn btn-blue">Back home <Arrow /></Link><Link href="/get-offer" className="btn btn-outline">Get my cash offer</Link></div>
    </section>
  );
}
