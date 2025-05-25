import { Box, BoxProps, Icon, IconButton, InputProps } from "@chakra-ui/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import StringInput from "./StringInput";
import { useColorModeValue } from "../ui/color-mode";

interface Props extends InputProps {
  name?: string;
  onChangeSetter?: (inputValue: string | undefined) => void;
  inputValue?: string | undefined;
  isError?: boolean;
  placeholder?: string;
  boxProps?: BoxProps;
  invalid?: boolean;
}

export default function PasswordInput({
  name,
  onChangeSetter,
  inputValue,
  isError,
  placeholder = "********",
  boxProps,
  invalid,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Box w={"full"} position={"relative"} {...boxProps}>
      <StringInput
        name={name}
        placeholder={placeholder}
        onChangeSetter={(inputValue) => {
          if (onChangeSetter) onChangeSetter(inputValue);
        }}
        inputValue={inputValue}
        type={showPassword ? "text" : "password"}
        pr={"40px !important"}
        invalid={invalid}
        {...props}
      />

      <IconButton
        aria-label="show password button"
        bg={"transparent"}
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        position={"absolute"}
        right={0}
        top={0}
        zIndex={2}
        onClick={() => {
          setShowPassword((ps) => !ps);
        }}
      >
        <Icon fontSize={"lg"} color={useColorModeValue("black", "white")}>
          {showPassword ? (
            <IconEye stroke={1.5} />
          ) : (
            <IconEyeOff stroke={1.5} />
          )}
        </Icon>
      </IconButton>
    </Box>
  );
}
