import React from 'react';
import Silder from '../components/sidebar';
import Header from '../components/Header';

const Index = () => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Silder />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        </div>
    </div>
  );
};

export default Index;
