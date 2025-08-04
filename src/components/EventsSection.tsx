import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import MysticalCard from "./MysticalCard";
import AncientTitle from "./AncientTitle";
import OrnamentalDivider from "./OrnamentalDivider";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { sl } from "date-fns/locale";

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

const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
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
          <div className="text-center">Nalagam dogodke...</div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <AncientTitle level={2}>Prihajajoči dogodki</AncientTitle>
          <OrnamentalDivider />
          <p className="text-muted-foreground font-ancient max-w-2xl mx-auto">
            Pridružite se našim skupinskim delavnicam in dogodkom za osebnostno rast
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <MysticalCard key={event.id} className="group overflow-hidden">
              {event.image_url && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(event.event_date)}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      {formatTime(event.start_time)} - {formatTime(event.end_time)}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="font-ancient text-xl mb-3 text-ancient-text group-hover:text-mystical-glow transition-colors">
                  {event.title}
                </h3>
                
                {event.description && (
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {event.description}
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  {event.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    Do {event.max_participants} udeležencev
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-ornament/20">
                  {event.price > 0 ? (
                    <span className="font-ancient text-lg text-ancient-text">
                      {event.price}€
                    </span>
                  ) : (
                    <span className="font-ancient text-lg text-mystical-glow">
                      Brezplačno
                    </span>
                  )}
                  
                  <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors duration-300">
                    Rezerviraj
                  </button>
                </div>
              </div>
            </MysticalCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;