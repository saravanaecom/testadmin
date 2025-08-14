import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from "@mui/material";
import welcomeside1 from '../../assets/welcomeside1.jpg';
import welcomeside2 from '../../assets/welcomeside2.jpg';
import welcomeside3 from '../../assets/welcomeside3.jpg';
import welcomeside4 from '../../assets/welcomeside4.jpg';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '40px 20px',
    gap: '40px',
    justifyContent: 'center',
    textAlign: 'left'
  },
  leftContent: {
    flex: '1 1 500px',
    maxWidth: '700px',
  },
  rightContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: '1 1 300px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#e31e0d',
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '12px',
  },
  subheading: {
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  circle: {
    width: '35px',
    height: '35px',
    backgroundColor: '#e31e0d',
    color: 'white',
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '35px',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  line: {
    height: '2px',
    backgroundColor: '#B4553B',
    flexGrow: 1,
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: '16px',
    margin: 0,
  },
  cardDesc: {
    fontSize: '14px',
    color: '#444',
    lineHeight: '1.5',
  },
  button: {
    marginTop: '30px',
    backgroundColor: '#e31e0d',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  imageBox: {
    width: '220px',
    height: '220px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightCol: {
    width: '100%',
    maxWidth: '50%',
    paddingTop: '2rem',
    float: 'left',
  },
  imagesGrid: {
    display: 'flex',
    gap: '1rem',
  },
  image: {
    width: '100%',
    borderRadius: '12px',
  },
  highlightBox: {
    height: '50px',
    marginBottom: '1rem',
  },
  heading_sec: {
    textAlign: 'center',
  },
  h1: {
    fontWeight: 700,
    fontSize: '2.5rem',
    color: '#e31e0d'
  },
  smallborder: {
    width: '80px',
    height: '2px',
    background: '#e31e0d',
    margin: '0 auto'
  }
};

const WhyChooseUs = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: 'Quality Parameters',
      description:
        'Despite of having huge demand in the markets, we maintain and deliver our products with industry standards.',
    },
    {
      id: 2,
      title: 'Own Manufacturing',
      description:
        'We are having our own production units, with huge storage area. It involves keeping the customer front and center.',
    },
    {
      id: 3,
      title: 'Reasonable Price',
      description:
        'Being a manufacturer we are able to provide our products with very competitive price in the market.',
    },
    {
      id: 4,
      title: 'Safe Delivery',
      description:
        'Safe product Delivery is more of a mindset or approach to the work, rather than a quantifiable process. We are experienced in it.',
    },
  ];

  const images = [
    { src: welcomeside1, bg: '#FFC107' },
    { src: welcomeside3, bg: '#E91E63' },
    { src: welcomeside4, bg: '#FFEB3B' },
    { src: welcomeside2, bg: '#FFEB3B' },
  ];

  function handleViewBtnClick(id, value) {
    navigate(`categories?cid=${btoa(id)}&cname=${btoa(value)}`);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h6" sx={{ color: "#f4a300", fontWeight: 600, textAlign: 'left' }}>
          Why Choose Us
        </Typography>
        <div style={styles.container}>
          <div style={styles.leftContent}>
            <h2 style={styles.heading}>GG Crackers Shop</h2>
            <p style={styles.subheading}>
              We "GG Crackers Shop" acknowledged as the renowned manufacturer, supplier of an exclusive range of
              firecrackers like Ground Chakkars, Flower Pots, Twinkling Star, Garlands, Fancy Rockets, Atom Bombs, Night
              Shots and more.
            </p>
            <div style={styles.cardGrid}>
              {cards.map((card) => (
                <div key={card.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <div style={styles.circle}>{card.id}</div>
                    <div style={styles.line} />
                  </div>
                  <h4 style={styles.cardTitle}>{card.title}</h4>
                  <p style={styles.cardDesc}>{card.description}</p>
                </div>
              ))}
            </div>
            <Button onClick={() => handleViewBtnClick('all_categories', 'All Categories')} style={styles.button}>View All Products</Button>
          </div>

          <div style={styles.rightCol}>
            <div style={styles.imagesGrid}>
              <div>
                <img src={welcomeside1} alt="Sivakasi Fireworks Crackers" style={styles.image} />
                <img src={welcomeside3} alt="Factory Outlet Crackers" style={{ ...styles.image, marginTop: '1.5rem' }} />
              </div>
              <div>
                <div style={styles.highlightBox}></div>
                <img src={welcomeside4} alt="Factory Outlet Crackers" style={styles.image} />
                <img src={welcomeside2} alt="Diwali Crackers Sale" style={{ ...styles.image, marginTop: '1.5rem' }} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default WhyChooseUs;