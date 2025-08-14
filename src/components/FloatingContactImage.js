import React, { useEffect } from 'react';
import contactImage1 from '../assets/callicon.png'; 
import contactImage2 from '../assets/instagram.png'; 
import contactImage3 from '../assets/whatsappicon.png'; 

const FloatingContactImage: React.FC = () => {
  useEffect(() => {
    // Inject keyframes only once
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @keyframes hoverScale {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(styleTag);
  }, []);

  const containerStyle1: React.CSSProperties = {
    position: 'fixed',
    bottom: '0px',
    left: '10px',
    zIndex: 9999,
    cursor: 'pointer',
    animation: 'hoverScale 1.5s infinite ease-in-out',
  };

  const containerStyle2: React.CSSProperties = {
    position: 'fixed',
    bottom: '50px',
    left: '10px',
    zIndex: 9999,
    cursor: 'pointer',
    animation: 'hoverScale 1.5s infinite ease-in-out',
  };

  const containerStyle3: React.CSSProperties = {
    position: 'fixed',
    bottom: '100px',
    left: '10px',
    zIndex: 9999,
    cursor: 'pointer',
    animation: 'hoverScale 1.5s infinite ease-in-out',
  };

  const imageStyle: React.CSSProperties = {
    width: '40px',
    height: 'auto',
    borderRadius: '8px',
  };

  return (
    <>
    <div style={containerStyle1}>
      <img src={contactImage1} alt="Contact Icons" style={imageStyle} />
    </div>
    <div style={containerStyle2}>
      <img src={contactImage2} alt="Contact Icons" style={imageStyle} />
    </div>
    <div style={containerStyle3}>
      <img src={contactImage3} alt="Contact Icons" style={imageStyle} />
    </div>
    </>
  );
};

export default FloatingContactImage;
