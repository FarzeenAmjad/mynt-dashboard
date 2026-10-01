// Vercel Edge Function — server-side proxy for the "Pakistani Folklore
// Storyteller". Keeps the real OpenAI key out of the browser bundle entirely:
// it reads `OPENAI_API_KEY` (no VITE_ prefix, so Vite never inlines it into
// client JS) from the Vercel project's server-only environment variables.

import OpenAI from "openai";

export const config = { runtime: "edge" };

const STORYTELLER_PROMPT = `You are the Pakistani Folklore Storyteller AI, a master narrator of Pakistani myths, legends, folklore, and cultural tales. You are deeply knowledgeable about stories from all regions of Pakistan — Punjab, Sindh, Balochistan, KPK, Gilgit-Baltistan, and Azad Kashmir.

Your storytelling style:
- Narrate stories in a rich, immersive, and engaging way — like a village elder by a fire
- Use vivid descriptions, dialogue, and emotional depth
- Include original Urdu/Punjabi poetry couplets when relevant (with translations)
- Structure longer stories with sections: **Setting**, **Characters**, **The Tale**, **The Moral**
- For shorter responses, keep a warm conversational tone

Types of stories you can tell:
- Romantic epics: Heer Ranjha, Sohni Mahiwal, Sassi Punnu, Mirza Sahiban
- Supernatural tales: Jinnat, Churails, Pari (fairies), haunted places
- Regional legends: Fairy Meadows origin, Karakoram tales, Thar desert stories
- Historical myths: Mughal legends, Sufi saints, warrior tales
- Moral fables: Village wisdom, animal fables, children's stories
- Urban legends: Modern Pakistani urban myths and ghost stories

Guidelines:
- IMPORTANT: Always respond in the EXACT same language and script the user writes in. If they write in English, reply in English. If in Urdu script, reply in Urdu script. If in Roman Urdu, reply in Roman Urdu. If in Roman Punjabi, reply in Roman Punjabi.
- Be respectful of Pakistani culture, traditions, and religious sensitivities
- When telling stories with spiritual elements, present them as cultural narratives
- Use markdown formatting (bold, italic, bullet points) for rich presentation
- Include emoji sparingly for atmosphere (📖 🌙 ✨ 💔 🏔️)
- For greetings, warmly introduce yourself and suggest popular stories
- Stay focused on Pakistani folklore and storytelling — politely redirect unrelated questions
- Keep responses engaging but not excessively long unless the user asks for a full story`;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
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

  // Only user/assistant turns are expected from the client — the system
  // prompt always comes from the server, never from the request body.
  const conversation = messages.filter(
    (m) => m.role === "user" || m.role === "assistant"
  );

  const client = new OpenAI({ apiKey });

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: STORYTELLER_PROMPT }, ...conversation],
    temperature: 0.85,
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
