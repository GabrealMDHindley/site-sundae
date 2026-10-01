"use client";
import { Spark } from "./icons";

// Opens the site assistant with a question already asked.
export function ask(q: string) {
  window.dispatchEvent(new CustomEvent("sundae:ask", { detail: q }));
}

export default function AskButton({ q, label, className = "" }: { q: string; label?: string; className?: string }) {
  return (
    <button type="button" onClick={() => ask(q)} className={`inline-flex items-center gap-1.5 font-semibold text-red-deep hover:text-red ${className}`}>
      <Spark className="h-3.5 w-3.5" /> {label || q}
    </button>
  );
}
