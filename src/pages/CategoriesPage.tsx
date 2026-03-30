import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, Landmark, BookOpen, Users, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CategoriesPage = () => {
  const { category } = useParams();
  const { t } = useLanguage();

  const categoryInfo = {
    health: {
      id: "health",
      icon: Heart,
      title: t("categories.health.title"),
      description: t("categories.health.desc"),
      color: "from-red-500/20 to-pink-500/20",
      iconColor: "text-red-500",
      iconBg: "bg-red-500/10",
    },
    cultural: {
      id: "cultural",
      icon: Landmark,
      title: t("categories.cultural.title"),
      description: t("categories.cultural.desc"),
      color: "from-purple-500/20 to-indigo-500/20",
      iconColor: "text-purple-500",
      iconBg: "bg-purple-500/10",
    },
    historical: {
      id: "historical",
      icon: BookOpen,
      title: t("categories.historical.title"),
      description: t("categories.historical.desc"),
      color: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-500",
      iconBg: "bg-amber-500/10",
    },
    social: {
      id: "social",
      icon: Users,
      title: t("categories.social.title"),
      description: t("categories.social.desc"),
      color: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
    },
  };

  const mythsByCategory = {
    health: [
      { id: "1", title: "Eating rice at night causes weight gain", status: "debunked", views: 12500 },
      { id: "2", title: "Drinking milk with fish causes skin diseases", status: "debunked", views: 7600 },
      { id: "3", title: "Green tea boosts metabolism significantly", status: "partial", views: 6200 },
    ],
    cultural: [
      { id: "7", title: "Black cats bring bad luck", status: "debunked", views: 8900 },
      { id: "8", title: "Breaking a mirror brings 7 years bad luck", status: "debunked", views: 5600 },
    ],
    historical: [
      { id: "10", title: "The Great Wall is visible from space", status: "debunked", views: 7800 },
    ],
    social: [
      { id: "12", title: "Full moon affects human behavior", status: "partial", views: 4800 },
      { id: "13", title: "We only use 10% of our brain", status: "debunked", views: 6700 },
    ],
  };

  const statusConfig = {
    verified: { icon: CheckCircle, label: t("status.verified"), color: "text-verified", bg: "bg-verified/10" },
    debunked: { icon: XCircle, label: t("status.debunked"), color: "text-debunked", bg: "bg-debunked/10" },
    partial: { icon: AlertTriangle, label: t("status.partial"), color: "text-partial", bg: "bg-partial/10" },
  };

  const selectedCategory = category ? categoryInfo[category as keyof typeof categoryInfo] : null;
  const myths = category ? mythsByCategory[category as keyof typeof mythsByCategory] || [] : [];

  if (category && selectedCategory) {
    const CategoryIcon = selectedCategory.icon;

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 lg:pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Link to="/categories" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              {t("categories.allCategories")}
            </Link>

            <div className={`bg-gradient-to-br ${selectedCategory.color} rounded-3xl p-8 lg:p-12 mb-8`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl ${selectedCategory.iconBg} flex items-center justify-center`}>
                  <CategoryIcon className={`w-8 h-8 ${selectedCategory.iconColor}`} />
                </div>
                <div>
                  <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground">{selectedCategory.title}</h1>
                  <p className="text-muted-foreground">{myths.length} {t("categories.mythsInCategory")}</p>
                </div>
              </div>
              <p className="text-muted-foreground max-w-2xl">{selectedCategory.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myths.map((myth) => {
                const StatusIcon = statusConfig[myth.status as keyof typeof statusConfig].icon;
                return (
                  <Link key={myth.id} to={`/myth/${myth.id}`} className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${statusConfig[myth.status as keyof typeof statusConfig].bg} mb-4`}>
                      <StatusIcon className={`w-3.5 h-3.5 ${statusConfig[myth.status as keyof typeof statusConfig].color}`} />
                      <span className={`text-xs font-medium ${statusConfig[myth.status as keyof typeof statusConfig].color}`}>
                        {statusConfig[myth.status as keyof typeof statusConfig].label}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4 line-clamp-2">{myth.title}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{myth.views.toLocaleString()} {t("common.views")}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {myths.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">{t("categories.noMyths")}</p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">{t("categories.browseTitle")}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("categories.browseSubtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {Object.values(categoryInfo).map((cat) => {
              const CategoryIcon = cat.icon;
              const count = mythsByCategory[cat.id as keyof typeof mythsByCategory]?.length || 0;
              return (
                <Link key={cat.id} to={`/categories/${cat.id}`} className={`bg-gradient-to-br ${cat.color} rounded-2xl p-8 hover:shadow-card transition-all duration-300 hover:-translate-y-1`}>
                  <div className={`w-14 h-14 rounded-xl ${cat.iconBg} flex items-center justify-center mb-4`}>
                    <CategoryIcon className={`w-7 h-7 ${cat.iconColor}`} />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-2">{cat.title}</h2>
                  <p className="text-muted-foreground mb-4">{cat.description}</p>
                  <span className="text-sm font-medium text-primary">{count} {t("categories.myths")} →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
