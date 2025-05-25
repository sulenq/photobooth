import { useThemeConfig } from "@/context/useThemeConfig";
import { Text, TextProps } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props extends TextProps {
  to: string;
}
const TextRouterLink = ({ children, to, ...props }: Props) => {
  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <Text asChild color={themeConfig.primaryColor} {...props}>
      <Link to={to}>{children}</Link>
    </Text>
  );
};

export default TextRouterLink;
