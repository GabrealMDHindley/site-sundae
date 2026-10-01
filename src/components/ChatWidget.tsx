"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Arrow, Cross, Spark } from "./icons";
import { CONTACT } from "@/content/site";

type Src = { title: string; url: string };
type Msg = { role: "user" | "assistant"; content: string; sources?: Src[] };

const SUGGEST: Record<string, string[]> = {
  default: ["How does selling with Sundae work?", "Do I really pay zero fees?", "How fast can I close?", "Do I need to make repairs?", "What is the cash advance?", "Where do you buy homes?"],
  investors: ["How do I join the marketplace?", "How does the two-round offer process work?", "What are the investor admin fee and EMD?", "Does Sundae offer financing?"],
  membership: ["What is Sundae Membership?", "Who is a good fit for Membership?", "What does Sundae bring vs. what I bring?", "How do I book an intro call?"],
};

// Tiny, safe markdown: paragraphs, bullet lists, **bold**, _italic_, [links](/internal or https://).
function Inline({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|(?<![\w])_([^_]+)_(?![\w])/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      const href = m[2];
      if (href.startsWith("/")) out.push(<Link key={k++} href={href}>{m[1]}</Link>);
      else if (/^https?:\/\//.test(href)) out.push(<a key={k++} href={href} target="_blank" rel="noopener noreferrer">{m[1]}</a>);
      else if (/^tel:|^mailto:/.test(href)) out.push(<a key={k++} href={href}>{m[1]}</a>);
      else out.push(m[1]);
    } else if (m[3]) out.push(<strong key={k++}>{m[3]}</strong>);
    else if (m[4]) out.push(<em key={k++}>{m[4]}</em>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
function Md({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <div className="prose-chat">
      {blocks.map((b, i) => {
        const lines = b.split("\n");
        if (lines.every((l) => /^\s*([-*•]|\d+\.)\s+/.test(l))) return <ul key={i}>{lines.map((l, j) => <li key={j}><Inline text={l.replace(/^\s*([-*•]|\d+\.)\s+/, "")} /></li>)}</ul>;
        return <p key={i}>{lines.map((l, j) => <Fragment key={j}>{j > 0 && <br />}<Inline text={l} /></Fragment>)}</p>;
      })}
    </div>
  );
}

export default function ChatWidget() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [shown, setShown] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const msgsRef = useRef<Msg[]>([]);
  msgsRef.current = msgs;

  useEffect(() => {
    try { const s = sessionStorage.getItem("sundae-chat"); if (s) setMsgs(JSON.parse(s)); } catch {}
    const t = setTimeout(() => setShown(true), 900);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { try { sessionStorage.setItem("sundae-chat", JSON.stringify(msgs.slice(-20))); } catch {} }, [msgs]);
  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" }); }, [msgs, open]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 250); }, [open]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const send = useCallback(async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    setInput(""); setBusy(true); setOpen(true);
    const history = [...msgsRef.current, { role: "user" as const, content: q }];
    setMsgs([...history, { role: "assistant", content: "" }]);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }) });
      let sources: Src[] = [];
      try { sources = JSON.parse(decodeURIComponent(res.headers.get("x-sources") || "%5B%5D")); } catch {}
      if (!res.ok || !res.body) {
        const t = await res.text().catch(() => "");
        setMsgs((m) => [...m.slice(0, -1), { role: "assistant", content: t || `Something went wrong on our side. You can always reach a person at **${CONTACT.sellerPhone}**.` }]);
      } else {
        const reader = res.body.getReader(), dec = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += dec.decode(value, { stream: true });
          setMsgs((m) => [...m.slice(0, -1), { role: "assistant", content: acc }]);
        }
        setMsgs((m) => [...m.slice(0, -1), { role: "assistant", content: acc || "Sorry — I didn't catch that. Could you rephrase?", sources }]);
      }
    } catch {
      setMsgs((m) => [...m.slice(0, -1), { role: "assistant", content: `I couldn't connect just now. You can always reach a person at **${CONTACT.sellerPhone}**.` }]);
    }
    setBusy(false);
  }, [busy]);

  useEffect(() => {
    const on = (e: Event) => send((e as CustomEvent<string>).detail);
    window.addEventListener("sundae:ask", on);
    return () => window.removeEventListener("sundae:ask", on);
  }, [send]);

  const sugg = path.startsWith("/investors") ? SUGGEST.investors : path.startsWith("/membership") || path.startsWith("/events") ? SUGGEST.membership : SUGGEST.default;

  return (
    <>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="sundae-chat" aria-label={open ? "Close the Sundae assistant" : "Ask Sundae — open the assistant"}
        className={`fixed bottom-4 right-4 z-[60] flex items-center gap-2.5 rounded-full bg-ink py-2 pl-2 pr-5 text-white shadow-[0_18px_40px_-14px_rgba(27,20,22,.6)] transition-all duration-500 hover:-translate-y-0.5 md:bottom-6 md:right-6 ${shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"} ${open ? "max-md:hidden" : ""}`}>
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-red">
          {open ? <Cross className="h-4 w-4" /> : <img src="/brand/sundae-icon.svg" alt="" className="h-10 w-10" />}
          {!open && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-ink bg-[#3ccf8e]" />}
        </span>
        <span className="text-[0.92rem] font-semibold">{open ? "Close" : "Ask Sundae"}</span>
      </button>

      <section id="sundae-chat" role="dialog" aria-label="Sundae assistant" aria-modal="false" data-lenis-prevent
        className={`fixed z-[70] flex flex-col overflow-hidden border border-line bg-paper shadow-[0_40px_90px_-30px_rgba(27,20,22,.55)] transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] max-md:inset-2 max-md:rounded-[1.75rem] md:bottom-24 md:right-6 md:h-[min(640px,calc(100vh-8rem))] md:w-[400px] md:rounded-[1.75rem] ${open ? "visible translate-y-0 scale-100 opacity-100" : "invisible translate-y-4 scale-[.97] opacity-0"} origin-bottom-right`}>
        <header className="flex items-center gap-3 border-b border-line bg-white px-5 py-4">
          <img src="/brand/sundae-icon.svg" alt="" className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <div className="font-semibold leading-tight">Sundae Assistant</div>
            <div className="flex items-center gap-1.5 text-xs text-muted"><span className="h-1.5 w-1.5 rounded-full bg-[#3ccf8e]" /> Answers from this website, instantly</div>
          </div>
          {msgs.length > 0 && <button onClick={() => setMsgs([])} className="rounded-full px-2.5 py-1 text-xs text-muted hover:bg-cream">Clear</button>}
          <button onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream" aria-label="Close"><Cross /></button>
        </header>

        <div ref={list} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
          <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[0.94rem] leading-relaxed shadow-sm ring-1 ring-line">
            Hi! I’m Sundae’s assistant. Ask me anything about selling your house as-is, how offers and closing work, buying on the marketplace, or Sundae Membership.
          </div>
          {msgs.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {sugg.map((s) => <button key={s} onClick={() => send(s)} className="rounded-full border border-line bg-white px-3.5 py-2 text-left text-[0.84rem] transition-colors hover:border-ink">{s}</button>)}
            </div>
          )}
          {msgs.map((m, i) => m.role === "user" ? (
            <div key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-ink px-4 py-3 text-[0.94rem] leading-relaxed text-white">{m.content}</div>
          ) : (
            <div key={i} className="max-w-[92%]">
              <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[0.94rem] leading-relaxed shadow-sm ring-1 ring-line">
                {m.content ? <Md text={m.content} /> : <span className="inline-flex gap-1 py-1" aria-label="Thinking">{[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-faint" style={{ animationDelay: `${d * 0.15}s` }} />)}</span>}
              </div>
              {m.sources && m.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.sources.map((s) => <Link key={s.url + s.title} href={s.url} className="rounded-full bg-cream px-2.5 py-1 text-[0.72rem] text-muted hover:text-ink">{s.title}</Link>)}
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="border-t border-line bg-white p-3">
          <div className="flex items-end gap-2 rounded-2xl border border-line bg-paper p-1.5 focus-within:border-ink">
            <label htmlFor="chat-in" className="sr-only">Your question</label>
            <textarea id="chat-in" ref={inputRef} rows={1} value={input} maxLength={1000} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Ask about selling, offers, closing…" className="max-h-28 flex-1 resize-none bg-transparent px-2.5 py-2 text-[0.95rem] outline-none" />
            <button type="submit" disabled={busy || !input.trim()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-red text-white transition-opacity disabled:opacity-35" aria-label="Send"><Arrow /></button>
          </div>
          <p className="mt-2 flex items-center gap-1 px-1 text-[0.68rem] leading-snug text-faint"><Spark className="h-3 w-3 shrink-0" /> AI assistant trained on this site — it can make mistakes and isn’t legal or financial advice. For an offer, call {CONTACT.sellerPhone}.</p>
        </form>
      </section>
    </>
  );
}
