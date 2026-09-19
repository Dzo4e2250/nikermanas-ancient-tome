import OrnamentalDivider from "@/components/OrnamentalDivider";

const ComingSoon = () => {
  return (
    <main
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat px-6 py-16"
      style={{ backgroundImage: "url(/images/ozadje-pergament.png)" }}
    >
      <div className="absolute top-6 left-6 text-3xl md:text-4xl text-ornament opacity-60">❦</div>
      <div className="absolute top-6 right-6 text-3xl md:text-4xl text-ornament opacity-60 transform scale-x-[-1]">❦</div>
      <div className="absolute bottom-6 left-6 text-3xl md:text-4xl text-ornament opacity-60 transform scale-y-[-1]">❦</div>
      <div className="absolute bottom-6 right-6 text-3xl md:text-4xl text-ornament opacity-60 transform scale-[-1]">❦</div>

      <div className="text-center max-w-3xl mx-auto relative z-10">
        <img src="/images/logo.png" alt="NIKRMANA logo" className="w-auto h-40 md:h-60 mx-auto mb-2" />

        <p className="font-ancient text-lg md:text-xl text-black italic">Zavod za dvig zavesti</p>

        <OrnamentalDivider />

        <h1 className="font-gothic text-3xl md:text-5xl font-semibold tracking-wide text-black mb-6">
          Spletna stran prihaja kmalu
        </h1>

        <p className="font-ancient text-base md:text-lg text-black leading-relaxed max-w-2xl mx-auto mb-2">
          Energoterapije • Meditacije • Srečanja
        </p>
        <p className="font-ancient text-base md:text-lg text-black leading-relaxed max-w-2xl mx-auto mb-10">
          Pripravljamo novo spletno stran. Do takrat smo vam na voljo po e-pošti.
        </p>

        <a
          href="mailto:nikrmanapesnica@gmail.com"
          className="inline-block font-gothic text-sm md:text-base tracking-widest uppercase border border-black/70 text-black px-6 py-3 hover:bg-black hover:text-[hsl(var(--parchment))] transition-colors"
        >
          nikrmanapesnica@gmail.com
        </a>

        <p className="font-ancient text-sm text-black/70 mt-8">Pesnica pri Mariboru</p>
      </div>
    </main>
  );
};

export default ComingSoon;
