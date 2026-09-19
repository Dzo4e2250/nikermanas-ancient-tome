import AncientTitle from "./AncientTitle";
import MysticalCard from "./MysticalCard";
import OrnamentalDivider from "./OrnamentalDivider";

const ContactSection = () => {
  return (
    <section className="py-16 bg-gradient-mystical">
      <div className="max-w-4xl mx-auto px-6">
        <AncientTitle level={2} className="mb-12">
          Stik z Nikrmano
        </AncientTitle>
        
        <OrnamentalDivider />
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <MysticalCard>
            <AncientTitle level={3} className="mb-6 text-left">
              Lokacija & Kontakt
            </AncientTitle>
            <div className="space-y-4 font-ancient text-muted-foreground">
              <div className="flex items-center">
                <span className="text-ornament mr-3">📍</span>
                <span>Pesnica pri Mariboru</span>
              </div>
              <div className="flex items-center">
                <span className="text-ornament mr-3">📞</span>
                <span>051 358 273</span>
              </div>
              <div className="flex items-center">
                <span className="text-ornament mr-3">✉️</span>
                <span>nikrmanapesnica@gmail.com</span>
              </div>
              <div className="flex items-center">
                <span className="text-ornament mr-3">🌐</span>
                <span>Tudi na daljavo</span>
              </div>
            </div>
          </MysticalCard>
          
          <MysticalCard>
            <AncientTitle level={3} className="mb-6 text-left">
              Prva Energoterapija
            </AncientTitle>
            <div className="space-y-4 font-ancient text-muted-foreground">
              <p className="leading-relaxed">
                <strong className="text-ancient-text">Brezplačen prvi obisk</strong>, 
                da lahko vsak doživi energoterapijo in začuti njeno moč.
              </p>
              <p className="leading-relaxed">
                Nadaljnje terapije s prostovoljnimi prispevki ali simboličnimi cenami.
              </p>
              <p className="italic text-ornament">
                "Vračanje k sebi in ljubezni - terapije ne zdravijo na silo, 
                temveč odstranjujejo ovire."
              </p>
            </div>
          </MysticalCard>
        </div>
        
        <div className="text-center mt-12">
          <MysticalCard className="max-w-2xl mx-auto">
            <p className="font-ancient text-lg text-ancient-text leading-relaxed mb-4">
              <strong>Iščemo prostovoljce</strong>
            </p>
            <p className="font-ancient text-muted-foreground leading-relaxed">
              Pomagajte nam organizirati meditacije in skupinske terapije v vaših krajih. 
              Iščemo "srca", ki bi pomagala zbrati udeležence, ustvariti prostor 
              in širiti zavest v lokalnih okoljih.
            </p>
          </MysticalCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;