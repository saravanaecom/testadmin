import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import aboutus from '../../assets/aboutus.png';

const AboutUsSection = () => {
  // Animation variants
  const leftVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const rightVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  return (
    <Box
      sx={{
        py: 8,
        px: 4,
        backgroundColor: "#fff",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* LEFT IMAGE */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={leftVariant}
          >
            <Box
              component="img"
              src={aboutus}
              alt="Fireworks Products"
              sx={{ width: "100%", borderRadius: 2 }}
            />
          </motion.div>
        </Grid>

        {/* RIGHT CONTENT */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={rightVariant}
          >
            <Typography variant="h6" sx={{ color: "#f4a300", fontWeight: 600, textAlign: 'left' }}>
              About Us
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: "bold", color: "red", mb: 2, textAlign: 'left' }}>
              Sivakasi Best Fireworks Crackers Shop
            </Typography>

            <Typography variant="body1" sx={{ mb: 3, textAlign: 'left' }}>
              “GG Crackers Shop” a leading seller and supplier of premium quality
              range of Sparklers, Ground Chakkars, Flower Pots, Twinkling Stars, Pencils,
              Atom Bombs, Rockets, Bijili Crackers, Bird Crackers, Laxmi Crackers, Aerial
              Shots, Fancy Fireworks, Colour matches and Diwali Gift Boxes at competitive prices.
            </Typography>

            <Typography variant="body1" sx={{ mb: 3, textAlign: 'left' }}>
             We have been growing steadily and occupying a remarkable position in the Indian Fireworks markets all 
             because of our reliable quality to our valuable buyers at affordable prices. Since its inception, 
             the group has been committed to its aim of offering high quality fire crackers at competitive price, 
             ensuring value for money.
            </Typography>

            <Button variant="contained" color="error" sx={{ mb: 4, float: 'left' }}>
              Read More
            </Button>

            {/* Stats */}
            <Grid container spacing={4}>
              <Grid item>
                <Typography variant="h4" sx={{ color: "red", fontWeight: "bold" }}>
                  300+
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#f4a300", fontWeight: 600 }}>
                  Products
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="h4" sx={{ color: "red", fontWeight: "bold" }}>
                  1000+
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#f4a300", fontWeight: 600 }}>
                  Happy Customers
                </Typography>
              </Grid>
            </Grid>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUsSection;
