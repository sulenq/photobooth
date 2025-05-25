import { StackProps } from "@chakra-ui/react";
import CContainer from "../ui-custom/CContainer";

interface Props extends StackProps {}
const PageContainer = ({ children, ...props }: Props) => {
  return (
    <CContainer p={5} minH={"100dvh"} bg={"p.100"} {...props}>
      <CContainer p={5} border={"1px solid {colors.p.900}"} flex={1}>
        {children}
      </CContainer>
    </CContainer>
  );
};

export default PageContainer;
