import { StackProps } from "@chakra-ui/react";
import CContainer from "./CContainer";

interface Props extends StackProps {
  fRef?: any;
}
const VScroll = ({ fRef, children, ...props }: Props) => {
  return (
    <CContainer fRef={fRef} className={`scrollY ${props.className}`} {...props}>
      {children}
    </CContainer>
  );
};

export default VScroll;
