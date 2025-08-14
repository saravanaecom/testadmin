import React from "react";
import Slider from "react-slick";
import { Container, Box, Card, CardMedia } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import brand1 from '../../assets/brand1.png';
import brand2 from '../../assets/brand5.png';
import brand3 from '../../assets/brand2.png';
import brand4 from '../../assets/brand5.png';

const brandData = [
  { name: "brand", img: brand1 },
  { name: "brand", img: brand2 },
  { name: "brand", img: brand3 },
  { name: "brand", img: brand4 },
];

const styles = {
heading_sec: {
    textAlign: 'center',
    paddingBottom: '20px'
  },
  h1: {
    fontWeight: 700,  
    fontSize: '2.5rem',
    color: '#e31e0d'
  },
  smallborder: {
    width: '60px',
    height: '2px',
    background: '#e31e0d',
    margin: '0 auto'
}
};

export default function BrandSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <Container maxWidth="xl">
                   <Box sx={{ textAlign: "center", py: 5 }}>
      <div style={styles.heading_sec}>
		<h1 style={styles.h1}>Our Brands</h1>
		<div style={styles.smallborder}></div>
		</div>
      <Box sx={{ width: "90%", mx: "auto" }}>
        <Slider {...settings}>
          {brandData.map((brand, index) => (
            <Card
              key={index}
              sx={{
                p: 2,
                mx: 1,
                borderRadius: 2,
                boxShadow: "none",
              }}
            >
              <CardMedia
                component="img"
                height="120"
                image={brand.img}
                alt={brand.name}
                sx={{ objectFit: "contain" }}
              />
            </Card>
          ))}
        </Slider>
      </Box>
    </Box>     
                    </Container>
    
  );
}
