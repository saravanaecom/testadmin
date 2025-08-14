import React from "react";
import safetytips_bg from '../../assets/safetytips-bg.jpg'

const SafetyTipsBanner = () => {
  const styles = {
    wrapper: {
      position: "relative",
      backgroundImage: `url(${safetytips_bg})`, // Replace with your background image if needed
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "80px 20px",
      textAlign: "center",
      overflow: "hidden",
    },
    overlay: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#000",
      opacity: 0.1,
      zIndex: 1,
    },
    container: {
      position: "relative",
      zIndex: 2,
      maxWidth: "1140px",
      margin: "0 auto",
      padding: "0 15px",
    },
    heading: {
      color: "#fff",
      fontSize: "36px",
      fontWeight: "bold",
      margin: 0,
    },

    // Responsive adjustments
    '@media (maxWidth: 768px)': {
      heading: {
        fontSize: "28px",
      },
      wrapper: {
        padding: "60px 15px",
      },
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        <h1 style={styles.heading}>Safety Tips</h1>
      </div>
    </div>
  );
};

export default SafetyTipsBanner;
