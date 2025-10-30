

import placeholderData from './placeholder-images.json';

type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

const placeholderImages: ImagePlaceholder[] = placeholderData.placeholderImages;

export const getImage = (id: string): ImagePlaceholder => {
    const image = placeholderImages.find(img => img.id === id);
    if (!image) {
        // Return a default placeholder if not found
        return {
            id: 'default',
            description: 'Default placeholder image',
            imageUrl: `https://picsum.photos/seed/${id}/400/400`,
            imageHint: 'placeholder'
        };
    }
    return image;
};
