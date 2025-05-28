import { PRESET_MAIN_BUTTON } from "@/constants/presetProps";
import BButton from "../ui-custom/BButton";
import NavLink from "../ui-custom/NavLink";
import { StackProps } from "@chakra-ui/react";

interface Props extends StackProps {}

const NextButton = (props: any) => {
  const { to, ...restProps } = props;

  return (
    <NavLink to={to} {...restProps}>
      <BButton
        mx={"auto"}
        {...PRESET_MAIN_BUTTON}
        bg={props.disabled ? "p.500" : "#3b3329"}
      >
        NEXT
      </BButton>
    </NavLink>
  );
};

export default NextButton;
