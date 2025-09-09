const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center font-ancient bg-fixed px-4 py-8">
      <div className="text-center max-w-2xl mx-auto p-6 md:p-10 bg-parchment border-2 md:border-4 border-ancient-silver rounded-xl md:rounded-2xl shadow-mystical relative">
        {/* Decorative ornaments */}
        <div className="absolute top-4 left-4 opacity-60"><img src="/lovable-uploads/ad23fb3e-4e2f-4d83-8500-3632c8984d16.png" alt="raven" className="w-6 h-6" /></div>
        <div className="absolute top-4 right-4 opacity-60 transform scale-x-[-1]"><img src="/lovable-uploads/ad23fb3e-4e2f-4d83-8500-3632c8984d16.png" alt="raven" className="w-6 h-6" /></div>
        <div className="absolute bottom-4 left-4 opacity-60 transform scale-y-[-1]"><img src="/lovable-uploads/ad23fb3e-4e2f-4d83-8500-3632c8984d16.png" alt="raven" className="w-6 h-6" /></div>
        <div className="absolute bottom-4 right-4 opacity-60 transform scale-[-1]"><img src="/lovable-uploads/ad23fb3e-4e2f-4d83-8500-3632c8984d16.png" alt="raven" className="w-6 h-6" /></div>
        
        {/* Logo circle */}
        <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 flex items-center justify-center">
          <img 
            src="/lovable-uploads/7af9c884-5752-43f5-9688-cc74a903a9dd.png" 
            alt="NIKRMANA logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
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
        
        <div className="bg-card p-6 md:p-8 rounded-xl border-2 border-border mt-6 md:mt-8">
          <h2 className="font-gothic text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-primary">Za več informacij nas kontaktirajte</h2>
          
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