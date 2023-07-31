import { useEffect, useState } from "react";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<{
    isSmall?: boolean;
    isMedium?: boolean;
    isLarge?: boolean;
    isXL?: boolean;
  }>({
    isSmall: undefined,
    isMedium: undefined,
    isLarge: undefined,
    isXL: undefined,
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const isSmall = width < 768;
      const isMedium = width >= 768 && width < 1024;
      const isLarge = width >= 1024 && width < 1280;
      const isXL = width >= 1280;
      setScreenSize({
        isSmall,
        isMedium,
        isLarge,
        isXL,
      });
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
