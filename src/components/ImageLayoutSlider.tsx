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

export default function ImageLayoutSlider({ children, buttons }: Props) {
  const [mainIndex, setMainIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  const currentButton = buttons[mainIndex];
  const hasSubButtons = currentButton.subButtons?.length > 0;

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
          <img
            src={
              hasSubButtons 
                ? currentButton.subButtons[subIndex].image
                : currentButton.image
            }
            alt="Content preview"
          />
        </div>
      </div>
    </div>
  );
}