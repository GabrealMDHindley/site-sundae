"use client";
import { useEffect, useState } from "react";
import { Arrow, Check, Phone } from "./icons";
import { CONTACT } from "@/content/site";

type F = { address: string; unit: string; relationship: string; condition: string; timeline: string; situation: string; firstName: string; lastName: string; phone: string; email: string; smsTransactional: boolean; smsMarketing: boolean; terms: boolean; website: string };
const START: F = { address: "", unit: "", relationship: "", condition: "", timeline: "", situation: "", firstName: "", lastName: "", phone: "", email: "", smsTransactional: false, smsMarketing: false, terms: false, website: "" };

const REL = ["I own it", "I inherited it / estate", "It’s a rental I own", "I’m helping a family member"];
const COND = ["Needs major repairs", "Needs some updates", "Dated but livable", "Mostly move-in ready"];
const TIME = ["As soon as possible", "Within 1–3 months", "3+ months", "Just exploring options"];

function Opts({ value, set, list, label }: { value: string; set: (v: string) => void; list: string[]; label: string }) {
  return (
    <fieldset>
      <legend className="mb-3 font-semibold">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">{list.map((o) => <button type="button" key={o} className="opt" data-on={value === o} aria-pressed={value === o} onClick={() => set(o)}>{o}</button>)}</div>
    </fieldset>
  );
}

export default function OfferForm() {
  const [f, setF] = useState<F>(START);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "not-connected" | "error">("idle");
  const [utm, setUtm] = useState<Record<string, string>>({});
  useEffect(() => { const p = new URLSearchParams(location.search); const u: Record<string, string> = {}; p.forEach((v, k) => { if (k.startsWith("utm_")) u[k] = v; }); setUtm(u); }, []);
  const up = <K extends keyof F>(k: K) => (v: F[K]) => setF((x) => ({ ...x, [k]: v }));

  const next = () => {
    if (step === 0 && f.address.trim().length < 6) { setErrors({ address: "Enter the property’s street address" }); return; }
    setErrors({}); setStep((s) => s + 1);
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending"); setErrors({});
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...f, utm }) });
      const j = await r.json();
      if (r.status === 422) { setErrors(j.errors || {}); setState("idle"); return; }
      setState(j.ok ? "done" : j.routed === "not-connected" ? "not-connected" : "error");
    } catch { setState("error"); }
  };

  if (state === "done") return (
    <div className="text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red text-white"><Check className="h-7 w-7" /></span>
      <h2 className="display mt-6 text-4xl">You’re all set, {f.firstName}.</h2>
      <p className="mx-auto mt-3 max-w-md text-muted">A local Market Expert will reach out shortly to learn about your property and schedule the visit. Questions in the meantime? Call {CONTACT.sellerPhone}.</p>
    </div>
  );
  if (state === "not-connected" || state === "error") return (
    <div>
      <p className="eyebrow eyebrow-plain">{state === "error" ? "We couldn’t send that" : "Preview site"}</p>
      <h2 className="display mt-3 text-3xl">{state === "error" ? "Something went wrong on our side." : "This preview isn’t connected to Sundae’s system yet."}</h2>
      <p className="mt-3 text-muted">Your request was <strong>not</strong> sent. To get your offer started right now, call a local Market Expert or finish on sundae.com — it takes a minute.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a href={CONTACT.sellerTel} className="btn btn-red"><Phone /> Call {CONTACT.sellerPhone}</a>
        <a href={CONTACT.liveOfferForm} target="_blank" rel="noopener noreferrer" className="btn btn-line">Continue on sundae.com <Arrow /></a>
      </div>
      <p className="mt-5 rounded-2xl bg-cream p-4 text-sm text-muted">Your details: {f.address}{f.unit ? `, ${f.unit}` : ""} · {f.firstName} {f.lastName} · {f.phone} · {f.email}</p>
    </div>
  );

  return (
    <form onSubmit={submit} noValidate>
      <div className="mb-8 flex items-center gap-2" aria-hidden>
        {[0, 1, 2].map((i) => <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-red" : "bg-line"}`} />)}
      </div>
      <p className="font-mono text-xs uppercase tracking-wider text-faint">Step {step + 1} of 3</p>
      <input type="text" name="website" value={f.website} onChange={(e) => up("website")(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

      {step === 0 && (
        <div className="rise mt-3">
          <h2 className="display text-3xl md:text-4xl">Where’s the property?</h2>
          <p className="mt-2 text-muted">We’ll check that Sundae is a good fit for your home and market.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_140px]">
            <label className="grid gap-1.5"><span className="sr-only">Street address</span><input className="field" autoComplete="street-address" placeholder="Street address, city, ZIP" value={f.address} onChange={(e) => up("address")(e.target.value)} aria-invalid={!!errors.address} /></label>
            <label className="grid gap-1.5"><span className="sr-only">Unit</span><input className="field" placeholder="Unit (optional)" value={f.unit} onChange={(e) => up("unit")(e.target.value)} /></label>
          </div>
          {errors.address && <p className="mt-2 text-sm text-red-deep">{errors.address}</p>}
          <button type="button" onClick={next} className="btn btn-red mt-6 w-full sm:w-auto">Continue <Arrow /></button>
        </div>
      )}

      {step === 1 && (
        <div className="rise mt-3 grid gap-7">
          <div><h2 className="display text-3xl md:text-4xl">Tell us a little about it.</h2><p className="mt-2 text-muted">All optional — it just helps your Market Expert prepare.</p></div>
          <Opts label="Your connection to the property" value={f.relationship} set={up("relationship")} list={REL} />
          <Opts label="Condition" value={f.condition} set={up("condition")} list={COND} />
          <Opts label="When would you like to sell?" value={f.timeline} set={up("timeline")} list={TIME} />
          <label className="grid gap-2"><span className="font-semibold">Anything we should know? <span className="font-normal text-faint">(optional)</span></span><textarea className="field min-h-24" maxLength={800} value={f.situation} onChange={(e) => up("situation")(e.target.value)} placeholder="e.g. roof needs work, tenant-occupied, moving out of state…" /></label>
          <div className="flex gap-3"><button type="button" onClick={() => setStep(0)} className="btn btn-line">Back</button><button type="button" onClick={next} className="btn btn-red flex-1 sm:flex-none">Continue <Arrow /></button></div>
        </div>
      )}

      {step === 2 && (
        <div className="rise mt-3 grid gap-4">
          <div><h2 className="display text-3xl md:text-4xl">Where should we send your offer?</h2><p className="mt-2 text-muted">No obligation. Your details are never shared with investors.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {([["firstName", "First name", "given-name", "text"], ["lastName", "Last name", "family-name", "text"], ["phone", "Phone", "tel", "tel"], ["email", "Email", "email", "email"]] as const).map(([k, l, ac, t]) => (
              <label key={k} className="grid gap-1.5"><span className="text-sm font-medium">{l}</span><input className="field" type={t} autoComplete={ac} value={f[k]} onChange={(e) => up(k)(e.target.value)} aria-invalid={!!errors[k]} />{errors[k] && <span className="text-sm text-red-deep">{errors[k]}</span>}</label>
            ))}
          </div>
          <div className="mt-2 grid gap-3 text-[0.78rem] leading-relaxed text-muted">
            <label className="flex gap-3"><input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#db3d55]" checked={f.smsTransactional} onChange={(e) => up("smsTransactional")(e.target.checked)} />By checking, you are allowing to receive transactional/informational SMS communications regarding account notifications, customer care, etc, from Sundae or a local Sundae member. Frequency may vary, message and data rates may apply, reply HELP for help or STOP to opt-out.</label>
            <label className="flex gap-3"><input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#db3d55]" checked={f.smsMarketing} onChange={(e) => up("smsMarketing")(e.target.checked)} />By checking, you are allowing to receive promotional/marketing SMS communications from Sundae or a local Sundae member. Frequency may vary, message and data rates may apply, reply HELP for help or STOP to opt-out.</label>
            <label className="flex gap-3"><input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#db3d55]" checked={f.terms} onChange={(e) => up("terms")(e.target.checked)} aria-invalid={!!errors.terms} /><span>By checking, I accept the <a className="underline" href="https://sundae.com/terms-of-service/" target="_blank" rel="noopener noreferrer">Terms of Service</a> & <a className="underline" href="https://sundae.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</span></label>
            {errors.terms && <span className="text-sm text-red-deep">{errors.terms}</span>}
          </div>
          <div className="mt-2 flex gap-3"><button type="button" onClick={() => setStep(1)} className="btn btn-line">Back</button><button type="submit" disabled={state === "sending"} className="btn btn-red flex-1 sm:flex-none">{state === "sending" ? "Sending…" : "Get my cash offer!"} <Arrow /></button></div>
        </div>
      )}
    </form>
  );
}
