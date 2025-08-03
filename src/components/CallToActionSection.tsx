import AncientTitle from "./AncientTitle";
import MysticalCard from "./MysticalCard";
import OrnamentalDivider from "./OrnamentalDivider";

const CallToActionSection = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Mystical background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl">❦</div>
        <div className="absolute top-20 right-20 text-4xl">✧</div>
        <div className="absolute bottom-20 left-20 text-5xl">◊</div>
        <div className="absolute bottom-10 right-10 text-6xl transform rotate-45">❦</div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <AncientTitle level={2} className="mb-8 text-primary-foreground">
          Začnite Svojo Pot Preobrazbe Danes
        </AncientTitle>
        
        <OrnamentalDivider />
        
        <p className="font-ancient text-lg leading-relaxed mb-8 max-w-2xl mx-auto opacity-90">
          "Povratek k sebi in ljubezni - terapije ne zdravijo na silo, 
          temveč odstranjujejo ovire, da človek sam aktivira svoj potencial."
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="tel:051358273"
            className="inline-flex items-center font-ancient bg-mystical-glow text-ancient-text px-8 py-4 rounded shadow-mystical hover:bg-parchment transition-all duration-300 border-2 border-primary-foreground"
          >
            <span className="mr-2">📞</span>
            Pokličite: 051 358 273
          </a>
          
          <a 
            href="mailto:nikrmanapesnica@gmail.com"
            className="inline-flex items-center font-ancient border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded hover:bg-primary-foreground hover:text-primary transition-all duration-300"
          >
            <span className="mr-2">✉️</span>
            Pošljite sporočilo
          </a>
        </div>
        
        <div className="mt-8 pt-8 border-t border-primary-foreground/30">
          <p className="font-ancient text-sm opacity-80">
            ⭐ Prva energoterapija <strong>BREZPLAČNA</strong> ⭐
          </p>
          <p className="font-ancient text-xs opacity-60 mt-2">
            Delujemo v živo in na daljavo • Pesnica pri Mariboru
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;