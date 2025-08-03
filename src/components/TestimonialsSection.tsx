import AncientTitle from "./AncientTitle";
import MysticalCard from "./MysticalCard";
import OrnamentalDivider from "./OrnamentalDivider";

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Po energoterapiji se je moje stanje izboljšalo za 80%. Solze sreče tečejo zaradi občutka zdravljenja. Hvala Tanji za podporo med rehabilitacijo po hudih poškodbah.",
      author: "Marija K.",
      location: "Ljubljana"
    },
    {
      text: "Terapije mi pomagajo odlagati strahove, travme in tesnobo. Naučila sem se biti 'preprosto jaz'. To je bila največja daritev, ki sem jo prejela.",
      author: "Ana S.",
      location: "Maribor"
    },
    {
      text: "Čudovit dan na travniku ob karti boginje Green Tara. Meditacija v naravi je bila globoko preobrazna izkušnja za vso skupino.",
      author: "Petra M.",
      location: "Celje"
    },
    {
      text: "Sinergija Tanje in Eda ustvarja neverjeten prostor varnosti. Čutim ljubezen, umirjenost in dvig zavesti na vsakem srečanju.",
      author: "Katja L.",
      location: "Ptuj"
    },
    {
      text: "Brezplačna prva terapija me je prepričala. Nikoli prej nisem čutila takšne globine in povezanosti s svojo dušo.",
      author: "Maja T.",
      location: "Slovenj Gradec"
    },
    {
      text: "Prehod iz 3D v 5D zavest se dogaja postopno, a občutno. Moje življenje se spreminja na vseh ravneh - fizično, čustveno in duhovno.",
      author: "Simona D.",
      location: "Koper"
    }
  ];

  return (
    <section className="py-16 bg-parchment">
      <div className="max-w-6xl mx-auto px-6">
        <AncientTitle level={2} className="mb-12">
          Zgodbe Preobrazbe
        </AncientTitle>
        
        <OrnamentalDivider />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <MysticalCard key={index} className="h-full flex flex-col">
              <div className="flex-1">
                <div className="text-3xl text-ornament mb-4 text-center">❝</div>
                <p className="font-ancient text-muted-foreground leading-relaxed mb-6 italic">
                  {testimonial.text}
                </p>
              </div>
              <div className="text-center border-t border-ornament/30 pt-4 mt-auto">
                <p className="font-ancient text-sm text-ornament font-semibold">
                  {testimonial.author}
                </p>
                <p className="font-ancient text-xs text-muted-foreground mt-1">
                  {testimonial.location}
                </p>
              </div>
            </MysticalCard>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="font-ancient text-lg text-ancient-text italic max-w-2xl mx-auto">
            "Vsi ljudje v našem življenju so angeli, ki nas učijo ljubezni. 
            Vsaka izkušnja nas vodi k višji zavesti srca."
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;