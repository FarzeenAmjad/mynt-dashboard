import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Target, Users, Shield, BookOpen, Heart, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutPage = () => {
  const { t } = useLanguage();

  const teamMembers = [
    { name: "Dr. Amna Hussain", role: "Founder & Lead Researcher", expertise: "Cultural Anthropology" },
    { name: "Hassan Ali Khan", role: "AI & Technology Lead", expertise: "Machine Learning" },
    { name: "Fatima Zahra", role: "Content Director", expertise: "Folklore Studies" },
    { name: "Usman Malik", role: "Community Manager", expertise: "Digital Communication" },
  ];

  const values = [
    { icon: Target, titleKey: "about.accuracy", descKey: "about.accuracyDesc" },
    { icon: Shield, titleKey: "about.integrity", descKey: "about.integrityDesc" },
    { icon: Users, titleKey: "about.community", descKey: "about.communityDesc" },
    { icon: Heart, titleKey: "about.preservation", descKey: "about.preservationDesc" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                {t("about.badge")}
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {t("about.title1")} <span className="text-primary">{t("about.title2")}</span> {t("about.title3")} <span className="text-secondary">{t("about.title4")}</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.intro")}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {t("about.missionTitle")}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t("about.mission1")}
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t("about.mission2")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("about.mission3")}
                </p>
              </div>
              <div className="bg-card rounded-2xl p-8 shadow-soft">
                <div className="flex items-center gap-4 mb-6">
                  <Award className="w-12 h-12 text-primary" />
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">500+</h3>
                    <p className="text-muted-foreground">{t("about.statsMyths")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <Users className="w-12 h-12 text-secondary" />
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">50,000+</h3>
                    <p className="text-muted-foreground">{t("about.statsUsers")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <BookOpen className="w-12 h-12 text-verified" />
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">100+</h3>
                    <p className="text-muted-foreground">{t("about.statsStories")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 lg:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("about.valuesTitle")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("about.valuesSubtitle")}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.titleKey} className="bg-card rounded-2xl p-6 shadow-soft text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{t(value.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(value.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("about.teamTitle")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("about.teamSubtitle")}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member.name} className="bg-card rounded-2xl p-6 shadow-soft text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-display font-bold text-primary">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-1">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.expertise}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t("about.contactTitle")}
            </h2>
            <p className="opacity-80 mb-6 max-w-xl mx-auto">
              {t("about.contactSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@mythguider.pk"
                className="px-6 py-3 bg-primary-foreground text-primary rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                {t("about.emailUs")}
              </a>
              <a
                href="#"
                className="px-6 py-3 border border-primary-foreground/30 rounded-xl font-medium hover:bg-primary-foreground/10 transition-colors"
              >
                {t("about.joinCommunity")}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
