import { useState, useRef, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Book, Send, User, Sparkles, ArrowLeft, Search, Heart, Clock, PenLine, MessageCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useToast } from "@/hooks/use-toast";
import { useStories, useCreateStory } from "@/hooks/useStories";
import { useAuth } from "@/contexts/AuthContext";
import { createStorytellerSession, sendStoryStreaming } from "@/services/storyteller";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

const SUGGESTED_STORIES = [
  { emoji: "🌹", text: "Tell me the tale of Heer Ranjha" },
  { emoji: "👻", text: "Share a Jinn story from Pakistani folklore" },
  { emoji: "💔", text: "Narrate Sohni Mahiwal's tragic love story" },
  { emoji: "🏔️", text: "Tell me legends of the Karakoram mountains" },
  { emoji: "🌙", text: "Share a Sufi saint's mystical tale" },
  { emoji: "🐍", text: "Tell me the legend of Sassi Punnu" },
];

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "bot",
  content:
    "Assalam-o-Alaikum! 🌙 I'm the **Pakistani Folklore Storyteller** — your companion for tales of love, mystery, and wonder from across Pakistan.\n\nAsk me to narrate legendary stories in **English**, **اردو**, or **پنجابی**.\n\nChoose a tale below, or ask about any myth or legend!",
  timestamp: new Date(),
};

const StorytellingPage = () => {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const { data: stories = [] } = useStories({ status: 'published' });
  const createStoryMutation = useCreateStory();
  const [activeTab, setActiveTab] = useState<"chat" | "stories" | "submit">("stories");
  const [searchQuery, setSearchQuery] = useState("");

  // Chat state
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatSessionRef = useRef<ReturnType<typeof createStorytellerSession> | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Story submission form
  const [newStory, setNewStory] = useState({
    title: "",
    content: "",
    category: "Folklore",
  });

  // Initialize chat session
  useEffect(() => {
    chatSessionRef.current = createStorytellerSession();
  }, []);

  // Auto-scroll chat area
  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages, isTyping]);

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
          chatSessionRef.current = createStorytellerSession();
        }

        const stream = sendStoryStreaming(chatSessionRef.current, messageText);
        for await (const chunk of stream) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botId ? { ...msg, content: msg.content + chunk } : msg
            )
          );
        }
      } catch (error) {
        console.error("Storyteller API error:", error);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botId
              ? {
                  ...msg,
                  content:
                    "I'm sorry, I encountered an error while weaving your tale. Please try again in a moment. 🙏",
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

  const handleSubmitStory = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a story",
        variant: "destructive",
      });
      return;
    }

    if (!newStory.title.trim() || !newStory.content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and story content.",
        variant: "destructive",
      });
      return;
    }

    createStoryMutation.mutate({
      title: newStory.title,
      content: newStory.content,
      author_name: profile?.name || 'Anonymous',
      author_id: user.id,
      category: newStory.category as any,
      status: 'pending',
    }, {
      onSuccess: () => {
        toast({
          title: "Story Submitted!",
          description: "Your story has been submitted for review. It will be published once approved by admin.",
        });
        setNewStory({ title: "", content: "", category: "Folklore" });
        setActiveTab("stories");
      },
      onError: () => {
        toast({
          title: "Submission Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 lg:pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-secondary ring-2 ring-secondary/30 shadow-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-secondary-foreground" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-secondary border-2 border-background" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold text-foreground">
                  Storytelling Hub
                </h1>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-xs text-muted-foreground">
                    Explore Pakistani Folklore
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-border pb-4">
            <Button
              variant={activeTab === "stories" ? "default" : "ghost"}
              onClick={() => setActiveTab("stories")}
            >
              <Book className="w-4 h-4 mr-2" />
              Published Stories
            </Button>
            <Button
              variant={activeTab === "chat" ? "default" : "ghost"}
              onClick={() => setActiveTab("chat")}
              className={activeTab === "chat" ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : ""}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Storyteller
            </Button>
            <Button
              variant={activeTab === "submit" ? "default" : "ghost"}
              onClick={() => setActiveTab("submit")}
            >
              <PenLine className="w-4 h-4 mr-2" />
              Submit Story
            </Button>
          </div>

          {/* Published Stories Tab */}
          {activeTab === "stories" && (
            <div className="space-y-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story) => (
                  <Link
                    key={story.id}
                    to={`/story/${story.id}`}
                    className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-lg transition-shadow group"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                        {story.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {story.published_at}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {story.content}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-foreground">{story.author_name}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs">{story.likes}</span>
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs">3</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredStories.length === 0 && (
                <div className="text-center py-12">
                  <Book className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No stories found matching your search.</p>
                </div>
              )}
            </div>
          )}

          {/* AI Storyteller Chat Tab */}
          {activeTab === "chat" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl shadow-card flex flex-col overflow-hidden relative border border-border/50" style={{ height: "calc(100vh - 220px)" }}>
                {/* Warm storytelling pattern overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.02]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B8860B' fill-opacity='1'%3E%3Cpath d='M40 0c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0 72c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm36-36c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zM4 36c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                {/* Messages Area */}
                <ScrollArea ref={scrollAreaRef} className="flex-1">
                  <div className="p-4 lg:p-6 space-y-4 relative">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 animate-fade-in ${
                          message.role === "user" ? "justify-end" : ""
                        }`}
                      >
                        {message.role === "bot" && (
                          <div className="w-8 h-8 rounded-lg bg-secondary ring-1 ring-secondary/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <BookOpen className="w-4 h-4 text-secondary-foreground" />
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] lg:max-w-[75%] ${
                            message.role === "user"
                              ? "bg-secondary text-secondary-foreground rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm"
                              : "bg-muted/60 text-foreground rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-border/30"
                          }`}
                        >
                          {message.role === "bot" ? (
                            <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-a:text-secondary prose-em:text-muted-foreground">
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
                                ? "text-secondary-foreground/60"
                                : "text-muted-foreground/60"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        {message.role === "user" && (
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 shadow-sm">
                            <User className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    ))}

                    {/* AI Thinking Indicator */}
                    {isTyping &&
                      !messages[messages.length - 1]?.isStreaming && (
                        <div className="flex gap-3 animate-fade-in">
                          <div className="w-8 h-8 rounded-lg bg-secondary ring-1 ring-secondary/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <BookOpen className="w-4 h-4 text-secondary-foreground" />
                          </div>
                          <div className="ai-thinking-container bg-muted/60 px-5 py-3 rounded-2xl rounded-tl-sm border border-border/30" style={{ "--tw-shadow": "0 0 8px hsl(40 70% 50% / 0.3)" } as React.CSSProperties}>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-[3px] h-5">
                                {[0, 1, 2, 3, 4].map((i) => (
                                  <span
                                    key={i}
                                    className="ai-thinking-bar"
                                    style={{ animationDelay: `${i * 0.15}s`, background: "linear-gradient(180deg, hsl(var(--secondary)) 0%, hsl(var(--accent)) 100%)" }}
                                  />
                                ))}
                              </div>
                              <span className="ai-thinking-text text-xs font-medium text-muted-foreground tracking-wide">
                                Weaving your tale...
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                    {/* Suggested Stories */}
                    {showSuggestions && (
                      <div className="pt-4 animate-fade-in">
                        <div className="flex items-center gap-2 mb-3">
                          <Book className="w-4 h-4 text-secondary" />
                          <span className="text-sm font-medium text-muted-foreground">
                            Popular tales to explore
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {SUGGESTED_STORIES.map((q) => (
                            <button
                              key={q.text}
                              onClick={() => handleSend(q.text)}
                              disabled={isTyping}
                              className="p-3 rounded-xl border border-border bg-background/80 hover:bg-muted hover:border-secondary/30 hover:shadow-sm transition-all duration-200 text-left text-sm group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <span className="text-base mr-2">{q.emoji}</span>
                              <span className="text-foreground/80 group-hover:text-secondary transition-colors">
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
                      placeholder="Ask for a story... (e.g., 'Tell me about Heer Ranjha')"
                      rows={1}
                      disabled={isTyping}
                      className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-none text-sm transition-all duration-200 disabled:opacity-50 min-h-[44px] max-h-[120px]"
                    />
                    <Button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isTyping}
                      size="lg"
                      className="rounded-xl h-[44px] w-[44px] p-0 shrink-0 shadow-sm bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-[11px] text-muted-foreground/60 mt-2 text-center">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    Powered by OpenAI &middot; Rich cultural narratives
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Story Tab */}
          {activeTab === "submit" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft">
                <div className="text-center mb-6">
                  <PenLine className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h2 className="font-display text-2xl font-bold text-foreground">Share Your Story</h2>
                  <p className="text-muted-foreground mt-2">
                    Submit a myth, legend, or folklore story from your region. Our team will review and publish it.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Story Title</label>
                    <input
                      type="text"
                      value={newStory.title}
                      onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                      placeholder="Enter a captivating title..."
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select
                      value={newStory.category}
                      onChange={(e) => setNewStory({ ...newStory, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      <option value="Folklore">Folklore</option>
                      <option value="Supernatural">Supernatural</option>
                      <option value="Urban Legends">Urban Legends</option>
                      <option value="Historical">Historical</option>
                      <option value="Regional">Regional Tales</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Story</label>
                    <textarea
                      value={newStory.content}
                      onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                      placeholder="Write your story here... Include details about the origin, characters, and the message it carries..."
                      rows={8}
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    />
                  </div>

                  <Button onClick={handleSubmitStory} size="lg" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Submit for Review
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree that your story may be edited for clarity and published on our platform.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StorytellingPage;
