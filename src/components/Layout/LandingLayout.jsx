'use client';

import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import CustomCursor from '../CustomCursor/CustomCursor';

const LandingLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div>
          <CustomCursor />
          {children}
        </div>
      )}
    </>
  );
};

export default LandingLayout;
