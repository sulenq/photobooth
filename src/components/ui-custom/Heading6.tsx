import { Heading, HeadingProps } from "@chakra-ui/react";

interface Props extends HeadingProps {
  children?: any;
}

export default function Heading6({ children, ...props }: Props) {
  return (
    <Heading
      as={"h6"}
      fontSize={[18, null, 18]}
      fontWeight={"normal"}
      {...props}
    >
      {children}
    </Heading>
  );
}
