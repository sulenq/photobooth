import { Heading, HeadingProps } from "@chakra-ui/react";

interface Props extends HeadingProps {
  children?: any;
}

export default function Heading3({ children, ...props }: Props) {
  return (
    <Heading
      as={"h3"}
      fontSize={[28, null, 32]}
      fontWeight={"normal"}
      {...props}
    >
      {children}
    </Heading>
  );
}
