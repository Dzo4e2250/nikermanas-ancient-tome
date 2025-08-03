import AncientTitle from "./AncientTitle";
import OrnamentalDivider from "./OrnamentalDivider";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/lovable-uploads/c41033da-76b1-4518-b6bc-08e76dbd185a.png)'}}>{/* pt-16 for navigation space */}
      {/* Decorative corner ornaments */}
      <div className="absolute top-8 left-8 text-4xl text-ornament opacity-60">❦</div>
      <div className="absolute top-8 right-8 text-4xl text-ornament opacity-60 transform scale-x-[-1]">❦</div>
      <div className="absolute bottom-8 left-8 text-4xl text-ornament opacity-60 transform scale-y-[-1]">❦</div>
      <div className="absolute bottom-8 right-8 text-4xl text-ornament opacity-60 transform scale-[-1]">❦</div>
      
      <div className="text-center max-w-4xl mx-auto px-6 relative z-10">
        <div className="relative">
          {/* Main title with mystical styling */}
          <AncientTitle level={1} className="mb-6 relative">
            <span className="relative z-10">NIKRMANA</span>
            <div className="absolute inset-0 text-mystical-glow opacity-50 blur-sm">NIKRMANA</div>
          </AncientTitle>
          
          <OrnamentalDivider />
          
          <p className="font-ancient text-lg md:text-xl text-ancient-text leading-relaxed max-w-2xl mx-auto mb-8">
            <em>Zavod za dvig zavesti</em>
          </p>
          
          <div className="font-ancient text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            <p className="mb-4">
              Energoterapije • Meditacije • Srečanja
            </p>
            <p className="italic">
              "Naravna pot, ki nežno a globoko preobraža in ponovno vzpostavlja 
              naravno ravnovesje telesa, čustev in duha"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;