import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Container, Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { API_FetchBannerOfferPost } from '../../services/bannerOfferPostServices';
import { ImagePathRoutes } from '../../routes/ImagePathRoutes';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const SliderWrapper = styled(Box)({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
    zIndex: 2,
    borderRadius: '4px'
  },
  '& .slick-dots': {
    bottom: 25,
    zIndex: 2,
    '& li': {
      margin: '0 6px'
    },
    '& li button:before': {
      color: '#FFFFFF',
      fontSize: 14,
      opacity: 0.6,
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    '& li.slick-active button:before': {
      color: '#FF9933',
      opacity: 1,
      transform: 'scale(1.3)'
    }
  },
  '& .slick-prev, & .slick-next': {
    zIndex: 2,
    width: 50,
    height: 50,
    background: 'rgba(255, 153, 51, 0.9)',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 153, 51, 1)',
      transform: 'scale(1.1)'
    },
    '&:before': {
      fontSize: 28,
      color: '#FFFFFF'
    }
  },
  '& .slick-prev': {
    left: 25
  },
  '& .slick-next': {
    right: 25
  }
});

const AnimatedSlide = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  '&:hover img': {
    transform: 'scale(1.03)'
  }
});

const SlideImage = styled(Box)({
  transition: 'transform 0.6s ease-in-out',
  animation: `${fadeIn} 0.8s ease-in-out`
});

export default function BannerSlider() {
  const [bannerSliderLists, setBannerSliderLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const GetBannerSliderLists = async () => {
    try {
      const bannerList = await API_FetchBannerOfferPost();
      setBannerSliderLists(bannerList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetBannerSliderLists();
  }, []);

  const settings = {
    dots: true,
    infinite: bannerSliderLists.length > 1,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: bannerSliderLists.length > 1,
    autoplaySpeed: 4000,
    arrows: true,
    fade: true,
    cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)"
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 3, pb: 4, px: { xs: 2, sm: 3 } }}>
      <SliderWrapper>
        <Slider {...settings}>
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    height: {
                      xs: 200,
                      sm: 320,
                      md: 420,
                      lg: 480,
                    },
                    width: "100%",
                    margin: '0 auto',
                    borderRadius: '16px'
                  }}
                />
              </Box>
            ))
          ) : (
            bannerSliderLists.map((item) => (
              <AnimatedSlide key={item.id}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(255,153,51,0.1) 0%, rgba(19,136,8,0.1) 100%)',
                    zIndex: 1,
                    borderRadius: '16px'
                  }}
                />
                <SlideImage
                  component="img"
                  sx={{
                    height: {
                      xs: 200,
                      sm: 320,
                      md: 420,
                      lg: 480,
                    },
                    width: "100%",
                    display: 'block',
                    margin: '0 auto',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    border: '3px solid transparent',
                    borderImage: 'linear-gradient(135deg, #FF9933, #138808) 1'
                  }}
                  src={ImagePathRoutes.BannerOfferPostImagePath + item.Imagepath}
                  alt={item.Imagepath}
                />
              </AnimatedSlide>
            ))
          )}
        </Slider>
      </SliderWrapper>
    </Container>
  );
}
