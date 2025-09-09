const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center font-ancient bg-fixed">
      <div className="text-center max-w-2xl mx-auto p-10 bg-parchment border-4 border-ancient-silver rounded-2xl shadow-mystical relative">
        {/* Decorative ornaments */}
        <div className="absolute top-4 left-4 text-ancient-silver text-2xl opacity-60">✦</div>
        <div className="absolute top-4 right-4 text-ancient-silver text-2xl opacity-60 transform scale-x-[-1]">✦</div>
        <div className="absolute bottom-4 left-4 text-ancient-silver text-2xl opacity-60 transform scale-y-[-1]">✦</div>
        <div className="absolute bottom-4 right-4 text-ancient-silver text-2xl opacity-60 transform scale-[-1]">✦</div>
        
        {/* Logo circle */}
        <div className="w-32 h-32 mx-auto mb-8 bg-card border-2 border-ancient-silver rounded-full flex items-center justify-center font-gothic font-semibold text-2xl text-primary">
          NIKRMANA
        </div>
        
        <h1 className="font-gothic text-5xl font-semibold mb-6 text-primary">NIKRMANA</h1>
        <p className="text-2xl italic mb-8 text-secondary">Zavod za dvig zavesti</p>
        
        <div className="flex items-center justify-center my-8">
          <div className="w-12 h-px bg-ancient-silver"></div>
          <span className="mx-6 text-ancient-silver text-xl">✦</span>
          <div className="w-12 h-px bg-ancient-silver"></div>
        </div>
        
        <p className="text-xl leading-relaxed mb-10 text-ancient-text">
          Naša spletna stran je trenutno v obdelavi.<br />
          Pripravljamo nekaj posebnega za vas!
        </p>
        
        <div className="bg-card p-8 rounded-xl border-2 border-border mt-8">
          <h2 className="font-gothic text-2xl font-semibold mb-6 text-primary">Za več informacij nas kontaktirajte</h2>
          
          <div className="text-lg mb-4 text-ancient-text">
            <strong className="text-primary">E-pošta:</strong> info@nikrmanapesnica.si
          </div>
          
          <div className="text-lg mb-6 text-ancient-text">
            <strong className="text-primary">Telefon:</strong> +386 XX XXX XXX
          </div>
          
          <div className="flex items-center justify-center my-6">
            <div className="w-12 h-px bg-ancient-silver"></div>
            <span className="mx-6 text-ancient-silver text-lg">✦</span>
            <div className="w-12 h-px bg-ancient-silver"></div>
          </div>
          
          <div className="text-lg italic mt-6 text-ancient-text">
            "Naravna pot, ki nežno a globoko preobraža in ponovno vzpostavlja 
            naravno ravnovesje telesa, čustev in duha"
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;