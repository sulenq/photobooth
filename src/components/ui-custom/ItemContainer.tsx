import { StackProps } from "@chakra-ui/react";
import CContainer from "./CContainer";
import { useThemeConfig } from "@/context/useThemeConfig";

interface Props extends StackProps {
  children?: any;
}
const ItemContainer = ({ children, ...props }: Props) => {
  const { themeConfig } = useThemeConfig();

  return (
    <CContainer
      borderRadius={themeConfig.radii.container}
      bg={"body"}
      overflow={"clip"}
      border={"1px solid {colors.border.subtle}"}
      {...props}
    >
      {children}
    </CContainer>
  );
};

export default ItemContainer;
