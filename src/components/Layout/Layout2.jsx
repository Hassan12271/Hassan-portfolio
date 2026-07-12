'use client';

import Header2 from '../Header/Header2';
import { useState } from 'react';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import CustomCursor from '../CustomCursor/CustomCursor';

const Layout2 = ({ children }) => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {showPreloader && (
        <Preloader autoHide onHidden={() => setShowPreloader(false)} />
      )}
      <div className="st-get-sidebar">
        <CustomCursor />
        <Header2 />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout2;
