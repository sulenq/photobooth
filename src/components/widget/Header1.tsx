import { Box, HStack } from "@chakra-ui/react";
import BackButton from "./BackButton";
import Heading from "./Heading";

const Header1 = (props: any) => {
  // Props
  const { children, backLink, showBackButton = true, ...restProps } = props;

  return (
    <HStack {...restProps}>
      {showBackButton && <BackButton backLink={backLink} />}

      <Heading>{children}</Heading>

      {showBackButton && <Box w={"60px"} />}
    </HStack>
  );
};

export default Header1;
