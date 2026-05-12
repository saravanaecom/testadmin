/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { Container } from '@mui/material';
import { ImagePathRoutes } from '../../routes/ImagePathRoutes';
import { API_FetchCategory } from '../../services/categoryServices';
import { useTheme } from '@mui/material/styles';
import AllCategories from '../../assets/All-categories.png';
import TopOffers from '../../assets/top-offers.png';
import NewProducts from '../../assets/new-products.png';

const TopCategory = (props) => {
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryLists, setCategoryLists] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);   
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [isActiveCategory, setIsActiveCategory] = React.useState(false); 

  const handleCategoryClickChange = (event, newValue) => {
    const selectedCategoryId = event.currentTarget.id; 
    setCategoryValue(newValue); 
    navigate(`/product-list?pcid=${btoa(selectedCategoryId)}&pcname=${btoa(newValue)}`);
  };

  function handleViewBtnClick (id, value){
    if(id !== 'all_categories'){
      navigate(`/product-list?pcid=${btoa(id)}&pcname=${btoa(value)}`);
    }
    else{
      navigate(`/categories?cid=${btoa(id)}&cname=${btoa(value)}`);
    }
  };


  const FetchTopCategoryLists = async () => {
    try {
      const categoryList = await API_FetchCategory();
      setCategoryLists(categoryList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchTopCategoryLists();
    if(location.pathname.startsWith('/product-list')){
      setIsActiveCategory(true);
    }
    else{
      setIsActiveCategory(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.get_catgory_lists && props.get_catgory_lists.length > 0) {
      // Set categories from Redux store if available
      // setCategoryLists(props.get_catgory_lists);
      setIsLoading(false); // Data is loaded, stop the loading state
    }

    const params = new URLSearchParams(location.search);
    const pcid = params.get('pcid');
    const pcname = params.get('pcname');
    if (pcid && pcname) {
      const decodedPcid = atob(pcid);
      const decodedPcname = atob(pcname);
      setCategoryValue(decodedPcname);      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.get_catgory_lists]);

  return (
    <Box sx={{ maxWidth: "100%", overflowX: 'auto', bgcolor: '#FFFFFF', borderBottom: '1px solid #e0e0e0' }}>
      <Container
        maxWidth={{ xs: false, sm: 'xl' }}
        sx={{ pt: 2, pb: 2, p: { xs: 0, sm: 0 } , overflowX: 'auto' }}
      >
        <Tabs
          value={categoryValue}
          onChange={handleCategoryClickChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable prevent tabs example"
          sx={{
            '.MuiTabs-indicator': {
              backgroundColor: '#FF9933',
              height: '3px',
              borderRadius: '2px',
            },
            '.MuiTabs-scrollButtons': {
              color: '#FF9933',
            },
          }}
        >
          {/* Three static tabs */}
          <Tab            
            sx={{
              cursor: "pointer",
              borderRadius: '8px',
              mx: 0.5,
              '&.Mui-selected': {
                color: '#FF9933',
                backgroundColor: '#FFF5EB',
              },
              '&:hover': {
                backgroundColor: '#FFF5EB',
              },
            }}
            value="all_categories"
            id="all_categories"
            onClick={() => handleViewBtnClick('all_categories', 'All Categories')}
            label={
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={AllCategories}
                  sx={{ width: 55, height: 55, mb: 0.5, border: '2px solid #FFF5EB', boxShadow: '0 2px 8px rgba(255, 153, 51, 0.15)' }}
                />
                <Typography variant="caption" sx={{ textAlign: 'center', textTransform: 'capitalize', fontWeight: 600, fontSize: '13px', color: '#1a1a2e'}}>
                  All Categories
                </Typography>
              </Box>
            }
          />

          <Tab
            sx={{
              cursor: "pointer",
              borderRadius: '8px',
              mx: 0.5,
              '&.Mui-selected': {
                color: '#FF9933',
                backgroundColor: '#FFF5EB',
              },
              '&:hover': {
                backgroundColor: '#FFF5EB',
              },
            }}
            value="offer_product"
            id="offer_product"
            onClick={() => handleViewBtnClick('offer_product', 'Offer Products')}
            label={
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={TopOffers}
                  sx={{ width: 55, height: 55, mb: 0.5, border: '2px solid #FFF5EB', boxShadow: '0 2px 8px rgba(255, 153, 51, 0.15)' }}
                />
                <Typography variant="caption" sx={{ textAlign: 'center', textTransform: 'capitalize', fontWeight: 600, fontSize: '13px', color: '#1a1a2e'}}>
                  Top Offers
                </Typography>
              </Box>
            }
          />

          <Tab
            sx={{
              cursor: "pointer",
              borderRadius: '8px',
              mx: 0.5,
              '&.Mui-selected': {
                color: '#FF9933',
                backgroundColor: '#FFF5EB',
              },
              '&:hover': {
                backgroundColor: '#FFF5EB',
              },
            }}
            value="new_product"
            id="new_product"
            onClick={() => handleViewBtnClick('new_product', 'New Products')}
            label={
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={NewProducts}
                  sx={{ width: 55, height: 55, mb: 0.5, border: '2px solid #FFF5EB', boxShadow: '0 2px 8px rgba(255, 153, 51, 0.15)' }}
                />
                <Typography variant="caption" sx={{ textAlign: 'center', textTransform: 'capitalize', fontWeight: 600, fontSize: '13px', color: '#1a1a2e' }}>
                  New Arrivals
                </Typography>
              </Box>
            }
          />

          {/* Dynamically loaded category list */}
          {isLoading ? (
            [...Array(18)].map((_, index) => (
              <Tab
                key={index}
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Skeleton variant="circular" width={55} height={55} />
                    <Skeleton variant="text" width={70} height={20} sx={{ mt: 0.5 }} />
                  </Box>
                }
              />
            ))
          ) : (
            categoryLists.map((item, index) => (
              <Tab
                sx={{
                  cursor: "pointer",
                  borderRadius: '8px',
                  mx: 0.5,
                  '&.Mui-selected': {
                    color: '#FF9933',
                    backgroundColor: '#FFF5EB',
                  },
                  '&:hover': {
                    backgroundColor: '#FFF5EB',
                  },
                }}
                key={index}
                id={item.Id}
                value={item.Category}
                onClick={(event) => handleCategoryClickChange(event, item.Id)}
                label={
                  <Box id={item.Id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar
                      src={ImagePathRoutes.CategoryImagePath + item.ImagePath}
                      sx={{ width: 55, height: 55, mb: 0.5, border: '2px solid #FFF5EB', boxShadow: '0 2px 8px rgba(255, 153, 51, 0.15)' }}
                      alt={item.Category}
                    />
                    <Typography variant="caption" sx={{ textAlign: 'center', textTransform: 'capitalize', fontWeight: 600, fontSize: '13px', color: '#1a1a2e' }}>
                      {item.Category}
                    </Typography>
                  </Box>
                }
              />
            ))
          )}
        </Tabs>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    get_catgory_lists: state.get_catgory_lists, // Get category lists from Redux state
  };
};

export default connect(mapStateToProps, null)(TopCategory);
