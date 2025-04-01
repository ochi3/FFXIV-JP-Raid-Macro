// src/components/ImageLayout.tsx
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import './ImageLayout.css';

interface ImageLayoutProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
}

export default function ImageLayout({ src, alt, children }: ImageLayoutProps) {
  const imageUrl = useBaseUrl(src.startsWith('img/') ? src : `img/${src}`);

  return (
    <div className="image-layout-container">
      <div className="image-content">
        <img
          src={imageUrl}
          alt={alt}
          className="main-image"
          loading="lazy"
          onError={(e) => {
            console.error(`画像読み込みエラー: ${imageUrl}`);
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <div className="layout-description">
        {children}
      </div>
    </div>
  );
}