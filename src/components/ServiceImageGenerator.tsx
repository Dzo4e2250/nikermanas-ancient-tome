
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import ImageGenerator from './ImageGenerator';

const ServiceImageGenerator = () => {
  const [generatedImages, setGeneratedImages] = useState<{[key: string]: string}>({});

  const servicePrompts = {
    'individualna': {
      title: 'Individualna terapija',
      prompt: 'A peaceful therapy scene with Tanja, a woman with vibrant colorful clothing and serene expression, sitting in a meditative pose with her hand gently placed above a client who is lying down relaxed on a therapy table. The scene has warm, vibrant colors - blues, purples, and golden tones. Soft lighting creates a healing atmosphere. Digital art style, cartoon-like illustration with smooth lines and bright colors.'
    },
    'paraterapija': {
      title: 'Paraterapija', 
      prompt: 'Tanja performing energy healing therapy, sitting beside a client lying on a therapy table. Her hands are positioned above the client in a healing gesture, with subtle energy waves or light emanating from her hands. Vibrant colors - deep blues, purples, and golden healing light. Mystical atmosphere with soft glowing effects. Cartoon illustration style with bright, vivid colors.'
    },
    'skupinska': {
      title: 'Skupinska terapija',
      prompt: 'A group therapy session with Tanja facilitating a circle of 4-5 people sitting in comfortable chairs. Everyone is engaged in conversation, with warm expressions. Tanja is guiding the discussion with open gestures. Bright, welcoming colors - warm oranges, blues, and greens. Cozy therapy room setting. Cartoon illustration with vibrant colors and friendly atmosphere.'
    },
    'ocena': {
      title: 'Brezplačna ocena',
      prompt: 'Tanja conducting an initial consultation, sitting across from a client in a welcoming office setting. She has a clipboard or notepad, listening attentively with a warm smile. The client appears comfortable and open. Bright, professional yet warm colors - blues, greens, and warm neutrals. Modern therapy office with plants and comfortable seating. Cartoon illustration style with inviting colors.'
    }
  };

  const handleImageGenerated = (key: string, imageUrl: string) => {
    setGeneratedImages(prev => ({
      ...prev,
      [key]: imageUrl
    }));
  };

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="font-ancient text-3xl mb-8 text-center">Generator slik za storitve</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(servicePrompts).map(([key, config]) => (
          <div key={key}>
            <ImageGenerator
              title={config.title}
              prompt={config.prompt}
              onImageGenerated={(url) => handleImageGenerated(key, url)}
            />
            
            {generatedImages[key] && (
              <div className="mt-4">
                <img 
                  src={generatedImages[key]} 
                  alt={config.title}
                  className="w-full h-48 object-cover rounded-lg border border-ornament"
                />
                <Button
                  onClick={() => downloadImage(generatedImages[key], `${key}-terapija-cartoon.jpg`)}
                  className="mt-2 w-full"
                  variant="outline"
                >
                  Prenesi sliko
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceImageGenerator;
