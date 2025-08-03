import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import AncientTitle from "./AncientTitle";
import MysticalCard from "./MysticalCard";
import OrnamentalDivider from "./OrnamentalDivider";
import BookingDialog from "./BookingDialog";

interface Service {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
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

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setBookingDialogOpen(true);
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
            <MysticalCard key={service.id} className="h-full">
              <AncientTitle level={3} className="mb-4 text-left">
                {service.name}
              </AncientTitle>
              <p className="font-ancient text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="space-y-3 mt-4">
                <div className="bg-accent/20 p-3 rounded-lg border border-ornament/30">
                  <p className="text-sm font-gothic text-accent-foreground">
                    <span className="font-medium">Trajanje:</span> {service.duration_minutes} min
                  </p>
                  <p className="text-sm font-gothic text-accent-foreground">
                    <span className="font-medium">Cena:</span> {service.price}€
                  </p>
                </div>
                <Button 
                  onClick={() => handleServiceClick(service)}
                  className="w-full"
                  size="lg"
                >
                  Rezerviraj termin
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