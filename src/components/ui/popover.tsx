import { Popover as ChakraPopover, Portal } from "@chakra-ui/react";
import { forwardRef } from "react";
import { CloseButton } from "./close-button";
import { useThemeConfig } from "@/context/useThemeConfig";

interface PopoverContentProps extends ChakraPopover.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(props, ref) {
    // Contexts
    const { themeConfig } = useThemeConfig();
    const { portalled = true, portalRef, ...rest } = props;

    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraPopover.Positioner>
          <ChakraPopover.Content
            ref={ref}
            bg={"body"}
            // w={"fit"}
            p={"10px"}
            borderRadius={themeConfig.radii.container}
            border={"1px solid"}
            borderColor={"border.subtle"}
            shadow={"none"}
            className="ss"
            {...rest}
          />
        </ChakraPopover.Positioner>
      </Portal>
    );
  }
);

export const PopoverArrow = forwardRef<
  HTMLDivElement,
  ChakraPopover.ArrowProps
>(function PopoverArrow(props, ref) {
  return (
    <ChakraPopover.Arrow ref={ref}>
      <ChakraPopover.ArrowTip
        bg={"body !important"}
        // backdropFilter={"blur(5px)"}
        // bg={"darktrans !important"}
        // borderColor={"transparent"}
        {...props}
      />
    </ChakraPopover.Arrow>
  );
});

export const PopoverCloseTrigger = forwardRef<
  HTMLButtonElement,
  ChakraPopover.CloseTriggerProps
>(function PopoverCloseTrigger(props, ref) {
  return (
    <ChakraPopover.CloseTrigger
      position="absolute"
      top="1"
      insetEnd="1"
      {...props}
      asChild
      ref={ref}
    >
      <CloseButton size="sm" />
    </ChakraPopover.CloseTrigger>
  );
});

export const PopoverTitle = ChakraPopover.Title;
export const PopoverDescription = ChakraPopover.Description;
export const PopoverFooter = ChakraPopover.Footer;
export const PopoverHeader = ChakraPopover.Header;
export const PopoverRoot = ChakraPopover.Root;
export const PopoverBody = ChakraPopover.Body;
export const PopoverTrigger = ChakraPopover.Trigger;
