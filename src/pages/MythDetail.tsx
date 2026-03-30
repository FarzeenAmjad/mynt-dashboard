import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle, XCircle, AlertTriangle, ArrowLeft, ThumbsUp, ThumbsDown, MessageCircle, Share2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useMyth, useIncrementViews } from "@/hooks/useMyths";
import { useComments, useCreateComment } from "@/hooks/useComments";
import { useUserMythVote, useCastMythVote } from "@/hooks/useVotes";

const statusConfig = {
  verified: { icon: CheckCircle, label: "Verified True", color: "text-verified", bg: "bg-verified/10", border: "border-verified" },
  debunked: { icon: XCircle, label: "Debunked", color: "text-debunked", bg: "bg-debunked/10", border: "border-debunked" },
  partial: { icon: AlertTriangle, label: "Partially True", color: "text-partial", bg: "bg-partial/10", border: "border-partial" },
};

const MythDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const { data: myth, isLoading } = useMyth(id!);
  const { data: comments = [] } = useComments({ mythId: id });
  const { data: userVote } = useUserMythVote(id!, user?.id);
  const castVote = useCastMythVote();
  const createComment = useCreateComment();
  const incrementViews = useIncrementViews();
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (id) incrementViews.mutate(id);
  }, [id]);

  const handleVote = (type: "like" | "dislike") => {
    if (!user) {
      toast({ title: "Please sign in to vote", description: "You must be logged in to vote." });
      return;
    }
    castVote.mutate({ mythId: id!, userId: user.id, voteType: type });
  };

  const handleShare = () => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this myth debunked: ${myth?.title} - ${window.location.href}`)}`;
    window.open(shareUrl, "_blank");
    toast({ title: "Share link opened", description: "WhatsApp sharing window opened." });
  };

  const handleAddComment = () => {
    if (!user) {
      toast({ title: "Please sign in to comment", description: "You must be logged in to comment." });
      return;
    }
    if (newComment.trim()) {
      createComment.mutate(
        { content: newComment, myth_id: id, user_name: profile?.name || "Anonymous", user_id: user?.id },
        {
          onSuccess: () => {
            setNewComment("");
            toast({ title: "Comment added", description: "Your comment has been posted." });
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!myth) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold text-foreground">Myth not found</h1>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const StatusIcon = statusConfig[myth.status].icon;
  const sources = (myth.sources as Array<{ name: string; url: string }>) || [];

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
              <div className={`bg-card rounded-2xl p-6 lg:p-8 shadow-card border-l-4 ${statusConfig[myth.status].border}`}>
                {/* Status Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig[myth.status].bg} mb-6`}>
                  <StatusIcon className={`w-5 h-5 ${statusConfig[myth.status].color}`} />
                  <span className={`font-medium ${statusConfig[myth.status].color}`}>
                    {statusConfig[myth.status].label}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-display text-2xl lg:text-4xl font-bold text-foreground mb-4">
                  {myth.title}
                </h1>

                {/* Category */}
                <span className="inline-block px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium mb-6">
                  {myth.category}
                </span>

                {/* Summary */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {myth.summary}
                </p>
              </div>

              {/* Content */}
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">Detailed Analysis</h2>
                <div
                  className="prose prose-lg max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                  dangerouslySetInnerHTML={{ __html: myth.content || "" }}
                />
              </div>

              {/* Sources */}
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">Credible Sources</h2>
                <div className="space-y-3">
                  {sources.map((source, index) => (
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
                  <Button onClick={handleAddComment} disabled={!newComment.trim() || createComment.isPending}>
                    Post
                  </Button>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-muted rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{comment.user_name}</span>
                        <span className="text-xs text-muted-foreground">{new Date(comment.created_at).toLocaleDateString()}</span>
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
                    <span className={`font-semibold ${userVote === "like" ? "text-verified" : "text-foreground"}`}>{myth.likes}</span>
                    <span className="text-xs text-muted-foreground">Helpful</span>
                  </button>

                  <button
                    onClick={() => handleVote("dislike")}
                    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                      userVote === "dislike" ? "bg-destructive/20 border-2 border-destructive" : "bg-muted hover:bg-destructive/10"
                    }`}
                  >
                    <ThumbsDown className={`w-6 h-6 ${userVote === "dislike" ? "text-destructive" : "text-muted-foreground"}`} />
                    <span className={`font-semibold ${userVote === "dislike" ? "text-destructive" : "text-foreground"}`}>{myth.dislikes}</span>
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
                    <span className="font-medium text-foreground">{myth.views?.toLocaleString() ?? 0}</span>
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
