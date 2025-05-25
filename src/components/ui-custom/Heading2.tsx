import { Heading, HeadingProps } from "@chakra-ui/react";

interface Props extends HeadingProps {
  children?: any;
}

export default function Heading2({ children, ...props }: Props) {
  return (
    <Heading
      as={"h2"}
      fontSize={[32, null, 40]}
      fontWeight={"normal"}
      {...props}
    >
      {children}
    </Heading>
  );
}
