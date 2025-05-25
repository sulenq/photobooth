"use client";

import type { IconButtonProps } from "@chakra-ui/react";
import { ClientOnly, Icon, Skeleton } from "@chakra-ui/react";
import { IconMoon2, IconSunHigh } from "@tabler/icons-react";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider, useTheme } from "next-themes";
import { forwardRef } from "react";
import BButton from "../ui-custom/BButton";

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };
  return {
    colorMode: resolvedTheme,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? light : dark;
}

export function ColorModeIcon({ ...props }: any) {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? (
    <Icon {...props}>
      <IconSunHigh stroke={1.8} />
    </Icon>
  ) : (
    <Icon {...props}>
      <IconMoon2 stroke={1.5} />
    </Icon>
  );
}

interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

export const ColorModeButton = forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <BButton
        iconButton
        fRef={ref}
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        {...props}
      >
        <ColorModeIcon fontSize={props?.fontSize} />
      </BButton>
    </ClientOnly>
  );
});
