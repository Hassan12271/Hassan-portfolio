'use client';

import Header from '../Header/Header';
import { useState } from 'react';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import CustomCursor from '../CustomCursor/CustomCursor';

const Layout = ({ children }) => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {showPreloader && (
        <Preloader autoHide onHidden={() => setShowPreloader(false)} />
      )}
      <div>
        <CustomCursor />
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
