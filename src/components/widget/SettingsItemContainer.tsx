import { HStack, StackProps } from "@chakra-ui/react";

interface Props extends StackProps {
  disabled?: boolean;
}
const SettingsItemContainer = ({ children, disabled, ...props }: Props) => {
  return (
    <HStack
      justify={"space-between"}
      px={4}
      pointerEvents={disabled ? "none" : "auto"}
      opacity={disabled ? 0.4 : 1}
      {...props}
    >
      {children}
    </HStack>
  );
};

export default SettingsItemContainer;
