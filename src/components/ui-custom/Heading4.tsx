import { Heading, HeadingProps } from "@chakra-ui/react";

interface Props extends HeadingProps {
  children?: any;
}

export default function Heading4({ children, ...props }: Props) {
  return (
    <Heading
      as={"h4"}
      fontSize={[24, null, 24]}
      fontWeight={"normal"}
      {...props}
    >
      {children}
    </Heading>
  );
}
