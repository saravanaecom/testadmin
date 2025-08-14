import React, { useEffect } from 'react';
import BlinkImage from '../assets/quickpurchase.png';

const BlinkingSaleImage = () => {
  useEffect(() => {
    // Inject keyframes dynamically (only once)
    const styleSheet = document.styleSheets[0];
    const keyframes = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }, []);

  const styles: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '120px',
    zIndex: 9999,
    animation: 'blink 1s infinite',
  };

  return (
    <img
      src={BlinkImage}
      alt="Diwali Sale"
      style={styles}
    />
  );
};

export default BlinkingSaleImage;
