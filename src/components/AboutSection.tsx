import AncientTitle from "./AncientTitle";
import MysticalCard from "./MysticalCard";
import OrnamentalDivider from "./OrnamentalDivider";

const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-ancient">
      <div className="max-w-4xl mx-auto px-6">
        <AncientTitle level={2} className="mb-12">
          Voditelja Preobrazbe
        </AncientTitle>
        
        <OrnamentalDivider />
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <MysticalCard>
            <div className="text-center">
              <AncientTitle level={3} className="mb-4">
                Tanja
              </AncientTitle>
              <div className="text-6xl mb-4 text-ornament">🌙</div>
              <p className="font-ancient text-muted-foreground leading-relaxed">
                <strong>Ženski princip</strong> - intuitivna, mehka in fluidna kot voda. 
                Nosi energijo nežnosti in globokega razumevanja. 
                Vodnica na poti k srčni povezanosti.
              </p>
            </div>
          </MysticalCard>
          
          <MysticalCard>
            <div className="text-center">
              <AncientTitle level={3} className="mb-4">
                Edo
              </AncientTitle>
              <div className="text-6xl mb-4 text-ornament">☉</div>
              <p className="font-ancient text-muted-foreground leading-relaxed">
                <strong>Moški princip</strong> - predstavlja stabilnost, moč in prizemljenost. 
                Temelj, ki omogoča varno raziskovanje notranjih svetov in preobrazbo.
              </p>
            </div>
          </MysticalCard>
        </div>
        
        <div className="text-center mt-12">
          <MysticalCard className="max-w-2xl mx-auto">
            <p className="font-ancient text-lg text-ancient-text leading-relaxed">
              <em>"Skupaj ustvarjava varen prostor, kjer udeleženci čutijo ljubezen, 
              umirjenost in dvig zavesti. Sinergija najinih energij omogoča 
              globoko preobrazbo iz 3D v 5D zavest."</em>
            </p>
          </MysticalCard>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;