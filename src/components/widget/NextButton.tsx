import { PRESET_MAIN_BUTTON } from "@/constants/presetProps";
import BButton from "../ui-custom/BButton";
import NavLink from "../ui-custom/NavLink";

const NextButton = (props: any) => {
  const { to, ...restProps } = props;

  console.log(props.disabled);

  return (
    <NavLink to={to}>
      <BButton
        mx={"auto"}
        {...restProps}
        {...PRESET_MAIN_BUTTON}
        bg={props.disabled ? "p.500" : "#3b3329"}
      >
        NEXT
      </BButton>
    </NavLink>
  );
};

export default NextButton;
