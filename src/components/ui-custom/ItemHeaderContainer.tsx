import { HStack, StackProps } from "@chakra-ui/react";
import CContainer from "./CContainer";

interface Props extends StackProps {
  borderless?: boolean;
}
const ItemHeaderContainer = ({
  children,
  borderless = false,
  ...props
}: Props) => {
  return (
    <CContainer px={3} pt={2} pb={0}>
      <HStack
        borderBottom={"1px solid"}
        borderColor={borderless ? "transparent" : "border.muted"}
        justify={"space-between"}
        pb={2}
        pl={1}
        // gap={4}
        minH={"50px"}
        wrap={"wrap"}
        {...props}
      >
        {children}
      </HStack>
    </CContainer>
  );
};

export default ItemHeaderContainer;
