/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ImagePathRoutes } from '../../routes/ImagePathRoutes';
import { useCart } from '../../context/CartContext';
import { ServerURL } from '../../server/serverUrl';
import { useTheme } from '@mui/material/styles';

const ProductItemCard = ({ product }) => {
  const theme = useTheme();
  const { cartItems, setCartItems } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(product?.Price || 0);

  const handleIncrement = (event) => {
    event.stopPropagation();
    let cartItemsStorage = JSON.parse(localStorage.getItem('cartItems'));

    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setCartItems((prevCartItems) => {
        const existingProductIndex = prevCartItems.findIndex(
          (item) => item.Id === product?.Id
        );

        let updatedCartItems;

        if (existingProductIndex >= 0) {
          updatedCartItems = prevCartItems.map((item, index) =>
            index === existingProductIndex
              ? { ...item, item: item.item + 1, totalMRP: product.MRP * (item.item + 1), totalPrice: (product.selectedPrice > 0 ? product.selectedPrice : product.Price) * (item.item + 1),
                selectedPrice: product.selectedPrice,
                selectedMRP: product.MRP * (item.item + 1)
               }
              : item
          );
        } else {
          updatedCartItems = [...prevCartItems, { ...product, item: 1, totalMRP: product.MRP, totalPrice: (product.selectedPrice > 0 ? product.selectedPrice : product.Price),
            selectedPrice: product.selectedPrice,
            selectedMRP: product.selectedMRP
           }];
        }

        if (newQuantity > 1) {
          setTotalPrice((prevPrice) => prevPrice + (product.selectedPrice > 0 ? product.selectedPrice : product.Price));
        }

        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return updatedCartItems;
      });
      return newQuantity;
    });
  };

  const handleDecrement = (event) => {
    event.stopPropagation();

    setCartItems((prevCartItems) => {
      const existingProductIndex = prevCartItems.findIndex(
        (item) => item.Id === product?.Id
      );

      let updatedCartItems = [];

      if (existingProductIndex >= 0) {
        const updatedQuantity = prevCartItems[existingProductIndex].item - 1;

        if (updatedQuantity > 0) {
          // If the product exists and quantity is greater than 0, decrement its quantity
          updatedCartItems = prevCartItems.map((item, index) =>
            index === existingProductIndex
              ? {
                ...item,
                item: updatedQuantity,
                totalMRP: (product.selectedMRP > 0 ? product.selectedMRP : product.MRP) * updatedQuantity,
                totalPrice: (product.selectedPrice > 0 ? product.selectedPrice : product.Price) * updatedQuantity,
                selectedPrice: product.selectedPrice,
                selectedMRP: (product.MRP) * updatedQuantity,
              }
              : item
          );
        } else {
          // If the quantity is 0, remove the item from the cart
          updatedCartItems = prevCartItems.filter(
            (item, index) => index !== existingProductIndex
          );
        }
      } else {
        updatedCartItems = prevCartItems;
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });

    // Decrement quantity state only after checking cart items
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        setTotalPrice((prevPrice) => prevPrice - (product.selectedPrice > 0 ? product.selectedPrice : product.Price));
      }
      return prevQuantity > 0 ? prevQuantity - 1 : 0;
    });
  };


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: { xs: '8px', sm: '12px' },
        padding: { xs: '12px 8px', sm: '16px 12px' },
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        mb: 1,
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: '#FFF5EB',
          boxShadow: '0 2px 8px rgba(255, 153, 51, 0.1)',
        }
      }}
    >
      <Box
        component="img"
        sx={{
          width: { xs: 60, sm: 70 },
          height: { xs: 60, sm: 70 },
          borderRadius: '8px',
          marginRight: 0,
          objectFit: 'cover',
          border: '2px solid #FFF5EB',
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }}
        src={ImagePathRoutes.ProductImagePath + product.Img0}
        alt={product.Description}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="p"
          sx={{
            fontSize: { xs: '13px', sm: '14px' },
            fontWeight: 600,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
            lineHeight: '1.4',
            fontFamily: 'inherit',
            minHeight: '20px',
            color: '#1a1a2e',
            mb: 0.5,
          }}
        >
          {product.Description}
        </Typography>
        <Typography variant="p" color="textSecondary"
          sx={{
            fontSize: { xs: '11px', sm: '12px' },
            color: '#4a4a4a',
            fontWeight: 500,
          }}
        >
          {product.UnitType}
        </Typography>
      </Box>
      <Button
        variant="outlined"
        sx={{
          minWidth: { xs: '70px', sm: '80px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #FFF5EB 0%, #FFFFFF 100%)',
          border: `2px solid ${theme.palette.basecolorCode.main}`,
          color: theme.palette.basecolorCode.main,
          fontFamily: 'inherit',
          marginRight: 0,
          padding: { xs: '6px 8px', sm: '8px 10px' },
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(255, 153, 51, 0.15)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FFE6CC 0%, #FFF5EB 100%)',
            border: `2px solid ${theme.palette.basecolorCode.main}`,
            color: theme.palette.basecolorCode.main,
            boxShadow: '0 4px 8px rgba(255, 153, 51, 0.25)',
          }
        }}
      >
        <Typography
          variant="body2"
          onClick={(e) => { handleDecrement(e); }}
          disabled={quantity === 0}
          sx={{
            width: '25%',
            color: theme.palette.basecolorCode.main,
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: { xs: '16px', sm: '18px' },
            cursor: 'pointer',
            transition: 'transform 0.1s ease',
            '&:active': {
              transform: 'scale(0.9)',
            }
          }}
        >
          −
        </Typography>
        <Typography
          variant="body2"
          sx={{
            width: '50%',
            color: theme.palette.basecolorCode.main,
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: { xs: '14px', sm: '15px' },
          }}
        >
          {product.item}
        </Typography>
        <Typography
          variant="body2"
          id={product?.Productid ? product.Productid : product?.Id}
          name={product.Description}
          value={product?.Productid ? product.Productid : product?.Id}
          onClick={(e) => { handleIncrement(e); }}
          sx={{
            width: '25%',
            color: theme.palette.basecolorCode.main,
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: { xs: '16px', sm: '18px' },
            cursor: 'pointer',
            transition: 'transform 0.1s ease',
            '&:active': {
              transform: 'scale(0.9)',
            }
          }}
        >
          +
        </Typography>
      </Button>
      <Box sx={{ textAlign: 'right', minWidth: { xs: '60px', sm: '70px' } }}>
        <Typography variant="p" sx={{ 
          fontWeight: 700, 
          fontSize: { xs: '14px', sm: '15px' },
          color: '#138808',
          display: 'block',
          mb: 0.3,
        }}>
          {(product.totalPrice || 0).toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY })}
        </Typography>
        <Typography
          variant="body2"
          sx={{ 
            textDecoration: 'line-through', 
            color: '#9e9e9e', 
            fontSize: { xs: '11px', sm: '12px' },
            fontWeight: 500,
          }}
        >
          {((product.selectedMRP > 0 ? product.selectedMRP : product.MRP) || 0).toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY })}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductItemCard;
