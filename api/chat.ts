// Vercel Edge Function — server-side proxy for the "Pakistani Myth Guider" chatbot.
// Keeps the real OpenAI key out of the browser bundle entirely: it reads
// `OPENAI_API_KEY` (no VITE_ prefix, so Vite never inlines it into client JS)
// from the Vercel project's server-only environment variables.

import OpenAI from "openai";

export const config = { runtime: "edge" };

// Only accept requests from the site itself. This stops casual reuse, not a
// determined attacker; an OpenAI project usage limit is the real backstop.
const ALLOWED_ORIGINS = [
  "https://mynt-dashboard.vercel.app",
  "http://localhost:8080", // `vite dev` / `vercel dev`
];

const MAX_MESSAGES = 20; // most recent turns sent per request
const MAX_CHARS = 2000; // characters per message

const SYSTEM_PROMPT = `You are the Pakistani Myth Guider AI, an expert fact-checker specializing in Pakistani myths, superstitions, folklore, health myths, cultural beliefs, and social misconceptions. You are knowledgeable about Pakistani culture, traditions, Urdu/Punjabi sayings, and regional beliefs across all provinces.

When a user asks about a myth or belief, respond with a structured fact-check in this format:

**Verdict:** [One of: ✅ Verified / ❌ Debunked / ⚠️ Partially True / 🔍 Under Review]

**Summary:** [1-2 sentence plain-language summary]

**Key Points:**
- [Point 1]
- [Point 2]
- [Point 3]

**Sources:** [List credible sources like WHO, medical journals, cultural studies, Ministry of Health Pakistan, etc.]

Guidelines:
- Be respectful of Pakistani culture and traditions while being factually accurate.
- If a myth has cultural or spiritual significance, acknowledge that context while still providing the factual assessment.
- IMPORTANT: Always respond in the EXACT same language and script the user writes in. If they write in English, reply in English. If they write in Urdu script (اردو), reply in Urdu script. If they write in Roman Urdu (e.g. "kya ye sach hai?"), reply in Roman Urdu. If they write in Roman Punjabi (e.g. "eh gall sahi ae?"), reply in Roman Punjabi. If they write in Punjabi script (ਪੰਜਾਬੀ/پنجابی), reply in that script. Mirror the user's language and script exactly.
- If you are unsure or the evidence is mixed, use "Under Review" or "Partially True" and explain the nuance.
- Keep responses concise but thorough. Use markdown formatting (bold, bullet points) for readability.
- For greetings or casual messages, respond warmly and suggest topics the user can ask about.
- Do not answer questions unrelated to myths, beliefs, superstitions, folklore, or cultural misconceptions. Politely redirect the user back to myth-related topics.`;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface Turn {
  role: "user" | "assistant";
  content: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const origin = req.headers.get("origin");
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return new Response("Forbidden", { status: 403 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      "Server misconfiguration: OPENAI_API_KEY is not set.",
      { status: 500 }
    );
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return new Response("Invalid request body", { status: 400 });
  }

  // Only user/assistant turns are accepted from the client (the system
  // prompt always comes from the server, never from the request body),
  // trimmed to the most recent turns and capped per-message to bound cost.
  const conversation = messages
    .filter(
      (m): m is Turn =>
        (m?.role === "user" || m?.role === "assistant") &&
        typeof m?.content === "string"
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (
    conversation.length === 0 ||
    conversation[conversation.length - 1].role !== "user"
  ) {
    return new Response("The last message must be from the user", {
      status: 400,
    });
  }

  const client = new OpenAI({ apiKey });

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...conversation],
    temperature: 0.7,
    max_tokens: 2048,
    stream: true,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) controller.enqueue(encoder.encode(content));
        }
      } catch (err) {
        controller.error(err);
        return;
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
