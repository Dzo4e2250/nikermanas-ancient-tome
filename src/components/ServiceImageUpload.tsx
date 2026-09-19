import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ServiceImageUploadProps {
  serviceId: string;
  serviceName: string;
  currentImageUrl?: string;
  onImageUploaded: (imageUrl: string) => void;
}

const ServiceImageUpload = ({ 
  serviceId, 
  serviceName, 
  currentImageUrl, 
  onImageUploaded 
}: ServiceImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${serviceId}-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('service-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: publicUrl } = supabase.storage
        .from('service-images')
        .getPublicUrl(fileName);

      // Update service with new image URL
      const { error: updateError } = await supabase
        .from('services')
        .update({ image_url: publicUrl.publicUrl })
        .eq('id', serviceId);

      if (updateError) throw updateError;

      onImageUploaded(publicUrl.publicUrl);
      toast.success('Slika je bila uspešno naložena');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Napaka pri nalaganju slike');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">{serviceName}</div>
      
      {currentImageUrl && (
        <div className="w-32 h-32 border rounded-lg overflow-hidden">
          <img 
            src={currentImageUrl} 
            alt={serviceName}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="flex gap-2">
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
        />
        
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          variant="outline"
        >
          {uploading ? 'Nalagam...' : 'Naloži sliko'}
        </Button>
      </div>
    </div>
  );
};

export default ServiceImageUpload;