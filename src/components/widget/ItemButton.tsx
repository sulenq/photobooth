import { ButtonProps } from "@chakra-ui/react";
import BButton from "../ui-custom/BButton";

interface Props extends ButtonProps {}
const ItemButton = ({ children, ...props }: Props) => {
  return (
    <BButton size={"xs"} variant={"outline"} borderRadius={"lg"} {...props}>
      {children}
    </BButton>
  );
};

export default ItemButton;
