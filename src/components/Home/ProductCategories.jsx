import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import Chakkars from '../../assets/pro8.jpg';
import { ImagePathRoutes } from '../../routes/ImagePathRoutes';
import { API_FetchCategory } from '../../services/categoryServices';


const styles = {
  card: {
    position: "relative",
    zIndex: 1,
    width: "278px",
    margin: "0 auto",
    marginBottom: "30px",
    cursor: "pointer",
    "&:hover .hovertext": {
      // left: "0px",
      // visibility: "visible",
      // opacity: 1,
      // zIndex: 1,
      background: "#F7414D",
    },
  },
  thumb: {
    borderRadius: "10px",
    position: "relative",
    overflow: "hidden",
    width: "100%",
  },
  img: {    
    borderRadius: '10px',
    position: 'relative',
    marginLeft: 'auto',
    width: '278px',
    height: '278px'
  },
  socialContainer: {
    position: "absolute",
    left: "0px",
    top: "16px",
    transition: "0.4s ease-in-out",
    opacity: 0,
    visibility: "hidden",
    zIndex: -1,
  },
  socialList: {
    display: "flex",
    alignproducts: "center",
    flexDirection: "column",
    background: "#f0f0f0",
    padding: "15px 9px",
    gap: "6px",
    borderRadius: "5px 0 0 5px",
    margin: 0,
    listStyle: "none",
  },
  content: {
    textAlign: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "30px",
    background: "#0F1437",
    borderRadius: "10px",
    padding: "20px 10px",
    transition: "0.3s ease-in-out",
  },
  title: {
    fontWeight: 600,
    fontSize: "20px",
    marginBottom: "8px",
    color: "#fff",
  },
  hoverEffect: {
    "&:hover .social": {
      left: "0px",
      visibility: "visible",
      opacity: 1,
      zIndex: 1,
    },
  },
};

export default function ProductCategories() {
  const navigate = useNavigate();
  const [categoryLists, setCategoryLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCategoryClickChange = (event, id, newValue) => {
    const selectedCategoryId = event.currentTarget.id;
    navigate(`/product-list?pcid=${btoa(selectedCategoryId)}&pcname=${btoa(newValue)}`);
  };

  const ShopByCategoryLists = async () => {
    try {
      const categoryList = await API_FetchCategory();
      setCategoryLists(categoryList);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    ShopByCategoryLists();
  }, []);

  return (
    <Box sx={{ backgroundColor: "white", py: 5 }}>      
      <Typography variant="h4" align="center" marginBottom={5} color={"red"} gutterBottom fontWeight={700}>
        Product Categories
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {categoryLists.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}
            key={index} id={product.Id} value={product.Category}
            onClick={(event) => handleCategoryClickChange(event, product.Id, product.Category)}
            sx={styles.hoverEffect}>
            <Box sx={styles.card} className="social-card">
              <Box sx={styles.thumb}>
                <a href={product.link}>
                  <img src={ImagePathRoutes.CategoryImagePath + product.ImagePath}
                    alt={product.Category} style={styles.img} />
                </a>
                <Box className="social" sx={styles.socialContainer}>
                  <ul style={styles.socialList}>
                    <li>
                      <IconButton
                        component="a"
                        href="https://www.facebook.com"
                        target="_blank"
                        sx={{ background: "white" }}
                      >
                        <FacebookIcon fontSize="small" />
                      </IconButton>
                    </li>
                    <li>
                      <IconButton
                        component="a"
                        href="https://www.youtube.com"
                        target="_blank"
                        sx={{ background: "white" }}
                      >
                        <YouTubeIcon fontSize="small" />
                      </IconButton>
                    </li>
                    <li>
                      <IconButton
                        component="a"
                        href="https://www.instagram.com"
                        target="_blank"
                        sx={{ background: "white" }}
                      >
                        <InstagramIcon fontSize="small" />
                      </IconButton>
                    </li>
                  </ul>
                </Box>
              </Box>
              <Box className="hovertext" sx={styles.content}>
                <Typography sx={styles.title}>{product.Category}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
