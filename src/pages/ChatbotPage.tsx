import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Bot, Send, User, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const demoResponses = [
  {
    trigger: "rice",
    response: `❌ **Debunked**\n\nThe myth that eating rice at night causes weight gain is **not supported by scientific evidence**.\n\n**Key Points:**\n- Weight gain depends on total caloric intake vs. expenditure\n- Your metabolism continues while sleeping\n- Rice is a nutritious complex carbohydrate\n\n**Sources:** WHO, Ministry of Health Pakistan`,
  },
  {
    trigger: "black cat",
    response: `❌ **Debunked**\n\nThe belief that black cats bring bad luck is a **superstition with no factual basis**.\n\n**Key Points:**\n- This is a cultural superstition, not fact\n- In many cultures, black cats are considered lucky\n- There's no causal relationship between cats and fortune\n\n**Sources:** Cultural anthropology studies`,
  },
  {
    trigger: "milk fish",
    response: `❌ **Debunked**\n\nThe claim that drinking milk with fish causes skin diseases like vitiligo is **completely false**.\n\n**Key Points:**\n- No scientific evidence supports this claim\n- Vitiligo is an autoimmune condition, not dietary\n- Many cultures safely consume fish and dairy together\n\n**Sources:** American Academy of Dermatology`,
  },
];

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Hello! I'm your AI fact-checker. Ask me about any myth or belief you'd like to verify. I can help debunk misconceptions in English, اردو, or پنجابی.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const matchedResponse = demoResponses.find((r) =>
      input.toLowerCase().includes(r.trigger)
    );

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "bot",
      content:
        matchedResponse?.response ||
        `I'm analyzing your query about "${input}".\n\n⚠️ **Under Review**\n\nThis myth is currently being researched by our team. In the meantime, I recommend checking credible sources like WHO or local health ministry websites.\n\nWould you like me to search for related myths in our database?`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 lg:pt-24 pb-4 flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex flex-col max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold text-foreground">Fact-Check Chatbot</h1>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-verified animate-pulse" />
                  <span className="text-sm text-muted-foreground">AI-Powered Verification</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="flex-1 bg-card rounded-2xl shadow-soft flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "bot" && (
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-md"
                        : "bg-muted text-foreground rounded-tl-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about a myth... (e.g., 'Is eating rice at night bad?')"
                  className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
                <Button onClick={handleSend} disabled={!input.trim() || isTyping} size="lg">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                <Sparkles className="w-3 h-3 inline mr-1" />
                Powered by AI • Responses verified by credible sources
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChatbotPage;
