export const runtime = "nodejs";

// Seller lead intake. Forwards to Sundae's CRM when LEAD_WEBHOOK_URL is set (Vercel env);
// until then it says so plainly — the form never pretends a lead was delivered.
const req = (v: unknown, max = 200) => typeof v === "string" && v.trim().length > 0 && v.length <= max;

export async function POST(request: Request) {
  let b: Record<string, unknown>;
  try { b = await request.json(); } catch { return Response.json({ ok: false, error: "Bad request" }, { status: 400 }); }
  if (b.website) return Response.json({ ok: true, routed: "crm" }); // honeypot
  const errors: Record<string, string> = {};
  if (!req(b.address)) errors.address = "Enter the property address";
  if (!req(b.firstName, 80)) errors.firstName = "Enter your first name";
  if (!req(b.lastName, 80)) errors.lastName = "Enter your last name";
  if (!req(b.phone, 40) || String(b.phone).replace(/\D/g, "").length < 10) errors.phone = "Enter a 10-digit phone number";
  if (!req(b.email, 160) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(b.email))) errors.email = "Enter a valid email";
  if (b.terms !== true) errors.terms = "Please accept the Terms of Service & Privacy Policy";
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 });

  const lead = {
    source: "sundae-rebuild/get-offer", receivedAt: new Date().toISOString(),
    address: b.address, unit: b.unit || "", firstName: b.firstName, lastName: b.lastName, phone: b.phone, email: b.email,
    relationship: b.relationship || "", condition: b.condition || "", timeline: b.timeline || "", situation: b.situation || "",
    smsTransactional: b.smsTransactional === true, smsMarketing: b.smsMarketing === true, utm: b.utm || {},
  };
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) });
      if (r.ok) return Response.json({ ok: true, routed: "crm" });
      console.error("lead webhook status", r.status);
    } catch (e) { console.error("lead webhook error", e); }
    return Response.json({ ok: false, routed: "error" }, { status: 502 });
  }
  console.log("lead (no LEAD_WEBHOOK_URL set — not delivered)", JSON.stringify({ ...lead, phone: "redacted", email: "redacted" }));
  return Response.json({ ok: false, routed: "not-connected" });
}
