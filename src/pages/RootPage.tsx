import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Heading1 from "@/components/ui-custom/Heading1";
import NavLink from "@/components/ui-custom/NavLink";
import { IMAGES_PATH } from "@/constants/paths";
import { PRESET_MAIN_BUTTON } from "@/constants/presetProps";
import { Image } from "@chakra-ui/react";

const RootPage = () => {
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

      {/* <Heading1 className="df" fontSize={100} fontWeight={"extrabold"}>
        POPBOX.
      </Heading1> */}

      <Image src={`${IMAGES_PATH}/logo_dark.png`} />

      <NavLink to="/procedure" align={"center"}>
        <BButton mt={10} {...PRESET_MAIN_BUTTON}>
          START PHOTO
        </BButton>
      </NavLink>
    </CContainer>
  );
};

export default RootPage;
