// src/components/ImageLayoutSlider.tsx
import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
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

export default function ImageLayoutSlider({ children, buttons }: Props) {
  const [mainIndex, setMainIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  const currentButton = buttons[mainIndex];
  const hasSubButtons = currentButton.subButtons?.length > 0;

  // 画像パスを正しく解決する関数
  const resolveImagePath = (path: string) => {
    // 既に@siteや他の特殊な形式で始まっていない場合のみuseBaseUrlを適用
    if (path.startsWith('@site') || path.startsWith('~') || path.startsWith('http')) {
      return path;
    }
    
    // 先頭の/を削除（useBaseUrlが自動的に追加するため）
    const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
    return useBaseUrl(`img/${normalizedPath}`);
  };

  // 現在表示すべき画像のパスを取得
  const currentImagePath = hasSubButtons 
    ? currentButton.subButtons[subIndex].image
    : currentButton.image;

  // 画像パスを正しく解決
  const resolvedImagePath = currentImagePath ? resolveImagePath(currentImagePath) : '';

  return (
    <div className="layout-container">
      <div className="text-content">{children}</div>

      <div className="slider-section">
        {/* メインボタン */}
        <div className="button-container-main">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={`main-btn ${index === mainIndex ? 'active' : ''}`}
              onClick={() => {
                setMainIndex(index);
                setSubIndex(0);
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* サブボタン（条件付き表示） */}
        {hasSubButtons && (
          <div className="button-container-sub">
            {currentButton.subButtons.map((btn, index) => (
              <button
                key={index}
                className={`sub-btn ${index === subIndex ? 'active' : ''}`}
                onClick={() => setSubIndex(index)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* 画像表示 */}
        <div className="image-wrapper">
          {resolvedImagePath && (
            <img
              src={resolvedImagePath}
              alt={`Content preview for ${currentButton.label}`}
              onError={(e) => {
                console.error(`Failed to load image: ${resolvedImagePath}`);
                e.currentTarget.src = useBaseUrl('img/fallback-image.png');
                e.currentTarget.alt = 'Image not found';
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}