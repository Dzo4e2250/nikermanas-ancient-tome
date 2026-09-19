import { cn } from "@/lib/utils";

interface VranaOrnamentProps {
  className?: string;
  // Zrcaljena vrana gleda v levo (npr. v desnem kotu, da gleda proti sredini)
  zrcaljeno?: boolean;
}

// Okrasna vrana iz logotipa Nikrmana — nadomešča okrasni znak ❦.
const VranaOrnament = ({ className, zrcaljeno }: VranaOrnamentProps) => (
  <img
    src="/images/vrana-mala.png"
    alt=""
    aria-hidden
    className={cn("inline-block h-6 w-auto select-none", zrcaljeno && "-scale-x-100", className)}
  />
);

export default VranaOrnament;
