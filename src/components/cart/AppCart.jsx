/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeliveryBanner from './deliveryBanner';
import ProductItemCard from './productItemCard';
import AccordionAmountDetails from './accordionAmountDetails';
import CouponModal from './couponsModal';
import emptyCartImage from '../../assets/empty-cart.png';
import addressHomeIcon from '../../assets/address_home_icon.webp';
import AddressChangeModal from './addressChangeModal';
import { useCart } from '../../context/CartContext';
import { ServerURL } from '../../server/serverUrl';
import { API_FetchMinimumOrderAmount } from '../../services/checkoutServices';

const drawerWidth = 380;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
  background: '#FFF',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',

}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    position: 'relative',
    overflow: 'scroll',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }),
);

export default function AppCart({ CartDrawerOpen, setLoginDrawerOpen, handleAuthDrawerToggle }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  const [UserId, setUserId] = React.useState(0);
  const [ModalOpen, setModalOpen] = React.useState(false);
  const [ClearCartOpen, setClearCartOpen] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState('No address selected');
  const [WalletAmount, setWalletAmount] = React.useState(0);
  const [useWallet, setUseWallet] = React.useState(false);
  const [MinimumOrderAmountList, setMinimumOrderAmountList] = React.useState([]);
  const [MinimumOrderAmount, setMinimumOrderAmount] = React.useState(ServerURL.MINIMUM_ORDER_AMOUNT);
  const [CashOnDeliveryLimit, setCashOnDeliveryLimit] = React.useState(ServerURL.MINIMUM_ORDER_AMOUNT);
  const [minAmountCheck, setMinAmountCheck] = React.useState(false);

  const handleChangeAddressOpen = () => {
    let userLogin = localStorage.getItem("userLogin");
    let userId = Number(atob(localStorage.getItem("userId")));
    if (userLogin === null) {
      handleAuthDrawerToggle(false);
      setLoginDrawerOpen(true);      
    }
    else if(userLogin === "false" || userId === 0){
      handleAuthDrawerToggle(false);
      setLoginDrawerOpen(true);  
    }
    else{
      setUserId(userId);
      setModalOpen(true);
    }
  };

  const handleChangeAddressClose = () => setModalOpen(false);

  // update the selected address
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setModalOpen(false);
  };

  // useEffect(() => {
  //   if(CartDrawerOpen === true){
  //     const selectedAddress = JSON.parse(sessionStorage.getItem("selectedAddress"));
  //     setSelectedAddress(selectedAddress);
  //   }    
  // }, [CartDrawerOpen]);

  const handleBrowseProducts = () => {
    handleAuthDrawerToggle(false);
    navigate(`/`);
  };

  //Clear cart items
  const handleClearCartItemsOpen = () => {
    setClearCartOpen(true);
  };

  const handleClearCartItemsClose = () => {
    setClearCartOpen(false);
  };

  const handleClearCartItems = () => {
    localStorage.removeItem('cartItems');
    setCartItems([]);
    setClearCartOpen(false);
  };

  // Handle wallet checkbox change
  const handleWalletCheckboxChange = (event) => {
    if (event.target.checked === true) {
      setUseWallet(event.target.checked);
      localStorage.setItem('UseWallet', true);
    }
    else {
      setUseWallet(event.target.checked);
      localStorage.setItem('UseWallet', false);
    }
  };

  //Handle proceed
  const handleProceedItems = () => {
    let userLogin = localStorage.getItem("userLogin");
    let userId = Number(atob(localStorage.getItem("userId")));
    setUserId(userId);
    if (userLogin === null) {
      handleAuthDrawerToggle(false);
      setLoginDrawerOpen(true);      
    }
    else if(userLogin === "false" || userId === 0){
      handleAuthDrawerToggle(false);
      setLoginDrawerOpen(true);  
    }
    else if (selectedAddress !== 'No address selected') {
      const CartTotalAmount = cartTotalAmountCheck();
      FetchMinimumOrderAmount();

      if (CartTotalAmount >= 0) {
        if (useWallet === true) {
          handleAuthDrawerToggle(false);
          navigate(`/product-checkout?Wallet=${btoa(WalletAmount)}`);
        }
        else {
          handleAuthDrawerToggle(false);
          navigate(`/product-checkout`);
        }
      }
      else {
        setMinAmountCheck(true);
      }      
    }
    else {
      setModalOpen(true);
    }
  };

  //Load minimum order amount lists
  const FetchMinimumOrderAmount = async () => {
    try {
      const list = await API_FetchMinimumOrderAmount();
      if (list.length !== 0) {
        setMinimumOrderAmountList(list);
        setMinimumOrderAmount(list[0].MinOrderAmount);
        setCashOnDeliveryLimit(list[0].CashOnDeliveryLimit);
      }
      else {
        setMinimumOrderAmountList([]);
        setMinimumOrderAmount(ServerURL.MINIMUM_ORDER_AMOUNT);
        setCashOnDeliveryLimit(ServerURL.CSAH_ON_DELIVERY_LIMIT);
      }
    } catch (error) {
      setMinimumOrderAmountList([]);
      setMinimumOrderAmount(ServerURL.MINIMUM_ORDER_AMOUNT);
      setCashOnDeliveryLimit(ServerURL.CSAH_ON_DELIVERY_LIMIT);
      console.error('Error fetching amount lists:', error);
    }
  };

  function cartTotalAmountCheck() {
    if (cartItems.length > 0) {
      const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
      return totalPrice;
    }
  }

  return (
    <>
      <Dialog
        open={ClearCartOpen}
        onClose={handleClearCartItemsClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to clear cart items?"}
        </DialogTitle>
        <DialogActions sx={{ gap: '20px' }}>
          <Button variant='contained' size='small' sx={{ background: '#7575751a', color: '#000', boxShadow: 'none', '&:hover': { background: '#7575751a', color: '#000', boxShadow: 'none' } }} onClick={handleClearCartItemsClose} autoFocus>Cancel</Button>
          <Button variant='contained' size='small' sx={{ background: '#ef4372', color: '#FFF', boxShadow: 'none', '&:hover': { background: '#ef4372', color: '#FFF', boxShadow: 'none' } }} onClick={handleClearCartItems}>
            Clear all
          </Button>
        </DialogActions>
      </Dialog>

      <AddressChangeModal UserId={UserId} setUserId={setUserId} ModalOpen={ModalOpen} handleChangeAddressClose={handleChangeAddressClose} handleAddressSelect={handleAddressSelect} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF5EB 100%)',
            zIndex: 1
          },
        }}
        //variant="persistent"
        anchor="right"
        open={CartDrawerOpen}
        onClose={() => handleAuthDrawerToggle(false)}
      >
        <DrawerHeader>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: 'linear-gradient(135deg, #FF9933 0%, #FFB366 100%)', px: 1, borderRadius: '0 0 12px 12px' }}>
            <Button onClick={handleAuthDrawerToggle} sx={{ color: "#FFFFFF" }}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              <Typography component={"p"} fontSize={"16"} fontWeight={700} sx={{ textTransform: "capitalize", color: "#FFFFFF" }}>My Cart</Typography>
            </Button>
            <Button onClick={handleClearCartItemsOpen} sx={{ color: "#FFFFFF", textTransform: "capitalize", fontWeight: 600, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' } }}>
              Clear Cart
            </Button>
          </Box>
        </DrawerHeader>
        <DeliveryBanner />

        <Main>
          {cartItems.length === 0 ? (
            <Box sx={{textAlign: 'center', padding: 4, background: '#FFFFFF', borderRadius: '12px', m: 2 }}>
              <Box
                component="img"
                src={emptyCartImage}
                alt="Empty Cart"
                sx={{ width: 250, height: 140, margin: 'auto', opacity: 0.8 }}
              />
              <Typography variant="h6" sx={{ marginTop: 2, fontSize: '16px', fontWeight: 700, fontFamily: 'inherit', color: '#1a1a2e' }}>
                Your cart is empty
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1, fontSize: '14px', fontFamily: 'inherit', color: '#4a4a4a' }}>
                Add items to get started
              </Typography>
              <Button
                variant="contained"
                sx={{ 
                  marginTop: 3, 
                  textTransform: 'capitalize', 
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #FF9933 0%, #FFB366 100%)',
                  color: '#FFFFFF',
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(255, 153, 51, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #E68A2E 0%, #FF9933 100%)',
                    boxShadow: '0 6px 16px rgba(255, 153, 51, 0.4)',
                  }
                }}
                onClick={handleBrowseProducts}
              >
                Browse Products
              </Button>
            </Box>
          ) : (
            cartItems.map((product, index) => (
              <Box key={index} sx={{ position: 'relative', background: "#FFF", px: 1 }}>
                <ProductItemCard product={product} />
              </Box>
            ))
          )}          
        </Main>
        {cartItems.length !== 0 && (
          <>
            <Box sx={{ width: '100%', display: 'block', position: 'sticky', bottom: '0', background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF5EB 100%)', py: 3, px: 2, boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.08)', borderRadius: '12px 12px 0 0' }}>
            {cartItems.length !== 0 && (
            <>
              {/* <CouponModal /> */}
              <AccordionAmountDetails useWallet={useWallet} walletAmount={WalletAmount} />
            </>
          )}
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={9} sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', background: '#FFFFFF', p: 1.5, borderRadius: '8px', border: '2px solid #FFF5EB' }}>
                      <img src={addressHomeIcon} style={{ width: '30px', height: '30px' }} />
                      <Typography variant="body1" ml={1}>
                        {selectedAddress !== 'No address selected'
                          ? <Typography
                            sx={{
                              fontSize: '13px',
                              fontWeight: '500',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 4,
                              WebkitBoxOrient: 'vertical',
                              textOverflow: 'ellipsis',
                              lineHeight: '18px',
                              fontFamily: 'inherit',
                              minHeight: '25px',
                              width: '100%',
                              marginRight: 0,
                              color: '#1a1a2e',
                            }}
                          >{selectedAddress?.Address1}, {selectedAddress?.Address2}, {selectedAddress?.City} - {selectedAddress?.Pincode}</Typography>
                          : <Typography component={'span'} sx={{ color: '#dc3545', fontWeight: 600, fontSize: '13px' }}>No address selected</Typography>}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3} underline="always" sx={{ color: '#FF9933', textAlign: 'center', fontSize: '16px', display: 'flex', alignItems: 'center' }}>
                    <Button onClick={handleChangeAddressOpen} sx={{ 
                      color: '#FF9933', 
                      fontWeight: 700,
                      fontSize: '13px',
                      '&:hover': {
                        backgroundColor: '#FFF5EB',
                      }
                    }}>Change</Button>
                  </Grid>
                </Grid>
              </Box>
              {WalletAmount > 0 && (
                <Box display="flex" alignItems="center" justifyContent="space-between" mt={2} sx={{ background: '#E8F5E9', p: 1.5, borderRadius: '8px', border: '2px solid #138808' }}>
                  <FormGroup>
                    <FormControlLabel
                      sx={{ fontSize: '14px', p: 0, '& .MuiFormControlLabel-label': { fontWeight: 600, color: '#138808' } }}
                      control={<Checkbox onChange={handleWalletCheckboxChange} size='small' sx={{ color: '#138808', '&.Mui-checked': { color: '#138808' } }} />}
                      label={`Pay ${(WalletAmount || 0).toLocaleString('en-IN', {
                        style: 'currency',
                        currency: ServerURL.CURRENCY,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })} from Wallet`}
                    />
                  </FormGroup>
                </Box>
              )}
              {minAmountCheck &&(
                <Box sx={{ background: '#fff5f5', p: 1.5, borderRadius: '8px', border: '2px solid #dc3545', mt: 2 }}>
                  <Typography align='center' sx={{ color: '#dc3545', fontWeight: 600, fontSize: '14px' }}>Minimum order above ₹300</Typography>
                </Box>
              )}
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Button
                  size='small'
                  variant='contained'
                  onClick={handleProceedItems}
                  sx={{
                    width: '100%',
                    borderRadius: '8px',
                    padding: '12px 20px',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '15px',
                    background: 'linear-gradient(135deg, #138808 0%, #0F6B06 100%)',
                    border: 'none',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(19, 136, 8, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0F6B06 0%, #138808 100%)',
                      boxShadow: '0 6px 16px rgba(19, 136, 8, 0.4)',
                    }
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Drawer>
    </>
  );
}
