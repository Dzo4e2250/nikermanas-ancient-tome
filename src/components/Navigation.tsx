import { useState } from "react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#domov", label: "Domov" },
    { href: "#storitve", label: "Energoterapije" },
    { href: "#o-nas", label: "O Tanji & Edu" },
    { href: "#pricevanja", label: "Zgodbe preobrazbe" },
    { href: "#proces", label: "Kako začeti" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-ornament/20 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="font-gothic text-2xl text-ancient-text">
            <span className="text-ornament">❦</span> NIKERMANA
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-ancient text-muted-foreground hover:text-ancient-text transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ornament transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="tel:051358273"
              className="font-ancient bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-secondary transition-colors duration-300 border border-ornament"
            >
              Rezerviraj
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-ancient-text"
          >
            <div className="w-6 h-6 flex flex-col justify-center">
              <div className={cn("w-full h-0.5 bg-current transition-all", isOpen && "rotate-45 translate-y-1")}></div>
              <div className={cn("w-full h-0.5 bg-current mt-1 transition-all", isOpen && "opacity-0")}></div>
              <div className={cn("w-full h-0.5 bg-current mt-1 transition-all", isOpen && "-rotate-45 -translate-y-1")}></div>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-ornament/20 pb-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block font-ancient text-muted-foreground hover:text-ancient-text py-2 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="tel:051358273"
              className="inline-block font-ancient bg-primary text-primary-foreground px-4 py-2 rounded mt-2 border border-ornament"
            >
              Rezerviraj
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;