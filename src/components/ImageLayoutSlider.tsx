// src/components/ImageLayoutSlider.tsx
import React, { useState, useRef, useEffect } from 'react';
import './ImageLayoutSlider.css';

interface SubButton {
  label: string;
  image: string;
}

interface ButtonConfig {
  label: string;
  subButtons?: SubButton[];
  image?: string;
}

interface Props {
  children: React.ReactNode;
  buttons: ButtonConfig[];
}

// 画像パスを正しく解決する関数
const resolveImagePath = (path: string) => {
  if (!path) return '';
  
  if (path.startsWith('@site') || path.startsWith('~') || path.startsWith('http')) {
    return path;
  }
  
  let normalizedPath = path;
  if (path.startsWith('/')) {
    normalizedPath = path.substring(1);
  }
  
  if (!normalizedPath.startsWith('img/')) {
    normalizedPath = `img/${normalizedPath}`;
  }
  
  return `/FFXIV-JP-Raid-Macro/${normalizedPath}`;
};

// 画像プリロード用のコンポーネント
const ImagePreloader = ({ imagePaths }: { imagePaths: string[] }) => {
  return (
    <div style={{ display: 'none' }}>
      {imagePaths.map((src, index) => (
        <img key={index} src={src} alt="preload" />
      ))}
    </div>
  );
};

export default function ImageLayoutSlider({ children, buttons }: Props) {
  const [mainIndex, setMainIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const isFirstRender = useRef(true);

  const currentButton = buttons[mainIndex];
  const hasSubButtons = currentButton.subButtons?.length > 0;

  const allImagePaths: string[] = [];
  buttons.forEach(btn => {
    if (btn.image) {
      allImagePaths.push(resolveImagePath(btn.image));
    }
    if (btn.subButtons) {
      btn.subButtons.forEach(subBtn => {
        if (subBtn.image) {
          allImagePaths.push(resolveImagePath(subBtn.image));
        }
      });
    }
  });

  const currentImagePath = hasSubButtons 
    ? currentButton.subButtons[subIndex].image
    : currentButton.image;
  const resolvedImagePath = currentImagePath ? resolveImagePath(currentImagePath) : '';

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <div className="layout-container">
      <ImagePreloader imagePaths={allImagePaths} />

      <div className="text-content">{children}</div>

      <div className="slider-section">
        <div className="button-container-main">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={`main-btn ${index === mainIndex ? 'active' : ''}`}
              onClick={() => {
                setMainIndex(index);
                setSubIndex(0);
              }}
              title={btn.label}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {hasSubButtons && (
          <div className="button-container-sub">
            {currentButton.subButtons.map((btn, index) => (
              <button
                key={index}
                className={`sub-btn ${index === subIndex ? 'active' : ''}`}
                onClick={() => setSubIndex(index)}
                title={btn.label}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        <div className="image-wrapper">
          {resolvedImagePath ? (
            <img
              src={resolvedImagePath}
              alt={`Content preview for ${currentButton.label}${
                hasSubButtons ? ` - ${currentButton.subButtons[subIndex].label}` : ''
              }`}
              onError={(e) => {
                console.error(`Failed to load image: ${resolvedImagePath}`);
                e.currentTarget.style.display = 'none';
                alert('画像の読み込みに失敗しました。');
              }}
              style={{ transition: 'opacity 0.2s ease' }}
            />
          ) : (
            <p>画像が見つかりません。</p>
          )}
        </div>
      </div>
    </div>
  );
}