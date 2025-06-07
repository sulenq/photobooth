import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Heading1 from "@/components/ui-custom/Heading1";
import NavLink from "@/components/ui-custom/NavLink";
import { IMAGES_PATH } from "@/constants/paths";
import { PRESET_MAIN_BUTTON } from "@/constants/presetProps";
import useChoosedProduct from "@/context/useChoosedProduct";
import useSessionInvoice from "@/context/useSessionInvoice";
import useSessionPhotos from "@/context/useSessionPhotos";
import useSessionResPhotos from "@/context/useSessionResPhotos";
import { Image } from "@chakra-ui/react";
import { useEffect } from "react";

const RootPage = () => {
  // Contexts
  const setInvoiceNumber = useSessionInvoice((s) => s.setInvoiceNumber);
  const setChoosedProduct = useChoosedProduct((s) => s.setChoosedProduct);
  const clearPhotos = useSessionPhotos((s) => s.clearPhotos);
  const clearResPhotos = useSessionResPhotos((s) => s.clearResPhotos);

  // Handle reset invoice number & choosed product
  useEffect(() => {
    setInvoiceNumber(null);
    setChoosedProduct(null);
    clearPhotos();
    clearResPhotos();
  }, []);

  return (
    <CContainer
      minH={"100dvh"}
      bgImage={`url(${IMAGES_PATH}/root_bg.png)`}
      bgSize={"100% 100%"}
      p={5}
      justify={"center"}
      align={"center"}
    >
      <Heading1 className="df" fontWeight={"bold"}>
        Welcome to
      </Heading1>

      <Image src={`${IMAGES_PATH}/logo_dark.png`} />

      <NavLink to="/choose-product" align={"center"}>
        <BButton mt={10} {...PRESET_MAIN_BUTTON}>
          START PHOTO
        </BButton>
      </NavLink>
    </CContainer>
  );
};

export default RootPage;
