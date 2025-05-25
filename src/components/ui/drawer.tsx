import useBackOnDefaultPage from "@/hooks/useBackOnDefaultPage";
import back from "@/utils/back";
import {
  Drawer as ChakraDrawer,
  Portal,
  useDrawerContext,
} from "@chakra-ui/react";
import { forwardRef, useEffect, useState } from "react";
import { CloseButton } from "./close-button";

interface DrawerContentProps extends ChakraDrawer.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  offset?: ChakraDrawer.ContentProps["padding"];
  backdrop?: boolean;
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent(props, ref) {
    const {
      children,
      portalled = true,
      portalRef,
      offset,
      backdrop = true,
      ...rest
    } = props;

    // Contexts
    const { open } = useDrawerContext();

    // State for debounce unmount
    const [visible, setVisible] = useState(open);

    // Utils
    const handleBackOnDefaultPage = useBackOnDefaultPage();

    useEffect(() => {
      if (open) {
        setVisible(true);
      } else {
        const timeout = setTimeout(() => setVisible(false), 300);
        return () => clearTimeout(timeout);
      }
    }, [open]);

    return (
      <Portal disabled={!portalled} container={portalRef}>
        {backdrop && visible && (
          <ChakraDrawer.Backdrop
          // bg={"d1"}
          //  backdropFilter={"blur(5px)"}
          />
        )}
        {visible && (
          <ChakraDrawer.Positioner
            padding={offset}
            pointerEvents={"auto"}
            onClick={() => {
              back();
              handleBackOnDefaultPage();
            }}
          >
            <ChakraDrawer.Content
              ref={ref}
              justifyContent={"end"}
              shadow={"none"}
              onClick={(e) => e.stopPropagation()}
              asChild={false}
              {...rest}
            >
              {children}
            </ChakraDrawer.Content>
          </ChakraDrawer.Positioner>
        )}
      </Portal>
    );
  }
);

export const DrawerCloseTrigger = forwardRef<
  HTMLButtonElement,
  ChakraDrawer.CloseTriggerProps
>(function DrawerCloseTrigger(props, ref) {
  return (
    <ChakraDrawer.CloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...props}
      asChild
    >
      <CloseButton size="sm" ref={ref} />
    </ChakraDrawer.CloseTrigger>
  );
});

export const DrawerTrigger = ChakraDrawer.Trigger;
export const DrawerRoot = ChakraDrawer.Root;
export const DrawerFooter = ChakraDrawer.Footer;
export const DrawerHeader = ChakraDrawer.Header;
export const DrawerBody = ChakraDrawer.Body;
export const DrawerBackdrop = ChakraDrawer.Backdrop;
export const DrawerDescription = ChakraDrawer.Description;
export const DrawerTitle = ChakraDrawer.Title;
export const DrawerActionTrigger = ChakraDrawer.ActionTrigger;
