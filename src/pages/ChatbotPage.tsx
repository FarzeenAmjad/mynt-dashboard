import { useState, useRef, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Bot, Send, User, Sparkles, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { createChatSession, sendMessageStreaming } from "@/services/openai";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

const SUGGESTED_QUESTIONS = [
  { emoji: "\u{1F35A}", text: "Is eating rice at night unhealthy?" },
  { emoji: "\u{1F408}\u200D\u2B1B", text: "Do black cats bring bad luck?" },
  { emoji: "\u{1F95B}", text: "Can mixing milk and fish cause skin disease?" },
  { emoji: "\u{1FA9E}", text: "Is breaking a mirror 7 years of bad luck?" },
  { emoji: "\u{270B}", text: "Does cracking knuckles cause arthritis?" },
  { emoji: "\u{1F522}", text: "Is the number 13 really unlucky in Pakistan?" },
];

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "bot",
  content:
    "Assalamu Alaikum! \u{1F31F} I'm the **Pakistani Myth Guider AI** — your fact-checking companion for Pakistani myths, superstitions, and cultural beliefs.\n\nAsk me about any myth in **English**, **\u0627\u0631\u062F\u0648**, or **\u067E\u0646\u062C\u0627\u0628\u06CC** and I'll verify it with credible sources.\n\nTry one of the suggestions below, or type your own question!",
  timestamp: new Date(),
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchParams] = useSearchParams();
  const chatSessionRef = useRef<ReturnType<typeof createChatSession> | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize chat session on mount and handle query param
  useEffect(() => {
    chatSessionRef.current = createChatSession();
    const query = searchParams.get("q");
    if (query) {
      // Small delay to ensure chat session is ready
      setTimeout(() => handleSend(query), 100);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll chat area only (not the page) on new messages
  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages, isTyping]);

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  const handleSend = useCallback(
    async (overrideMessage?: string) => {
      const messageText = overrideMessage || input.trim();
      if (!messageText || isTyping) return;

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: messageText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
      setIsTyping(true);

      // Create bot placeholder
      const botId = (Date.now() + 1).toString();
      const botMessage: Message = {
        id: botId,
        role: "bot",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      };
      setMessages((prev) => [...prev, botMessage]);

      try {
        if (!chatSessionRef.current) {
          chatSessionRef.current = createChatSession();
        }

        const stream = sendMessageStreaming(chatSessionRef.current, messageText);
        for await (const chunk of stream) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botId ? { ...msg, content: msg.content + chunk } : msg
            )
          );
        }
      } catch (error) {
        console.error("OpenAI API error:", error);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botId
              ? {
                  ...msg,
                  content:
                    "I'm sorry, I encountered an error while processing your request. Please try again in a moment. \u{1F64F}",
                }
              : msg
          )
        );
      } finally {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botId ? { ...msg, isStreaming: false } : msg
          )
        );
        setIsTyping(false);
      }
    },
    [input, isTyping]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showSuggestions = messages.length <= 1;

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 pt-20 lg:pt-24 pb-4 flex flex-col min-h-0">
        <div className="container mx-auto px-4 flex-1 flex flex-col max-w-4xl min-h-0">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4 animate-fade-in">
            <Link
              to="/"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary ring-2 ring-secondary shadow-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-verified border-2 border-background" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold text-foreground">
                  Myth Guider AI
                </h1>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-verified animate-pulse" />
                  <span className="text-xs text-muted-foreground">
                    Online &middot; Powered by OpenAI
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="flex-1 min-h-0 bg-card rounded-2xl shadow-card flex flex-col overflow-hidden relative border border-border/50">
            {/* Subtle Islamic geometric pattern overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.025]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Messages Area */}
            <ScrollArea ref={scrollAreaRef} className="flex-1">
              <div className="p-4 lg:p-6 space-y-4 relative">
                {/* Messages */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 animate-fade-in ${
                      message.role === "user" ? "justify-end" : ""
                    }`}
                  >
                    {/* Bot avatar */}
                    {message.role === "bot" && (
                      <div className="w-8 h-8 rounded-lg bg-primary ring-1 ring-secondary/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}

                    {/* Message bubble */}
                    <div
                      className={`max-w-[85%] lg:max-w-[75%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm"
                          : "bg-muted/60 text-foreground rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-border/30"
                      }`}
                    >
                      {message.role === "bot" ? (
                        <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-a:text-primary">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                          {message.isStreaming && (
                            <span className="streaming-cursor inline-block w-1.5 h-4 ml-0.5 rounded-sm" />
                          )}
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                      )}
                      <p
                        className={`text-[10px] mt-1.5 ${
                          message.role === "user"
                            ? "text-primary-foreground/60"
                            : "text-muted-foreground/60"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {/* User avatar */}
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 shadow-sm">
                        <User className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}

                {/* AI Thinking Indicator */}
                {isTyping &&
                  !messages[messages.length - 1]?.isStreaming && (
                    <div className="flex gap-3 animate-fade-in">
                      <div className="w-8 h-8 rounded-lg bg-primary ring-1 ring-secondary/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="ai-thinking-container bg-muted/60 px-5 py-3 rounded-2xl rounded-tl-sm border border-border/30">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-[3px] h-5">
                            {[0, 1, 2, 3, 4].map((i) => (
                              <span
                                key={i}
                                className="ai-thinking-bar"
                                style={{ animationDelay: `${i * 0.15}s` }}
                              />
                            ))}
                          </div>
                          <span className="ai-thinking-text text-xs font-medium text-muted-foreground tracking-wide">
                            Analyzing myth...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Suggested Questions */}
                {showSuggestions && (
                  <div className="pt-4 animate-fade-in">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageCircle className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Popular myths to explore
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          key={q.text}
                          onClick={() => handleSend(q.text)}
                          disabled={isTyping}
                          className="p-3 rounded-xl border border-border bg-background/80 hover:bg-muted hover:border-primary/30 hover:shadow-sm transition-all duration-200 text-left text-sm group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-base mr-2">{q.emoji}</span>
                          <span className="text-foreground/80 group-hover:text-primary transition-colors">
                            {q.text}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about any Pakistani myth or belief..."
                  rows={1}
                  disabled={isTyping}
                  className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none text-sm transition-all duration-200 disabled:opacity-50 min-h-[44px] max-h-[120px]"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  size="lg"
                  className="rounded-xl h-[44px] w-[44px] p-0 shrink-0 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground/60 mt-2 text-center">
                <Sparkles className="w-3 h-3 inline mr-1" />
                Powered by OpenAI &middot; Responses may not always be accurate
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatbotPage;
