import { Text, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {
  children?: any;
}

const TableFooterNoteContent = ({ children }: Props) => {
  return (
    <Text color={"fg.subtle"} textAlign={"center"}>
      {children}
    </Text>
  );
};

export default TableFooterNoteContent;
