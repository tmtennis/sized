'use client';

import Image from 'next/image';

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const handleHover = (index: number) => {
    const element = document.getElementById(`gallery-image-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="pb-16 md:pb-24">
      <div className="space-y-12 md:space-y-16">
        {images.map((image, index) => (
          <div 
            key={index} 
            id={`gallery-image-${index}`}
            className="relative w-full aspect-[3/2] cursor-pointer group"
            onMouseEnter={() => handleHover(index)}
          >
            <Image
              src={image}
              alt={`${projectTitle} - Image ${index + 1}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 ease-out" />
          </div>
        ))}
      </div>
    </div>
  );
}
