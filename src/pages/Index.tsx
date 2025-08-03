import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background font-ancient">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      
      {/* Ancient footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-2xl mb-4 text-mystical-glow">❦</div>
          <p className="font-gothic text-lg mb-2">NIKERMANA</p>
          <p className="font-ancient text-sm opacity-80">
            Zavod za dvig zavesti • Pesnica pri Mariboru
          </p>
          <p className="font-ancient text-xs opacity-60 mt-4">
            "Povratek k sebi in ljubezni"
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;