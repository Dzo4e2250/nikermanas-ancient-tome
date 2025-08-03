import AncientTitle from "./AncientTitle";
import MysticalCard from "./MysticalCard";
import OrnamentalDivider from "./OrnamentalDivider";

const ServicesSection = () => {
  const services = [
    {
      title: "Individualna Energoterapija",
      description: "Nežen dotik za vzpostavljanje ravnovesja, odpravljanje blokad in dvig vibracije. Pomoč pri fizičnih bolečinah, izčrpanosti, stresu, tesnobah in travmah.",
      note: "Prva terapija brezplačna"
    },
    {
      title: "Skupinska Energoterapija",
      description: "Sinergija ženskega in moškega principa. Tanja - intuitivna kot voda, Edo - stabilen kot zemlja. Skupaj ustvarjava varen prostor ljubezni.",
      note: "Dotik Nikrmane"
    },
    {
      title: "Transformativne Meditacije",
      description: "Vodene meditacije za premagovanie življenjskih izzivov, stresa in strahu. Pot do opolnomočenja in boljšega stika s srcem.",
      note: "Sprosti • Preobrazi • Prebudi"
    },
    {
      title: "Ženske Delavnice",
      description: "Intenzivna delavnica 'ONA – ena ženska s tisočerimi obrazi' za raziskovanje ženskih arhetipov in prebujanje notranje moči.",
      note: "Omejen broj mest"
    }
  ];

  return (
    <section className="py-16 bg-parchment">
      <div className="max-w-6xl mx-auto px-6">
        <AncientTitle level={2} className="mb-12">
          Storitve & Preobrazbe
        </AncientTitle>
        
        <OrnamentalDivider />
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {services.map((service, index) => (
            <MysticalCard key={index} className="h-full">
              <AncientTitle level={3} className="mb-4 text-left">
                {service.title}
              </AncientTitle>
              <p className="font-ancient text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="text-sm font-ancient italic text-ornament border-t border-ornament/30 pt-3">
                {service.note}
              </div>
            </MysticalCard>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="font-ancient text-lg text-ancient-text italic">
            "Ni čudežno zdravljenje, temveč pomoč pri odstranjevanju ovir, 
            da človek sam aktivira svoj potencial"
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;