import { useState, useEffect } from "react";

const ComingSoon = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStep(1), 500); // Raven flies in
    const timer2 = setTimeout(() => setAnimationStep(2), 1500); // Transform to logo
    const timer3 = setTimeout(() => setAnimationStep(3), 2000); // Show content
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center font-ancient bg-fixed px-4 py-8">
      <div className="text-center max-w-2xl mx-auto p-6 md:p-10 bg-parchment border-2 md:border-4 border-ancient-silver rounded-xl md:rounded-2xl shadow-mystical relative">
        {/* Decorative ornaments - only on desktop */}
        <div className="absolute top-4 left-4 opacity-60 hidden md:block"><img src="/lovable-uploads/ad23fb3e-4e2f-4d83-8500-3632c8984d16.png" alt="raven" className="w-6 h-6" /></div>
        <div className="absolute top-4 right-4 opacity-60 transform scale-x-[-1] hidden md:block"><img src="/lovable-uploads/ad23fb3e-4e2f-4d83-8500-3632c8984d16.png" alt="raven" className="w-6 h-6" /></div>
        <div className="absolute bottom-4 left-4 opacity-60 transform scale-y-[-1] hidden md:block"><img src="/lovable-uploads/ad23fb3e-4e2f-4d83-8500-3632c8984d16.png" alt="raven" className="w-6 h-6" /></div>
        <div className="absolute bottom-4 right-4 opacity-60 transform scale-[-1] hidden md:block"><img src="/lovable-uploads/ad23fb3e-4e2f-4d83-8500-3632c8984d16.png" alt="raven" className="w-6 h-6" /></div>
        
        {/* Mobile Animation: Flying Raven */}
        <div className={`md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
          animationStep === 0 ? 'translate-x-96 -translate-y-32 scale-50 opacity-0' : 
          animationStep === 1 ? '-translate-x-1/2 -translate-y-1/2 scale-75 opacity-100' :
          'opacity-0'
        }`}>
          <img 
            src="/lovable-uploads/ad23fb3e-4e2f-4d83-8500-3632c8984d16.png" 
            alt="flying raven" 
            className="w-16 h-16 animate-bounce"
          />
        </div>

        {/* Logo section */}
        <div className={`w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 flex items-center justify-center transition-all duration-500 ${
          animationStep < 2 ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}>
          <img 
            src="/lovable-uploads/7af9c884-5752-43f5-9688-cc74a903a9dd.png" 
            alt="NIKRMANA logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Content with staggered animation */}
        <div className={`transition-all duration-700 delay-300 ${
          animationStep < 3 ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
        }`}>
          <h1 className="font-gothic text-3xl md:text-5xl font-semibold mb-4 md:mb-6 text-primary">NIKRMANA</h1>
          <p className="text-lg md:text-2xl italic mb-6 md:mb-8 text-secondary">Zavod za dvig zavesti</p>
          
          <div className="flex items-center justify-center my-6 md:my-8">
            <div className="w-8 md:w-12 h-px bg-ancient-silver"></div>
            <div className="mx-4 md:mx-6"><img src="/lovable-uploads/ad23fb3e-4e2f-4d83-8500-3632c8984d16.png" alt="raven" className="w-4 md:w-5 h-4 md:h-5" /></div>
            <div className="w-8 md:w-12 h-px bg-ancient-silver"></div>
          </div>
          
          <p className="text-lg md:text-xl leading-relaxed mb-8 md:mb-10 text-ancient-text px-2">
            Naša spletna stran je trenutno v obdelavi.<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Pripravljamo nekaj posebnega za vas!
          </p>
        </div>

        {/* Contact section with app-like design */}
        <div className={`bg-card p-6 md:p-8 rounded-xl border-2 border-border mt-6 md:mt-8 transition-all duration-700 delay-500 ${
          animationStep < 3 ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
        }`}>
          <h2 className="font-gothic text-xl md:text-2xl font-semibold mb-6 text-primary">Kontaktirajte nas</h2>
          
          {/* App-like buttons for mobile */}
          <div className="md:hidden space-y-4 mb-6">
            <a 
              href="tel:051358273"
              className="flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-primary-foreground py-5 px-6 rounded-xl font-bold text-xl shadow-lg transition-all duration-200 active:scale-95"
            >
              <span className="text-2xl mr-3">📞</span>
              <div className="text-center">
                <div className="text-sm font-medium opacity-90">POKLIČITE</div>
                <div className="text-lg font-bold">051 358 273</div>
              </div>
            </a>
            <a 
              href="mailto:info@nikrmanapesnica.si"
              className="flex items-center justify-center w-full bg-secondary text-secondary-foreground py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-secondary/90 active:scale-95"
            >
              ✉️ Pošljite e-pošto
            </a>
          </div>

          {/* Desktop version - original layout */}
          <div className="hidden md:block">
            <div className="text-base md:text-lg mb-4 text-ancient-text">
              <strong className="text-primary">E-pošta:</strong> 
              <a 
                href="mailto:info@nikrmanapesnica.si" 
                className="ml-2 text-primary hover:text-secondary transition-colors underline break-all"
              >
                info@nikrmanapesnica.si
              </a>
            </div>
            
            <div className="text-base md:text-lg mb-6 text-ancient-text">
              <strong className="text-primary">Telefon:</strong> 
              <a 
                href="tel:051358273" 
                className="ml-2 text-primary hover:text-secondary transition-colors underline"
              >
                051 358 273
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-center my-4 md:my-6">
            <div className="w-8 md:w-12 h-px bg-ancient-silver"></div>
            <div className="mx-4 md:mx-6"><img src="/lovable-uploads/ad23fb3e-4e2f-4d83-8500-3632c8984d16.png" alt="raven" className="w-3 md:w-4 h-3 md:h-4" /></div>
            <div className="w-8 md:w-12 h-px bg-ancient-silver"></div>
          </div>
          
          <div className="text-base md:text-lg italic mt-4 md:mt-6 text-ancient-text leading-relaxed px-2">
            "Naravna pot, ki nežno a globoko preobraža in ponovno vzpostavlja 
            naravno ravnovesje telesa, čustev in duha"
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;