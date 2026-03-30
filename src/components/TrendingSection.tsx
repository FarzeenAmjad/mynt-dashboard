import { Link } from "react-router-dom";
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Eye, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

type MythStatus = "verified" | "debunked" | "partial";

interface Myth {
  id: string;
  title: string;
  summary: string;
  status: MythStatus;
  category: string;
  views: number;
  comments: number;
  shares: number;
}

const trendingMyths: Myth[] = [
  {
    id: "1",
    title: "Eating rice at night causes weight gain",
    summary: "A common belief that consuming rice after sunset leads to obesity. Scientific evidence suggests otherwise...",
    status: "debunked",
    category: "Health",
    views: 12500,
    comments: 234,
    shares: 567,
  },
  {
    id: "2",
    title: "کالی بلی منحوس ہوتی ہے",
    summary: "ایک عام توہم پرستی کہ کالی بلی کا راستہ کاٹنا بدقسمتی لاتا ہے۔ سائنسی طور پر اس کا کوئی ثبوت نہیں...",
    status: "debunked",
    category: "Cultural",
    views: 8900,
    comments: 189,
    shares: 342,
  },
  {
    id: "3",
    title: "مچھلی تے دودھ نال چمڑی دی بیماری ہوندی اے",
    summary: "ایہہ پرانا خیال اے کہ مچھلی تے دودھ اکٹھے کھان نال برص ہو جاندا اے۔ سائنس ایہہ گل غلط کہندی اے...",
    status: "debunked",
    category: "Health",
    views: 7600,
    comments: 156,
    shares: 289,
  },
  {
    id: "4",
    title: "Green tea boosts metabolism significantly",
    summary: "Claims that green tea can dramatically increase metabolic rate and promote rapid weight loss...",
    status: "partial",
    category: "Health",
    views: 6200,
    comments: 98,
    shares: 201,
  },
  {
    id: "5",
    title: "انگلیاں چٹخانے سے جوڑوں کا درد ہوتا ہے",
    summary: "یہ عام خیال ہے کہ انگلیاں چٹخانے سے آرتھرائٹس ہوتی ہے۔ تحقیق اس بات کی تردید کرتی ہے...",
    status: "debunked",
    category: "Health",
    views: 5400,
    comments: 87,
    shares: 156,
  },
  {
    id: "6",
    title: "پورے چند دا انسانی رویے تے اثر",
    summary: "ایہہ خیال کہ پورے چند دی رات جرائم تے ہسپتالاں وچ مریض ودھ جاندے نیں۔ سائنس ایہہ گل رد کردی اے...",
    status: "partial",
    category: "Social",
    views: 4800,
    comments: 76,
    shares: 134,
  },
];

const formatNumber = (num: number) => {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
};

export const TrendingSection = () => {
  const { t } = useLanguage();

  const statusConfig = {
    verified: {
      icon: CheckCircle,
      label: t("status.verified"),
      color: "text-verified",
      bg: "bg-verified/10",
    },
    debunked: {
      icon: XCircle,
      label: t("status.debunked"),
      color: "text-debunked",
      bg: "bg-debunked/10",
    },
    partial: {
      icon: AlertTriangle,
      label: t("status.partial"),
      color: "text-partial",
      bg: "bg-partial/10",
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-secondary">{t("trending.badge")}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t("trending.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("trending.subtitle")}
            </p>
          </div>
          <Link to="/trending">
            <Button variant="outline">{t("trending.viewAll")}</Button>
          </Link>
        </div>

        {/* Myths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingMyths.map((myth, index) => {
            const StatusIcon = statusConfig[myth.status].icon;
            
            return (
              <Link
                key={myth.id}
                to={`/myth/${myth.id}`}
                className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Status Badge */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${statusConfig[myth.status].bg} mb-4`}>
                  <StatusIcon className={`w-3.5 h-3.5 ${statusConfig[myth.status].color}`} />
                  <span className={`text-xs font-medium ${statusConfig[myth.status].color}`}>
                    {statusConfig[myth.status].label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {myth.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {myth.summary}
                </p>

                {/* Category Tag */}
                <span className="inline-block px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium mb-4">
                  {myth.category}
                </span>

                {/* Stats */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span className="text-xs">{formatNumber(myth.views)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{formatNumber(myth.comments)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs">{formatNumber(myth.shares)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
