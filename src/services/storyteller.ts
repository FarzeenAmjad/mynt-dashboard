// Client for the "Pakistani Folklore Storyteller". Calls the server-side
// `/api/story` Vercel function instead of the OpenAI API directly — the real
// API key lives only in the server function's environment (`OPENAI_API_KEY`,
// no VITE_ prefix) and is never shipped to the browser.

export interface StoryMessage {
  role: "user" | "assistant";
  content: string;
}

export interface StorytellerSession {
  messages: StoryMessage[];
}

export function createStorytellerSession(): StorytellerSession {
  return { messages: [] };
}

export async function* sendStoryStreaming(
  chat: StorytellerSession,
  message: string
) {
  chat.messages.push({ role: "user", content: message });

  const response = await fetch("/api/story", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: chat.messages }),
  });

  if (!response.ok || !response.body) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      errorText || `Story request failed with status ${response.status}`
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullResponse = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const content = decoder.decode(value, { stream: true });
    if (content) {
      fullResponse += content;
      yield content;
    }
  }

  chat.messages.push({ role: "assistant", content: fullResponse });
}
