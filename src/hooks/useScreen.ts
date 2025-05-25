import { useEffect, useState } from "react";

interface Screen {
  sw: number;
  sh: number;
}

const useScreen = (timeout: number = 200) => {
  const [screen, setScreen] = useState<Screen>({
    sw: window.innerWidth,
    sh: window.innerHeight,
  });

  useEffect(() => {
    let resizeTimeout: any;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setScreen({ sw: window.innerWidth, sh: window.innerHeight });
      }, timeout);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [timeout]); // Menambahkan timeout ke dalam dependensi untuk menangani perubahan

  return screen;
};

export default useScreen;
