import { Mail, Phone, MapPin } from "lucide-react";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import VranaOrnament from "@/components/VranaOrnament";

const EMAIL = "ztanja7@gmail.com";
const TELEFON = "040 811 870";
const TELEFON_POVEZAVA = "tel:+38640811870";

const zamik = (s: number) => ({ animationDelay: `${s}s` });

const ComingSoon = () => {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-10 overflow-hidden"
      style={{ backgroundImage: "url(/images/ozadje-pergament.png)" }}
    >
      <article
        className="relative w-full max-w-xl border-2 border-ornament bg-[hsl(var(--parchment)/0.85)] shadow-mystical backdrop-blur-[2px] motion-safe:animate-prikazi
          before:absolute before:inset-2 before:border before:border-ornament/40 before:pointer-events-none
          after:absolute after:inset-1 after:border after:border-ornament/20 after:pointer-events-none"
      >
        <VranaOrnament className="absolute top-4 left-4 h-7 opacity-70" />
        <VranaOrnament zrcaljeno className="absolute top-4 right-4 h-7 opacity-70" />
        <VranaOrnament className="absolute bottom-4 left-4 h-7 opacity-70" />
        <VranaOrnament zrcaljeno className="absolute bottom-4 right-4 h-7 opacity-70" />

        <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-12 text-center">
          <div className="motion-safe:animate-vrana-prilet" style={zamik(0.6)}>
            <img
              src="/images/vrana.png"
              alt=""
              className="h-28 sm:h-36 w-auto mx-auto motion-safe:animate-vrana-lebdi"
            />
          </div>

          <h1 className="motion-safe:animate-prikazi" style={zamik(1.9)}>
            <img src="/images/napis-nikrmana.png" alt="NIKRMANA" className="h-10 sm:h-14 w-auto mx-auto mt-4" />
          </h1>

          <div className="motion-safe:animate-prikazi" style={zamik(2.2)}>
            <p className="font-ancient text-lg italic text-black mt-3">Zavod za dvig zavesti</p>

            <OrnamentalDivider />

            <h2 className="font-gothic text-2xl sm:text-3xl font-semibold tracking-wide text-black mb-4">
              Spletna stran prihaja kmalu
            </h2>

            <p className="font-ancient text-base sm:text-lg text-black mb-1">
              Energoterapije • Meditacije • Srečanja
            </p>
            <p className="font-ancient text-base text-black/80 leading-relaxed mb-8">
              Pripravljamo novo spletno stran. Do takrat smo vam na voljo po e-pošti ali telefonu.
            </p>

            <ul className="font-ancient text-base sm:text-lg text-black space-y-3 inline-flex flex-col items-start mx-auto">
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:underline underline-offset-4">
                  <Mail className="h-5 w-5 text-ornament shrink-0" aria-hidden />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={TELEFON_POVEZAVA} className="flex items-center gap-3 hover:underline underline-offset-4">
                  <Phone className="h-5 w-5 text-ornament shrink-0" aria-hidden />
                  {TELEFON}
                </a>
              </li>
              <li className="flex items-center gap-3 text-black/80">
                <MapPin className="h-5 w-5 text-ornament shrink-0" aria-hidden />
                Pesnica pri Mariboru
              </li>
            </ul>
          </div>
        </div>
      </article>
    </main>
  );
};

export default ComingSoon;
