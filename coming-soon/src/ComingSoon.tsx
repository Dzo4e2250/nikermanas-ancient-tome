const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center font-serif bg-fixed">
      <div className="text-center max-w-2xl mx-auto p-10 bg-amber-50 border-4 border-amber-600 rounded-2xl shadow-2xl relative">
        {/* Decorative ornaments */}
        <div className="absolute top-4 left-4 text-amber-600 text-2xl opacity-60">✦</div>
        <div className="absolute top-4 right-4 text-amber-600 text-2xl opacity-60 transform scale-x-[-1]">✦</div>
        <div className="absolute bottom-4 left-4 text-amber-600 text-2xl opacity-60 transform scale-y-[-1]">✦</div>
        <div className="absolute bottom-4 right-4 text-amber-600 text-2xl opacity-60 transform scale-[-1]">✦</div>
        
        {/* Logo */}
        <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center">
          <img 
            src="/logo.png" 
            alt="NIKRMANA logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <h1 className="text-5xl font-bold mb-6 text-amber-800">NIKRMANA</h1>
        <p className="text-2xl italic mb-8 text-amber-700">Zavod za dvig zavesti</p>
        
        <div className="flex items-center justify-center my-8">
          <div className="w-12 h-px bg-amber-600"></div>
          <span className="mx-6 text-amber-600 text-xl">✦</span>
          <div className="w-12 h-px bg-amber-600"></div>
        </div>
        
        <p className="text-xl leading-relaxed mb-10 text-amber-800">
          Naša spletna stran je trenutno v obdelavi.<br />
          Pripravljamo nekaj posebnega za vas!
        </p>
        
        <div className="bg-white p-8 rounded-xl border-2 border-amber-200 mt-8">
          <h2 className="text-2xl font-bold mb-6 text-amber-800">Za več informacij nas kontaktirajte</h2>
          
          <div className="text-lg mb-4 text-amber-700">
            <strong className="text-amber-800">E-pošta:</strong> info@nikrmanapesnica.si
          </div>
          
          <div className="text-lg mb-6 text-amber-700">
            <strong className="text-amber-800">Telefon:</strong> 051 358 273
          </div>
          
          <div className="flex items-center justify-center my-6">
            <div className="w-12 h-px bg-amber-600"></div>
            <span className="mx-6 text-amber-600 text-lg">✦</span>
            <div className="w-12 h-px bg-amber-600"></div>
          </div>
          
          <div className="text-lg italic mt-6 text-amber-700">
            "Naravna pot, ki nežno a globoko preobraža in ponovno vzpostavlja 
            naravno ravnovesje telesa, čustev in duha"
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;