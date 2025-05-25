import { Alert as ChakraAlert, Icon } from "@chakra-ui/react";
import { CloseButton } from "./close-button";
import { forwardRef } from "react";
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useThemeConfig } from "@/context/useThemeConfig";

export interface AlertProps extends Omit<ChakraAlert.RootProps, "title"> {
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  title?: React.ReactNode;
  icon?: React.ReactElement;
  closable?: boolean;
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  const {
    title,
    children,
    icon,
    closable,
    onClose,
    startElement,
    endElement,
    ...rest
  } = props;

  // Contexts
  const { themeConfig } = useThemeConfig();

  let PresetIcon;
  switch (rest?.status) {
    case "success":
      PresetIcon = IconCircleCheck;
      break;
    case "error":
      PresetIcon = IconAlertTriangle;
      break;
    case "warning":
      PresetIcon = IconAlertCircle;
      break;
    default:
      PresetIcon = IconInfoCircle;
  }

  return (
    <ChakraAlert.Root
      ref={ref}
      variant={"surface"}
      borderRadius={themeConfig.radii.component}
      {...rest}
    >
      {startElement || (
        <ChakraAlert.Indicator>
          {icon || (
            <Icon>
              <PresetIcon />
            </Icon>
          )}
        </ChakraAlert.Indicator>
      )}
      {children ? (
        <ChakraAlert.Content>
          <ChakraAlert.Title>{title}</ChakraAlert.Title>
          <ChakraAlert.Description>{children}</ChakraAlert.Description>
        </ChakraAlert.Content>
      ) : (
        <ChakraAlert.Title flex="1">{title}</ChakraAlert.Title>
      )}
      {endElement}
      {closable && (
        <CloseButton
          size="sm"
          pos="relative"
          top="-2"
          insetEnd="-2"
          alignSelf="flex-start"
          onClick={onClose}
        />
      )}
    </ChakraAlert.Root>
  );
});
