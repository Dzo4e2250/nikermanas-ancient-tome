import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import ServiceImageUpload from "./ServiceImageUpload";
import AncientTitle from "./AncientTitle";
import { ArrowLeft } from "lucide-react";

interface Service {
  id: string;
  name: string;
  image_url?: string;
}

const ServiceImageManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, name, image_url');
      
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleImageUploaded = (serviceId: string, imageUrl: string) => {
    setServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, image_url: imageUrl }
          : service
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <AncientTitle level={2}>
          Upravljanje slik storitev
        </AncientTitle>
        <Button 
          variant="outline" 
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Nazaj na nadzorno ploščo
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className="p-4 border rounded-lg">
            <ServiceImageUpload
              serviceId={service.id}
              serviceName={service.name}
              currentImageUrl={service.image_url}
              onImageUploaded={(imageUrl) => handleImageUploaded(service.id, imageUrl)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceImageManager;