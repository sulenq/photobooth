import { IconInfoCircle } from "@tabler/icons-react";
import { ButtonProps } from "../ui/button";
import {
  PopoverContent,
  PopoverDescription,
  PopoverRoot,
  PopoverTrigger,
} from "../ui/popover";
import BButton from "./BButton";

interface Props extends ButtonProps {
  children?: any;
}

const InfoPopover = ({ children, ...props }: Props) => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <BButton
          iconButton
          size={"2xs"}
          p={0}
          borderRadius={"full"}
          variant={"ghost"}
          color={"fg.subtle"}
          {...props}
        >
          <IconInfoCircle size={"1rem"} />
        </BButton>
      </PopoverTrigger>

      <PopoverContent
        w={"fit"}
        maxW={"calc(100vw - 48px)"}
        borderColor={"border.muted"}
      >
        <PopoverDescription px={3} py={2}>
          {children}
        </PopoverDescription>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default InfoPopover;
