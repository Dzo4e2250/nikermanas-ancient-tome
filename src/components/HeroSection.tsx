import { useState } from "react";
import AncientTitle from "./AncientTitle";
import OrnamentalDivider from "./OrnamentalDivider";
import BookingDialog from "./BookingDialog";
import { Button } from "./ui/button";

const HeroSection = () => {
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
            className="w-auto h-48 md:h-64 mx-auto mb-3"
          />
          
          <OrnamentalDivider />
          
          <p className="font-ancient text-lg md:text-xl text-ancient-text leading-relaxed max-w-2xl mx-auto mb-4">
            <em>Zavod za dvig zavesti</em>
          </p>
          
          <div className="font-ancient text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            <p className="mb-2">
              Energoterapije • Meditacije • Srečanja
            </p>
            <p className="italic">
              "Naravna pot, ki nežno a globoko preobraža in ponovno vzpostavlja 
              naravno ravnovesje telesa, čustev in duha"
            </p>
          </div>
          
          <div className="mt-8">
            <Button 
              onClick={() => setBookingDialogOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-ancient text-lg px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Rezerviraj brezplačen posvet
            </Button>
          </div>
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

export default HeroSection;