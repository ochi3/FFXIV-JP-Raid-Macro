// src/components/HorizontalImages.tsx
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface Props {
  images: string[];
  captions?: string[];
  className?: string;
}

export default function HorizontalImages({ images, captions = [], className = '' }: Props) {
  return (
    <div className={`horizontal-images ${className}`}>
      {images.map((src, index) => (
        <figure key={index}>
          <img
            src={useBaseUrl(src)}
            alt={captions[index] || `Image ${index + 1}`}
            loading="lazy"
          />
          {captions[index] && <figcaption>{captions[index]}</figcaption>}
        </figure>
      ))}
    </div>
  );
}