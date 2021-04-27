import { useEffect, useState } from 'react';

export const useIsPageTopMatch = (minTop: number) => {
  const [isMatch, setIsMatch] = useState(window.scrollY > minTop);

  useEffect(() => {
    const handlerScroll = () => {
      setIsMatch(window.scrollY > minTop);
    };

    window.addEventListener('scroll', handlerScroll);
    return () => {
      window.removeEventListener('scroll', handlerScroll);
    };
  }, [minTop]);

  return isMatch;
};
