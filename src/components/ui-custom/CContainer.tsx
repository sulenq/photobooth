import { StackProps, VStack } from "@chakra-ui/react";

interface Props extends StackProps {
  fRef?: any;
  children?: any;
}

export default function CContainer({ fRef, children, ...props }: Props) {
  return (
    <VStack
      ref={fRef}
      className="CContainer"
      gap={0}
      align={"stretch"}
      w={"full"}
      {...props}
    >
      {children}
    </VStack>
  );
}
