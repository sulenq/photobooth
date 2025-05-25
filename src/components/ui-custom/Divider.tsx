import { Interface__Divider } from "@/constants/interfaces";
import { Box } from "@chakra-ui/react";

const Divider = ({ dir = "horizontal", ...props }: Interface__Divider) => {
  switch (dir) {
    default:
      return <Box w={"1px"} h={"full"} bg={"d2"} {...props} />;
    case "vertical":
      return <Box w={"full"} h={"1px"} bg={"d2"} {...props} />;
  }
};

export default Divider;
