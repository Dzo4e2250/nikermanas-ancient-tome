import { useState } from "react";
import AncientTitle from "./AncientTitle";
import MysticalCard from "./MysticalCard";
import OrnamentalDivider from "./OrnamentalDivider";
import BookingDialog from "./BookingDialog";

const ProcessSection = () => {
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  // Define free consultation service
  const freeConsultationService = {
    id: "free-consultation",
    name: "Brezplačen posvet",
    description: "30-minutni uvodni pogovor za spoznavanje vaših potreb",
    duration_minutes: 30,
    price: 0,
    type: "brezplacna_ocena"
  };
  const steps = [
    {
      number: "I",
      title: "Prvi Stik",
      description: "Brezplačna prva energoterapija za spoznavanje z metodo. Čutite energijo in moč preobrazbe.",
      action: "Rezerviraj brezplačno"
    },
    {
      number: "II", 
      title: "Osebni Načrt",
      description: "Skupaj ustvarimo individualen pristop glede na vaše potrebe - individualne ali skupinske terapije.",
      action: "Pogovor s Tanjo, Edom & Santiagom"
    },
    {
      number: "III",
      title: "Redni Procesi",
      description: "Udeležba na rednih meditacijah, delavnicah in srečanjih za kontinuirno rast zavesti.",
      action: "Pridruži se skupnosti"
    },
    {
      number: "IV",
      title: "Preobrazba",
      description: "Utelešanje najvišjega potenciala skozi sinergijo ženskega, moškega principa in živalske modrosti.",
      action: "Živi svojo resnico"
    }
  ];

  return (
    <section className="py-16 bg-gradient-mystical" id="proces">
      <div className="max-w-6xl mx-auto px-6">
        <AncientTitle level={2} className="mb-8">
          Kako Začeti Pot Preobrazbe
        </AncientTitle>
        
        <p className="font-ancient text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          V štirih korakih se odprite za globoko notranjo preobrazbo. 
          Vsak korak vas vodi bližje k vaši avtentični naravi.
        </p>

        <OrnamentalDivider />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step, index) => (
            <MysticalCard key={index} className="h-full text-center">
              <div className="text-4xl font-gothic text-ornament mb-4">
                {step.number}
              </div>
              <AncientTitle level={3} className="mb-4 text-base">
                {step.title}
              </AncientTitle>
              <p className="font-ancient text-muted-foreground leading-relaxed mb-6">
                {step.description}
              </p>
              <div className="border-t border-ornament/30 pt-4">
                <span className="font-ancient text-sm text-ornament italic">
                  {step.action}
                </span>
              </div>
            </MysticalCard>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={() => setBookingDialogOpen(true)}
            className="inline-flex items-center font-ancient bg-primary text-primary-foreground px-8 py-4 rounded shadow-mystical hover:bg-secondary transition-all duration-300 border-2 border-ornament"
          >
            <span className="mr-2">📞</span>
            Začni z Brezplačno Terapijo
          </button>
        </div>
      </div>

      <BookingDialog 
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        selectedService={freeConsultationService}
      />
    </section>
  );
};

export default ProcessSection;