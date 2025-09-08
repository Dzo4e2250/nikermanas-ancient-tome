import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js for optimal performance
env.allowLocalModels = false;
env.useBrowserCache = true;

const MAX_IMAGE_DIMENSION = 1024;
const CACHE_KEY_PREFIX = 'bg_removed_';

// Cache for processed images
const imageCache = new Map<string, string>();

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

function preprocessImage(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Enhance contrast slightly for better segmentation
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * 1.1);     // Red
    data[i + 1] = Math.min(255, data[i + 1] * 1.1); // Green
    data[i + 2] = Math.min(255, data[i + 2] * 1.1); // Blue
  }
  
  ctx.putImageData(imageData, 0, 0);
}

function postprocessMask(maskData: Float32Array, width: number, height: number): Float32Array {
  const processed = new Float32Array(maskData.length);
  
  // Apply median filter to smooth the mask
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      const neighbors = [
        maskData[i - width - 1], maskData[i - width], maskData[i - width + 1],
        maskData[i - 1], maskData[i], maskData[i + 1],
        maskData[i + width - 1], maskData[i + width], maskData[i + width + 1]
      ];
      neighbors.sort((a, b) => a - b);
      processed[i] = neighbors[4]; // median value
    }
  }
  
  return processed;
}

export const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
  try {
    // Check cache first
    const cacheKey = CACHE_KEY_PREFIX + imageElement.src;
    if (imageCache.has(cacheKey)) {
      const cachedUrl = imageCache.get(cacheKey)!;
      const response = await fetch(cachedUrl);
      return await response.blob();
    }

    console.log('Starting enhanced background removal...');
    
    // Try to use WebGPU, fallback to CPU if not available
    let device = 'webgpu';
    let segmenter;
    
    try {
      segmenter = await pipeline('image-segmentation', 'briaai/RMBG-1.4', {
        device: 'webgpu',
      });
    } catch (error) {
      console.log('WebGPU not available, falling back to CPU');
      device = 'cpu';
      segmenter = await pipeline('image-segmentation', 'briaai/RMBG-1.4', {
        device: 'cpu',
      });
    }
    
    // Convert HTMLImageElement to canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Resize image if needed and draw it to canvas
    const wasResized = resizeImageIfNeeded(canvas, ctx, imageElement);
    console.log(`Image ${wasResized ? 'was' : 'was not'} resized. Final dimensions: ${canvas.width}x${canvas.height}`);
    
    // Preprocess image for better segmentation
    preprocessImage(canvas, ctx);
    
    // Get image data as base64 with higher quality
    const imageData = canvas.toDataURL('image/png');
    console.log('Image converted to base64');
    
    // Process the image with the background removal model
    console.log('Processing with RMBG-1.4 model...');
    const result = await segmenter(imageData);
    
    console.log('Segmentation result:', result);
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('Invalid segmentation result');
    }
    
    // Create a new canvas for the masked image
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    // Draw original image
    outputCtx.drawImage(canvas, 0, 0);
    
    // Post-process the mask for better quality
    const processedMask = postprocessMask(result[0].mask.data, canvas.width, canvas.height);
    
    // Apply the mask
    const outputImageData = outputCtx.getImageData(
      0, 0,
      outputCanvas.width,
      outputCanvas.height
    );
    const data = outputImageData.data;
    
    // Apply the mask to alpha channel with better blending
    for (let i = 0; i < processedMask.length; i++) {
      // Use the mask directly (RMBG model already provides foreground mask)
      const alpha = Math.round(processedMask[i] * 255);
      data[i * 4 + 3] = alpha;
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    console.log('Enhanced mask applied successfully');
    
    // Convert canvas to blob
    return new Promise((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => {
          if (blob) {
            console.log('Successfully created final blob');
            
            // Cache the result
            const url = URL.createObjectURL(blob);
            imageCache.set(cacheKey, url);
            
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png',
        1.0
      );
    });
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

export const loadImageFromSrc = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // To avoid CORS issues
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};
