import { PRESET_MAIN_BUTTON_MD } from "@/constants/presetProps";
import formatNumber from "@/utils/formatNumber";
import { HStack, Icon, Image, StackProps, Text } from "@chakra-ui/react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { Dispatch } from "react";
import BButton from "../ui-custom/BButton";
import CContainer from "../ui-custom/CContainer";
import NumberInput from "../ui-custom/NumberInput";

interface Props extends StackProps {
  item?: any;
  chooseCallback?: () => void;
  choosed?: any;
  setChoosed?: Dispatch<any>;
}
const ChooseProductItem = (props: Props) => {
  // Props
  const { item, chooseCallback, choosed, setChoosed, ...restProps } = props;

  // Utils
  function handleIncrement() {
    if (choosed?.product?.id === item?.id) {
      setChoosed?.({
        ...choosed,
        qty: choosed?.qty + 1,
      });
    }
  }
  function handleDecrement() {
    if (choosed?.product?.id === item?.id) {
      setChoosed?.({
        ...choosed,
        qty: choosed?.qty - 1,
      });
    }
  }

  return (
    <CContainer
      borderRadius={16}
      overflow={"clip"}
      w={"300px"}
      bg={"white"}
      {...restProps}
    >
      <Image src={item?.productPhoto} alt={item?.productName} aspectRatio={1} />

      <CContainer p={4} bg={"p.500"}>
        <Text fontSize={24} fontWeight={"bold"}>
          {item?.productName}
        </Text>

        <Text fontSize={20} fontWeight={"medium"} mb={2}>
          Rp. {formatNumber(item?.productPrice)}
        </Text>

        {choosed?.product?.id !== item?.id && (
          <BButton
            size={"lg"}
            h={"50px"}
            color={"p.100"}
            onClick={chooseCallback}
            // disabled={choosed && choosed?.product?.id !== item?.id}
            {...PRESET_MAIN_BUTTON_MD}
          >
            CHOOSE
          </BButton>
        )}

        {choosed?.product?.id === item?.id && (
          <HStack
            border={"1px solid {colors.p.900}"}
            p={2}
            borderRadius={16}
            bg={"p.400"}
            h={"50px"}
          >
            <BButton
              size={"sm"}
              iconButton
              colorPalette={"p"}
              variant={"outline"}
              borderColor={"p.900"}
              disabled={choosed?.qty === 1}
              onClick={handleDecrement}
            >
              <Icon color={"p.900"}>
                <IconMinus stroke={3} />
              </Icon>
            </BButton>

            <NumberInput
              colorPalette={"p"}
              variant={"outline"}
              borderColor={"transparent"}
              textAlign={"center"}
              inputValue={choosed?.qty}
              fontSize={18}
            />

            <BButton
              size={"sm"}
              iconButton
              colorPalette={"p"}
              variant={"outline"}
              borderColor={"p.900"}
              onClick={handleIncrement}
            >
              <Icon color={"p.900"}>
                <IconPlus stroke={3} />
              </Icon>
            </BButton>
          </HStack>
        )}
      </CContainer>
    </CContainer>
  );
};

export default ChooseProductItem;
