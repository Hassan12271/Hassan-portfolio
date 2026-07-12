'use client';

import { useState } from 'react';
import Preloader from '../Preloader/Preloader';
import CustomCursor from '../CustomCursor/CustomCursor';

const LandingLayout = ({ children }) => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {showPreloader && (
        <Preloader autoHide onHidden={() => setShowPreloader(false)} />
      )}
      <div>
        <CustomCursor />
        {children}
      </div>
    </>
  );
};

export default LandingLayout;
