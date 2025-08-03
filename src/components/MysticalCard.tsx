import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MysticalCardProps {
  children: React.ReactNode;
  className?: string;
}

const MysticalCard = ({ children, className }: MysticalCardProps) => {
  return (
    <Card className={cn(
      "relative border-2 border-ornament bg-gradient-ancient shadow-mystical",
      "before:absolute before:inset-2 before:border before:border-ornament/30 before:pointer-events-none",
      "after:absolute after:inset-1 after:border after:border-ornament/20 after:pointer-events-none",
      className
    )}>
      <div className="relative z-10 p-6">
        {children}
      </div>
    </Card>
  );
};

export default MysticalCard;