import { Bot, MessageSquare, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const ChatbotCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-br from-primary via-primary to-emerald-light rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-primary-foreground">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium text-secondary">{t("chatbot.badge")}</span>
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("chatbot.title")}
              </h2>
              
              <p className="text-primary-foreground/80 text-lg mb-8">
                {t("chatbot.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/chatbot">
                  <Button variant="heroOutline" size="lg" className="w-full sm:w-auto">
                    <Bot className="w-5 h-5 mr-2" />
                    {t("chatbot.factCheck")}
                  </Button>
                </Link>
                <Link to="/chatbot/storytelling">
                  <Button variant="heroOutline" size="lg" className="w-full sm:w-auto">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    {t("chatbot.storytelling")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Chat Preview */}
            <div className="bg-background rounded-2xl p-6 shadow-xl">
              <div className="space-y-4">
                {/* Bot Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground">
                      {t("chatbot.greeting")}
                    </p>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex gap-3 justify-end">
                  <div className="bg-primary rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-primary-foreground">
                      {t("chatbot.question")}
                    </p>
                  </div>
                </div>

                {/* Bot Response */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-partial/20 text-partial text-xs font-medium mr-1">
                        {t("status.partial")}
                      </span>
                      {t("chatbot.response")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Preview */}
              <div className="mt-6 flex items-center gap-3 p-3 bg-muted rounded-xl">
                <input
                  type="text"
                  placeholder={t("chatbot.placeholder")}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  disabled
                />
                <Button size="icon" disabled>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
