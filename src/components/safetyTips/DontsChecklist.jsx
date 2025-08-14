import React, { useEffect, useState } from 'react';
import donts from '../../assets/donts.jpg';

const dontsList = [
  "Never Ignite Fireworks while Holding them. Put them Down then Ignite them and walk away.",
  "Don't put Fireworks in any Container to Ignite.",
  "Any Malfunctioning Fireworks should be Abandoned.",
  "After Fireworks Display never pick up Fireworks that may be left over, they still may be Active.",
  "Never Shoot Fireworks in a Metal or Glass Containers.",
  "Never Use Fireworks inside the House.",
  "Don’t place near candles, Don’t store firecrackers near burning candles or lamps.",
  "Don’t Touch it, After the fireworks display never pick up fireworks that may be leftover, they still may be active."
];

const DontsChecklist = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      gap: isMobile ? '20px' : '40px',
      alignItems: isMobile ? 'center' : 'flex-start',
      padding: isMobile ? '20px' : '40px',
      flexWrap: 'wrap',
      backgroundColor: '#fff',
    },
    leftSection: {
      flex: 1,
      minWidth: '250px',
      textAlign: 'center',
    },
    rightSection: {
      flex: 2,
      minWidth: '300px',
    },
    heading: {
      color: 'red',
      fontWeight: 'bold',
      fontSize: isMobile ? '24px' : '30px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '20px' : '30px 40px',
    },
    item: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
    },
    iconCircle: {
      minWidth: '40px',
      height: '40px',
      backgroundColor: '#f0f0f0',
      borderRadius: '50%',
      color: 'red',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
      marginTop: '5px',
    },
    text: {
      margin: 0,
      fontSize: '16px',
      lineHeight: '1.4',
      textAlign: 'left',
    },
    topImage: {
      width: '100%',
      marginBottom: '20px',
    },
    bottomImage: {
      width: '100px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <img
          src={donts}
          alt="Don'ts Thumbs Down"
          style={styles.topImage}
        />
      </div>

      <div style={styles.rightSection}>
        <h2 style={styles.heading}>Don'ts</h2>
        <div style={styles.grid}>
          {dontsList.map((text, index) => (
            <div key={index} style={styles.item}>
              <div style={styles.iconCircle}>✖</div>
              <p style={styles.text}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DontsChecklist;
