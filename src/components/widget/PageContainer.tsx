import { StackProps } from "@chakra-ui/react";
import CContainer from "../ui-custom/CContainer";

interface Props extends StackProps {
  borderless?: boolean;
}
const PageContainer = (props: Props) => {
  // Props
  const { children, borderless = false, ...restProps } = props;

  return (
    <CContainer p={10} minH={"100dvh"} bg={"p.100"}>
      <CContainer
        p={borderless ? 0 : 10}
        border={borderless ? "" : "1px solid {colors.p.900}"}
        flex={1}
        {...restProps}
      >
        {children}
      </CContainer>
    </CContainer>
  );
};

export default PageContainer;
