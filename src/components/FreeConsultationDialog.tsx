import { useState, useEffect } from "react";
import { format } from "date-fns";
import { sl } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FreeConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FreeConsultationDialog = ({ open, onOpenChange }: FreeConsultationDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Available time slots
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const handleSubmitBooking = async () => {
    if (!selectedDate || !selectedTime || !contactInfo.name || !contactInfo.phone) {
      toast({
        title: "Napaka",
        description: "Prosimo izpolnite vsa obvezna polja",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create booking record
      const { error } = await supabase
        .from('bookings')
        .insert({
          service_id: 'free-consultation',
          booking_date: selectedDate.toISOString().split('T')[0],
          booking_time: selectedTime,
          client_name: contactInfo.name,
          client_email: contactInfo.email || '',
          client_phone: contactInfo.phone,
          notes: contactInfo.message,
          status: 'pending',
          therapist_name: 'Tanja',
          availability_id: 'free-consultation'
        });

      if (error) throw error;

      toast({
        title: "Rezervacija uspešna!",
        description: "Kmalu vas bomo kontaktirali za potrditev termina.",
      });

      // Reset form and close dialog
      setSelectedDate(undefined);
      setSelectedTime("");
      setContactInfo({ name: "", email: "", phone: "", message: "" });
      onOpenChange(false);

    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Napaka pri rezervaciji",
        description: "Prosimo poskusite znova ali nas pokličite na 051 358 273",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = selectedDate && selectedTime && contactInfo.name && contactInfo.phone;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-ancient text-2xl text-center text-primary">
            Brezplačen posvet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div className="text-center space-y-4 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
            <h3 className="font-ancient text-lg text-primary">Starodavni Ritual Pregleda Duše</h3>
            <div className="space-y-3 text-sm text-muted-foreground font-ancient italic">
              <p><strong>Trenutna Pregledna Terapija</strong> - brez dolgotrajnih pogovorov, neposredno v srce stvari</p>
              <p><strong>Vse kar potrebujete je Odprtost</strong> - prepustite se starinski modrosti energij</p>
              <p><strong>Popolna Predanost Procesu</strong> - dovolite, da vas vodimo skozi skrivnosti vaše notranjosti</p>
              <p><strong>Po Terapiji Kratek Pogovor</strong> - razjasnimo, kar se je v vas prebudilo</p>
              <p><strong>Darilo Naših Pradedov</strong> - brezplačno, kot so nekoč delili modrosti</p>
              <p className="text-primary font-semibold mt-4">Po izbiri termina boste prejeli Google Meet link za potrditev terapije</p>
            </div>
          </div>

          {/* Date and Time Selection Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label className="font-ancient">Izberite datum</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                className="pointer-events-auto rounded-md border"
              />
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label className="font-ancient">Izberite uro</Label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="font-ancient h-10"
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-ancient">Ime in priimek *</Label>
              <Input
                id="name"
                value={contactInfo.name}
                onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Vaše ime in priimek"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-ancient">Telefon *</Label>
              <Input
                id="phone"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Vaša telefonska številka"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-ancient">Email</Label>
              <Input
                id="email"
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Vaš email naslov (opcijsko)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-ancient">Sporočilo</Label>
              <Textarea
                id="message"
                value={contactInfo.message}
                onChange={(e) => setContactInfo(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Kaj vas posebej zanima ali s čim se soočate? (opcijsko)"
                rows={3}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmitBooking}
            disabled={!isFormValid || isSubmitting}
            className="w-full font-ancient py-3"
          >
            {isSubmitting ? "Pošiljam..." : "Rezerviraj brezplačen posvet"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Obvezna polja. Kontaktirali vas bomo za potrditev termina.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FreeConsultationDialog;