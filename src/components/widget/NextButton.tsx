import { PRESET_MAIN_BUTTON } from "@/constants/presetProps";
import BButton from "../ui-custom/BButton";
import NavLink from "../ui-custom/NavLink";
import { ButtonProps } from "../ui/button";

interface Props extends ButtonProps {}

const NextButton = (props: any) => {
  const { to, ...restProps } = props;

  return (
    <NavLink to={to}>
      <BButton
        mx={"auto"}
        {...PRESET_MAIN_BUTTON}
        bg={props.disabled ? "p.500" : "#3b3329"}
        {...restProps}
      >
        NEXT
      </BButton>
    </NavLink>
  );
};

export default NextButton;
