import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToActionSection from "@/components/CallToActionSection";


const Index = () => {
  return (
    <main className="min-h-screen bg-background font-ancient">
      <Navigation />
      <div id="domov">
        <HeroSection />
      </div>
      <div id="proces">
        <ProcessSection />
      </div>
      <div id="storitve">
        <ServicesSection />
      </div>
      <div id="o-nas">
        <AboutSection />
      </div>
      <div id="pricevanja">
        <TestimonialsSection />
      </div>
      <CallToActionSection />
      
      {/* Ancient footer */}
      <footer className="bg-primary text-primary-foreground py-8 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-2xl mb-4 text-mystical-glow">❦</div>
          <p className="font-gothic text-lg mb-2">NIKRMANA</p>
          <p className="font-ancient text-sm opacity-80">
            Zavod za dvig zavesti • Pesnica pri Mariboru
          </p>
          <p className="font-ancient text-xs opacity-60 mt-4">
            "Povratek k sebi in ljubezni"
          </p>
        </div>
        
        {/* Admin access link */}
        <a 
          href="/auth"
          className="absolute bottom-4 right-4 font-ancient text-xs opacity-40 hover:opacity-70 transition-opacity duration-300 underline"
        >
          admin dostop
        </a>
      </footer>
    </main>
  );
};

export default Index;