import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Show navigation at the very top
          if (currentScrollY < 10) {
            setIsVisible(true);
          }
          // Hide when scrolling down, show when scrolling up
          else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY) {
            setIsVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentScrollY = window.scrollY;
      
      // Show navigation when mouse is near the top of the screen
      if (e.clientY < 100) {
        setIsVisible(true);
      }
      // Hide navigation when mouse moves away from top AND not at the very top of page
      else if (e.clientY > 150 && currentScrollY > 50) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [lastScrollY]);

  const navItems = [
    { href: "#domov", label: "Domov" },
    { href: "#storitve", label: "Energoterapije" },
    { href: "#o-nas", label: "O Tanji, Edu & Santiagu" },
    { href: "#pricevanja", label: "Zgodbe preobrazbe" },
    { href: "#proces", label: "Kako začeti" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-transform duration-300 ease-in-out",
      isVisible ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="font-gothic text-2xl text-ancient-text">
            <span className="text-ornament">❦</span> NIKRMANA
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
          <div className="md:hidden bg-background/95 backdrop-blur-sm border border-ornament/20 pb-4 rounded-lg mx-4 mt-2">
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