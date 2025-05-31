import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, useLocation } from "react-router-dom";
import "./App.css";
import { toaster, Toaster } from "./components/ui/toaster";
import Routing from "./routes/Routing";
import theme from "./theme";
import useStatusBarColor from "./utils/statusBarColor";
import { useEffect, useState } from "react";
import useOffline from "./context/useOffilne";
import OfflineDisclosure from "./components/widget/OfflineDisclosure";
import useLang from "./context/useLang";
import { useThemeConfig } from "./context/useThemeConfig";
import useADM from "./context/useADM";
import { useColorMode } from "./components/ui/color-mode";
import useScrollEffect from "./hooks/useScrollEffect";

const EndpointWrapper = ({ children }: { children: React.ReactNode }) => {
  // Hooks
  const location = useLocation();
  const setStatusBarBody = useStatusBarColor("#ffffff", "#101010");
  const setStatusBarDark = useStatusBarColor("#101010", "#101010");
  const { setColorMode } = useColorMode();

  // Contexts
  const { themeConfig } = useThemeConfig();

  // Utils
  const setStatusBarPrimary = useStatusBarColor(
    themeConfig.primaryColorHex,
    themeConfig.primaryColorHex
  );

  // Handle notif bar color
  useEffect(() => {
    // Dapatkan endpoint dari lokasi saat ini
    const endpoint = location.pathname;
    switch (endpoint) {
      default:
        setStatusBarBody();
        break;
      case "beranda":
        setStatusBarPrimary();
        break;
      case "employee/foto":
        setStatusBarDark();
        break;
    }
  }, [location, setStatusBarBody, setStatusBarDark]);

  // Handle force dark mode off
  useEffect(() => {
    setColorMode("light");
  }, []);

  return <>{children}</>;
};

function App() {
  const handlePrint = () => {
    // window.electronAPI.print("Hello from React!");
    console.log("electronAPI:", window.electronAPI);
  };

  useEffect(() => {
    handlePrint();
  }, []);

  // Contexts
  const { l } = useLang();
  const { setOffline } = useOffline();
  const { ADM } = useADM();
  const { setColorMode } = useColorMode();

  // States, Refs
  const [firstRender, setFirstRender] = useState<boolean>(true);

  // Utils
  function handleOnline() {
    setOffline(false);
    if (!firstRender) {
      toaster.success({
        title: l.back_online_toast.title,
        description: l.back_online_toast.description,
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  }
  function handleOffline() {
    setOffline(true);
  }
  function updateDarkMode() {
    const hour = new Date().getHours();
    setColorMode(hour >= 18 || hour < 6 ? "dark" : "light");
  }

  // Handle scroll style
  useScrollEffect();

  // Handle offline online
  useEffect(() => {
    // Tambahkan event listener
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [firstRender]);

  // Hide online toast when first render
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    }
  }, [firstRender]);

  // Handle adaptive dark mode (ADM)
  useEffect(() => {
    if (ADM === "true") {
      const interval = setInterval(() => {
        const hour = new Date().getHours();
        if (hour === 6 || hour === 18) {
          updateDarkMode();
        }
      }, 60 * 1000);

      return () => clearInterval(interval);
    }
  }, []);
  useEffect(() => {
    if (ADM === "true") {
      updateDarkMode();
    }
  }, [ADM]);

  // Disable context menu
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <ChakraProvider value={theme}>
      <Toaster />
      <BrowserRouter>
        <OfflineDisclosure />

        <EndpointWrapper>
          <Routing />
        </EndpointWrapper>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
