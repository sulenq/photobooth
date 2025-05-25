import { useThemeConfig } from "@/context/useThemeConfig";
import rgbaToHex from "@/utils/rgbaToHex";
import { HStack, parseColor } from "@chakra-ui/react";
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerTrigger,
} from "../ui/color-picker";

const ColorInput = ({
  name,
  onChangeSetter,
  inputValue,
  placeholder = "Pilih warna",
  invalid,
  label,
  ...props
}: any) => {
  const { themeConfig } = useThemeConfig();

  return (
    <ColorPickerRoot
      defaultValue={parseColor(inputValue)}
      maxW="140px"
      onValueChange={(e) => {
        onChangeSetter(rgbaToHex(e.value));
      }}
      {...props}
    >
      {label && <ColorPickerLabel>{label}</ColorPickerLabel>}
      <ColorPickerControl>
        <ColorPickerInput _focus={{ borderColor: themeConfig.primaryColor }} />
        <ColorPickerTrigger cursor={"pointer"} />
      </ColorPickerControl>

      <ColorPickerContent>
        <ColorPickerArea />
        <HStack>
          <ColorPickerEyeDropper />
          <ColorPickerSliders />
        </HStack>
      </ColorPickerContent>
    </ColorPickerRoot>
  );
};

export default ColorInput;
