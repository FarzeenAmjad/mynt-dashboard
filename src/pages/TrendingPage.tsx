import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrendingUp, Eye, MessageSquare, Heart, Share2, Clock, CheckCircle, XCircle, AlertTriangle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TrendingMyth {
  id: string;
  title: string;
  description: string;
  status: "verified" | "debunked" | "partial";
  category: string;
  views: number;
  comments: number;
  likes: number;
  trendingRank: number;
  publishedAt: string;
}

const trendingMyths: TrendingMyth[] = [
  {
    id: "1",
    title: "Eating rice at night causes weight gain",
    description: "This widespread belief suggests that consuming rice in the evening leads to weight gain. However, scientific research shows that total caloric intake matters more than timing.",
    status: "debunked",
    category: "Health",
    views: 45200,
    comments: 234,
    likes: 1890,
    trendingRank: 1,
    publishedAt: "2025-01-02",
  },
  {
    id: "2",
    title: "کالی بلی منحوس ہوتی ہے",
    description: "یہ ایک عام توہم پرستی ہے جو پاکستان سمیت کئی ثقافتوں میں پائی جاتی ہے۔ حقیقت میں اس کا کوئی سائنسی ثبوت نہیں ہے اور کالی بلیاں بھی دوسری بلیوں کی طرح ہی ہوتی ہیں۔",
    status: "debunked",
    category: "Cultural",
    views: 38900,
    comments: 189,
    likes: 1456,
    trendingRank: 2,
    publishedAt: "2025-01-01",
  },
  {
    id: "3",
    title: "سبز چائے میٹابولزم تیز کردی اے",
    description: "سبز چائے وچ کجھ ایسے اجزاء ہوندے نیں جو میٹابولزم تھوڑا جیہا ودھا سکدے نیں، پر ایہہ اثر بہوت معمولی اے تے صحیح خوراک دی جگہ نہیں لے سکدا۔",
    status: "partial",
    category: "Health",
    views: 32100,
    comments: 156,
    likes: 1234,
    trendingRank: 3,
    publishedAt: "2024-12-28",
  },
  {
    id: "4",
    title: "مچھلی اور دودھ سے برص ہوتا ہے",
    description: "یہ بالکل غلط عقیدہ ہے جس کا کوئی سائنسی ثبوت نہیں۔ دنیا بھر میں لوگ مچھلی اور دودھ ایک ساتھ استعمال کرتے ہیں اور کوئی نقصان نہیں ہوتا۔",
    status: "debunked",
    category: "Health",
    views: 28700,
    comments: 145,
    likes: 1100,
    trendingRank: 4,
    publishedAt: "2024-12-20",
  },
  {
    id: "5",
    title: "Full moon affects human behavior",
    description: "Despite popular belief, multiple scientific studies have found no correlation between full moons and changes in human behavior or mental health.",
    status: "debunked",
    category: "Social",
    views: 24500,
    comments: 98,
    likes: 876,
    trendingRank: 5,
    publishedAt: "2024-12-25",
  },
  {
    id: "6",
    title: "شہد کدی خراب نہیں ہوندا",
    description: "شہد دی عمر بہوت لمبی ہوندی اے کیونکہ ایہدے وچ نمی کم تے شکر زیادہ ہوندی اے، پر کجھ حالات وچ ایہہ خمیر وی اٹھا سکدا اے۔",
    status: "partial",
    category: "Health",
    views: 21300,
    comments: 87,
    likes: 765,
    trendingRank: 6,
    publishedAt: "2024-12-15",
  },
];

const statusConfig = {
  verified: { icon: CheckCircle, label: "Verified True", color: "text-verified", bg: "bg-verified/10" },
  debunked: { icon: XCircle, label: "Debunked", color: "text-debunked", bg: "bg-debunked/10" },
  partial: { icon: AlertTriangle, label: "Partially True", color: "text-partial", bg: "bg-partial/10" },
};

const TrendingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const categories = ["all", "Health", "Cultural", "Social", "Historical"];
  const statuses = ["all", "verified", "debunked", "partial"];

  const filteredMyths = trendingMyths.filter((myth) => {
    const categoryMatch = selectedCategory === "all" || myth.category === selectedCategory;
    const statusMatch = selectedStatus === "all" || myth.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 lg:pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Trending Myths</h1>
                <p className="text-muted-foreground">Most discussed and viewed myths this week</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 p-4 bg-card rounded-2xl shadow-soft">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedStatus === status
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Trending List */}
          <div className="space-y-4">
            {filteredMyths.map((myth) => {
              const StatusIcon = statusConfig[myth.status].icon;
              return (
                <Link
                  key={myth.id}
                  to={`/myth/${myth.id}`}
                  className="block bg-card rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="font-display text-xl font-bold text-primary">#{myth.trendingRank}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                          {myth.category}
                        </span>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${statusConfig[myth.status].bg}`}>
                          <StatusIcon className={`w-3 h-3 ${statusConfig[myth.status].color}`} />
                          <span className={`text-xs font-medium ${statusConfig[myth.status].color}`}>
                            {statusConfig[myth.status].label}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {myth.publishedAt}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {myth.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {myth.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          {formatNumber(myth.views)}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Heart className="w-4 h-4" />
                          {formatNumber(myth.likes)}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageSquare className="w-4 h-4" />
                          {myth.comments}
                        </span>
                      </div>
                    </div>

                    {/* Share button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        // Share functionality
                      }}
                      className="flex-shrink-0 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Share2 className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredMyths.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No myths found matching your filters.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrendingPage;
