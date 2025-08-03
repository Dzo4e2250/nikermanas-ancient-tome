import AncientTitle from "./AncientTitle";
import MysticalCard from "./MysticalCard";
import OrnamentalDivider from "./OrnamentalDivider";
import EnhancedBiographyDialog from "./EnhancedBiographyDialog";
import tanjaAvatar from "@/assets/tanja-avatar.jpg";
import edoAvatar from "@/assets/edo-avatar.jpg";
import santiagoAvatar from "@/assets/santiago-avatar.jpg";

const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-ancient">
      <div className="max-w-4xl mx-auto px-6">
        <AncientTitle level={2} className="mb-12">
          Voditelji Preobrazbe
        </AncientTitle>
        
        <OrnamentalDivider />
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <MysticalCard>
            <div className="text-center">
              <AncientTitle level={3} className="mb-4">
                Tanja
              </AncientTitle>
              <EnhancedBiographyDialog person="tanja" avatar={tanjaAvatar} name="Tanja">
                <img 
                  src={tanjaAvatar} 
                  alt="Tanja - Ženski princip" 
                  className="w-32 h-32 mx-auto rounded-full mb-4 shadow-mystical object-cover border-2 border-ornament cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </EnhancedBiographyDialog>
              <p className="font-ancient text-muted-foreground leading-relaxed mb-2">
                <strong>Ženski princip</strong> - intuitivna, mehka in fluidna kot voda. 
                Nosi energijo nežnosti in globokega razumevanja. 
                Vodnica na poti k srčni povezanosti.
              </p>
              <p className="font-ancient text-xs text-ornament italic">
                Kliknite na sliko za njeno polno zgodbo ✨
              </p>
            </div>
          </MysticalCard>
          
          <MysticalCard>
            <div className="text-center">
              <AncientTitle level={3} className="mb-4">
                Edo
              </AncientTitle>
              <EnhancedBiographyDialog person="edo" avatar={edoAvatar} name="Edo">
                <img 
                  src={edoAvatar} 
                  alt="Edo - Moški princip" 
                  className="w-32 h-32 mx-auto rounded-full mb-4 shadow-mystical object-cover border-2 border-ornament cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </EnhancedBiographyDialog>
              <p className="font-ancient text-muted-foreground leading-relaxed mb-2">
                <strong>Moški princip</strong> - predstavlja stabilnost, moč in prizemljenost. 
                Temelj, ki omogoča varno raziskovanje notranjih svetov in preobrazbo.
              </p>
              <p className="font-ancient text-xs text-ornament italic">
                Kliknite na sliko za njegovo polno zgodbo ✨
              </p>
            </div>
          </MysticalCard>
          
          <MysticalCard>
            <div className="text-center">
              <AncientTitle level={3} className="mb-4">
                Santiago
              </AncientTitle>
              <EnhancedBiographyDialog person="santiago" avatar={santiagoAvatar} name="Santiago">
                <img 
                  src={santiagoAvatar} 
                  alt="Santiago - Srčni varuh" 
                  className="w-32 h-32 mx-auto rounded-full mb-4 shadow-mystical object-cover border-2 border-ornament cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </EnhancedBiographyDialog>
              <p className="font-ancient text-muted-foreground leading-relaxed mb-2">
                <strong>Srčni varuh</strong> - črno-bel francoski buldog s pogledom, ki gre globlje od oči. 
                Terapevt po naravi, ki ve kdaj božati in kdaj samo biti.
              </p>
              <p className="font-ancient text-xs text-ornament italic">
                Kliknite na sliko za njegovo polno zgodbo ✨
              </p>
            </div>
          </MysticalCard>
        </div>
        
        <div className="text-center mt-12">
          <MysticalCard className="max-w-2xl mx-auto">
            <p className="font-ancient text-lg text-ancient-text leading-relaxed">
              <em>"Skupaj s Santiagom ustvarjamo varen prostor, kjer udeleženci čutijo ljubezen, 
              umirjenost in dvig zavesti. Sinergija človeških in živalskih energij omogoča 
              globoko preobrazbo iz 3D v 5D zavest."</em>
            </p>
          </MysticalCard>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;