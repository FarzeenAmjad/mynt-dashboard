import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { TrendingSection } from "@/components/TrendingSection";
import { ChatbotCTA } from "@/components/ChatbotCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <TrendingSection />
        <ChatbotCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
