import { PRESET_MAIN_BUTTON_MD } from "@/constants/presetProps";
import back from "@/utils/back";
import { Icon } from "@chakra-ui/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import BButton from "../ui-custom/BButton";
import { ButtonProps } from "../ui/button";

interface Props extends ButtonProps {
  backLink?: string;
}
const BackButton = (props: Props) => {
  // Props
  const { backLink, ...restProps } = props;

  // Hooks
  const navigate = useNavigate();

  return (
    <BButton
      h={"60px"}
      w={"60px"}
      borderRadius={"full"}
      onClick={() => {
        if (backLink) {
          navigate(backLink);
        } else {
          back();
        }
      }}
      {...PRESET_MAIN_BUTTON_MD}
      {...restProps}
    >
      <Icon boxSize={"40px"} color={"p.500"}>
        <IconArrowLeft />
      </Icon>
    </BButton>
  );
};

export default BackButton;
