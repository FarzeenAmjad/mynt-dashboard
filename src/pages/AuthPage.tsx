import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const AuthPage = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();
  const { t } = useLanguage();

  const from = (location.state as { from?: string })?.from || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode === "signin") {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: t("auth.signInFailed"),
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: t("auth.welcomeBack"), description: "" });
        navigate(from, { replace: true });
      }
    } else {
      if (!name.trim()) {
        toast({ title: t("auth.fullName"), description: t("auth.namePlaceholder"), variant: "destructive" });
        setIsLoading(false);
        return;
      }
      const { error } = await signUp(email, password, name);
      if (error) {
        toast({
          title: t("auth.signUpFailed"),
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t("auth.checkEmail"),
          description: t("auth.confirmEmail"),
        });
        setMode("signin");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {mode === "signin" ? t("auth.welcomeBack") : t("auth.createAccount")}
            </h1>
            <p className="text-muted-foreground mt-1">
              {mode === "signin"
                ? t("auth.signInSubtitle")
                : t("auth.signUpSubtitle")}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-muted rounded-lg p-1 mb-6">
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                mode === "signin"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("auth.signIn")}
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                mode === "signup"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("auth.signUp")}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 shadow-soft space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t("auth.fullName")}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("auth.namePlaceholder")}
                    className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t("auth.email")}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.emailPlaceholder")}
                  className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t("auth.password")}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "signup" ? t("auth.passwordMin") : t("auth.passwordPlaceholder")}
                  className="w-full pl-10 pr-12 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {mode === "signin" ? t("auth.signIn") : t("auth.createAccount")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {mode === "signin" ? (
              <>
                {t("auth.noAccount")}{" "}
                <button onClick={() => setMode("signup")} className="text-primary hover:underline font-medium">
                  {t("auth.signUp")}
                </button>
              </>
            ) : (
              <>
                {t("auth.haveAccount")}{" "}
                <button onClick={() => setMode("signin")} className="text-primary hover:underline font-medium">
                  {t("auth.signIn")}
                </button>
              </>
            )}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
