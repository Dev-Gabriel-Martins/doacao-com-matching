import { removeBackground, loadImage } from '../utils/backgroundRemoval';
import logoWithBg from '../assets/logo-with-bg.png';

export const processAndSaveLogo = async () => {
  try {
    // Load the original image
    const response = await fetch(logoWithBg);
    const blob = await response.blob();
    const imageElement = await loadImage(blob);
    
    // Remove background
    const processedBlob = await removeBackground(imageElement);
    
    // Convert to base64 for download
    const reader = new FileReader();
    reader.readAsDataURL(processedBlob);
    
    return new Promise<string>((resolve) => {
      reader.onload = () => {
        const base64 = reader.result as string;
        
        // Create download link
        const link = document.createElement('a');
        link.href = base64;
        link.download = 'logo-no-bg.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        resolve(base64);
      };
    });
  } catch (error) {
    console.error('Error processing logo:', error);
    throw error;
  }
};