import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import CallToActionSection from "@/components/CallToActionSection";
import EventsSection from "@/components/EventsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
      <EventsSection />
      <ContactSection />
      <CallToActionSection />
    </div>
  );
};

export default Index;