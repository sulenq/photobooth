import { StackProps } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CContainer from "../ui-custom/CContainer";

interface Props extends StackProps {
  fRef?: any;
  to?: string;
}
const NavLink = (props: Props) => {
  // Props
  const { fRef, children, to, ...restProps } = props;

  // Utils
  const navigate = useNavigate();
  function handleOnClick() {
    if (to) {
      navigate(to);
    }
  }

  return (
    <CContainer
      fRef={fRef}
      cursor={"pointer"}
      onClick={handleOnClick}
      {...restProps}
    >
      {children}
    </CContainer>
  );
};

export default NavLink;
