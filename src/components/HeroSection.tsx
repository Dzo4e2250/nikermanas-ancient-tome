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
          {/* Main logo */}
          <img 
            src="/lovable-uploads/f1bc1069-4c8c-46a7-85d8-285882dbb31d.png" 
            alt="NIKRMANA logo" 
            className="w-auto h-32 md:h-48 mx-auto mb-6"
          />
          
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