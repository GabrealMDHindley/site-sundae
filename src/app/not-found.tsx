import Link from "next/link";
import { Arrow } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col items-start justify-center pt-32">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-[clamp(2.6rem,6vw,5rem)]">This page needs <span className="serif font-normal tracking-normal text-red">some love.</span></h1>
      <p className="lede mt-4">We couldn’t find what you were looking for.</p>
      <div className="mt-8 flex gap-3"><Link href="/" className="btn btn-red">Back home <Arrow /></Link><Link href="/get-offer" className="btn btn-line">Get my cash offer</Link></div>
    </section>
  );
}
