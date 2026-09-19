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
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <AncientTitle level={2} className="mb-8 text-primary-foreground text-center">
          Začnite Svojo Pot Preobrazbe Danes
        </AncientTitle>
        
        <OrnamentalDivider />
        
        <p className="font-ancient text-lg leading-relaxed mb-12 max-w-2xl mx-auto opacity-90 text-center">
          "Povratek k sebi in ljubezni - terapije ne zdravijo na silo, 
          temveč odstranjujejo ovire, da človek sam aktivira svoj potencial."
        </p>

        {/* Združeni dve kartici - kontakt in akcijski poziv */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Leva kartica - Kontakt */}
          <MysticalCard className="text-center bg-primary-foreground/10 border-primary-foreground/30">
            <AncientTitle level={3} className="mb-6 text-primary-foreground">
              Stik z Nikrmano
            </AncientTitle>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-ancient text-primary-foreground">Pesnica pri Mariboru</p>
                  <p className="font-ancient text-sm text-primary-foreground/80">Osebno in na daljavo</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-xl">📞</span>
                <a href="tel:051358273" className="font-ancient text-primary-foreground hover:text-mystical-glow transition-colors">
                  051 358 273
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-xl">✉️</span>
                <a href="mailto:nikrmanapesnica@gmail.com" className="font-ancient text-primary-foreground hover:text-mystical-glow transition-colors break-all">
                  nikrmanapesnica@gmail.com
                </a>
              </div>
            </div>
          </MysticalCard>

          {/* Desna kartica - Prva terapija */}
          <MysticalCard className="text-center bg-primary-foreground/10 border-primary-foreground/30">
            <AncientTitle level={3} className="mb-6 text-primary-foreground">
              Prva Energoterapija
            </AncientTitle>
            
            <div className="space-y-4">
              <div className="text-4xl mb-4">✨</div>
              <p className="font-ancient text-lg text-mystical-glow font-semibold">
                BREZPLAČNO
              </p>
              <p className="font-ancient text-sm text-primary-foreground/90 leading-relaxed">
                Prva seja je popolnoma brezplačna, da lahko spoznate moč energoterapije. 
                Naslednje seje pa so prostovoljni prispevek.
              </p>
              <div className="pt-4 border-t border-primary-foreground/30">
                <p className="font-ancient text-sm text-primary-foreground/80 italic">
                  "Ni čudežno zdravljenje, temveč pomoč pri odstranjevanju ovir, 
                  da človek sam aktivira svoj potencial"
                </p>
              </div>
            </div>
          </MysticalCard>
        </div>

        {/* Spodnja kartica - prostovoljci */}
        <MysticalCard className="text-center bg-primary-foreground/5 border-primary-foreground/20 mb-8">
          <AncientTitle level={3} className="mb-4 text-primary-foreground">
            Iščemo Prostovoljce
          </AncientTitle>
          <p className="font-ancient text-primary-foreground/90 leading-relaxed">
            Iščemo prostovoljce za organizacijo meditacij in skupinskih terapij. 
            Če vas zanima sodelovanje pri širjenju pozitivne energije, nas kontaktirajte.
          </p>
        </MysticalCard>
        
        {/* Glavna akcijska gumbka */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="tel:051358273"
            className="inline-flex items-center font-ancient bg-mystical-glow text-ancient-text px-8 py-4 rounded shadow-mystical hover:bg-parchment transition-all duration-300 border-2 border-primary-foreground transform hover:scale-105"
          >
            <span className="mr-2">📞</span>
            Pokličite: 051 358 273
          </a>
          
          <a 
            href="mailto:nikrmanapesnica@gmail.com"
            className="inline-flex items-center font-ancient border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded hover:bg-primary-foreground hover:text-primary transition-all duration-300 transform hover:scale-105"
          >
            <span className="mr-2">✉️</span>
            Pošljite sporočilo
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;