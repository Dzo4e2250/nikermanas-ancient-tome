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
  type: string;
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

  // Funkcija za pridobitev simbolične slike glede na tip storitve
  const getServiceImage = (serviceType: string, serviceName: string) => {
    switch (serviceType) {
      case 'individual':
        return serviceName.includes('Paraterapija') 
          ? 'photo-1472396961693-142e6e269027' // Deer in nature - za travmo/ozdravljanje
          : 'photo-1721322800607-8c38375eef04'; // Living room - za individualno terapijo
      case 'group':
        return 'photo-1517022812141-23620dba5c23'; // Herd of sheep - za skupinsko terapijo
      case 'assessment':
        return 'photo-1581090464777-f3220bbe1b8b'; // Light bulb - za analizo/vpogled
      default:
        return 'photo-1472396961693-142e6e269027';
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
              {/* Simbolična slika */}
              <div className="mb-4 overflow-hidden rounded-lg">
                <img 
                  src={`https://images.unsplash.com/${getServiceImage(service.type, service.name)}?auto=format&fit=crop&w=600&h=200&q=80`}
                  alt={service.name}
                  className="w-full h-48 object-cover"
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