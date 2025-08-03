import AncientTitle from "./AncientTitle";
import MysticalCard from "./MysticalCard";
import OrnamentalDivider from "./OrnamentalDivider";

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Po energoterapiji se je moje stanje izboljšalo za 80%. Solze sreče tečejo zaradi občutka zdravljenja. Hvala Tanji za podporo med rehabilitacijo po hudih poškodbah.",
      author: "Zadovoljna udeleženka"
    },
    {
      text: "Terapije mi pomagajo odlagati strahove, travme in tesnobo. Naučila sem se biti 'preprosto jaz'. To je bila največja daritev, ki sem jo prejela.",
      author: "Udeleženka delavnic"
    },
    {
      text: "Čudovit dan na travniku ob karti boginje Green Tara. Meditacija v naravi je bila globoko preobrazna izkušnja za vso skupino.",
      author: "Udeleženec skupinske meditacije"
    }
  ];

  return (
    <section className="py-16 bg-parchment">
      <div className="max-w-6xl mx-auto px-6">
        <AncientTitle level={2} className="mb-12">
          Zgodbe Preobrazbe
        </AncientTitle>
        
        <OrnamentalDivider />
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <MysticalCard key={index} className="h-full">
              <div className="text-3xl text-ornament mb-4 text-center">❝</div>
              <p className="font-ancient text-muted-foreground leading-relaxed mb-6 italic">
                {testimonial.text}
              </p>
              <div className="text-center border-t border-ornament/30 pt-4">
                <p className="font-ancient text-sm text-ornament">
                  — {testimonial.author}
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