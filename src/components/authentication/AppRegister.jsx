import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { TextField, Button, Typography, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AppLogo from '../logo/AppLogo';
import {ServerURL} from '../../server/serverUrl';
import {useAuth} from '../../context/authContext';
import CircularLoader from '../../components/circular-loader';

//API's
import { checkExistingUser, registerUser } from '../../services/userServices';

export default function AppRegister({ RegisterDrawerOpen, setLoginDrawerOpen, handleAuthDrawerToggle }) {
  const { setIsAuthenticated, setIsAuthenticatedName } = useAuth();
  const [showLoader, setShowLoader] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ShowErrorMsg, setShowErrorMsg] = useState('');
 
  // Error state for validation
  const [errors, setErrors] = useState({});

  // Form state
  let [formData, setFormData] = useState({
    fullname: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',    
  });
  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  let objList = [{     
      Id: 0,
      CompanyRefid: ServerURL.COMPANY_REF_ID,
      CustomerName: formData.fullname,
      Address1: "",
      Address2: "",
      City: "",
      Pincode: "",
      Email: formData.email,
      Password: formData.password,
      MobileNo: formData.mobileNumber,
      PhoneNo: 0,
      TokenId: "",
      Landmark: "",
      FlatNo: 0,
      AreaMasterRefId: null,
      firstorder: "0",
      lattitude: 0,
      longitude: 0,
      ParentId: 0,
      ReferMobileNo: 0,
      Active: 1,
      OrderCount: 0,
      Createddate: new Date(),
  }];

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Validation logic
  const validate = () => {
    let tempErrors = {};

    if (!formData.fullname) tempErrors.fullname = "Full name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid";
    }
    if (!formData.mobileNumber) {
      tempErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      tempErrors.mobileNumber = "Mobile number must be 10 digits";
    }
    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6) tempErrors.password = "Password must be at most 6 characters";
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Direct registration without OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validate()) return;
    setShowLoader(true);
  
    try {
      const existingUser = await checkExistingUser(formData.email, formData.mobileNumber); 
  
      if (existingUser.length !== 0) {
        setErrors((prevErrors) => ({ ...prevErrors, email: "Email or Mobile number already in use" }));
        setShowLoader(false);
        return;
      }

      // Proceed with registration directly
      const response = await registerUser(objList);

      if (response.Id !== 0 && response.Id !== undefined) {
        // Store user info in localStorage
        localStorage.setItem("userLogin", 'true');
        localStorage.setItem("userId", btoa(response.Id));
        localStorage.setItem("userName", btoa(response.CustomerName));
        localStorage.setItem("userMobileNo", btoa(response.MobileNo));
        localStorage.setItem("userEmail", btoa(response.Email));

        // Set authenticated state
        setIsAuthenticated(true);
        setIsAuthenticatedName(response.CustomerName);

        // Close authentication drawer
        handleAuthDrawerToggle(false);
        setLoginDrawerOpen(false);
        setShowLoader(false);
      } else {
        setShowErrorMsg("Registration failed. Please try again.");
        setShowLoader(false);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setShowErrorMsg("An error occurred during registration.");
      setShowLoader(false);
    }
  };
  





  return (
    <>
      <CircularLoader showLoader={showLoader} />
      <Drawer
        open={RegisterDrawerOpen}
        anchor="right"
        onClose={() => handleAuthDrawerToggle(false)}
      >
        <Box sx={{
          width: 400,
          padding: 2,
        }}>
          <AppLogo />


          <div className="flex justify-center items-center">
            <div className="w-96 p-3 rounded-md bg-white">
              <Typography variant="h5" align="center" sx={{ my: 2 }}>
                Create an Account
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  margin="normal"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  error={!!errors.fullname}
                  helperText={errors.fullname}
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  className="mb-4"
                  required
                />

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  className="mb-4"
                  required
                />

                <TextField
                  fullWidth
                  label="Mobile Number"
                  variant="outlined"
                  margin="normal"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  error={!!errors.mobileNumber}
                  helperText={errors.mobileNumber}
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  className="mb-4"
                  required
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  margin="normal"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputLabelProps={{ shrink: true }}
                  className="mb-6"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  variant="outlined"
                  margin="normal"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputLabelProps={{ shrink: true }}
                  className="mb-6"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Typography sx={{textAlign: 'center', color: 'red', my: 1}}>{ShowErrorMsg}</Typography>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ 
                    my: 3, 
                    background: 'linear-gradient(135deg, #FF9933 0%, #FFB366 100%)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    py: 1.5,
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(255, 153, 51, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #E68A2E 0%, #FF9933 100%)',
                      boxShadow: '0 6px 16px rgba(255, 153, 51, 0.4)'
                    }
                  }}
                  type="submit"
                >
                  Create Account
                </Button>
              </form>

               



              <Typography variant="body2" align="left" sx={{ mt: 2 }}>
                Already have an account?{' '}
                <Link
                  href="#"
                  sx={{ 
                    color: '#FF9933', 
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                  onClick={() => {
                    handleAuthDrawerToggle(false); 
                    setLoginDrawerOpen(true); 
                  }}
                >
                  Login
                </Link>
              </Typography>
            </div>
          </div>
        </Box>
      </Drawer>
    </>
  );
}
