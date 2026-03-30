import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle, XCircle, AlertTriangle, ArrowLeft, ThumbsUp, ThumbsDown, MessageCircle, Share2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Demo myth data
const mythData = {
  id: "1",
  title: "Eating rice at night causes weight gain",
  status: "debunked" as const,
  category: "Health",
  summary: "A common belief that consuming rice after sunset leads to obesity. Scientific evidence suggests otherwise...",
  content: `
    <p>This is one of the most prevalent myths in South Asian culture, particularly in Pakistan and India. The belief stems from the idea that our metabolism slows down at night, and carbohydrates consumed during this time are more likely to be stored as fat.</p>
    
    <h3>What Science Says</h3>
    <p>Multiple scientific studies have debunked this myth. Weight gain is primarily determined by total caloric intake versus expenditure throughout the day, not by the timing of when carbohydrates are consumed.</p>
    
    <h3>Key Points:</h3>
    <ul>
      <li>Your body doesn't store more fat at night compared to daytime</li>
      <li>Metabolism continues while you sleep</li>
      <li>The key factor is total daily calorie intake</li>
      <li>Rice is a complex carbohydrate and provides essential nutrients</li>
    </ul>
    
    <h3>Expert Opinion</h3>
    <p>According to WHO and nutritional experts, there is no evidence supporting the claim that eating rice at night specifically causes weight gain. A balanced diet and portion control are more important factors.</p>
  `,
  sources: [
    { name: "World Health Organization", url: "https://who.int" },
    { name: "Ministry of Health, Pakistan", url: "https://health.gov.pk" },
    { name: "American Journal of Clinical Nutrition", url: "https://academic.oup.com/ajcn" },
  ],
  likes: 234,
  dislikes: 12,
  comments: [
    { id: "1", user: "Ahmed Khan", content: "I always believed this myth! Thanks for clarifying.", date: "2025-01-03" },
    { id: "2", user: "فاطمہ زہرا", content: "بہت معلوماتی مضمون ہے۔ اپنے خاندان کے ساتھ ضرور شیئر کروں گی۔", date: "2025-01-02" },
    { id: "3", user: "عثمان علی", content: "میں ہمیشہ سے اس افواہ پر یقین رکھتا تھا! وضاحت کا شکریہ۔", date: "2025-01-01" },
    { id: "4", user: "سعدیہ خان", content: "ایہہ بڑا چنگا مضمون اے۔ میں اپنے ٹبر نوں ضرور دسساں۔", date: "2024-12-30" },
    { id: "5", user: "حمزہ راشد", content: "سچی گل اے، اسیں وی ایہہ سنیا سی کہ رات نوں چاول نہیں کھانے چاہیدے۔", date: "2024-12-28" },
    { id: "6", user: "Zainab Malik", content: "Can you provide more sources from local studies?", date: "2024-12-25" },
  ],
};

const statusConfig = {
  verified: { icon: CheckCircle, label: "Verified True", color: "text-verified", bg: "bg-verified/10", border: "border-verified" },
  debunked: { icon: XCircle, label: "Debunked", color: "text-debunked", bg: "bg-debunked/10", border: "border-debunked" },
  partial: { icon: AlertTriangle, label: "Partially True", color: "text-partial", bg: "bg-partial/10", border: "border-partial" },
};

const MythDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [likes, setLikes] = useState(mythData.likes);
  const [dislikes, setDislikes] = useState(mythData.dislikes);
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mythData.comments);

  const StatusIcon = statusConfig[mythData.status].icon;

  const handleVote = (type: "like" | "dislike") => {
    if (userVote === type) {
      setUserVote(null);
      if (type === "like") setLikes(likes - 1);
      else setDislikes(dislikes - 1);
    } else {
      if (userVote) {
        if (userVote === "like") setLikes(likes - 1);
        else setDislikes(dislikes - 1);
      }
      setUserVote(type);
      if (type === "like") setLikes(likes + 1);
      else setDislikes(dislikes + 1);
    }
  };

  const handleShare = () => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this myth debunked: ${mythData.title} - ${window.location.href}`)}`;
    window.open(shareUrl, "_blank");
    toast({ title: "Share link opened", description: "WhatsApp sharing window opened." });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        { id: Date.now().toString(), user: "You", content: newComment, date: new Date().toISOString().split("T")[0] },
        ...comments,
      ]);
      setNewComment("");
      toast({ title: "Comment added", description: "Your comment has been posted." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Card */}
              <div className={`bg-card rounded-2xl p-6 lg:p-8 shadow-card border-l-4 ${statusConfig[mythData.status].border}`}>
                {/* Status Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig[mythData.status].bg} mb-6`}>
                  <StatusIcon className={`w-5 h-5 ${statusConfig[mythData.status].color}`} />
                  <span className={`font-medium ${statusConfig[mythData.status].color}`}>
                    {statusConfig[mythData.status].label}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-display text-2xl lg:text-4xl font-bold text-foreground mb-4">
                  {mythData.title}
                </h1>

                {/* Category */}
                <span className="inline-block px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium mb-6">
                  {mythData.category}
                </span>

                {/* Summary */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {mythData.summary}
                </p>
              </div>

              {/* Content */}
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">Detailed Analysis</h2>
                <div
                  className="prose prose-lg max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                  dangerouslySetInnerHTML={{ __html: mythData.content }}
                />
              </div>

              {/* Sources */}
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">Credible Sources</h2>
                <div className="space-y-3">
                  {mythData.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-muted rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <span className="text-primary font-medium">{source.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Comments ({comments.length})
                </h2>

                {/* Add Comment */}
                <div className="flex gap-3 mb-6">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    Post
                  </Button>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-muted rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{comment.user}</span>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Engagement Card */}
              <div className="bg-card rounded-2xl p-6 shadow-soft sticky top-24">
                <h3 className="font-display text-lg font-semibold text-foreground mb-6">Engagement</h3>

                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => handleVote("like")}
                    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                      userVote === "like" ? "bg-verified/20 border-2 border-verified" : "bg-muted hover:bg-verified/10"
                    }`}
                  >
                    <ThumbsUp className={`w-6 h-6 ${userVote === "like" ? "text-verified" : "text-muted-foreground"}`} />
                    <span className={`font-semibold ${userVote === "like" ? "text-verified" : "text-foreground"}`}>{likes}</span>
                    <span className="text-xs text-muted-foreground">Helpful</span>
                  </button>

                  <button
                    onClick={() => handleVote("dislike")}
                    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                      userVote === "dislike" ? "bg-destructive/20 border-2 border-destructive" : "bg-muted hover:bg-destructive/10"
                    }`}
                  >
                    <ThumbsDown className={`w-6 h-6 ${userVote === "dislike" ? "text-destructive" : "text-muted-foreground"}`} />
                    <span className={`font-semibold ${userVote === "dislike" ? "text-destructive" : "text-foreground"}`}>{dislikes}</span>
                    <span className="text-xs text-muted-foreground">Not Helpful</span>
                  </button>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button variant="gold" className="w-full" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share on WhatsApp
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Flag className="w-4 h-4 mr-2" />
                    Report Issue
                  </Button>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total views</span>
                    <span className="font-medium text-foreground">12,500</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Comments</span>
                    <span className="font-medium text-foreground">{comments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MythDetail;
