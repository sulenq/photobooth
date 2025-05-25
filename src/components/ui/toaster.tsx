"use client";

import { useThemeConfig } from "@/context/useThemeConfig";
import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";

export const toaster = createToaster({
  placement: window.innerWidth < 768 ? "top" : "bottom-end",
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  const { themeConfig } = useThemeConfig();

  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => {
          return (
            <Toast.Root
              borderRadius={10}
              width={{ md: "sm" }}
              color={
                toast.type === "info" || toast.type === "loading" ? "" : "white"
              }
              bg={toast.type === "success" ? "green.600 !important" : ""}
            >
              {toast.type === "loading" ? (
                <Spinner
                  size="xs"
                  color={themeConfig.primaryColor}
                  mt={"4px"}
                />
              ) : (
                <Toast.Indicator />
              )}
              <Stack gap="1" flex="1" maxWidth="100%">
                {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                {toast.description && (
                  <Toast.Description>{toast.description}</Toast.Description>
                )}
              </Stack>
              {toast.action && (
                <Toast.ActionTrigger borderRadius={6}>
                  {toast.action.label}
                </Toast.ActionTrigger>
              )}
              {toast.meta?.closable && <Toast.CloseTrigger />}
            </Toast.Root>
          );
        }}
      </ChakraToaster>
    </Portal>
  );
};
