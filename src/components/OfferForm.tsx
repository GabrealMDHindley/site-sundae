"use client";
import { useEffect, useRef, useState } from "react";
import { Arrow, Check, Phone } from "./icons";
import { CONTACT } from "@/content/site";

type F = { address: string; unit: string; relationship: string; condition: string; timeline: string; situation: string; firstName: string; lastName: string; phone: string; email: string; smsTransactional: boolean; smsMarketing: boolean; terms: boolean; website: string };
const START: F = { address: "", unit: "", relationship: "", condition: "", timeline: "", situation: "", firstName: "", lastName: "", phone: "", email: "", smsTransactional: false, smsMarketing: false, terms: false, website: "" };

const REL = ["I own it", "I inherited it / estate", "It’s a rental I own", "I’m helping a family member"];
const COND = ["Needs major repairs", "Needs some updates", "Dated but livable", "Mostly move-in ready"];
// TIME values are the `timeline` strings posted to the lead webhook and stay as they were; LABELS shows them in AP style.
const TIME = ["As soon as possible", "Within 1–3 months", "3+ months", "Just exploring options"];
const LABELS: Record<string, string> = { "Within 1–3 months": "Within one to three months", "3+ months": "In three months or more" };

function Opts({ value, set, list, label, labels = {} }: { value: string; set: (v: string) => void; list: string[]; label: string; labels?: Record<string, string> }) {
  return (
    <fieldset>
      <legend className="mb-3 text-lg font-bold">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">{list.map((o) => <button type="button" key={o} className="opt" data-on={value === o} aria-pressed={value === o} onClick={() => set(o)}>{labels[o] ?? o}</button>)}</div>
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
  // After a step change or a submit result, bring the card's top back into view if it scrolled away
  // (on phones the result card is much shorter than step 3, so it would otherwise land above the viewport).
  const top = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    if (state === "sending") return;
    const el = top.current; if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < 0 || r.top > window.innerHeight * 0.5) el.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [state, step]);

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

  let body: React.ReactNode;
  if (state === "done") body = (
    <div className="text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue text-white"><Check className="h-7 w-7" /></span>
      <h2 className="display mt-6 text-[2.25rem]">You’re all set, {f.firstName}.</h2>
      <p className="mx-auto mt-4 max-w-md text-lg">A local Market Expert will reach out shortly to learn about your property and schedule the visit. Questions in the meantime? Call {CONTACT.sellerPhone}.</p>
    </div>
  );
  else if (state === "not-connected" || state === "error") body = (
    <div>
      <p className="eyebrow">{state === "error" ? "We couldn’t send that" : "Preview site"}</p>
      <h2 className="display h-bar mt-4 text-[1.875rem] md:text-[2.125rem]">{state === "error" ? "Something went wrong on our side." : "This preview isn’t connected to Sundae’s system yet."}</h2>
      <p className="mt-4 text-lg">Your request was <strong>not</strong> sent. To get your offer started right now, call a local Market Expert or finish on sundae.com. It takes a minute.</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <a href={CONTACT.sellerTel} className="btn btn-blue"><Phone /> Call {CONTACT.sellerPhone}</a>
        <a href={CONTACT.liveOfferForm} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Continue on sundae.com <Arrow /></a>
      </div>
      <p className="mt-6 rounded-xl bg-mist p-4 text-base">Your details: {f.address}{f.unit ? `, ${f.unit}` : ""} · {f.firstName} {f.lastName} · {f.phone} · {f.email}</p>
    </div>
  );

  else body = (
    <form onSubmit={submit} noValidate>
      <div className="mb-8 flex items-center gap-2" aria-hidden>
        {[0, 1, 2].map((i) => <span key={i} className={`h-2 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-red" : "bg-gray"}`} />)}
      </div>
      <p className="eyebrow">Step {step + 1} of 3</p>
      <input type="text" name="website" value={f.website} onChange={(e) => up("website")(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

      {step === 0 && (
        <div className="rise mt-3">
          <h2 className="display text-[1.875rem] md:text-[2.25rem]">Where’s the property?</h2>
          <p className="mt-3 text-lg">We’ll check that Sundae is a good fit for your home and market.</p>
          {/* visible labels (as on step 3); the unit field stacks under the address in the narrow lg two-column layout */}
          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_8.5rem] lg:grid-cols-1 xl:grid-cols-[1fr_8.5rem]">
            <label className="grid gap-1.5"><span className="text-base font-bold">Street address</span><input className="field" autoComplete="street-address" placeholder="Street address, city, ZIP" value={f.address} onChange={(e) => up("address")(e.target.value)} aria-invalid={!!errors.address} /></label>
            <label className="grid gap-1.5"><span className="text-base font-bold">Unit <span className="font-normal">(optional)</span></span><input className="field" value={f.unit} onChange={(e) => up("unit")(e.target.value)} /></label>
          </div>
          {errors.address && <p className="error mt-3" role="alert">{errors.address}</p>}
          <button type="button" onClick={next} className="btn btn-blue mt-7 w-full sm:w-auto">Continue <Arrow /></button>
        </div>
      )}

      {step === 1 && (
        <div className="rise mt-3 grid gap-7">
          <div><h2 className="display text-[1.875rem] md:text-[2.25rem]">Tell us a little about it.</h2><p className="mt-3 text-lg">All optional. It just helps your Market Expert prepare.</p></div>
          <Opts label="Your connection to the property" value={f.relationship} set={up("relationship")} list={REL} />
          <Opts label="Condition" value={f.condition} set={up("condition")} list={COND} />
          <Opts label="When would you like to sell?" value={f.timeline} set={up("timeline")} list={TIME} labels={LABELS} />
          <label className="grid gap-2"><span className="text-lg font-bold">Anything we should know? <span className="font-normal">(optional)</span></span><textarea className="field min-h-24" maxLength={800} value={f.situation} onChange={(e) => up("situation")(e.target.value)} placeholder="For example: roof needs work, tenant-occupied, moving out of state" /></label>
          <div className="flex gap-3"><button type="button" onClick={() => setStep(0)} className="btn btn-outline">Back</button><button type="button" onClick={next} className="btn btn-blue flex-1 sm:flex-none">Continue <Arrow /></button></div>
        </div>
      )}

      {step === 2 && (
        <div className="rise mt-3 grid gap-4">
          <div><h2 className="display text-[1.875rem] md:text-[2.25rem]">Where should we send your offer?</h2><p className="mt-3 text-lg">No obligation. Your details are never shared with investors.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {([["firstName", "First name", "given-name", "text"], ["lastName", "Last name", "family-name", "text"], ["phone", "Phone", "tel", "tel"], ["email", "Email", "email", "email"]] as const).map(([k, l, ac, t]) => (
              <label key={k} className="grid gap-1.5"><span className="text-base font-bold">{l}</span><input className="field" type={t} autoComplete={ac} value={f[k]} onChange={(e) => up(k)(e.target.value)} aria-invalid={!!errors[k]} />{errors[k] && <span className="error" role="alert">{errors[k]}</span>}</label>
            ))}
          </div>
          <div className="mt-2 grid gap-3.5 text-base leading-relaxed">
            <label className="flex gap-3"><input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#1c51a0]" checked={f.smsTransactional} onChange={(e) => up("smsTransactional")(e.target.checked)} />By checking, you are allowing to receive transactional/informational SMS communications regarding account notifications, customer care, etc, from Sundae or a local Sundae member. Frequency may vary, message and data rates may apply, reply HELP for help or STOP to opt-out.</label>
            <label className="flex gap-3"><input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#1c51a0]" checked={f.smsMarketing} onChange={(e) => up("smsMarketing")(e.target.checked)} />By checking, you are allowing to receive promotional/marketing SMS communications from Sundae or a local Sundae member. Frequency may vary, message and data rates may apply, reply HELP for help or STOP to opt-out.</label>
            <label className="flex gap-3"><input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#1c51a0]" checked={f.terms} onChange={(e) => up("terms")(e.target.checked)} aria-invalid={!!errors.terms} /><span>By checking, I accept the <a className="font-bold text-blue underline underline-offset-4" href="https://sundae.com/terms-of-service/" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a className="font-bold text-blue underline underline-offset-4" href="https://sundae.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</span></label>
            {errors.terms && <span className="error" role="alert">{errors.terms}</span>}
          </div>
          <div className="mt-3 flex gap-3"><button type="button" onClick={() => setStep(1)} className="btn btn-outline">Back</button><button type="submit" disabled={state === "sending"} className="btn btn-blue flex-1 sm:flex-none">{state === "sending" ? "Sending…" : "Get my cash offer"} <Arrow /></button></div>
        </div>
      )}
    </form>
  );
  return <div ref={top} className="scroll-mt-28">{body}</div>;
}
