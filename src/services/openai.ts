// Client for the "Pakistani Myth Guider" chatbot. Calls the server-side
// `/api/chat` Vercel function instead of the OpenAI API directly — the real
// API key lives only in the server function's environment (`OPENAI_API_KEY`,
// no VITE_ prefix) and is never shipped to the browser.

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatSession {
  messages: ChatMessage[];
}

export function createChatSession(): ChatSession {
  return { messages: [] };
}

export async function* sendMessageStreaming(
  chat: ChatSession,
  message: string
) {
  chat.messages.push({ role: "user", content: message });

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: chat.messages }),
  });

  if (!response.ok || !response.body) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      errorText || `Chat request failed with status ${response.status}`
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
