import React, {useEffect} from 'react';
import { Box, Typography } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; 
import { useCart } from '../../context/CartContext';
import { ServerURL } from '../../server/serverUrl';

const DeliveryBanner = () => {
  const { cartItems } = useCart();
  const [SavingsAmount, setSavingsAmount] = React.useState(0);

  useEffect(() => {
    if (cartItems.length > 0) {
      const totalMRP = cartItems.reduce((acc, item) => acc + (item.totalMRP || 0), 0);
      const totalPrice = cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  
      setSavingsAmount(totalMRP - totalPrice);
    } else {
      setSavingsAmount(0);
    }
  }, [cartItems]);
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #138808 0%, #0F6B06 100%)',
        padding: '12px 20px',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 4px 12px rgba(19, 136, 8, 0.2)',
        borderRadius: '0 0 12px 12px',
        mb: 1,
      }}
    >      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocalOfferIcon size="small" sx={{ fontSize: '18px', color: '#FFFFFF' }} />
        <Typography variant="span" sx={{ fontWeight: 700, fontSize: '14px', color: '#FFFFFF' }}>
          You saved {(SavingsAmount || 0).toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}!
        </Typography>
      </Box>
    </Box>
  );
};

export default DeliveryBanner;
