import React from "react";
import { Box, Typography, Button } from "@mui/material";
import aboutparallax from "../../assets/aboutparallax.jpg"

export default function HeroSection() {
  return (    
    <Box
      sx={{
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "white",
        backgroundImage: `url(${aboutparallax})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        px: 2,
      }}
    >
      {/* Overlay for darkening */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      />
      
      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          We are one of the leading sellers of Sivakasi Firecrackers
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Our service created a positive image among our customers.
          We are available On 24 x 7 Support. Order and let's Purchase
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ffca28",
            color: "black",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#ffc107" },
          }}
        >
          Contact now
        </Button>
      </Box>
    </Box>
  );
}
