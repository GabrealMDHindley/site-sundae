"use client";
import { Spark } from "./icons";

// Opens the site assistant with a question already asked.
export function ask(q: string) {
  window.dispatchEvent(new CustomEvent("sundae:ask", { detail: q }));
}

export default function AskButton({ q, label, className = "" }: { q: string; label?: string; className?: string }) {
  const look = /\bbtn\b/.test(className) ? "" : "inline-flex items-center gap-2 text-left font-bold text-blue underline-offset-4 hover:underline";
  return (
    <button type="button" onClick={() => ask(q)} className={`${look} ${className}`}>
      <Spark className="h-4 w-4 shrink-0" /> {label || q}
    </button>
  );
}
