import useBackOnDefaultPage from "@/hooks/useBackOnDefaultPage";
import useScreen from "@/hooks/useScreen";
import back from "@/utils/back";
import { Dialog as ChakraDialog, Portal } from "@chakra-ui/react";
import { forwardRef } from "react";
import { CloseButton } from "./close-button";

interface DialogContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  backdrop?: boolean;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(props, ref) {
    const {
      children,
      portalled = true,
      portalRef,
      backdrop = true,
      ...rest
    } = props;

    // Utils
    const handleBackOnDefaultPage = useBackOnDefaultPage();
    const { sh } = useScreen();

    return (
      <Portal disabled={!portalled} container={portalRef}>
        {backdrop && (
          <ChakraDialog.Backdrop
          // bg={"d1"}
          // backdropFilter={"blur(5px)"}
          />
        )}
        <ChakraDialog.Positioner
          pointerEvents="auto"
          onClick={() => {
            back();
            handleBackOnDefaultPage();
          }}
        >
          <ChakraDialog.Content
            ref={ref}
            minH={sh < 500 ? "90dvh" : ""}
            bg={"body"}
            shadow={"none"}
            border={"1px solid {colors.border.subtle}"}
            onClick={(e) => {
              e.stopPropagation();
            }}
            {...rest}
            asChild={false}
          >
            {children}
          </ChakraDialog.Content>
        </ChakraDialog.Positioner>
      </Portal>
    );
  }
);

export const DialogCloseTrigger = forwardRef<
  HTMLButtonElement,
  ChakraDialog.CloseTriggerProps
>(function DialogCloseTrigger(props, ref) {
  return (
    <ChakraDialog.CloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...props}
      asChild
    >
      <CloseButton size="xs" ref={ref}>
        {props.children}
      </CloseButton>
    </ChakraDialog.CloseTrigger>
  );
});

export const DialogRoot = ChakraDialog.Root;
export const DialogFooter = ChakraDialog.Footer;
export const DialogHeader = ChakraDialog.Header;
export const DialogBody = ChakraDialog.Body;
export const DialogBackdrop = ChakraDialog.Backdrop;
export const DialogTitle = ChakraDialog.Title;
export const DialogDescription = ChakraDialog.Description;
export const DialogTrigger = ChakraDialog.Trigger;
export const DialogActionTrigger = ChakraDialog.ActionTrigger;
