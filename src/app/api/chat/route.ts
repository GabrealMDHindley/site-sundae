import Anthropic from "@anthropic-ai/sdk";
import { CONTACT } from "@/content/site";
import { confident, extract, kbText, search } from "@/content/kb";

export const runtime = "nodejs";
export const maxDuration = 60;

type Msg = { role: "user" | "assistant"; content: string };

const INSTRUCTIONS = `You are the assistant on Sundae's website (sundae.com). Sundae is an off-market real estate marketplace: homeowners sell as-is with zero fees paid to Sundae while 20,000+ investors compete for the house; investors buy through the Sundae Marketplace; experienced real estate operators can join Sundae Membership.

How to answer:
- Use ONLY the website content below. If the answer isn't there, say you don't have that detail and point to the right person: sellers call ${CONTACT.sellerPhone}, investors call ${CONTACT.investorPhone}, operators book an intro call at ${CONTACT.introCall}.
- Be warm, plain-spoken and brief: 2–5 sentences, or a short list when steps help. Many sellers are going through something hard (an inheritance, a move, financial stress) — be kind, never pushy.
- Link to pages on this site with markdown links using the page paths given in the content, e.g. [How it works](/how-it-works) or [get offers](/get-offer).
- Never estimate what a home is worth, quote an offer, promise a price, timeline or approval, or give legal, tax or investment advice. For Sundae Membership never discuss earnings, income or returns, and never state fees or territory terms — those are covered on the intro call.
- If the site content disagrees with itself (for example the cash advance amount), say the Closing Manager confirms the exact figure.
- Write in Sundae's voice (expert, empathetic, trusted; kind, uncomplicated, direct) and in AP style: "7 p.m.", "Oct. 8", no serial comma. Never describe Sundae with superlatives such as "best," "highest" or "top," and describe offer counts as averages (for example "an average of 22+ offers").
- Stay on Sundae topics; politely decline anything else.`;

let client: Anthropic | null = null;
const hits = new Map<string, { n: number; t: number }>();

function limited(ip: string) {
  const now = Date.now(), h = hits.get(ip);
  if (!h || now - h.t > 60_000) { hits.set(ip, { n: 1, t: now }); return false; }
  h.n += 1; return h.n > 20;
}

function localAnswer(q: string) {
  if (/^\s*(hi|hey|hello|yo|good (morning|afternoon|evening))\b/i.test(q) && q.length < 30)
    return `Hi! I can answer questions about selling your house as-is, how offers work, closing, the cash advance, investing on the marketplace or Sundae Membership. What would you like to know?`;
  const res = search(q, 3);
  if (!confident(q, res))
    return `I don't have that on the Sundae site. A local Market Expert can help. Call **${CONTACT.sellerPhone}** (investors: ${CONTACT.investorPhone}) or [request offers](/get-offer).`;
  const [top, second] = res;
  let out = extract(top.doc, q);
  if (second && second.score > top.score * 0.85 && second.doc.id !== top.doc.id && second.doc.label === top.doc.label) out += `\n\n${extract(second.doc, q, 2)}`;
  const links = [...new Map(res.filter((r) => r.score > top.score * 0.6).map((r) => [r.doc.url.split("#")[0], [r.doc.url, r.doc.label]])).values()].slice(0, 2);
  return `${out}\n\nMore: ${links.map(([u, t]) => `[${t}](${u})`).join(" · ")}`;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return new Response("You're sending messages quickly — give it a few seconds and try again.", { status: 429 });
  let messages: Msg[];
  try {
    const body = await req.json();
    messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter((m: Msg) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
      .slice(-12).map((m: Msg) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  } catch { return new Response("Bad request", { status: 400 }); }
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return new Response("Bad request", { status: 400 });

  const q = messages[messages.length - 1].content;
  const hitsForQ = search(q, 3);
  const sources = hitsForQ.filter((r) => confident(q, hitsForQ) && r.score > hitsForQ[0].score * 0.6)
    .map((r) => ({ title: r.doc.label, url: r.doc.url }))
    .filter((x, i, a) => a.findIndex((y) => y.url === x.url) === i);
  const headers = { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-sources": encodeURIComponent(JSON.stringify(sources)) };

  if (!process.env.ANTHROPIC_API_KEY) return new Response(localAnswer(q), { headers: { ...headers, "x-mode": "local" } });

  client ??= new Anthropic();
  const enc = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(ctrl) {
      let sent = false;
      try {
        const stream = client!.beta.messages.stream({
          model: "claude-opus-5-5",
          max_tokens: 1024,
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          output_config: { effort: "low" },
          system: [
            { type: "text", text: INSTRUCTIONS },
            { type: "text", text: `# Website content\n\n${kbText()}`, cache_control: { type: "ephemeral" } },
          ],
          messages,
        });
        for await (const ev of stream) {
          if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") { ctrl.enqueue(enc.encode(ev.delta.text)); sent = true; }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal")
          ctrl.enqueue(enc.encode(sent ? "\n\n_(I had to stop there — please call us for help with this one.)_" : `I can't help with that here. For anything about selling, investing or membership, call **${CONTACT.sellerPhone}**.`));
      } catch (err) {
        console.error("chat error", err);
        ctrl.enqueue(enc.encode(sent ? "\n\n_(Connection interrupted — please try again.)_" : localAnswer(q)));
      }
      ctrl.close();
    },
  });
  return new Response(body, { headers: { ...headers, "x-mode": "ai" } });
}
