import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Heart, Share2, MessageCircle, User, Clock, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Story {
  id: string;
  title: string;
  author: string;
  content: string;
  fullContent: string;
  likes: number;
  publishedAt: string;
  category: string;
  comments: { id: string; user: string; content: string; date: string }[];
}

const storiesData: Record<string, Story> = {
  "1": {
    id: "1",
    title: "The Legend of Peer Channan",
    author: "Ahmed Khan",
    content: "In the heart of Punjab lies the ancient tale of Peer Channan...",
    fullContent: `
      <p>In the heart of Punjab lies the ancient tale of Peer Channan, a saint whose wisdom and miracles are still remembered today. The story goes that during a great drought, he prayed for forty days and nights until the heavens opened.</p>
      
      <h3>The Miracle</h3>
      <p>The villagers had lost all hope. Crops were dying, cattle were perishing, and people were leaving their ancestral lands. It was then that Peer Channan arrived, a simple man with a radiant face and kind eyes.</p>
      
      <p>He sat under the old banyan tree in the village square and began his prayers. Days passed, then weeks. The villagers brought him water and food, but he barely touched anything. On the fortieth day, as the sun set, dark clouds gathered from nowhere.</p>
      
      <h3>The Rain</h3>
      <p>Rain fell like never before. The parched earth drank eagerly, and within days, green shoots appeared in the fields. The village was saved, and Peer Channan smiled, saying, "Faith moves mountains, and prayers reach the heavens."</p>
      
      <p>To this day, a shrine stands where the banyan tree once stood, visited by thousands seeking blessings.</p>
    `,
    likes: 245,
    publishedAt: "2025-01-05",
    category: "Folklore",
    comments: [
      { id: "1", user: "Hamza Ali", content: "Beautiful story! My grandmother used to tell me this when I was young.", date: "2025-01-06" },
      { id: "2", user: "عائشہ خان", content: "بہت خوبصورت داستان ہے۔ پنجاب کی دھرتی میں ایسے کئی ولی ہوئے ہیں۔", date: "2025-01-05" },
      { id: "3", user: "Sara Malik", content: "Is this shrine still there? Would love to visit.", date: "2025-01-05" },
    ],
  },
  "2": {
    id: "2",
    title: "لاہور کی چڑیل کی داستان",
    author: "فاطمہ زہرا",
    content: "لاہور کے ہر پرانے محلے میں چڑیل کی اپنی کہانی ہے...",
    fullContent: `
      <p>لاہور کے ہر پرانے محلے میں چڑیل کی اپنی کہانی ہے۔ اندرون شہر میں بزرگ لوگ بتاتے ہیں کہ پرانے برگد کے درخت کے پاس آدھی رات کو ایک عورت نظر آتی ہے جس کے پاؤں الٹے ہوتے ہیں۔</p>
      
      <h3>کہانی کی ابتداء</h3>
      <p>کہتے ہیں کہ مغل دور میں ایک خوبصورت لڑکی تھی جس کا نام زینب تھا۔ اس کی شادی جبراً ایک ظالم جاگیردار سے کر دی گئی۔ شادی کی رات وہ بھاگ گئی اور اسی برگد کے درخت کے نیچے اس نے جان دے دی۔</p>
      
      <h3>عجیب واقعات</h3>
      <p>اس کے بعد سے لوگ کہتے ہیں کہ وہ آدھی رات کو نظر آتی ہے۔ جو بھی اس کی طرف دیکھے، وہ کئی دن بیمار رہتا ہے۔ لیکن کچھ لوگوں کا کہنا ہے کہ وہ صرف ان لوگوں کو تنگ کرتی ہے جو عورتوں پر ظلم کرتے ہیں۔</p>
      
      <p>آج بھی اس محلے میں رات کو لوگ اکیلے نہیں نکلتے۔</p>
    `,
    likes: 189,
    publishedAt: "2025-01-03",
    category: "Supernatural",
    comments: [
      { id: "1", user: "احمد رضا", content: "میں نے بھی یہ کہانی سنی ہے۔ لاہور میں ایسی کئی جگہیں ہیں۔", date: "2025-01-04" },
      { id: "2", user: "Zara Khan", content: "Scary but fascinating! Old Lahore has so many mysteries.", date: "2025-01-03" },
      { id: "3", user: "محمد علی", content: "ایہہ سچی گل اے، ساڈے محلے وچ وی ایسا ہویا سی۔", date: "2025-01-03" },
    ],
  },
  "3": {
    id: "3",
    title: "ہیر رانجھے دی داستان",
    author: "عثمان علی",
    content: "پنجاب دی سب توں مشہور محبت دی کہانی...",
    fullContent: `
      <p>پنجاب دی سب توں مشہور محبت دی کہانی۔ ہیر سیال تے دھیدو رانجھا دی ایہہ داستان ہر پنجابی دے دل وچ وسدی اے۔ رانجھے نے ہیر دی محبت وچ جوگی بن کے بانسری وجائی۔</p>
      
      <h3>رانجھے دا پیار</h3>
      <p>رانجھا تخت ہزارے دا سی۔ اوہ اپنے پیو دے مرن مگروں بھراواں نال لڑ کے گھروں نکل گیا۔ اوہ سیال دے پنڈ پہنچیا تے ہیر نوں ویکھ کے اوہدے دل وچ پیار دا بیج بویا گیا۔</p>
      
      <h3>ویچھوڑا</h3>
      <p>ہیر دے ماپیاں نے اوہنوں کھیڑیاں نال ویاہ دتا۔ رانجھا جوگی بن گیا تے پھیر سالاں بعد اوہ ملے۔ پر ہیر دے چاچے نے اوہنوں زہر دے دتا۔ رانجھا وی اوہدے نال ای مر گیا۔</p>
      
      <p>اج وی جھنگ وچ اوہناں دی مزار اے جتھے لوگ جاندے نیں۔</p>
    `,
    likes: 312,
    publishedAt: "2025-01-01",
    category: "Folklore",
    comments: [
      { id: "1", user: "پنجابی مونڈا", content: "ہیر رانجھا ساڈی وراثت اے۔ ہر پنجابی نوں ایہہ کہانی پڑھنی چاہیدی اے۔", date: "2025-01-02" },
      { id: "2", user: "Sana Fatima", content: "Waris Shah's Heer is a masterpiece of Punjabi literature.", date: "2025-01-01" },
      { id: "3", user: "کاشف علی", content: "وارث شاہ نے ایہہ داستان ایس طرح لکھی کہ دل رو پیندا اے۔", date: "2025-01-01" },
    ],
  },
  "4": {
    id: "4",
    title: "The Flying Horse of Quaid",
    author: "Usman Ali",
    content: "Among the lesser-known stories of Karachi is the tale of a white horse...",
    fullContent: `
      <p>Among the lesser-known stories of Karachi is the tale of a white horse that would appear on full moon nights near the Quaid's mausoleum. Witnesses claim it would gallop through the gardens before vanishing into thin air.</p>
      
      <h3>The First Sighting</h3>
      <p>The legend began in 1952, just a few years after the Quaid-e-Azam's passing. A night watchman reported seeing a magnificent white horse circling the mausoleum. When he tried to approach it, the horse simply faded away.</p>
      
      <h3>Recurring Appearances</h3>
      <p>Over the decades, several guards and late-night visitors have reported similar sightings. Some believe it is the spirit of the Quaid's favorite horse, forever guarding its master's final resting place.</p>
      
      <p>Whether myth or reality, the story adds to the mystique of one of Pakistan's most sacred sites.</p>
    `,
    likes: 156,
    publishedAt: "2024-12-28",
    category: "Urban Legends",
    comments: [
      { id: "1", user: "Karachi Wala", content: "I've heard this story from the guards at Mazar-e-Quaid!", date: "2024-12-29" },
      { id: "2", user: "عمران خان", content: "کراچی میں ایسی کئی کہانیاں ہیں۔ بہت دلچسپ!", date: "2024-12-28" },
    ],
  },
  "5": {
    id: "5",
    title: "سسی پنوں کی المناک محبت",
    author: "عائشہ خان",
    content: "بلوچستان کی وادیوں سے آنے والی یہ کہانی سسی اور پنوں کی لازوال محبت کی داستان ہے...",
    fullContent: `
      <p>بلوچستان کی وادیوں سے آنے والی یہ کہانی سسی اور پنوں کی لازوال محبت کی داستان ہے۔ سسی نے صحرا میں اپنے محبوب کو ڈھونڈتے ڈھونڈتے جان دے دی۔</p>
      
      <h3>محبت کی شروعات</h3>
      <p>سسی بھنبھور کے دھوبی کی بیٹی تھی جو پیدائش سے ہی حسین تھی۔ پنوں کیچ مکران کا شہزادہ تھا۔ دونوں کی نظریں ملیں اور محبت ہو گئی۔</p>
      
      <h3>جدائی اور تلاش</h3>
      <p>پنوں کے بھائیوں نے اسے رات کو اٹھا کر واپس لے گئے۔ سسی نے جب صبح دیکھا کہ پنوں نہیں ہے تو وہ ننگے پاؤں صحرا میں اس کی تلاش میں نکل پڑی۔</p>
      
      <p>صحرا کی گرمی اور تھکاوٹ نے اسے ختم کر دیا۔ کہتے ہیں کہ زمین نے اسے اپنے اندر سمو لیا۔ پنوں جب واپس آیا تو سسی کی قبر پر اس نے بھی جان دے دی۔</p>
    `,
    likes: 278,
    publishedAt: "2024-12-20",
    category: "Folklore",
    comments: [
      { id: "1", user: "بلوچی", content: "ایہہ ساڈی دھرتی دی سچی کہانی اے۔ بہت المناک!", date: "2024-12-21" },
      { id: "2", user: "Hina Baloch", content: "The tomb of Sassi is still visited by lovers from all over Pakistan.", date: "2024-12-20" },
      { id: "3", user: "فریدہ خان", content: "پاکستان کی چاروں محبت کی داستانیں بہت خوبصورت ہیں۔", date: "2024-12-20" },
    ],
  },
};

const StoryDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const story = storiesData[id || "1"];
  
  const [likes, setLikes] = useState(story?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(story?.comments || []);

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
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleShare = () => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(`Read this amazing story: ${story.title} - ${window.location.href}`)}`;
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
                    <span>{story.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{story.publishedAt}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">The Story</h2>
                <div
                  className="prose prose-lg max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                  dangerouslySetInnerHTML={{ __html: story.fullContent }}
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

                <button
                  onClick={handleLike}
                  className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl transition-all mb-4 ${
                    isLiked ? "bg-debunked/20 border-2 border-debunked" : "bg-muted hover:bg-debunked/10"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? "text-debunked fill-debunked" : "text-muted-foreground"}`} />
                  <span className={`font-semibold ${isLiked ? "text-debunked" : "text-foreground"}`}>{likes} Likes</span>
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