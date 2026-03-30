import { Link } from "react-router-dom";
import { Heart, Landmark, BookOpen, Users, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMythCategoryCounts } from "@/hooks/useMyths";

export const CategoriesSection = () => {
  const { t } = useLanguage();
  const { data: categoryCounts = {} } = useMythCategoryCounts();

  const categories = [
    {
      id: "health",
      icon: Heart,
      title: t("categories.health.title"),
      description: t("categories.health.desc"),
      count: categoryCounts['Health'] || 0,
      color: "from-red-500/20 to-pink-500/20",
      iconColor: "text-red-500",
    },
    {
      id: "cultural",
      icon: Landmark,
      title: t("categories.cultural.title"),
      description: t("categories.cultural.desc"),
      count: categoryCounts['Cultural'] || 0,
      color: "from-purple-500/20 to-indigo-500/20",
      iconColor: "text-purple-500",
    },
    {
      id: "historical",
      icon: BookOpen,
      title: t("categories.historical.title"),
      description: t("categories.historical.desc"),
      count: categoryCounts['Historical'] || 0,
      color: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-500",
    },
    {
      id: "social",
      icon: Users,
      title: t("categories.social.title"),
      description: t("categories.social.desc"),
      count: categoryCounts['Social'] || 0,
      color: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-500",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t("categories.badge")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("categories.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("categories.subtitle")}
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="group relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`w-7 h-7 ${category.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {category.count} {t("categories.myths")}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 rtl:rotate-180" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
