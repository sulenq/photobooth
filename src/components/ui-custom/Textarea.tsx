import { useThemeConfig } from "@/context/useThemeConfig";
import {
  Textarea as ChakraTextarea,
  TextareaProps,
  useFieldContext,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef } from "react";

interface Props extends TextareaProps {
  name?: string;
  onChangeSetter?: (inputValue: string | undefined) => void;
  inputValue?: string | undefined;
  invalid?: boolean;
  placeholder?: string;
}

export default function Textarea({
  name,
  onChangeSetter,
  inputValue,
  invalid,
  placeholder,
  ...props
}: Props) {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const fc = useFieldContext();

  // States, Refs
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Utils
  const autoResize = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 5
      }px`;
    }
  }, [textareaRef]);

  // Handle auto resize
  useEffect(() => {
    autoResize();
  }, [autoResize, inputValue]);

  return (
    <ChakraTextarea
      ref={textareaRef}
      minH={"80px"}
      name={name}
      borderColor={fc?.invalid || invalid ? "border.error" : "border.muted"}
      fontWeight={"medium"}
      outline={"none !important"}
      _focus={{ borderColor: themeConfig.primaryColor }}
      borderRadius={themeConfig.radii.component}
      placeholder={placeholder || "Input text"}
      onChange={(e) => {
        onChangeSetter?.(e.target.value);
      }}
      value={inputValue}
      {...props}
    />
  );
}
