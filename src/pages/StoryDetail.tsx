import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Heart, Share2, User, Clock, Book, BookOpen, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useStory } from "@/hooks/useStories";
import { useComments, useCreateComment } from "@/hooks/useComments";
import { useUserStoryVote, useCastStoryVote } from "@/hooks/useVotes";

const CATEGORY_COLORS: Record<string, string> = {
  Folklore: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Supernatural: "bg-purple-100 text-purple-700 border-purple-200",
  "Urban Legends": "bg-amber-100 text-amber-700 border-amber-200",
  Historical: "bg-blue-100 text-blue-700 border-blue-200",
  Regional: "bg-rose-100 text-rose-700 border-rose-200",
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatCommentDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

const StoryDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user, profile } = useAuth();

  const { data: story, isLoading } = useStory(id!);
  const { data: comments = [] } = useComments({ storyId: id });
  const { data: isLiked } = useUserStoryVote(id!, user?.id);
  const castVote = useCastStoryVote();
  const createComment = useCreateComment();

  const [newComment, setNewComment] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 lg:pt-24 pb-16 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Loading story...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 lg:pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
              <Book className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">Story Not Found</h1>
            <p className="text-muted-foreground mb-6">The story you're looking for doesn't exist or has been removed.</p>
            <Link to="/chatbot/storytelling">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Stories
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLike = () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to like stories.", variant: "destructive" });
      return;
    }
    castVote.mutate({ storyId: id!, userId: user.id });
  };

  const handleShare = () => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(`Read this amazing story: ${story.title} - ${window.location.href}`)}`;
    window.open(shareUrl, "_blank");
    toast({ title: "Share link opened", description: "WhatsApp sharing window opened." });
  };

  const handleAddComment = () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to comment.", variant: "destructive" });
      return;
    }
    if (newComment.trim()) {
      createComment.mutate(
        { content: newComment, story_id: id, user_name: profile?.name || "Anonymous", user_id: user.id },
        {
          onSuccess: () => {
            setNewComment("");
            toast({ title: "Comment added", description: "Your comment has been posted." });
          },
        }
      );
    }
  };

  const categoryColor = CATEGORY_COLORS[story.category] || "bg-muted text-muted-foreground border-border";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Link */}
          <Link
            to="/chatbot/storytelling"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Stories
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content — 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Article Header */}
              <article className="animate-fade-in">
                <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
                  {/* Top accent gradient */}
                  <div className="h-1.5 bg-gradient-to-r from-secondary via-primary to-secondary" />

                  <div className="p-6 lg:p-10">
                    {/* Category + Reading time */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${categoryColor}`}>
                        {story.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {Math.max(1, Math.ceil(((story.full_content || story.content || "").length) / 1000))} min read
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                      {story.title}
                    </h1>

                    {/* Author + Date row */}
                    <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-border/60">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center ring-2 ring-background shadow-sm">
                          <User className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <span className="font-medium text-foreground text-sm">{story.author_name}</span>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {formatDate(story.published_at)}
                          </div>
                        </div>
                      </div>

                      {/* Quick actions inline */}
                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          onClick={handleLike}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            isLiked
                              ? "bg-red-100 text-red-600 border border-red-200"
                              : "bg-muted text-muted-foreground hover:bg-red-50 hover:text-red-500 border border-transparent"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-red-500" : ""}`} />
                          {story.likes}
                        </button>
                        <button
                          onClick={handleShare}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-transparent"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          Share
                        </button>
                      </div>
                    </div>

                    {/* Story Content */}
                    <div className="mt-8">
                      <div
                        className="prose prose-lg max-w-none
                          prose-headings:font-display prose-headings:text-foreground prose-headings:font-bold
                          prose-p:text-foreground/80 prose-p:leading-relaxed
                          prose-li:text-foreground/80
                          prose-strong:text-foreground
                          prose-em:text-muted-foreground prose-em:italic
                          prose-blockquote:border-l-secondary prose-blockquote:text-muted-foreground prose-blockquote:italic
                          prose-a:text-secondary prose-a:no-underline hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: story.full_content || story.content || "" }}
                      />
                    </div>
                  </div>
                </div>
              </article>

              {/* Comments Section */}
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
                <div className="flex items-center gap-2 mb-6">
                  <MessageCircle className="w-5 h-5 text-secondary" />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Comments
                  </h2>
                  {comments.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                      {comments.length}
                    </span>
                  )}
                </div>

                {/* Add Comment */}
                <div className="flex gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                      placeholder={user ? "Share your thoughts..." : "Sign in to comment..."}
                      disabled={!user}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm transition-all disabled:opacity-50"
                    />
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || createComment.isPending}
                      size="sm"
                      className="rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Comments List */}
                {comments.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <User className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 bg-muted/40 rounded-xl rounded-tl-sm px-4 py-3 border border-border/30">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-foreground">{comment.user_name}</span>
                            <span className="text-[11px] text-muted-foreground">{formatCommentDate(comment.created_at)}</span>
                          </div>
                          <p className="text-sm text-foreground/80 leading-relaxed">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 sticky top-24 animate-fade-in" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
                {/* Like Button — large, prominent */}
                <button
                  onClick={handleLike}
                  className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl transition-all mb-4 group ${
                    isLiked
                      ? "bg-red-50 border-2 border-red-200 hover:bg-red-100"
                      : "bg-muted hover:bg-red-50 border-2 border-transparent hover:border-red-100"
                  }`}
                >
                  <Heart className={`w-6 h-6 transition-transform group-hover:scale-110 ${isLiked ? "text-red-500 fill-red-500" : "text-muted-foreground group-hover:text-red-400"}`} />
                  <span className={`font-semibold ${isLiked ? "text-red-600" : "text-foreground"}`}>
                    {story.likes} {story.likes === 1 ? "Like" : "Likes"}
                  </span>
                </button>

                {/* Share Button */}
                <Button
                  variant="outline"
                  className="w-full mb-6 border-border hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share on WhatsApp
                </Button>

                {/* Story Info */}
                <div className="space-y-4 pt-4 border-t border-border/60">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Story Details</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Category
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColor}`}>
                        {story.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Author
                      </span>
                      <span className="text-sm font-medium text-foreground">{story.author_name}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Published
                      </span>
                      <span className="text-sm font-medium text-foreground">{formatDate(story.published_at)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Comments
                      </span>
                      <span className="text-sm font-medium text-foreground">{comments.length}</span>
                    </div>
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

export default StoryDetail;
