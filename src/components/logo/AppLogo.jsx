import React from 'react';
import Logo from './logo.png';
const AppLogo = ({ children }) => {
  return (
    <img src={Logo} alt="logo" style={{width: '180px', height: '100px'}}/>
  );
};

export default AppLogo;
