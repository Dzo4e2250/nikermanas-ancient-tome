import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventCreated?: () => void;
}

const EventDialog = ({ open, onOpenChange, onEventCreated }: EventDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    start_time: "",
    end_time: "",
    location: "",
    price: "",
    max_participants: "20"
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `event-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('event-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = null;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { error } = await (supabase as any)
        .from('events')
        .insert([{
          title: formData.title,
          description: formData.description,
          event_date: formData.event_date,
          start_time: formData.start_time,
          end_time: formData.end_time,
          location: formData.location,
          price: formData.price ? parseFloat(formData.price) : null,
          max_participants: parseInt(formData.max_participants),
          image_url: imageUrl,
          is_active: true
        }]);

      if (error) throw error;

      toast.success("Dogodek je bil uspešno ustvarjen!");
      onOpenChange(false);
      onEventCreated?.();
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        event_date: "",
        start_time: "",
        end_time: "",
        location: "",
        price: "",
        max_participants: "20"
      });
      setImageFile(null);
      
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error("Napaka pri ustvarjanju dogodka");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-ancient text-xl">
            <Calendar className="w-5 h-5" />
            Ustvari nov dogodek
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Naslov dogodka *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Npr. Skupinska terapija za samozavest"
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Opis dogodka</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Opišite dogodek, kaj se bo dogajalo, za koga je namenjen..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="event_date">Datum dogodka *</Label>
              <Input
                id="event_date"
                type="date"
                value={formData.event_date}
                onChange={(e) => handleInputChange("event_date", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Lokacija</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Npr. Pesnica pri Mariboru"
              />
            </div>

            <div>
              <Label htmlFor="start_time">Začetek *</Label>
              <Input
                id="start_time"
                type="time"
                value={formData.start_time}
                onChange={(e) => handleInputChange("start_time", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="end_time">Konec *</Label>
              <Input
                id="end_time"
                type="time"
                value={formData.end_time}
                onChange={(e) => handleInputChange("end_time", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Cena (€)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="max_participants">Največ udeležencev</Label>
              <Input
                id="max_participants"
                type="number"
                min="1"
                value={formData.max_participants}
                onChange={(e) => handleInputChange("max_participants", e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="image">Slika dogodka</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {imageFile && (
                <p className="text-sm text-muted-foreground mt-1">
                  Izbrana slika: {imageFile.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Prekliči
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Ustvarjam..." : "Ustvari dogodek"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;