import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Heart, Share2, User, Clock, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useStory } from "@/hooks/useStories";
import { useComments, useCreateComment } from "@/hooks/useComments";
import { useUserStoryVote, useCastStoryVote } from "@/hooks/useVotes";

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
        <main className="pt-20 lg:pt-24 pb-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
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
          <div className="container mx-auto px-4 text-center">
            <Book className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Story Not Found</h1>
            <p className="text-muted-foreground mb-4">The story you're looking for doesn't exist.</p>
            <Link to="/chatbot/storytelling">
              <Button>Back to Stories</Button>
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/chatbot/storytelling" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Card */}
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card border-l-4 border-secondary">
                {/* Category Badge */}
                <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium mb-6">
                  {story.category}
                </span>

                {/* Title */}
                <h1 className="font-display text-2xl lg:text-4xl font-bold text-foreground mb-4">
                  {story.title}
                </h1>

                {/* Author & Date */}
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span>{story.author_name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{story.published_at?.split("T")[0]}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">The Story</h2>
                <div
                  className="prose prose-lg max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                  dangerouslySetInnerHTML={{ __html: story.full_content || story.content || "" }}
                />
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
                    placeholder={user ? "Add a comment..." : "Sign in to comment..."}
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

                <button
                  onClick={handleLike}
                  className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl transition-all mb-4 ${
                    isLiked ? "bg-debunked/20 border-2 border-debunked" : "bg-muted hover:bg-debunked/10"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? "text-debunked fill-debunked" : "text-muted-foreground"}`} />
                  <span className={`font-semibold ${isLiked ? "text-debunked" : "text-foreground"}`}>{story.likes} Likes</span>
                </button>

                {/* Actions */}
                <div className="space-y-3">
                  <Button variant="gold" className="w-full" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share on WhatsApp
                  </Button>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium text-foreground">{story.category}</span>
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

export default StoryDetail;
