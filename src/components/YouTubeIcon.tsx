// src/components/YouTubeIcon.tsx
import React from 'react';
import { FiYoutube } from 'react-icons/fi';

interface YouTubeIconProps {
  onClick: () => void;
}

export default function YouTubeIcon({ onClick }: YouTubeIconProps) {
  return (
    <div className="youtube-icon" onClick={onClick}>
      <FiYoutube className="icon" />
      <span className="tooltip">動画を見る</span>
    </div>
  );
}