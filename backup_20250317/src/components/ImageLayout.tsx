// src/components/ImageLayout.tsx
import React from 'react';
import './ImageLayout.css';

export default function ImageLayout({
  children,
  src,
  alt
}: {
  children: React.ReactNode
  src: string
  alt: string
}) {
  return (
    <div className="image-layout">
      <div className="content">
        {children}
      </div>
      <div className="image-container">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}