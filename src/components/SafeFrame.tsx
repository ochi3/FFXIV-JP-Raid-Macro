// src/components/SafeFrame.tsx
import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

interface SafeFrameProps {
  url: string;
  selector?: string;
  height?: string;
}

export default function SafeFrame({ url, selector, height = '500px' }: SafeFrameProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  return (
    <BrowserOnly>
      {() => (
        <div className="safe-frame-container">
          <iframe
            ref={iframeRef}
            src={`/api/proxy?url=${encodeURIComponent(url)}${selector ? `&selector=${selector}` : ''}`}
            style={{ height }}
            onLoad={() => {
              if (iframeRef.current && selector) {
                iframeRef.current.contentWindow?.postMessage({
                  type: 'SCROLL_TO_SELECTOR',
                  selector
                }, '*');
              }
            }}
          />
        </div>
      )}
    </BrowserOnly>
  );
}