import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AncientTitle from "./AncientTitle";
import MysticalCard from "./MysticalCard";
import { removeBackground, loadImageFromSrc } from "@/lib/backgroundRemoval";
import { toast } from "sonner";
import VranaOrnament from "@/components/VranaOrnament";

interface EnhancedBiographyDialogProps {
  person: "tanja" | "edo" | "santiago";
  avatar: string;
  name: string;
  children: React.ReactNode;
}

const EnhancedBiographyDialog = ({ person, avatar, name, children }: EnhancedBiographyDialogProps) => {
  const [processedAvatar, setProcessedAvatar] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveBackground = useCallback(async () => {
    setIsProcessing(true);
    try {
      toast.info("Odstranjujem ozadje... To lahko traja nekaj sekund.");
      
      // Load the image
      const imageElement = await loadImageFromSrc(avatar);
      
      // Remove background
      const processedBlob = await removeBackground(imageElement);
      
      // Create URL for the processed image
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedAvatar(processedUrl);
      
      toast.success("Ozadje uspešno odstranjeno!");
    } catch (error) {
      console.error("Error removing background:", error);
      toast.error("Napaka pri odstranjevanju ozadja. Poskusite znova.");
    } finally {
      setIsProcessing(false);
    }
  }, [avatar]);

  const getBiography = () => {
    if (person === "tanja") {
      return {
        title: "Tanja - Ženski Princip",
        subtitle: "Intuitivna vodnica srčne povezanosti",
        story: [
          "Tanja je nosilka globoke ženske energije, ki jo vodi intuicija in povezanost z naravnimi cikli. Njena pot se je začela z osebno preobrazbo, ko je prenehala barvati lase in se podala na pot sprejemanja svoje naravne sivine.",
          "\"SIVOLASKA – Moja pot\" je bila polna strahu in bolečine, a jo je naučila pristne samoljubezni. Ta izkušnja jo je globoko preobrazila in ji odprla pot do razumevanja ženskih arhetipov.",
          "Danes vodi delavnico 'ONA – ena ženska s tisočerimi obrazi', kjer pomaga ženskam raziskovati njihove različne vidike in prebujati notranjo moč. Njen pristop je mehak, fluidn kot voda, vendar globoko transformativen.",
          "Njene energijske terapije temeljijo na nežnem dotiku, ki vzpostavlja ravnovesje in odpravlja blokade. Prva terapija je vedno brezplačna, ker verjame, da mora vsak človek najprej začutiti energijo preobrazbe."
        ],
        specialties: [
          "Energijske terapije z nežnim dotikom",
          "Ženske delavnice in ženski arhetipi", 
          "Transformativne meditacije",
          "Individualno mentorstvo za ženske",
          "Pomoč pri travmah in čustvenih blokadah"
        ],
        philosophy: "\"Terapije ne zdravijo na silo, temveč odstranjujejo ovire, da človek sam aktivira svoj potencial. Vsaka ženska nosi v sebi tisoč obrazov - pomembno je, da jih spozna in sprejme vse.\""
      };
    } else if (person === "edo") {
      return {
        title: "Edo - Moški Princip", 
        subtitle: "Stabilni temelj notranje preobrazbe",
        story: [
          "Edo predstavlja stabilnost, moč in prizemljenost - temelj, ki omogoča varno raziskovanje notranjih svetov. Njegova energija je kot zemlja: zanesljiva, hranilna in močna.",
          "Pot mu je pokazala, kako pomembna je kombinacija moške stabilnosti z žensko intuicijo. Skupaj s Tanjo ustvarjata sinergijo, ki omogoča globoko preobrazbo udeležencev.",
          "Njegov pristop temelji na ustvarjanju varnega prostora, kjer se ljudje lahko odpirajo brez strahu. Njegova prisotnost pomirja in daje občutek varnosti potreben za resno transformacijsko delo.",
          "Posebej se posveča delu z možmi, ki iščejo stik s svojo avtentično močjo in čustvenostjo, ter parom, ki želijo okrepiti svojo energijsko povezanost."
        ],
        specialties: [
          "Delo z moško energijo in močjo",
          "Parno energijsko terapijo",
          "Stabilizirajoče meditacije",
          "Pomoč pri iskanju notranjih temeljev",
          "Vodenje skupinskih energijskih terapij"
        ],
        philosophy: "\"Prava moč se rojeva iz umirjenosti. Moja naloga je ustvariti prostor, kjer se ljudje počutijo dovolj varno, da se lahko srečajo s svojo najglobjo resnico.\""
      };
    } else {
      return {
        title: "Santiago - Srčni Varuh",
        subtitle: "Terapevt po naravi",
        story: [
          "Santiago ni samo pes. Je črno-bel francoski buldog s pogledom, ki gre globlje od oči. Ko te zagleda, skoči... zaropoče z energijo veselja, srce mu prekipeva.",
          "Ne zna se pretvarjati. Ne zna se zadržati. Vse, kar čuti – je tam. Takoj. Zate. Na individualnih terapijah s Tanjo je vedno prisoten, ne zato ker bi ga tja postavili, ampak ker preprosto noče biti sam doma.",
          "Sprva je bilo to 'naključno'. A kmalu je postalo jasno – to ni naključje. To je njegov klic. Nežni varuh prostora. Ko ni potrebe – spi. Ko je žalost – jo diha s tabo.",
          "Ko nekdo zdrsne globoko vase – se nežno premakne bližje. Kot bi vedel. In ve. Ni treniran. Ni naučen. A ve, kdaj božati, kdaj samo biti. Santiago je terapevt po naravi."
        ],
        specialties: [
          "Prisotnost na individualnih terapijah",
          "Nežno varovanje terapevtskega prostora",
          "Intuitivno čustveno podporo",
          "Naravno zdravilno energijo",
          "Varuh portala voda"
        ],
        philosophy: "\"Če si ranjen – bo tam. Če si zaprt – bo čakal. Ne sili, a odpira. Ne uči, a zdravi. Santiago je srčni varuh Nikrmane, Nikrmana z repkom.\""
      };
    }
  };

  const bio = getBiography();
  const currentAvatar = processedAvatar || avatar;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-ancient border-2 border-ornament">
        <DialogHeader>
          <DialogTitle className="sr-only">{bio.title}</DialogTitle>
        </DialogHeader>
        
        <div className="p-6">
          {/* Header with avatar */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <img 
                src={currentAvatar} 
                alt={name}
                className="w-48 h-48 mx-auto rounded-full mb-6 shadow-mystical object-cover border-4 border-ornament"
              />
              {!processedAvatar && (
                <Button
                  onClick={handleRemoveBackground}
                  disabled={isProcessing}
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary hover:bg-secondary text-primary-foreground text-xs px-3 py-1 rounded-full"
                >
                  {isProcessing ? "⏳ Obdelujem..." : "✨ Odstrani ozadje"}
                </Button>
              )}
            </div>
            <AncientTitle level={2} className="mb-2">
              {bio.title}
            </AncientTitle>
            <p className="font-ancient text-lg text-ornament italic">
              {bio.subtitle}
            </p>
          </div>

          {/* Biography Story */}
          <MysticalCard className="mb-8">
            <AncientTitle level={3} className="mb-6 text-left">
              Njena/Njegova Zgodba
            </AncientTitle>
            <div className="space-y-4">
              {bio.story.map((paragraph, index) => (
                <p key={index} className="font-ancient text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </MysticalCard>

          {/* Specialties */}
          <MysticalCard className="mb-8">
            <AncientTitle level={3} className="mb-6 text-left">
              Področja Delovanja
            </AncientTitle>
            <div className="grid md:grid-cols-2 gap-4">
              {bio.specialties.map((specialty, index) => (
                <div key={index} className="flex items-center">
                  <VranaOrnament className="h-4 mr-3 shrink-0" />
                  <span className="font-ancient text-muted-foreground">{specialty}</span>
                </div>
              ))}
            </div>
          </MysticalCard>

          {/* Philosophy */}
          <MysticalCard>
            <AncientTitle level={3} className="mb-6 text-left">
              Filozofija
            </AncientTitle>
            <p className="font-ancient text-ancient-text leading-relaxed italic text-lg">
              {bio.philosophy}
            </p>
          </MysticalCard>

          {/* Contact CTA */}
          <div className="text-center mt-8 pt-8 border-t border-ornament/30">
            <a 
              href="tel:051358273"
              className="inline-flex items-center font-ancient bg-primary text-primary-foreground px-6 py-3 rounded shadow-mystical hover:bg-secondary transition-all duration-300 border border-ornament"
            >
              <span className="mr-2">📞</span>
              Pogovor z {name}
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedBiographyDialog;