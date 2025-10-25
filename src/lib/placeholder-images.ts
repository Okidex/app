
import { placeholderImages as data } from '@/lib/placeholder-images-data';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const placeholderImages: ImagePlaceholder[] = data;

export const getImage = (id: string): ImagePlaceholder => {
    const image = placeholderImages.find(img => img.id === id);
    if (!image) {
        // Return a default placeholder if not found
        return {
            id: 'default',
            description: 'Default placeholder image',
            imageUrl: `https://picsum.photos/seed/default-${id}/400/400`,
            imageHint: 'placeholder'
        };
    }
    return image;
};

