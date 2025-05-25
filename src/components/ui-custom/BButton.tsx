import { Button, ButtonProps } from "@/components/ui/button";
import { MAIN_BUTTON_SIZE } from "@/constants/sizes";
import { useThemeConfig } from "@/context/useThemeConfig";
import { IconButton } from "@chakra-ui/react";
import { useMemo, forwardRef } from "react";

interface Props extends ButtonProps {
  fRef?: React.Ref<HTMLButtonElement>;
  children?: React.ReactNode;
  unclicky?: boolean;
  iconButton?: boolean;
}

const BButton = forwardRef<HTMLButtonElement, Props>(
  (
    {
      fRef,
      children,
      unclicky = false,
      iconButton = false,
      className = "",
      size,
      ...props
    },
    ref
  ) => {
    // Contexts
    const { themeConfig } = useThemeConfig();

    // States, Refs
    const finalClassName = `${unclicky ? "" : "clicky"} ${className}`.trim();

    // Memoized Active Style
    const activeBg = useMemo(() => {
      if (props.colorPalette) {
        switch (props?.variant) {
          default:
            return `${props.colorPalette}.solid`;
          case "ghost":
          case "outline":
            return `${props.colorPalette}.subtle`;
          case "subtle":
          case "surface":
            return `${props.colorPalette}.muted`;
          case "plain":
            return "";
        }
      } else {
        switch (props?.variant) {
          default:
            return "gray.subtle";
          case "subtle":
          case "surface":
            return "gray.muted";
          case "plain":
            return "";
        }
      }
    }, [props.variant, props.colorPalette]);

    return iconButton ? (
      <IconButton
        ref={ref || fRef}
        className={finalClassName}
        size={size}
        borderRadius={themeConfig.radii.component}
        {...props}
      >
        {children}
      </IconButton>
    ) : (
      <Button
        ref={ref || fRef}
        className={finalClassName}
        fontWeight="semibold"
        size={size || (MAIN_BUTTON_SIZE as any)}
        borderRadius={themeConfig.radii.component}
        _active={{ bg: activeBg }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

export default BButton;
