
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { loadImageFromSrc, removeBackground } from '@/lib/backgroundRemoval';

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
  prompt: string;
  title: string;
}

const ImageGenerator = ({ onImageGenerated, prompt, title }: ImageGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      console.log(`Generating image: ${title}`);
      
      // Generate image using Hugging Face
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: prompt,
          model: 'black-forest-labs/FLUX.1-schnell'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Convert base64 to blob and then to image
      const base64Data = data.image.split(',')[1];
      const binaryData = atob(base64Data);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      
      const blob = new Blob([arrayBuffer], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);
      
      onImageGenerated(imageUrl);
      console.log(`Successfully generated image: ${title}`);
      
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-4 border border-ornament rounded-lg">
      <h3 className="font-ancient text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{prompt}</p>
      <Button 
        onClick={generateImage} 
        disabled={isGenerating}
        className="w-full"
      >
        {isGenerating ? 'Generiram sliko...' : 'Generiraj sliko'}
      </Button>
    </div>
  );
};

export default ImageGenerator;
