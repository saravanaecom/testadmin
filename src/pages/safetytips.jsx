import React, { useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
import Rocket from '../assets/rocket.png';
import DosChecklist from '../components/safetyTips/DosChecklist';
import DontsChecklist from '../components/safetyTips/DontsChecklist';
import SafetyTipsBanner from '../components/safetyTips/SafetyTipsBanner';
import CreackersEffect from '../components/CreackersEffect';

function SafetyTips() {
  const rocketRef = useRef(null);
  const [animateRocket, setAnimateRocket] = useState(false);

  // Inject bounce animation CSS on mount
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes bounceRocket {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      .animate-rocket {
        animation: bounceRocket 1s ease-in-out;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Scroll event to trigger animation
  useEffect(() => {
    const handleScroll = () => {
      if (rocketRef.current) {
        const rect = rocketRef.current.getBoundingClientRect();
        const centerY = window.innerHeight / 2;
        const rocketCenterY = rect.top + rect.height / 2;
        const threshold = 50;
        const isCentered = Math.abs(centerY - rocketCenterY) < threshold;
        setAnimateRocket(isCentered);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // trigger initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Styles
  const styles = {
    container: {
      fontFamily: "'Segoe UI', sans-serif",
      padding: '40px 20px',
      backgroundColor: '#fff',
      color: '#222',
      maxWidth: '1200px',
      margin: 'auto',
    },

    title: {
      textAlign: 'center',
      fontSize: '32px',
      fontWeight: 'bold',
      color: 'red',
    },

    rocketImage: {
      display: 'block',
      margin: '10px auto',
      width: '180px',
    },

    paragraph: {
      textAlign: 'justify',
      maxWidth: '800px',
      margin: '10px auto 30px',
      fontSize: '16px',
      lineHeight: '1.5',
    },
  };

  return (
    <>
    <SafetyTipsBanner/>
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        paddingLeft: { xs: 0, sm: 2, md: 3, lg: 4, xl: 5 },
        paddingRight: { xs: 0, sm: 2, md: 3, lg: 4, xl: 5 },
      }}
    >
      <Box className="SafetyTips">
        <div style={styles.container}>
          <div style={styles.title}>GG Crackers Shop</div>

          <img
            ref={rocketRef}
            src={Rocket}
            alt="Rocket"
            style={styles.rocketImage}
            className={animateRocket ? 'animate-rocket' : ''}
          />

          <p style={styles.paragraph}>
            There are certain Dos & Don’ts to follow while Purchasing, Bursting and Storing Crackers. Thus, it is very important to follow the Precautions while Bursting Crackers. A little Negligence, Ignorance and Carelessness can cause a Fatal Injury.
          </p>

          <Box>
            <DosChecklist />
          </Box>
          <Box>
            <DontsChecklist />
          </Box>
        </div>
      </Box>
      <CreackersEffect/>
    </Container>
    </>    
  );
}

export default SafetyTips;
