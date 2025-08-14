/* eslint-disable no-unused-vars */
import React, {useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkExistingUser, registerUser,otpverification } from '../services/userServices';
import { Link, Modal, Container, TextField, Button, CircularProgress, Typography, Grid, Box, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useCart } from '../context/CartContext';
import { ServerURL } from '../server/serverUrl';
import { ImagePathRoutes } from '../routes/ImagePathRoutes';
import Calendar from '../components/datePicker';
import { API_FetchDeliveryTimes,API_FetchSelectSettingsNew,API_Fetchpincode,API_Fetchdeliverycharges } from '../services/settings';
import { API_InsertSaleOrderSave } from '../services/checkoutServices';
import { useTheme } from '@mui/material/styles';
import CircularLoader from '../components/circular-loader';
import OrderSuccess from '../assets/success.gif';
import OrderInfo from '../assets/information.gif';
import AddressChangeModal from '../components/cart/addressChangeModal';
import RazorpayPayment from '../components/RazorpayPayment';
import dayjs from 'dayjs';
import { getDistance } from 'geolib';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '100%', sm: '100%', md: 280, lg: 300, xl: 300},
    bgcolor: 'background.paper',
    py: 2,
    borderRadius: 1
};

export default function ProductCheckout() {
    const { cartItems, setCartItems } = useCart();
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [UserId, setUserId] = React.useState(0);
    const [ModalOpen, setModalOpen] = React.useState(false);
    const [MRPAmount, setMRPAmount] = React.useState(0);
    const [SavingsAmount, setSavingsAmount] = React.useState(0);
    const [TotalPrice, setTotalPrice] = React.useState(0);
    const [ExtraDiscount, setExtraDiscount] = React.useState(0);
    const [HandlingCharge, setHandlingCharge] = React.useState(0);
    const [DeliveryFee, setDeliveryFee] = React.useState(0);
    const [pincodedata,setPincodedata] = React.useState([]);
    const [walletAmount, setwalletAmount] = React.useState(0);
    const [DeliveryTimeList, setDeliveryTimeList] = React.useState([]);
    const [whatsapdata, setwhatsapdata] = React.useState([]);
      const [ShowErrorMsg, setShowErrorMsg] = useState('');
    const [DateValue, setDateValue] = React.useState(dayjs());
    const [DeliverytimeId, setDeliverytimeId] = React.useState(0);
    const [Deliverytime, setDeliverytime] = React.useState('');
    const [PaymentType, setPaymentType] = React.useState('COD');
    const [OnlinePayment, setOnlinePayment] = React.useState(false);
    const [DeliveryType, setDeliveryType] = React.useState('Delivery');
    const [DeliveryTypeState, setDeliveryTypeState] = React.useState(true);
    
    const [InfoStatus, setInfoStatus] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [showLoader, setShowLoader] = React.useState(false);
    const [couponId, setCouponId] = React.useState(0);
    const [couponDiscount, setCouponDiscount] =React.useState(0); 
    const [discountAmount, setDiscountAmount] = React.useState(0);
    const [pincodes, setPincodes] = React.useState([]);
    const [AlertOpen, setAlertOpen] = React.useState(false);
    const handleAlertOpen = () => setAlertOpen(true);
    const [adminlatitude, setAdminlatitude] = React.useState('');
    const [adminLangitude, setAdminLangitude] = React.useState('');

    const [userlatitude, setUserlatitude] = React.useState('');
    const [userLangitude, setuserLangitude] = React.useState('');
    const [distance, setDistance] =  React.useState(0);
    const [deliverychargelist,  setDeliverychargelist] = React.useState([]);
    const [deliverycharge,  setDeliveryCharge] = React.useState([]);
    const [receivedOtp, setReceivedOtp] = useState(null);
    const [enteredOtp, setEnteredOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = React.useState(false);
    const [isOtpValid, setIsOtpValid] = React.useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState({
        Address1: '',
        Address2: '',
        City: '',
        Pincode: '',
        LandMark: '',
        Latitude: '',
        Langitude: '',
        CompanyRefId: '66',
        MobileNumber:''
      });
      
    const handleAlertClose = () => {
        if (InfoStatus === 'Your order has been placed') {
            navigate('/');
        }
        setAlertOpen(false);
    };
    
    const handleOtpInputChange = (e) => {
        setEnteredOtp(e.target.value);
      };

    useEffect(() => {
        if (cartItems.length > 0) {
            const totalMRP = cartItems.reduce((acc, item) => acc + item.totalMRP, 0);
            const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
            
            setMRPAmount(totalMRP);
            setTotalPrice(totalPrice );
            setSavingsAmount(totalMRP - totalPrice);
    
            // 🏦 Apply Wallet Discount
            let useWallet = localStorage.getItem('UseWallet');
            if (useWallet) {
                setTotalPrice((prevPrice) => prevPrice - walletAmount);
            }
    
            // 🏷️ Apply Coupon Discount
            let DiscountData = localStorage.getItem("DiscountData");
            if (DiscountData) {
                try {
                    const parsedData = JSON.parse(DiscountData);
    
                    
                    const couponData = Array.isArray(parsedData) ? parsedData[0] : parsedData;
                    
                    if (couponData?.Id) {
                        setCouponId(couponData.Id); 
                    }




                    if (couponData?.coupondiscount) {
                      
                        const discountPercent = parseFloat(couponData.coupondiscount.replace('%', ''));
                        if (!isNaN(discountPercent)) {
                            setCouponDiscount(discountPercent);
                            const discountAmount = (discountPercent / 100) * totalPrice;
                            setDiscountAmount(discountAmount);
                            setTotalPrice((prevPrice) => prevPrice - discountAmount);
                        }
                    } else if (couponData?.discountValue) {
                       
                        const discountValue = parseFloat(couponData.discountValue);
                        if (!isNaN(discountValue)) {
                            setDiscountAmount(discountValue);
                            setTotalPrice((prevPrice) => prevPrice - discountValue);
                        }
                    }
                } catch (error) {
                    console.error("Failed to parse DiscountData:", error);
                }
            }
        }
    }, [cartItems, walletAmount]);
    //Delivery date function
    const handleSelectDate = (newValue) => {
        setDateValue(newValue);
    };

     const handleOtpSubmit = async () => {
       if (receivedOtp.toString() === enteredOtp){
         setIsOtpValid(true);
       } else {
         setIsOtpValid(false);
         setShowErrorMsg("Invalid OTP. Please try again.");
       }
     };

    const handleDeliveryTime = (id, time) => {
        setDeliverytime(time);
        setDeliverytimeId(id);
    };

    //Place order function
    const handlePlaceOrder = async() => {          

                setOnlinePayment(false);
                setAlertOpen(false);
                PlaceOrder(0, '');
 
                     
     
    };


  const FetchSelectSettingsNew = async () => {
    try {


        const list = await API_FetchSelectSettingsNew();
  

        if (Array.isArray(list) && list.length > 0) {
            setwhatsapdata(list); 
    
        } else {
            console.error("Fetched data is not a valid array or is empty.");
            setwhatsapdata([]); 
        }
    } catch (error) {
        setwhatsapdata([]);
        console.error("Error fetching categories:", error);
    }
};

     useEffect(() => {  
     
        FetchSelectSettingsNew();   
   
    }, []);

    //Order save API function
    const InsertSaleOrderSave = async (master) => {
        try {
            let WhatsAppUrl = "";
            let OwnerMobileNo = "";
            var mobileno = selectedAddress.MobileNumber;
            if (whatsapdata.length > 0) {
                ({ WhatsAppUrl, OwnerMobileNo } = whatsapdata[0]);
            }
             
              const otpresponse = await otpverification(WhatsAppUrl, mobileno);
                  
              if (otpresponse) {
                // OTP verification is successful, show input for OTP
        
                const otpString = otpresponse.toString();
                setReceivedOtp(otpString);  // OTP received from backend
                setShowOtpInput(true);  // Show OTP input field
                setShowLoader(false);  // Hide loader
              } else {
                setShowLoader(false);
                setShowErrorMsg("Failed to send OTP. Please try again.");
              }
            if (receivedOtp.toString() === enteredOtp) {
                setIsOtpValid(true);
            //const pincode1 = selectedAddress.Pincode.toString().trim();
             const response = await API_InsertSaleOrderSave(master, WhatsAppUrl, OwnerMobileNo);
             console.log(response);
    
            if (response.length !== 0) {
                setLoading(false);
                localStorage.removeItem('cartItems');
                localStorage.removeItem('DiscountData');
                setCartItems([]);
                setInfoStatus('Your order has been placed');
                setShowLoader(false);
                handleAlertOpen(true);
            } 
            else {
                setLoading(false);
                setInfoStatus('Your order has been rejected.');
                setShowLoader(false);
                handleAlertOpen(true);
            }
        } 
            
            else {
                setShowLoader(false);
                setShowErrorMsg("Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error inserting order details:", error);
            setLoading(false);
            setInfoStatus('Your order has been rejected.');
            setShowLoader(false);
            handleAlertOpen(true);
        }

        
    };
    
    const handleAddressChange = (field, value) => {
        setSelectedAddress(prev => ({
          ...prev,
          [field]: value
        }));
      };
      


    const PlaceOrder = async(onlinePStatus, onlinePaymentId) => {
        setShowLoader(true);
        const OrderDetails = [];
        if (cartItems.length > 0 && cartItems != null) {
            for (let i = 0; i < cartItems.length; i++) {
                let detailslist = {};
                detailslist.ProductId = cartItems[i].Id;
                detailslist.ProductName = cartItems[i].Description;
                detailslist.MRP = cartItems[i].MRP;
                detailslist.ItemQty = cartItems[i].item;
                detailslist.DiscountAmt = discountAmount;
                detailslist.Salerate = cartItems[i].Price;
                detailslist.WeightType = cartItems[i].UnitType;
                detailslist.CPrice = cartItems[i].totalPrice;
                OrderDetails[i] = detailslist;
            }
        };

        const master = [
            {
                Id: 0,
                CustomerRefId: 1,
                CutomerName: "nun",
                MobileNo:"8825537674",
                Email: "karthick123svks@gmail.com",
                Address1: selectedAddress.Address1,
                Address2: selectedAddress.Address2,
                City: selectedAddress.City,
                LandMark: selectedAddress.LandMark,
                Pincode: selectedAddress.Pincode,
                lattitude: selectedAddress.Latitude,
                longitude: selectedAddress.Langitude,
                CompanyRefid: selectedAddress.CompanyRefId,
                CompanyName: ServerURL.COMPANY_NAME,
                CompanyMobile: ServerURL.COMPANY_MOBILE,
                CompanyEmail: ServerURL.COMPANY_EMAIL,
                SaleDate: DateValue,
                DeliveryDate: DateValue,
                DeliveryTime: Deliverytime, 
                DeliveryMode: DeliveryType,   
                PaymentMode: PaymentType,
                PaymentId: onlinePaymentId,
                AreaMasterId: null,
                deliveryStoreName: null,                
                DeliveryStatus: 0,                
                NewCustomerStatus: 0,
                CouponDiscount: 0.0,
                CouponRefId:couponId,
                OrderCount: 1,
                ReferalAmount: 0.0,                
                disper:Number(couponDiscount),
                discamount:Number(discountAmount),    
                ReferalBalance: 0,
                coinage: 0,
                DeliveryCharge: deliverycharge,
                WalletAmount: walletAmount,
                WalletStatus: walletAmount > 0 ? 1 : 0,
                WalletPayment: walletAmount,                
                TodaySaving: SavingsAmount,
                Grossamt: Number(TotalPrice),
                NetAmount: Number(TotalPrice) + Number(deliverycharge),                                 
                SaleOrderDetails: OrderDetails,     
                Remarks: "",                    
            },
        ];
        console.log(deliverycharge)
        console.log('Master',master)

        await InsertSaleOrderSave(master);

    
    };

    return (
        <>
            <CircularLoader showLoader={showLoader} />    
            <Modal
                open={AlertOpen}
                onClose={handleAlertClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} align='center'>
                    <Box>
                        <img src={InfoStatus === 'Your order has been placed' ? OrderSuccess : OrderInfo} style={{ width: '80px', height: '80px' }} alt='gif' />
                    </Box>
                    <Typography id="modal-modal-description">
                        {InfoStatus}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button sx={{
                            marginLeft: 'auto',
                            width: 'auto',
                            borderRadius: '3px',
                            padding: '2px 15px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            background: theme.palette.shadowcolorCode.main,
                            border: '1px solid',
                            borderColor: theme.palette.basecolorCode.main,
                            color: theme.palette.basecolorCode.main,
                            boxShadow: 'none',
                            '&:hover': {
                                border: '1px solid',
                                background: theme.palette.basecolorCode.main,
                                borderColor: theme.palette.basecolorCode.main,
                                color: theme.palette.whitecolorCode.main,
                                boxShadow: 'none',
                            }
                        }} size='small' onClick={handleAlertClose} variant='contained'>Okay</Button>
                    </Box>
                </Box>
            </Modal>
            <Container maxWidth="lg" sx={{ px: { xs: 0, md: 3, lg: 5 }, py: { xs: 0, md: 3 } }}>
                <Grid container spacing={4} style={{ padding: {xs: '0px', sm: '0px', md: '12px', lg: '20px', xl: '20px'} }}>
                    {/* Left Section - Delivery Address */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ border: '1px solid #3BB77' }} padding={3} mb={2}>
                        
                            {/* Address Form */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Address-1"
                                        value={selectedAddress.Address1}
                                        onChange={(e) => handleAddressChange('Address1', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Address-2"
                                        value={selectedAddress.Address2}
                                        onChange={(e) => handleAddressChange('Address2', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        value={selectedAddress.City}
                                        onChange={(e) => handleAddressChange('City', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Pincode"
                                        value={selectedAddress.Pincode}
                                        onChange={(e) => handleAddressChange('Pincode', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Landmark"
                                        value={selectedAddress.LandMark}
                                        onChange={(e) => handleAddressChange('LandMark', e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="MobileNumber"
                                        value={selectedAddress.MobileNumber}
                                        onChange={(e) => handleAddressChange('MobileNumber', e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                        </Box>
                         
                           {showOtpInput && (
                                     <div>
                                       <TextField
                                         fullWidth
                                         label="Enter OTP"
                                         variant="outlined"
                                         margin="normal"
                                         value={enteredOtp}
                                         onChange={handleOtpInputChange}
                                         error={!!ShowErrorMsg}
                                         helperText={ShowErrorMsg || ''}
                                         InputLabelProps={{ shrink: true }}
                                         className="mb-4"
                                         required
                                       />
                         
                                          <Typography variant="body2" align="left" className="mb-4">
                                         OTP sent to your What'sApp . Please enter it above.
                                       </Typography>
                                       <Button 
                                         fullWidth
                                         variant="contained"
                                         sx={{
                                           my: 3,
                                           backgroundColor: theme.palette.basecolorCode.main,
                                           color: theme.palette.whitecolorCode.main,
                                           '&:hover': {
                                             backgroundColor: theme.palette.basecolorCode.main,
                                             color: theme.palette.whitecolorCode.main,
                                           },
                                         }}
                                         onClick={handleOtpSubmit}
                                       >
                                         Verify OTP
                                       </Button>
                                     </div>
                                   )}
                        {/* Delivery type */}
                

                        {/* Payment Method */}
                        <Box padding={3} sx={{ paddingTop: 1 }}>
                        
                            <Box sx={{ mt: 2, float: 'left' }}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={handlePlaceOrder}
                                    disabled={loading} // Disable the button while loading
                                    sx={{
                                        marginLeft: 'auto',
                                        float: 'right',
                                        borderRadius: '5px',
                                        padding: '5px 20px',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        border: '1px solid',
                                        borderColor: theme.palette.basecolorCode.main,
                                        background: theme.palette.basecolorCode.main,
                                        color: theme.palette.whitecolorCode.main,
                                        boxShadow: 'none',
                                        '&:hover': {
                                            background: theme.palette.basecolorCode.main,
                                            border: '1px solid',
                                            borderColor: theme.palette.basecolorCode.main,
                                            color: theme.palette.whitecolorCode.main,
                                            boxShadow: 'none',
                                        },
                                    }}
                                >
                                    {loading ? (
                                        <CircularProgress size={20} sx={{ color: theme.palette.whitecolorCode.main }} />
                                    ) : (
                                        'Place Order'
                                    )}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right Section - Order Summary */}
                    <Grid item xs={12} md={4} sx={{ px: { xs: 1, md: 3 } }}>
                        <Box sx={{ px: { xs: 1, md: 0 } }}>
                        <Typography align='left' variant="h6">Order Summary</Typography>
                        <Divider style={{ marginBottom: '20px' }} />
                        {cartItems.map((product, index) => (
                            <>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '7px' }}>
                                    <Box
                                        component="img"
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: '50px',
                                            marginRight: 0,
                                        }}
                                        src={ImagePathRoutes.ProductImagePath + product.Img0}
                                        alt={product.Description}
                                    />
                                    <Box>
                                        <Box align='left'>
                                            <Typography variant="p"
                                                sx={{
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    overflow: 'hidden',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    textOverflow: 'ellipsis',
                                                    lineHeight: '12px',
                                                    fontFamily: 'inherit',
                                                    minHeight: '20px',
                                                    width: '150px',
                                                    marginRight: 0,
                                                }}
                                            >
                                                {product.Description} <Typography variant="p" color="textSecondary"
                                                    sx={{
                                                        fontSize: '10px',
                                                    }}
                                                >
                                                    ({product.UnitType})
                                                </Typography>
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography align='left' variant="body2">Qty: {product.item} X {product.Price.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
                                            {/* <Typography variant="body2" align="right" style={{ color: 'green' }}>{product.totalMRP.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography> */}
                                        </Box>
                                    </Box>
                                </Box>
                                <Typography variant="body2" align="right" style={{ color: 'green' }}>{product.totalPrice.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
                            </Box>
                            </>
                        ))}

                        <Divider style={{ margin: '20px 0' }} />

                        <Box align='left' sx={{ width: '100%' }}>
                            <Grid container>
                                <Grid item xs={8} sx={{ mt: 0.5 }}>
                                    <Typography align='left' sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">MRP Total Amount</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1" align="right">
                                        {MRPAmount.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} sx={{ mt: 0.5 }}>
                                    <Typography align='left' sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Total Savings</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1" align="right" color="green">
                                        {SavingsAmount.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} sx={{ display: 'none', mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Extra discount</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ display: 'none', mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1" align="right" color="green">
                                        {ExtraDiscount.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} sx={{ display: 'none', mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Handling charge</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ display: 'none', mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1" align="right">
                                        {HandlingCharge.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </Grid>
                                  
                                <Grid item xs={8} sx={{  mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Coupon Discount:</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{  mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1" align="right">
                                        {discountAmount.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sx={{  mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1" align="right">
                                        {deliverycharge.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </Grid>



                                <Grid item xs={8} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Total Amount</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1" align="right">
                                        {(TotalPrice + deliverycharge + HandlingCharge ).toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
