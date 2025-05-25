import useBackOnDefaultPage from "@/hooks/useBackOnDefaultPage";
import back from "@/utils/back";
import { ButtonProps, Icon } from "@chakra-ui/react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import BButton from "./BButton";

interface Props extends ButtonProps {
  children?: any;
  iconButton?: boolean;
  backPath?: string;
  aoc?: () => void;
}

const BackButton = ({
  children,
  iconButton = false,
  backPath,
  aoc,
  ...props
}: Props) => {
  const navigate = useNavigate();
  const handleBackOnDefaultPage = useBackOnDefaultPage();

  function handleBack() {
    if (backPath) {
      navigate(backPath);
    } else {
      back();
      handleBackOnDefaultPage();
    }
    aoc?.();
  }

  if (iconButton)
    return (
      <BButton
        iconButton
        variant={"ghost"}
        borderRadius={"full"}
        onClick={handleBack}
        size={"xs"}
        {...props}
      >
        <Icon fontSize={"lg"}>
          <IconChevronLeft />
        </Icon>
      </BButton>
    );

  return (
    <BButton variant={"outline"} onClick={handleBack} {...props}>
      {children || "Close"}
    </BButton>
  );
};

export default BackButton;
