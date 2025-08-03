import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import AncientTitle from "./AncientTitle";
import MysticalCard from "./MysticalCard";
import OrnamentalDivider from "./OrnamentalDivider";
import BookingDialog from "./BookingDialog";

// Import generirane karikaturne slike
import individualnaCartoon from "@/assets/individualna-terapija-cartoon.png";
import paraterapijaCartoon from "/lovable-uploads/a17a69f7-5e9f-43e2-93cf-dc640f3d8db6.png";
import skupinskaCartoon from "@/assets/skupinska-terapija-cartoon.jpg";
import brezplacnaCartoon from "@/assets/brezplacna-ocena-cartoon.jpg";

interface Service {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  type: string;
  image_url?: string;
}

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('services')
        .select('*');
      
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Osvežimo podatke vsakih 5 sekund
  useEffect(() => {
    const interval = setInterval(fetchServices, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setBookingDialogOpen(true);
  };

  // Funkcija za pridobitev slike storitve
  const getServiceImage = (service: Service) => {
    console.log('Service:', service);
    
    // Če ima storitev naloženo sliko, uporabi to
    if (service.image_url) {
      return service.image_url;
    }
    
    // Sicer uporabi generirane karikaturne slike
    switch (service.type) {
      case 'individual':
        return service.name.includes('Paraterapija') 
          ? paraterapijaCartoon
          : individualnaCartoon;
      case 'group':
        return skupinskaCartoon;
      case 'assessment':
        return brezplacnaCartoon;
      default:
        return individualnaCartoon;
    }
  };

  return (
    <section className="py-16 bg-parchment">
      <div className="max-w-6xl mx-auto px-6">
        <AncientTitle level={2} className="mb-12">
          Storitve & Preobrazbe
        </AncientTitle>
        
        <OrnamentalDivider />
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {services.map((service) => (
            <MysticalCard key={service.id} className="h-full flex flex-col">
              {/* Generirana karikaturna slika */}
              <div className="mb-4 overflow-hidden rounded-lg mystical-frame">
                <img 
                  src={getServiceImage(service)}
                  alt={service.name}
                  className="w-full h-48 object-contain"
                />
              </div>
              
              <AncientTitle level={3} className="mb-4 text-left">
                {service.name}
              </AncientTitle>
              
              <p className="font-ancient text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>
              
              <div className="mt-auto">
                <Button 
                  onClick={() => handleServiceClick(service)}
                  className="w-full"
                  size="lg"
                  variant={service.price === 0 ? "default" : "outline"}
                >
                  {service.type === 'assessment' ? 'Začni oceno' : 'Rezerviraj termin'}
                </Button>
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

      <BookingDialog 
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        selectedService={selectedService}
      />
    </section>
  );
};

export default ServicesSection;