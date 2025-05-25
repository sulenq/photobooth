import { Image, ImageProps } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import { SVGS_PATH } from "@/constants/paths";

interface Props extends ImageProps {}

const BnwLogo = ({ ...props }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Image
      src={`${SVGS_PATH}/${
        colorMode === "dark" ? "logo_light" : "logo_dark"
      }.svg`}
      h={"16px"}
      {...props}
    ></Image>
  );
};

export default BnwLogo;
