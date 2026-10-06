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
  // Below 1280px the launcher is its 60px icon only (the label expands on hover or keyboard focus), so it never covers
  // hero copy, event details or form buttons on phones and tablets. Wide screens always show "Ask Sundae".
  const compact = !open;
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
        className={`group fixed bottom-4 right-4 z-[60] flex items-center gap-3 rounded-full bg-blue py-2 pl-2 pr-6 text-white ${compact ? "max-xl:gap-0 max-xl:pr-2 max-xl:hover:gap-3 max-xl:hover:pr-6 max-xl:focus-visible:gap-3 max-xl:focus-visible:pr-6" : ""} shadow-[0_18px_40px_-16px_rgba(28,81,160,.75)] transition-all duration-500 hover:-translate-y-0.5 md:bottom-6 md:right-6 ${shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"} ${open ? "max-md:hidden" : ""}`}>
        <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-red">
          {open ? <Cross className="h-5 w-5" /> : <img src="/brand/sundae-icon-red.svg" alt="" className="h-11 w-11" />}
        </span>
        <span className={`max-w-[10rem] overflow-hidden whitespace-nowrap text-[1.0625rem] font-bold transition-[max-width,opacity] duration-500 ${compact ? "max-xl:max-w-0 max-xl:opacity-0 max-xl:group-hover:max-w-[10rem] max-xl:group-hover:opacity-100 max-xl:group-focus-visible:max-w-[10rem] max-xl:group-focus-visible:opacity-100" : ""}`}>{open ? "Close" : "Ask Sundae"}</span>
      </button>

      <section id="sundae-chat" role="dialog" aria-label="Sundae assistant" aria-modal="false" data-lenis-prevent
        className={`fixed z-[70] flex flex-col overflow-hidden border border-gray bg-mist shadow-[0_40px_90px_-30px_rgba(74,74,74,.6)] transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] max-md:inset-2 max-md:rounded-[1.5rem] md:bottom-24 md:right-6 md:h-[min(680px,calc(100vh-8rem))] md:w-[430px] md:rounded-[1.5rem] ${open ? "visible translate-y-0 scale-100 opacity-100" : "invisible translate-y-4 scale-[.97] opacity-0"} origin-bottom-right`}>
        <header className="flex items-center gap-3 border-b border-gray bg-white px-5 py-4">
          <img src="/brand/sundae-icon-red.svg" alt="" className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <div className="text-[1.0625rem] font-bold leading-tight">Sundae Assistant</div>
            <div className="text-base leading-snug">Answers from this website</div>
          </div>
          {msgs.length > 0 && <button onClick={() => setMsgs([])} className="rounded-full px-3 py-1.5 text-base font-bold text-blue hover:bg-mist">Clear</button>}
          <button onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-mist" aria-label="Close"><Cross className="h-5 w-5" /></button>
        </header>

        <div ref={list} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
          <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[1.0625rem] leading-relaxed ring-1 ring-gray">
            Hi! I’m Sundae’s assistant. Ask me anything about selling your house as-is, how offers and closing work, buying on the marketplace or Sundae Membership.
          </div>
          {msgs.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {sugg.map((s) => <button key={s} onClick={() => send(s)} className="rounded-full border border-blue bg-white px-4 py-2 text-left text-base font-bold leading-snug text-blue transition-colors hover:bg-mist">{s}</button>)}
            </div>
          )}
          {msgs.map((m, i) => m.role === "user" ? (
            <div key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-blue px-4 py-3 text-[1.0625rem] leading-relaxed text-white">{m.content}</div>
          ) : (
            <div key={i} className="max-w-[92%]">
              <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[1.0625rem] leading-relaxed ring-1 ring-gray">
                {m.content ? <Md text={m.content} /> : <span className="inline-flex gap-1 py-1" aria-label="Thinking">{[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-slate" style={{ animationDelay: `${d * 0.15}s` }} />)}</span>}
              </div>
              {m.sources && m.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.sources.map((s) => <Link key={s.url + s.title} href={s.url} className="rounded-full border border-gray bg-white px-3 py-1 text-base text-blue underline-offset-4 hover:underline">{s.title}</Link>)}
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="border-t border-gray bg-white p-3">
          <div className="flex items-end gap-2 rounded-2xl border border-[rgba(74,74,74,.6)] bg-white p-1.5 focus-within:border-blue">
            <label htmlFor="chat-in" className="sr-only">Your question</label>
            <textarea id="chat-in" ref={inputRef} rows={1} value={input} maxLength={1000} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Ask about selling, offers, closing…" className="max-h-28 flex-1 resize-none bg-transparent px-2.5 py-2 text-[1.0625rem] outline-none placeholder:text-ink placeholder:opacity-[.82]" />
            <button type="submit" disabled={busy || !input.trim()} className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue text-white transition-opacity disabled:opacity-40" aria-label="Send"><Arrow /></button>
          </div>
          <p className="mt-2 flex items-start gap-1.5 px-1 text-base leading-snug"><Spark className="mt-1 h-3.5 w-3.5 shrink-0 text-blue" /> <span>AI assistant trained on this site. It can make mistakes and isn’t legal or financial advice. For an offer, call {CONTACT.sellerPhone}.</span></p>
        </form>
      </section>
    </>
  );
}
