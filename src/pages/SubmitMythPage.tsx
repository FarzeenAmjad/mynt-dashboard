import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, Loader2, CheckCircle, LogIn, FileQuestion, ArrowLeft, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCreateMythSubmission } from "@/hooks/useMythSubmissions";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const SubmitMythPage = () => {
  const { t } = useLanguage();
  const { user, profile, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const createSubmission = useCreateMythSubmission();

  const [form, setForm] = useState({
    title: "",
    category: "Health" as "Health" | "Cultural" | "Historical" | "Social",
    description: "",
    sourceUrl: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: t("submit.errorTitle"),
        description: t("submit.authRequired"),
        variant: "destructive",
      });
      return;
    }

    if (!form.title.trim() || !form.description.trim()) {
      toast({
        title: t("submit.errorTitle"),
        description: "Please fill in the title and description.",
        variant: "destructive",
      });
      return;
    }

    createSubmission.mutate(
      {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        source_url: form.sourceUrl.trim() || null,
        submitted_by: user.id,
        submitter_name: profile?.name || "Anonymous",
      },
      {
        onSuccess: () => {
          toast({
            title: t("submit.successTitle"),
            description: t("submit.successDesc"),
          });
          setSubmitted(true);
        },
        onError: () => {
          toast({
            title: t("submit.errorTitle"),
            description: t("submit.errorDesc"),
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleReset = () => {
    setForm({ title: "", category: "Health", description: "", sourceUrl: "" });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-8 stagger-children">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <FileQuestion className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("submit.pageTitle")}
            </h1>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              {t("submit.pageSubtitle")}
            </p>
          </div>

          {/* Auth gate */}
          {!authLoading && !user ? (
            <div className="bg-card rounded-2xl p-8 shadow-soft text-center animate-fade-in">
              <LogIn className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-medium mb-2">
                {t("submit.authRequired")}
              </p>
              <Link to="/auth" state={{ from: "/submit" }}>
                <Button className="mt-4">
                  <LogIn className="w-4 h-4 mr-2" />
                  {t("submit.signIn")}
                </Button>
              </Link>
            </div>
          ) : submitted ? (
            /* Success state */
            <div className="bg-card rounded-2xl p-8 shadow-soft text-center animate-fade-in">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-verified" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                {t("submit.successTitle")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t("submit.successDesc")}
              </p>
              <Button onClick={handleReset} variant="outline">
                {t("submit.submitAnother")}
              </Button>
            </div>
          ) : (
            /* Form */
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft animate-fade-in">
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("submit.titleLabel")} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder={t("submit.titlePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("submit.categoryLabel")} <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as typeof form.category })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="Health">Health</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Historical">Historical</option>
                    <option value="Social">Social</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("submit.descriptionLabel")} <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder={t("submit.descriptionPlaceholder")}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>

                {/* Source URL */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <span className="flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5" />
                      {t("submit.sourceLabel")}
                    </span>
                  </label>
                  <input
                    type="url"
                    value={form.sourceUrl}
                    onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })}
                    placeholder={t("submit.sourcePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                {/* Submit */}
                <Button
                  onClick={handleSubmit}
                  disabled={createSubmission.isPending || !form.title.trim() || !form.description.trim()}
                  size="lg"
                  className="w-full"
                >
                  {createSubmission.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {t("submit.button")}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {t("submit.disclaimer")}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitMythPage;
