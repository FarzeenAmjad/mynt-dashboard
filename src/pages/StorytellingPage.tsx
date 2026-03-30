import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Book, Send, User, Sparkles, ArrowLeft, Search, Heart, Clock, PenLine, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useStories, useCreateStory } from "@/hooks/useStories";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const StorytellingPage = () => {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const { data: stories = [] } = useStories({ status: 'published' });
  const createStoryMutation = useCreateStory();
  const [activeTab, setActiveTab] = useState<"chat" | "stories" | "submit">("stories");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Assalam-o-Alaikum! I'm your storytelling companion. Ask me to tell you tales from Pakistani folklore, myths, and legends. I can narrate stories in English, اردو, or پنجابی.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Story submission form
  const [newStory, setNewStory] = useState({
    title: "",
    content: "",
    category: "Folklore",
  });

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

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const botResponse = getBotResponse(input);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "bot",
      content: botResponse,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes("heer") || q.includes("ranjha")) {
      return `📖 **The Timeless Tale of Heer Ranjha**

Heer Ranjha is Pakistan's most beloved romantic tragedy, penned by the great Waris Shah in 1766.

**The Story:**
Dheedo Ranjha, a handsome young man from Takht Hazara, fell in love with Heer Sial, the beautiful daughter of a wealthy landlord. Ranjha became a cowherd just to be near her.

Their love was discovered, and Heer was forced to marry another. Years later, Ranjha, now a wandering faqir, found her. They were about to reunite when Heer's uncle poisoned her. Ranjha, heartbroken, died by her side.

*"ہیر تے نیں کہندی رانجھے دی، رانجھا جوگ دا جانے"*

This tale is a symbol of eternal love in Punjabi culture. 💔`;
    }

    if (q.includes("jinnat") || q.includes("jinn") || q.includes("ghost")) {
      return `👻 **Tales of Jinnat in Pakistani Folklore**

In Pakistani tradition, Jinnat (جنات) are supernatural beings created from smokeless fire. They exist in a parallel world to humans.

**Common Beliefs:**
- Jinns are believed to live in abandoned places, old trees, and ruins
- They can be good (Muslim Jinns) or mischievous (Shaitan)
- Certain prayers and recitations offer protection

**A Village Tale:**
In many villages, there's always a "haunted" well or old house where Jinns supposedly reside. Elders warn children not to go there after Maghrib prayer.

*"جنات کی دنیا الگ ہے، مگر کبھی کبھار راستے مل جاتے ہیں"*

Would you like to hear more specific Jinn stories from different regions? 🏚️`;
    }

    if (q.includes("sohni") || q.includes("mahiwal")) {
      return `💔 **The Tragic Love of Sohni Mahiwal**

Another immortal Punjabi love story, Sohni Mahiwal tells of forbidden love that ends in the Chenab river.

**The Tale:**
Sohni, a beautiful potter's daughter, fell in love with Izzat Baig (called Mahiwal), a wealthy merchant. They would meet secretly at night.

Sohni would swim across the Chenab river using an earthen pot for flotation. Her jealous sister-in-law replaced the baked pot with an unbaked one. It dissolved in the water, and Sohni drowned. Mahiwal, seeing her drown, jumped in to save her and perished too.

Their tomb stands on the banks of the Chenab to this day.

*"پریت لگی تے لگ گئی، اودھروں تُٹ نہ جاندی"* 🌊`;
    }

    return `📚 **Pakistani Folklore & Mythology**

I can tell you many fascinating stories! Here are some tales I know:

🌹 **Romantic Epics:**
- Heer Ranjha - The greatest Punjabi love story
- Sohni Mahiwal - The tragic tale of the Chenab
- Sassi Punnu - A story from Balochistan

👻 **Supernatural Tales:**
- Stories of Jinnat and their world
- The legends of Churail
- Tales of Pirs and Faqirs

🏔️ **Regional Legends:**
- The fairy tales of Swat Valley
- Legends of the Karakoram mountains
- Stories from the Thar desert

Just ask me about any of these, or share a myth you've heard! I'm here to narrate and explore our rich cultural heritage. ✨`;
  };

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
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Book className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold text-foreground">Storytelling Hub</h1>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-sm text-muted-foreground">Explore Pakistani Folklore</span>
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
              {/* Search */}
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

              {/* Stories Grid */}
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

          {/* AI Chat Tab */}
          {activeTab === "chat" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl shadow-soft flex flex-col overflow-hidden h-[60vh]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                    >
                      {message.role === "bot" && (
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                          <Book className="w-4 h-4 text-secondary-foreground" />
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
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <Book className="w-4 h-4 text-secondary-foreground" />
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
                      placeholder="Ask for a story... (e.g., 'Tell me about Heer Ranjha')"
                      className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                    <Button onClick={handleSend} disabled={!input.trim() || isTyping} size="lg">
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    AI-powered storytelling • Rich cultural narratives
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

      <Footer />
    </div>
  );
};

export default StorytellingPage;
