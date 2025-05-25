import type { ButtonProps, InputProps } from "@chakra-ui/react";
import {
  Button,
  Clipboard as ChakraClipboard,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { IconCheck, IconClipboard } from "@tabler/icons-react";
import { forwardRef } from "react";
import { LuLink } from "react-icons/lu";
import StringInput from "../ui-custom/StringInput";

const ClipboardIcon = forwardRef<
  HTMLDivElement,
  ChakraClipboard.IndicatorProps
>(function ClipboardIcon(props, ref) {
  return (
    <ChakraClipboard.Indicator
      copied={
        <Icon>
          <IconCheck />
        </Icon>
      }
      {...props}
      ref={ref}
    >
      <Icon h={"20px"}>
        <IconClipboard />
      </Icon>
    </ChakraClipboard.Indicator>
  );
});

const ClipboardCopyText = forwardRef<
  HTMLDivElement,
  ChakraClipboard.IndicatorProps
>(function ClipboardCopyText(props, ref) {
  return (
    <ChakraClipboard.Indicator copied="Copied" {...props} ref={ref}>
      Copy
    </ChakraClipboard.Indicator>
  );
});

export const ClipboardLabel = forwardRef<
  HTMLLabelElement,
  ChakraClipboard.LabelProps
>(function ClipboardLabel(props, ref) {
  return (
    <ChakraClipboard.Label
      textStyle="sm"
      fontWeight="medium"
      display="inline-block"
      mb="1"
      {...props}
      ref={ref}
    />
  );
});

export const ClipboardButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function ClipboardButton(props, ref) {
    return (
      <ChakraClipboard.Trigger asChild>
        <Button ref={ref} size="sm" variant="surface" {...props}>
          <ClipboardIcon />
          <ClipboardCopyText />
        </Button>
      </ChakraClipboard.Trigger>
    );
  }
);

export const ClipboardLink = forwardRef<HTMLButtonElement, ButtonProps>(
  function ClipboardLink(props, ref) {
    return (
      <ChakraClipboard.Trigger asChild>
        <Button
          unstyled
          variant="plain"
          size="xs"
          display="inline-flex"
          alignItems="center"
          gap="2"
          ref={ref}
          {...props}
        >
          <LuLink />
          <ClipboardCopyText />
        </Button>
      </ChakraClipboard.Trigger>
    );
  }
);

export const ClipboardIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function ClipboardIconButton(props, ref) {
    return (
      <ChakraClipboard.Trigger mr={-2} asChild>
        <IconButton ref={ref} size="xs" variant="plain" {...props}>
          <ClipboardIcon />
          <ClipboardCopyText srOnly />
        </IconButton>
      </ChakraClipboard.Trigger>
    );
  }
);

export const ClipboardInput = forwardRef<HTMLInputElement, InputProps>(
  function ClipboardInputElement(props, ref) {
    return (
      <ChakraClipboard.Input asChild>
        <StringInput fRef={ref} {...props} />
      </ChakraClipboard.Input>
    );
  }
);

export const ClipboardRoot = ChakraClipboard.Root;
