/* eslint-disable @next/next/no-img-element */
export default function Logo({ white = false, className = "h-7 w-auto" }: { white?: boolean; className?: string }) {
  return <img src={white ? "/brand/sundae-wordmark-white.svg" : "/brand/sundae-wordmark-red.svg"} alt="Sundae" className={className} width={159} height={45} />;
}
