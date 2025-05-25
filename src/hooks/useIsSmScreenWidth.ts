import useScreen from "./useScreen";

const useIsSmScreenWidth = () => {
  const { sw } = useScreen();

  return sw < 768;
};

export default useIsSmScreenWidth;
