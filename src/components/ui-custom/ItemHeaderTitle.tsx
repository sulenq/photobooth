import { Text, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {}
const ItemHeaderTitle = ({ children, ...props }: Props) => {
  return (
    <Text fontWeight={"bold"} fontSize={"md"} {...props}>
      {children}
    </Text>
  );
};

export default ItemHeaderTitle;
