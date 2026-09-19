import { useState, useEffect } from 'react';
import { removeBackground, loadImageFromSrc } from '../lib/backgroundRemoval';

interface BackgroundRemovedLogoProps {
  originalSrc: string;
  alt: string;
  className?: string;
}

const BackgroundRemovedLogo = ({ originalSrc, alt, className }: BackgroundRemovedLogoProps) => {
  const [processedImageSrc, setProcessedImageSrc] = useState<string>(originalSrc);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processImage = async () => {
      try {
        setIsProcessing(true);
        console.log('Loading original image...');
        
        // Load the original image
        const imageElement = await loadImageFromSrc(originalSrc);
        
        console.log('Removing background...');
        // Remove background
        const processedBlob = await removeBackground(imageElement);
        
        // Create object URL for the processed image
        const processedUrl = URL.createObjectURL(processedBlob);
        setProcessedImageSrc(processedUrl);
        
        console.log('Background removal complete!');
      } catch (error) {
        console.error('Failed to remove background:', error);
        // Fallback to original image
        setProcessedImageSrc(originalSrc);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();

    // Cleanup function to revoke object URL
    return () => {
      if (processedImageSrc !== originalSrc && processedImageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(processedImageSrc);
      }
    };
  }, [originalSrc]);

  return (
    <img 
      src={processedImageSrc} 
      alt={alt} 
      className={className}
      style={{ 
        opacity: isProcessing ? 0.7 : 1,
        transition: 'opacity 0.3s ease'
      }}
    />
  );
};

export default BackgroundRemovedLogo;