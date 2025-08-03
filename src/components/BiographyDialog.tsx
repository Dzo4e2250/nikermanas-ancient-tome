import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AncientTitle from "./AncientTitle";
import MysticalCard from "./MysticalCard";
import tanjaAvatar from "@/assets/tanja-avatar.jpg";

interface BiographyDialogProps {
  person: "tanja" | "edo";
  avatar: string;
  name: string;
  children: React.ReactNode;
}

const BiographyDialog = ({ person, avatar, name, children }: BiographyDialogProps) => {
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
    } else {
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
    }
  };

  const bio = getBiography();

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
            <img 
              src={avatar} 
              alt={name}
              className="w-48 h-48 mx-auto rounded-full mb-6 shadow-mystical object-cover border-4 border-ornament"
            />
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
                  <span className="text-ornament mr-3">❦</span>
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

export default BiographyDialog;