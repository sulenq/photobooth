import { Heading, HeadingProps } from "@chakra-ui/react";

interface Props extends HeadingProps {
  children?: any;
}

export default function Heading5({ children, ...props }: Props) {
  return (
    <Heading
      as={"h5"}
      fontSize={[20, null, 20]}
      fontWeight={"normal"}
      {...props}
    >
      {children}
    </Heading>
  );
}
