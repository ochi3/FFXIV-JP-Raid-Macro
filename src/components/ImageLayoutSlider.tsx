// src/components/ImageLayoutSlider.tsx
import React, { useState } from 'react';
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
  
  // 既に@siteや他の特殊な形式で始まっている場合は変更しない
  if (path.startsWith('@site') || path.startsWith('~') || path.startsWith('http')) {
    return path;
  }
  
  // 先頭の/を削除
  let normalizedPath = path;
  if (path.startsWith('/')) {
    normalizedPath = path.substring(1);
  }
  
  // fru_p1/などのパスの場合、フルパスを構築
  if (!normalizedPath.startsWith('img/')) {
    normalizedPath = `img/${normalizedPath}`;
  }
  
  // baseUrlを考慮したパスを返す
  return `/FFXIV-JP-Raid-Macro/${normalizedPath}`;
};

export default function ImageLayoutSlider({ children, buttons }: Props) {
  const [mainIndex, setMainIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  const currentButton = buttons[mainIndex];
  const hasSubButtons = currentButton.subButtons?.length > 0;

  // 現在表示すべき画像のパスを取得して解決
  const currentImagePath = hasSubButtons 
    ? currentButton.subButtons[subIndex].image
    : currentButton.image;
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
              title={btn.label}
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
                title={btn.label}
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
              alt={`Content preview for ${currentButton.label}${
                hasSubButtons ? ` - ${currentButton.subButtons[subIndex].label}` : ''
              }`}
              onError={(e) => {
                console.error(`Failed to load image: ${resolvedImagePath}`);
                e.currentTarget.style.display = 'none';
              }}
              style={{ transition: 'opacity 0.2s ease' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}