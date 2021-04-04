import { useEffect, useState } from 'react';
import { MOBILE_WIDTH } from 'appConstants';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const callback = () => {
      const isMobileWidth = window.innerWidth < MOBILE_WIDTH;
      if (isMobile !== isMobileWidth) {
        setIsMobile(isMobileWidth);
      }
    };

    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, [isMobile]);

  return isMobile;
};
