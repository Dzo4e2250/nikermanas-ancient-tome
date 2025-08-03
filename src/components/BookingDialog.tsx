import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AncientTitle from "./AncientTitle";

interface Service {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
}

interface Question {
  id: string;
  question_text: string;
  question_type: string;
  options: string[] | null;
  step_number: number;
}

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService?: Service;
}

const BookingDialog = ({ open, onOpenChange, selectedService }: BookingDialogProps) => {
  const [step, setStep] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [availableTimes] = useState([
    "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
  ]);
  const { toast } = useToast();

  useEffect(() => {
    if (open && step === 1) {
      fetchQuestions();
    }
  }, [open, step]);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('sales_funnel_questions')
        .select('*')
        .order('step_number');
      
      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast({
        title: "Napaka",
        description: "Napaka pri nalaganju vprašanj.",
        variant: "destructive"
      });
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      toast({
        title: "Napaka",
        description: "Prosimo izberite datum in uro.",
        variant: "destructive"
      });
      return;
    }

    try {
      const bookingDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      bookingDateTime.setHours(parseInt(hours), parseInt(minutes));

      const { error } = await (supabase as any)
        .from('bookings')
        .insert({
          service_id: selectedService.id,
          client_name: contactInfo.name,
          client_email: contactInfo.email,
          client_phone: contactInfo.phone,
          booking_datetime: bookingDateTime.toISOString(),
          status: 'pending',
          questionnaire_answers: answers,
          notes: contactInfo.message
        });

      if (error) throw error;

      toast({
        title: "Rezervacija uspešna!",
        description: `Vaša rezervacija za ${format(bookingDateTime, 'dd.MM.yyyy ob HH:mm')} je bila poslana. Kontaktirali vas bomo za potrditev.`
      });

      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Napaka",
        description: "Napaka pri ustvarjanju rezervacije. Poskusite znova.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setStep(1);
    setAnswers({});
    setSelectedDate(undefined);
    setSelectedTime("");
    setContactInfo({ name: "", email: "", phone: "", message: "" });
  };

  const renderQuestionnaire = () => (
    <div className="space-y-6">
      <AncientTitle level={3} className="text-center mb-6">
        Vprašalnik za boljše razumevanje vaših potreb
      </AncientTitle>
      
      {questions.map((question) => (
        <div key={question.id} className="space-y-3">
          <Label className="text-base font-gothic">{question.question_text}</Label>
          
          {question.question_type === 'multiple_choice' && question.options ? (
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                  <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <Textarea
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="Vaš odgovor..."
              className="min-h-[80px]"
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-6">
      <AncientTitle level={3} className="text-center mb-6">
        Izberite datum in uro
      </AncientTitle>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label className="text-base font-gothic mb-3 block">Datum</Label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border border-ornament"
            disabled={(date) => date < new Date() || date.getDay() === 0}
          />
        </div>
        
        <div>
          <Label className="text-base font-gothic mb-3 block">Ura</Label>
          <div className="grid grid-cols-2 gap-2">
            {availableTimes.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTime(time)}
                disabled={!selectedDate}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactForm = () => (
    <div className="space-y-4">
      <AncientTitle level={3} className="text-center mb-6">
        Kontaktni podatki
      </AncientTitle>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Ime in priimek *</Label>
          <Input
            id="name"
            value={contactInfo.name}
            onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">E-pošta *</Label>
          <Input
            id="email"
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="phone">Telefon</Label>
        <Input
          id="phone"
          value={contactInfo.phone}
          onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
        />
      </div>
      
      <div>
        <Label htmlFor="message">Dodatna sporočila</Label>
        <Textarea
          id="message"
          value={contactInfo.message}
          onChange={(e) => setContactInfo(prev => ({ ...prev, message: e.target.value }))}
          placeholder="Povejte nam več o svojih pričakovanjih..."
        />
      </div>
    </div>
  );

  const canProceed = () => {
    if (step === 1) {
      return questions.length === 0 || questions.every(q => answers[q.id]);
    }
    if (step === 2) {
      return selectedDate && selectedTime;
    }
    if (step === 3) {
      return contactInfo.name && contactInfo.email;
    }
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-gothic text-2xl text-center">
            {selectedService?.name}
          </DialogTitle>
          <DialogDescription className="text-center">
            {selectedService?.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress indicators */}
          <div className="flex justify-center space-x-4 mb-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step >= num 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {num}
              </div>
            ))}
          </div>

          {/* Step content */}
          {step === 1 && renderQuestionnaire()}
          {step === 2 && renderCalendar()}
          {step === 3 && renderContactForm()}

          {/* Navigation buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => step > 1 ? setStep(step - 1) : onOpenChange(false)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {step === 1 ? "Prekliči" : "Nazaj"}
            </Button>

            <Button
              onClick={() => {
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  handleSubmitBooking();
                }
              }}
              disabled={!canProceed()}
            >
              {step === 3 ? "Pošlji rezervacijo" : "Naprej"}
              {step < 3 && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;