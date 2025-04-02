// src/components/VideoModal.tsx
import React from 'react';

interface VideoModalProps {
  videoId: string;
  onClose: () => void;
}

export default function VideoModal({ videoId, onClose }: VideoModalProps) {
  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}