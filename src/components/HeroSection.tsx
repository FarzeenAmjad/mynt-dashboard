import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const PLACEHOLDER_PHRASES_EN = [
  "Does eating rice at night cause weight gain?",
  "Do black cats bring bad luck in Pakistan?",
  "Can mixing milk and fish cause skin disease?",
  "Is cracking knuckles harmful for joints?",
  "Is the number 13 really unlucky?",
];

const PLACEHOLDER_PHRASES_UR = [
  "کیا رات کو چاول کھانے سے وزن بڑھتا ہے؟",
  "کیا کالی بلی منحوس ہوتی ہے؟",
  "کیا دودھ اور مچھلی ملا کر کھانے سے جلد کی بیماری ہوتی ہے؟",
  "کیا نظر لگنا سچ ہے؟",
  "کیا 13 نمبر منحوس ہے؟",
];

const PLACEHOLDER_PHRASES_PN = [
  "کی رات نوں چاول کھان نال وزن ودھدا اے؟",
  "کی کالی بلی منحوس ہوندی اے؟",
  "کی دودھ تے مچھلی رلا کے کھان نال جلد دی بیماری ہوندی اے؟",
  "کی نظر لگنا سچ اے؟",
  "کی 13 نمبر منحوس اے؟",
];

const PHRASES_MAP: Record<string, string[]> = {
  en: PLACEHOLDER_PHRASES_EN,
  ur: PLACEHOLDER_PHRASES_UR,
  pn: PLACEHOLDER_PHRASES_PN,
};

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Typewriter state
  const [displayText, setDisplayText] = useState("");
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const phrasesRef = useRef(PHRASES_MAP[language] || PLACEHOLDER_PHRASES_EN);

  // Reset typewriter when language changes
  useEffect(() => {
    phrasesRef.current = PHRASES_MAP[language] || PLACEHOLDER_PHRASES_EN;
    phraseIndex.current = 0;
    charIndex.current = 0;
    isDeleting.current = false;
    setDisplayText("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(tick, 600);
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  const tick = useCallback(() => {
    const currentPhrase = phrasesRef.current[phraseIndex.current];

    if (!isDeleting.current) {
      // Typing
      charIndex.current++;
      setDisplayText(currentPhrase.slice(0, charIndex.current));

      if (charIndex.current === currentPhrase.length) {
        // Finished typing — pause then start deleting
        timeoutRef.current = setTimeout(() => {
          isDeleting.current = true;
          tick();
        }, 2000);
        return;
      }
      timeoutRef.current = setTimeout(tick, 50);
    } else {
      // Deleting
      charIndex.current--;
      setDisplayText(currentPhrase.slice(0, charIndex.current));

      if (charIndex.current === 0) {
        // Finished deleting — move to next phrase
        isDeleting.current = false;
        phraseIndex.current =
          (phraseIndex.current + 1) % phrasesRef.current.length;
        timeoutRef.current = setTimeout(tick, 500);
        return;
      }
      timeoutRef.current = setTimeout(tick, 30);
    }
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, 600);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/chatbot?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Pakistani cultural patterns"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/60 to-foreground/80" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto stagger-children">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8 mt-8">
            <span className="w-2 h-2 rounded-full bg-verified animate-pulse" />
            <span className="text-sm text-primary-foreground/90">{t("hero.badge")}</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            {t("hero.title1")} <span className="text-secondary">{t("hero.title2")}</span>{" "}
            <span className="text-verified">{t("hero.title3")}</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative flex items-center bg-background rounded-2xl shadow-2xl p-2 group">
              <div className="flex-1 flex items-center relative">
                <Search className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" />
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full px-4 py-3 bg-transparent text-foreground focus:outline-none relative z-10"
                  />
                  {!searchQuery && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none whitespace-nowrap">
                      {displayText}
                      <span className="inline-block w-[2px] h-[1.1em] bg-muted-foreground/60 ml-[1px] align-middle animate-pulse" />
                    </span>
                  )}
                </div>
              </div>
              <Button variant="hero" size="lg" onClick={handleSearch}>
                {t("hero.verifyNow")}
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/60 mt-3">
              {t("hero.searchHint")}
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: "500+", label: t("hero.stat.myths") },
              { value: "50K+", label: t("hero.stat.users") },
              { value: "3", label: t("hero.stat.languages") },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-secondary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};
