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

  // Funkcija za pridobitev skičnih placeholder slik glede na tip storitve
  const getServicePlaceholder = (serviceType: string, serviceName: string) => {
    const baseUrl = 'https://via.placeholder.com/600x200/f5f5dc/8b4513?text=';
    
    switch (serviceType) {
      case 'individual':
        return serviceName.includes('Paraterapija') 
          ? `${baseUrl}🌿+Paraterapija+Skica` // Narava/ozdravljanje
          : `${baseUrl}👤+Individualna+Skica`; // Oseba
      case 'group':
        return `${baseUrl}👥+Skupinska+Skica`; // Skupina ljudi
      case 'assessment':
        return `${baseUrl}📊+Analiza+Skica`; // Analiza/vprašalnik
      default:
        return `${baseUrl}❓+Storitev+Skica`;
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
              {/* Placeholder skica - pozneje zamenjaj s pravo sliko */}
              <div className="mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-parchment to-accent/10 border-2 border-dashed border-ornament/30">
                <div className="w-full h-48 flex items-center justify-center relative">
                  {/* Skica ozadje */}
                  <div className="absolute inset-0 opacity-5">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <pattern id="sketch-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
                          <path d="M0,5 Q5,0 10,5 Q5,10 0,5" stroke="#8b4513" strokeWidth="0.5" fill="none" opacity="0.3"/>
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#sketch-pattern)"/>
                    </svg>
                  </div>
                  
                  {/* Ikone glede na tip storitve */}
                  <div className="text-6xl text-ornament/40 z-10">
                    {service.type === 'individual' && service.name.includes('Paraterapija') && '🌿'}
                    {service.type === 'individual' && !service.name.includes('Paraterapija') && '👤'}
                    {service.type === 'group' && '👥'}
                    {service.type === 'assessment' && '📊'}
                  </div>
                  
                  {/* Skica okvir */}
                  <div className="absolute inset-2 border border-ornament/20 rounded-lg"></div>
                  
                  {/* "Skica" oznaka */}
                  <div className="absolute top-2 right-2 bg-ornament/10 px-2 py-1 rounded text-xs font-gothic text-ornament/60">
                    SKICA
                  </div>
                </div>
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