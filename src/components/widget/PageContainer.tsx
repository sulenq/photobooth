import { StackProps } from "@chakra-ui/react";
import CContainer from "../ui-custom/CContainer";

interface Props extends StackProps {}
const PageContainer = ({ children, ...restProps }: Props) => {
  return (
    <CContainer p={10} minH={"100dvh"} bg={"p.100"}>
      <CContainer
        p={10}
        border={"1px solid {colors.p.900}"}
        flex={1}
        {...restProps}
      >
        {children}
      </CContainer>
    </CContainer>
  );
};

export default PageContainer;
