import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ArrowLeft, ArrowRight, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AncientTitle from "./AncientTitle";
import MysticalCard from "./MysticalCard";

interface MysticalCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface MysticalCardClickable extends MysticalCardProps {
  onClick: () => void;
}

const MysticalCardClickable = ({ children, className, onClick }: MysticalCardClickable) => {
  return (
    <div 
      className={cn(
        "relative border-2 border-ornament bg-gradient-ancient shadow-mystical cursor-pointer transition-all",
        "before:absolute before:inset-2 before:border before:border-ornament/30 before:pointer-events-none",
        "after:absolute after:inset-1 after:border after:border-ornament/20 after:pointer-events-none",
        "hover:shadow-lg",
        className
      )}
      onClick={onClick}
    >
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
};

interface Service {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  type: string;
}

interface Question {
  id: string;
  question_text: string;
  question_type: string;
  options: string[] | null;
  order_index: number;
}

interface UpcomingEvent {
  id: string;
  therapist_name: string;
  date: string;
  start_time: string;
  end_time: string;
  max_bookings: number;
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
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent>();
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
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
    if (open && step === 2 && selectedService?.type === 'group') {
      fetchUpcomingEvents();
    }
  }, [open, step, selectedService]);

  const fetchQuestions = async () => {
    if (!selectedService) return;
    
    try {
      const { data, error } = await (supabase as any)
        .from('sales_funnel_questions')
        .select('*')
        .eq('service_id', selectedService.id)
        .order('order_index');
      
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

  const fetchUpcomingEvents = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('therapist_availability')
        .select('*')
        .eq('service_type', 'group')
        .eq('is_available', true)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      setUpcomingEvents(data || []);
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      toast({
        title: "Napaka",
        description: "Napaka pri nalaganju dogodkov.",
        variant: "destructive"
      });
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitBooking = async () => {
    if (!selectedService) {
      toast({
        title: "Napaka",
        description: "Izbrana storitev ni veljavna.",
        variant: "destructive"
      });
      return;
    }

    // Za skupinske dogodke preveri izbrani dogodek
    if (selectedService.type === 'group' && !selectedEvent) {
      toast({
        title: "Napaka",
        description: "Prosimo izberite dogodek.",
        variant: "destructive"
      });
      return;
    }

    // Za individualne storitve preveri datum in čas
    if (selectedService.type === 'individual' && (!selectedDate || !selectedTime)) {
      toast({
        title: "Napaka",
        description: "Prosimo izberite datum in uro.",
        variant: "destructive"
      });
      return;
    }

    try {
      const bookingData: any = {
        service_id: selectedService.id,
        client_name: contactInfo.name,
        client_email: contactInfo.email,
        client_phone: contactInfo.phone,
        status: 'pending',
        sales_funnel_data: answers,
        notes: contactInfo.message
      };

      if (selectedService.type === 'group' && selectedEvent) {
        bookingData.availability_id = selectedEvent.id;
        bookingData.booking_date = selectedEvent.date;
        bookingData.booking_time = selectedEvent.start_time;
        bookingData.therapist_name = selectedEvent.therapist_name;
      } else if (selectedService.type === 'individual' && selectedDate && selectedTime) {
        bookingData.booking_date = selectedDate.toISOString().split('T')[0];
        bookingData.booking_time = selectedTime;
        bookingData.therapist_name = 'tanja'; // Default za individualne
        // Dodaj dummy availability_id za individualne
        bookingData.availability_id = '00000000-0000-0000-0000-000000000000';
      }

      const { error } = await (supabase as any)
        .from('bookings')
        .insert(bookingData);

      if (error) throw error;

      let successMessage = '';
      if (selectedService.type === 'group' && selectedEvent) {
        const eventDate = new Date(selectedEvent.date + 'T' + selectedEvent.start_time);
        successMessage = `Vaša prijava za skupinski dogodek ${format(eventDate, 'dd.MM.yyyy ob HH:mm')} je bila poslana.`;
      } else if (selectedDate) {
        const bookingDateTime = new Date(selectedDate);
        bookingDateTime.setHours(parseInt(selectedTime.split(':')[0]), parseInt(selectedTime.split(':')[1]));
        successMessage = `Vaša rezervacija za ${format(bookingDateTime, 'dd.MM.yyyy ob HH:mm')} je bila poslana.`;
      }

      toast({
        title: "Rezervacija uspešna!",
        description: successMessage + " Kontaktirali vas bomo za potrditev."
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
    setSelectedEvent(undefined);
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
          ) : question.question_type === 'boolean' ? (
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="da" id={`${question.id}-yes`} />
                <Label htmlFor={`${question.id}-yes`}>Da</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ne" id={`${question.id}-no`} />
                <Label htmlFor={`${question.id}-no`}>Ne</Label>
              </div>
            </RadioGroup>
          ) : question.question_type === 'scale' ? (
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <div key={num} className="flex items-center space-x-1">
                    <RadioGroupItem value={num.toString()} id={`${question.id}-${num}`} />
                    <Label htmlFor={`${question.id}-${num}`}>{num}</Label>
                  </div>
                ))}
              </div>
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

  const renderUpcomingEvents = () => (
    <div className="space-y-6">
      <AncientTitle level={3} className="text-center mb-6">
        Prihajajoči skupinski dogodki
      </AncientTitle>
      
      <div className="grid gap-4 max-h-96 overflow-y-auto">
        {upcomingEvents.map((event) => {
          const eventDate = new Date(event.date + 'T' + event.start_time);
          const isSelected = selectedEvent?.id === event.id;
          
          return (
            <MysticalCardClickable
              key={event.id} 
              className={cn(
                "transition-all duration-200 hover:shadow-lg",
                isSelected ? "ring-2 ring-primary bg-primary/5" : ""
              )}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    <span className="font-gothic font-medium">
                      {format(eventDate, 'EEEE, dd. MMMM yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-ancient">
                      {event.start_time} - {event.end_time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="font-ancient capitalize">
                      {event.therapist_name}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    Prosta mesta: {event.max_bookings}
                  </div>
                  <div className="text-sm font-medium text-primary">
                    35€
                  </div>
                </div>
              </div>
            </MysticalCardClickable>
          );
        })}
      </div>
      
      {upcomingEvents.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Trenutno ni prihajajočih skupinskih dogodkov.</p>
          <p className="text-sm mt-2">Kontaktirajte nas za več informacij.</p>
        </div>
      )}
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
      if (selectedService?.type === 'group') {
        return !!selectedEvent;
      } else {
        return selectedDate && selectedTime;
      }
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
          {step === 2 && selectedService?.type === 'group' && renderUpcomingEvents()}
          {step === 2 && selectedService?.type === 'individual' && renderCalendar()}
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