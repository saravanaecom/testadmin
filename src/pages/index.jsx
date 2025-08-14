import BannerSlider from "../components/slider/BannerSlider";
import ImageCategorySlider from "../components/slider/ImageCategorySlider";
import OfferFastMovingProduct from "../components/slider/offerFastMovingProduct";
import ProductByIndexPage from '../components/slider/productByIndexPage';
import { Container } from '@mui/material';
import WhyChooseUs from "../components/Home/WhyChooseUs";
import ProductCategories from "../components/Home/ProductCategories";
import HeroSection from "../components/Home/HeroSection";
import BrandSlider from "../components/Home/BrandSlider";
import AboutUsSection from "../components/Home/AboutUsSection";
import slideparallax from '../assets/slideparallax.jpg';
import { Box } from "@mui/material";
import CreackersEffect from '../components/CreackersEffect';


export default function HomePage() {
    return (
        <>
            <Container maxWidth="xl">
                
            </Container>
            <BannerSlider />
                {/* <OfferFastMovingProduct/>            
                <ImageCategorySlider />
                <ProductByIndexPage/>                 */}
                <AboutUsSection/>
                <ProductCategories/>
                <ImageCategorySlider />
                <Box>
                    <img src={slideparallax} alt="slideparallax"/> 
                </Box>
                <OfferFastMovingProduct/>
                <BrandSlider />
                <HeroSection />
                <CreackersEffect/>
        </>
    )
};