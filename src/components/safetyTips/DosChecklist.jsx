import React, { useState, useEffect } from 'react';
import dos from '../../assets/dos.jpg';

const dosList = [
  "Display Fireworks as per the Warnings and Instructions Mentioned on the Pack.",
  "Buy Fireworks Directly from Manufacturer or from Authorized Dealer only.",
  "Keep a Bucket of Water or a Garden Hose Handy in Case of Fire or Other Mishap.",
  "Always Wear Eye Protection when Lightening Fireworks.",
  "Always Follow the Safety tips marked on the Fireworks.",
  "Always an Adult should Supervise the use of Fireworks.",
  "Safe Storage, Store fireworks in a cool and dry place.",
  "Emergency Water, Keep two buckets of water handy. In the event of fire or any mishap.",
];

const DosChecklist = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      gap: '30px',
      alignItems: 'flex-start',
      padding: isMobile ? '20px' : '40px',
      backgroundColor: '#fff',
    },
    leftSection: {
      flex: 2,
      minWidth: '300px',
    },
    heading: {
      color: 'green',
      fontWeight: 'bold',
      fontSize: isMobile ? '24px' : '30px',
      marginBottom: '30px',
      textAlign: 'center',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '20px 30px',
    },
    item: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
    },
    iconCircle: {
      minWidth: '35px',
      height: '35px',
      backgroundColor: '#f0f0f0',
      borderRadius: '50%',
      color: 'green',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '5px',
    },
    text: {
      margin: 0,
      fontSize: '15px',
      lineHeight: '1.5',
      textAlign: 'left',
    },
    rightSection: {
      flex: 1,
      minWidth: '250px',
      textAlign: 'center',
    },
    topImage: {
      width: '100%',
      marginBottom: '30px',
    },
    bottomImage: {
      width: '130px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <h2 style={styles.heading}>Do's</h2>
        <div style={styles.grid}>
          {dosList.map((text, index) => (
            <div key={index} style={styles.item}>
              <div style={styles.iconCircle}>✔</div>
              <p style={styles.text}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.rightSection}>
        <img src={dos} alt="Checklist" style={styles.topImage} />
        {/* Optional bottom icon */}
        {/* <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828764.png"
          alt="Do's Thumbs Up"
          style={styles.bottomImage}
        /> */}
      </div>
    </div>
  );
};

export default DosChecklist;
