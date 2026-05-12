import React from 'react';
import Logo from './logo.png';
const AppLogo = ({ children }) => {
  return (
    <img src={Logo} alt="logo" style={{width: 'auto', height: '56px', objectFit: 'contain', display: 'block'}}/>
  );
};

export default AppLogo;
