import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrendingUp, Eye, MessageSquare, Heart, Share2, Clock, CheckCircle, XCircle, AlertTriangle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMyths } from "@/hooks/useMyths";
import { useLanguage } from "@/contexts/LanguageContext";

const statusConfig = {
  verified: { icon: CheckCircle, label: "verified", color: "text-verified", bg: "bg-verified/10" },
  debunked: { icon: XCircle, label: "debunked", color: "text-debunked", bg: "bg-debunked/10" },
  partial: { icon: AlertTriangle, label: "partial", color: "text-partial", bg: "bg-partial/10" },
};

const TrendingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const { data: allMyths = [] } = useMyths({ orderBy: 'views' });
  const { t } = useLanguage();

  const categories = ["all", "Health", "Cultural", "Social", "Historical"];
  const statuses = ["all", "verified", "debunked", "partial"];

  const filteredMyths = allMyths.filter((myth) => {
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
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t("trending.pageTitle")}</h1>
                <p className="text-muted-foreground">{t("trending.pageSubtitle")}</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 p-4 bg-card rounded-2xl shadow-soft">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{t("trending.filters")}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">{t("trending.category")}</span>
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
                  {cat === "all" ? t("trending.all") : cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">{t("trending.status")}</span>
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
                  {status === "all" ? t("trending.all") : t(`status.${status}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Trending List */}
          <div className="space-y-4">
            {filteredMyths.map((myth, index) => {
              const StatusIcon = statusConfig[myth.status as keyof typeof statusConfig].icon;
              const statusKey = statusConfig[myth.status as keyof typeof statusConfig].label;
              return (
                <Link
                  key={myth.id}
                  to={`/myth/${myth.id}`}
                  className="block bg-card rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="font-display text-xl font-bold text-primary">#{index + 1}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                          {myth.category}
                        </span>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${statusConfig[myth.status as keyof typeof statusConfig].bg}`}>
                          <StatusIcon className={`w-3 h-3 ${statusConfig[myth.status as keyof typeof statusConfig].color}`} />
                          <span className={`text-xs font-medium ${statusConfig[myth.status as keyof typeof statusConfig].color}`}>
                            {t(`status.${statusKey}`)}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {myth.published_at}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {myth.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {myth.summary}
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
                          {0}
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
              <p className="text-muted-foreground">{t("trending.noResults")}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                }}
              >
                {t("trending.clearFilters")}
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
