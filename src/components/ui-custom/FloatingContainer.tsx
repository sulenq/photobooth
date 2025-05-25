import { Presence, PresenceProps, StackProps } from "@chakra-ui/react";
import CContainer from "./CContainer";
import { useThemeConfig } from "@/context/useThemeConfig";

interface Props extends PresenceProps {
  children?: any;
  open?: boolean;
  containerProps?: StackProps;
  animationEntrance?: "top" | "bottom";
}

const FloatingContainer = ({
  children,
  open,
  containerProps,
  animationEntrance = "top",
  ...props
}: Props) => {
  // Components
  const { themeConfig } = useThemeConfig();

  const animationName =
    animationEntrance === "top"
      ? { _open: "slide-from-top, fade-in", _closed: "slide-to-top, fade-out" }
      : {
          _open: "slide-from-bottom, fade-in",
          _closed: "slide-to-bottom, fade-out",
        };

  return (
    <Presence
      lazyMount
      present={open}
      animationName={animationName}
      animationDuration="moderate"
      {...props}
    >
      <CContainer
        bg={"body"}
        border={"1px solid"}
        borderColor={"border.muted"}
        borderRadius={themeConfig.radii.container}
        p={1}
        transition={"140ms"}
        pointerEvents={open ? "auto" : "none"}
        {...containerProps}
      >
        {children}
      </CContainer>
    </Presence>
  );
};

export default FloatingContainer;
