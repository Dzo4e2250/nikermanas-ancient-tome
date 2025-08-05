import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import MysticalCard from "./MysticalCard";
import AncientTitle from "./AncientTitle";
import OrnamentalDivider from "./OrnamentalDivider";
import BookingDialog from "./BookingDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { sl } from "date-fns/locale";

// Import generirane karikaturne slike
import individualnaCartoon from "@/assets/individualna-terapija-cartoon.png";
import paraterapijaCartoon from "/lovable-uploads/a17a69f7-5e9f-43e2-93cf-dc640f3d8db6.png";
import skupinskaCartoon from "@/assets/skupinska-terapija-cartoon.jpg";
import brezplacnaCartoon from "@/assets/brezplacna-ocena-cartoon.jpg";

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  price: number;
  max_participants: number;
  image_url: string;
  is_active: boolean;
}

interface Service {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  type: string;
  image_url?: string;
}

const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [eventsDialogOpen, setEventsDialogOpen] = useState(false);

  useEffect(() => {
    loadEvents();
    fetchServices();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('events')
        .select('*')
        .eq('is_active', true)
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('event_date', { ascending: true })
        .limit(6);

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

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
    setEventsDialogOpen(true);
  };

  const getServiceImage = (service: Service) => {
    if (service.image_url) {
      return service.image_url;
    }
    
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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd. MMMM yyyy', { locale: sl });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':');
      return `${hours}:${minutes}`;
    } catch {
      return timeString;
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background/50 to-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">Nalagam...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <AncientTitle level={2}>Skupinska terapija</AncientTitle>
          <OrnamentalDivider />
          <p className="text-muted-foreground font-ancient max-w-2xl mx-auto">
            Pridružite se našim skupinskim delavnicam in dogodkom za osebnostno rast
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <MysticalCard key={service.id} className="h-full flex flex-col">
              <div className="mb-4 overflow-hidden rounded-lg mystical-frame">
                <img 
                  src={getServiceImage(service)}
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
                <button 
                  onClick={() => handleServiceClick(service)}
                  className="w-full px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors duration-300 font-ancient"
                >
                  Rezerviraj termin
                </button>
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

      {/* Dialog za prikaz dogodkov */}
      <Dialog open={eventsDialogOpen} onOpenChange={setEventsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-ancient text-xl">
              Prihajajoči dogodki - {selectedService?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-6">
            {events.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-ancient text-muted-foreground">
                  Trenutno ni prihajajojih dogodkov.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <MysticalCard key={event.id} className="group overflow-hidden">
                    {event.image_url && (
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2 text-white text-xs">
                          <div className="flex items-center gap-1 mb-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(event.event_date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(event.start_time)} - {formatTime(event.end_time)}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4">
                      <h3 className="font-ancient text-lg mb-2 text-ancient-text group-hover:text-mystical-glow transition-colors">
                        {event.title}
                      </h3>
                      
                      {event.description && (
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      <div className="space-y-1 mb-3 text-xs">
                        {event.location && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-3 h-3" />
                          Do {event.max_participants} udeležencev
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-ornament/20">
                        {event.price > 0 ? (
                          <span className="font-ancient text-sm text-ancient-text">
                            {event.price}€
                          </span>
                        ) : (
                          <span className="font-ancient text-sm text-mystical-glow">
                            Brezplačno
                          </span>
                        )}
                        
                        <button 
                          onClick={() => {
                            setEventsDialogOpen(false);
                            setBookingDialogOpen(true);
                          }}
                          className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors duration-300 text-sm"
                        >
                          Rezerviraj
                        </button>
                      </div>
                    </div>
                  </MysticalCard>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <BookingDialog 
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        selectedService={selectedService}
      />
    </section>
  );
};

export default EventsSection;