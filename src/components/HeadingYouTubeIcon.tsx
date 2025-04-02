// src/components/YouTubeInline.tsx
import React, { useState } from 'react';
import { FiYoutube } from 'react-icons/fi';

interface Props {
  videoId: string;
  startTime?: number;
}

export default function YouTubeInline({ videoId, startTime = 0 }: Props) {
  const [showModal, setShowModal] = useState(false);
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}`;

  return (
    <span className="youtube-inline">
      <FiYoutube 
        className="icon" 
        onClick={() => setShowModal(true)} 
        style={{ 
          verticalAlign: 'middle', 
          marginLeft: '8px',
          cursor: 'pointer',
          fontSize: '1.2em',
          color: 'red'
        }} 
      />
      
      {showModal && (
        <div 
          className="video-modal-overlay" 
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div 
            className="video-modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '80%',
              height: '80%',
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </span>
  );
}