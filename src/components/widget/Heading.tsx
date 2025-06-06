import { SVGS_PATH } from "@/constants/paths";
import { HeadingProps, Image, StackProps } from "@chakra-ui/react";
import CContainer from "../ui-custom/CContainer";
import Heading1 from "../ui-custom/Heading1";

interface Props extends StackProps {
  headingProps?: HeadingProps;
}
const Heading = (props: Props) => {
  // PropsProcedurePage
  const { children, headingProps, ...restProps } = props;

  return (
    <CContainer pos={"relative"} w={"fit"} mx={"auto"} {...restProps}>
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

      <Heading1
        className="df"
        fontWeight={600}
        textAlign={"center"}
        {...headingProps}
      >
        {children}
      </Heading1>
    </CContainer>
  );
};

export default Heading;
