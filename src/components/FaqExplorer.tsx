"use client";
import { useMemo, useState } from "react";
import { FaqList } from "./ui";
import { ask } from "./AskButton";
import { Spark } from "./icons";
import type { QA } from "@/content/site";

export default function FaqExplorer({ sets }: { sets: { key: string; label: string; groups: { group: string; items: QA[] }[] }[] }) {
  const [tab, setTab] = useState(sets[0].key);
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const s = sets.find((x) => x.key === tab)!;
    const needle = q.trim().toLowerCase();
    if (!needle) return s.groups;
    return s.groups.map((g) => ({ ...g, items: g.items.filter((it) => (it.q + " " + it.a).toLowerCase().includes(needle)) })).filter((g) => g.items.length);
  }, [tab, q, sets]);
  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex rounded-full border border-line bg-white p-1" role="tablist">
          {sets.map((s) => <button key={s.key} role="tab" aria-selected={tab === s.key} onClick={() => setTab(s.key)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${tab === s.key ? "bg-ink text-white" : "text-muted hover:text-ink"}`}>{s.label}</button>)}
        </div>
        <label className="relative md:w-80"><span className="sr-only">Search questions</span><input className="field !rounded-full !py-3 !pl-5" placeholder="Search questions…" value={q} onChange={(e) => setQ(e.target.value)} /></label>
      </div>
      <div className="mt-10 grid gap-12">
        {groups.map((g) => <div key={g.group} className="grid gap-6 lg:grid-cols-[240px_1fr]"><h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-faint">{g.group}</h2><FaqList items={g.items} /></div>)}
        {!groups.length && (
          <div className="rounded-[1.5rem] bg-cream p-8 text-center">
            <p className="text-lg">No questions match “{q}”.</p>
            <button onClick={() => ask(q)} className="btn btn-red mt-5"><Spark /> Ask the assistant instead</button>
          </div>
        )}
      </div>
    </div>
  );
}
