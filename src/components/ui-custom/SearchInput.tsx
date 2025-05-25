import {
  Center,
  Icon,
  IconButton,
  IconProps,
  InputProps,
} from "@chakra-ui/react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Dispatch, useCallback, useEffect, useState } from "react";
import { InputGroup, InputGroupProps } from "../ui/input-group";
import { Tooltip } from "../ui/tooltip";
import StringInput from "./StringInput";
import useLang from "@/context/useLang";

interface Props extends Omit<InputGroupProps, "children"> {
  inputValue?: string;
  onChangeSetter?: Dispatch<string>;
  name?: string;
  placeholder?: string;
  tooltipLabel?: string;
  inputRef?: any;
  inputProps?: InputProps;
  icon?: any;
  iconProps?: IconProps;
  invalid?: boolean;
  noIcon?: boolean;
  children?: React.ReactNode;
}

export default function SearchInput({
  inputRef,
  name,
  inputValue,
  onChangeSetter,
  tooltipLabel,
  placeholder,
  inputProps,
  icon,
  iconProps,
  invalid = false,
  noIcon = false,
  ...props
}: Props) {
  // Contexts
  const { l } = useLang();

  // States, Refs
  const [searchLocal, setSearchLocal] = useState<string>(inputValue || "");

  // Handle onchange
  const handleOnChange = useCallback(
    (value: string) => {
      if (value !== inputValue) {
        if (onChangeSetter) onChangeSetter(value);
      }
    },
    [onChangeSetter, inputValue]
  );

  // Handle debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      handleOnChange(searchLocal);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchLocal, handleOnChange]);

  // Sync searchLocal with inputValue prop when it changes
  useEffect(() => {
    setSearchLocal(inputValue || "");
  }, [inputValue]);

  return (
    <Tooltip
      content={
        tooltipLabel || placeholder || l.search_input_default_placeholder
      }
    >
      <InputGroup
        w={"full"}
        startElement={
          !noIcon && (
            <Icon
              ml={
                inputProps?.size === "xs" || inputProps?.size === "sm" ? -1 : ""
              }
              size={
                inputProps?.size === "xs" || inputProps?.size === "sm"
                  ? "sm"
                  : "md"
              }
              {...iconProps}
            >
              {icon || <IconSearch />}
            </Icon>
          )
        }
        {...props}
      >
        <>
          <StringInput
            pl={inputProps?.size === "xs" || inputProps?.size === "sm" ? 8 : 10}
            name={name}
            fRef={inputRef ? inputRef : null}
            placeholder={placeholder || l.search_input_default_placeholder}
            pr={"40px"}
            onChangeSetter={(input) => {
              setSearchLocal(input as string);
            }}
            inputValue={searchLocal}
            boxShadow={"none !important"}
            borderColor={invalid ? "border.error" : "border.muted"}
            {...inputProps}
          />

          {searchLocal && (
            <Center
              flexShrink={0}
              zIndex={3}
              position={"absolute"}
              h={"100%"}
              right={0}
            >
              <IconButton
                aria-label="Clear Search"
                onClick={() => {
                  if (onChangeSetter) onChangeSetter("");
                }}
                colorScheme="error"
                variant={"plain"}
                borderRadius={"full"}
                size={
                  inputProps?.size === "xs" || inputProps?.size === "sm"
                    ? "xs"
                    : "md"
                }
                color={"fg.error"}
              >
                <Icon>
                  <IconX />
                </Icon>
              </IconButton>
            </Center>
          )}
        </>
      </InputGroup>
    </Tooltip>
  );
}
