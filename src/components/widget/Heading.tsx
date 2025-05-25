import { SVGS_PATH } from "@/constants/paths";
import { PRESET_MAIN_BUTTON_MD } from "@/constants/presetProps";
import back from "@/utils/back";
import { Box, HStack, Icon, Image } from "@chakra-ui/react";
import { IconArrowLeft } from "@tabler/icons-react";
import BButton from "../ui-custom/BButton";
import CContainer from "../ui-custom/CContainer";
import Heading1 from "../ui-custom/Heading1";

const Heading = (props: any) => {
  // Props
  const { children, backLink, ...restProps } = props;

  return (
    <HStack {...restProps}>
      <BButton
        h={"60px"}
        w={"60px"}
        borderRadius={"full"}
        onClick={backLink || back}
        {...PRESET_MAIN_BUTTON_MD}
      >
        <Icon boxSize={"40px"}>
          <IconArrowLeft />
        </Icon>
      </BButton>

      <CContainer pos={"relative"} w={"fit"} mx={"auto"}>
        <Image
          src={`${SVGS_PATH}/bling.svg`}
          w={"30px"}
          pos={"absolute"}
          top={0}
          right={"-50px"}
        />

        <Image
          src={`${SVGS_PATH}/bling1.svg`}
          w={"30px"}
          pos={"absolute"}
          bottom={0}
          left={"-50px"}
        />

        <Heading1 className="df" fontWeight={600} textAlign={"center"}>
          {children}
        </Heading1>
      </CContainer>

      <Box w={"60px"} />
    </HStack>
  );
};

export default Heading;
