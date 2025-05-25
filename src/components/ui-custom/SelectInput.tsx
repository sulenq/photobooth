import {
  Interface__Select,
  Interface__SelectOption,
} from "@/constants/interfaces";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import back from "@/utils/back";
import {
  Box,
  HStack,
  Icon,
  Text,
  useDisclosure,
  useFieldContext,
} from "@chakra-ui/react";
import { IconCaretDownFilled, IconRefresh } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ButtonProps } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";
import BButton from "./BButton";
import CContainer from "./CContainer";
import ComponentSpinner from "./ComponentSpinner";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "./Disclosure";
import DisclosureHeaderContent from "./DisclosureHeaderContent";
import FeedbackNoData from "./FeedbackNoData";
import FeedbackNotFound from "./FeedbackNotFound";
import SearchInput from "./SearchInput";

const SelectInput = ({
  id,
  onConfirm,
  inputValue,
  initialOptions,
  name,
  title,
  placeholder,
  invalid,
  nonNullable = false,
  multiple = false,
  disclosureSize = "xs",
  fetch,
  ...props
}: Interface__Select) => {
  // Contexts
  const fc = useFieldContext();
  const { l } = useLang();

  // States, Refs
  const finalPlaceholder = placeholder || l.select_input_default_placeholder;
  const [options, setOptions] = useState<
    Interface__SelectOption[] | undefined | null
  >(initialOptions);
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<
    Interface__SelectOption[] | undefined
  >(inputValue);

  // Utils
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(id || `${name ? `-${name}` : ""}`, open, onOpen, onClose);
  const { themeConfig } = useThemeConfig();
  const isSelected = (item: Interface__SelectOption) => {
    return selected?.some(
      (listItem) => listItem.id === item.id && listItem.label === item.label
    );
  };

  // Handle fetch
  useEffect(() => {
    if (fetch) {
      if (open) {
        fetch(setOptions);
      }
    }
  }, [open]);

  // Handle select all
  const [selectAll, setSelectAll] = useState<boolean>(false);
  useEffect(() => {
    if (multiple) {
      if (
        options &&
        options.length > 0 &&
        options?.length === selected?.length
      ) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
    }
  }, [open, options, selected]);

  // List component
  const fl = search
    ? options?.filter((option) => {
        const searchTerm = search.toLowerCase();
        return (
          option.label.toString().toLowerCase().includes(searchTerm) ||
          option.label2?.toString().toLowerCase().includes(searchTerm)
        );
      })
    : options;
  const OptionsList = ({ ...props }: ButtonProps) => {
    const handleSelect = (item: Interface__SelectOption) => {
      if (!multiple) {
        setSelected([item]);
      } else {
        if (isSelected(item)) {
          const newState = selected?.filter((fitem) => {
            return fitem.id !== item.id;
          });
          setSelected(newState);
        } else {
          const newState = selected ? [...selected, item] : [item];
          setSelected(newState);
        }
      }
    };

    return (
      <>
        {fl === undefined && <ComponentSpinner mb={2} />}

        {fl === null && <FeedbackNoData mb={8} />}

        {fl && fl.length === 0 && (
          <FeedbackNotFound title="Opsi tidak ditemukan" mb={5} />
        )}

        {fl && fl.length > 0 && (
          <>
            {fl?.map((item, i) => (
              <BButton
                unclicky
                key={i}
                variant={
                  isSelected(item) ? "outline" : !multiple ? "ghost" : "outline"
                }
                size={"md"}
                borderRadius={multiple ? "full" : ""}
                borderColor={isSelected(item) ? themeConfig.primaryColor : ""}
                justifyContent={"start"}
                onClick={() => {
                  handleSelect(item);
                }}
                {...props}
              >
                <Text truncate>{item?.label}</Text>
              </BButton>
            ))}
          </>
        )}
      </>
    );
  };

  // Handle confirm
  const onConfirmSelected = () => {
    if (!nonNullable || selected) {
      onConfirm?.(selected ?? undefined);
      back();
    }
  };

  return (
    <>
      <Tooltip
        content={
          inputValue && inputValue.length > 0
            ? `${inputValue && inputValue.map((item) => ` ${item.label}`)}`
            : finalPlaceholder
        }
      >
        <BButton
          w={"full"}
          unclicky
          variant={"ghost"}
          border={"1px solid"}
          borderColor={invalid ?? fc?.invalid ? "border.error" : "border.muted"}
          onClick={() => {
            if (inputValue) {
              setSelected(inputValue);
            }
            onOpen();
          }}
          px={3}
          size={"md"}
          {...props}
        >
          <HStack w={"full"} justify={"space-between"}>
            {inputValue ? (
              <Text fontWeight={"normal"} truncate>
                {inputValue?.map((item) => item.label).join(", ")}
              </Text>
            ) : (
              <Text
                color={props?._placeholder?.color || "var(--placeholder)"}
                truncate
              >
                {finalPlaceholder}
              </Text>
            )}

            <Icon
              maxH={"14px"}
              color={props?._placeholder?.color || "var(--placeholder)"}
            >
              <IconCaretDownFilled stroke={1.5} />
            </Icon>
          </HStack>
        </BButton>
      </Tooltip>

      <DisclosureRoot open={open} size={disclosureSize} lazyMount>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent
              content={
                <HStack justify={"space-between"}>
                  <Text
                    fontSize={"1rem"}
                    ml={1}
                    w={"full"}
                    fontWeight={"semibold"}
                    pr={"80px"}
                    truncate
                  >{`${
                    title
                      ? `${l.select_input_default_title} ${title}`
                      : finalPlaceholder
                  }`}</Text>

                  {fetch && (
                    <BButton
                      unclicky
                      iconButton
                      variant={"ghost"}
                      mr={5}
                      size={"sm"}
                      borderRadius={"full"}
                      position={"absolute"}
                      right={"30px"}
                      onClick={() => {
                        setOptions(undefined);
                        fetch(setOptions);
                      }}
                      disabled={options === undefined}
                    >
                      <Icon>
                        <IconRefresh />
                      </Icon>
                    </BButton>
                  )}
                </HStack>
              }
            />
          </DisclosureHeader>

          <DisclosureBody py={"0px !important"}>
            {fl && (
              <HStack>
                <SearchInput
                  onChangeSetter={(inputValue) => {
                    setSearch(inputValue);
                  }}
                  inputValue={search}
                  invalid={false}
                />
              </HStack>
            )}

            {!multiple && (
              <CContainer gap={1} pt={4} pb={[2, null, 4]}>
                <OptionsList />
              </CContainer>
            )}

            {multiple && (
              <>
                {fl && (
                  <Box
                    ml={"2px"}
                    onClick={() => {
                      if (!selectAll) {
                        setSelected(options as any);
                      } else {
                        setSelected(undefined);
                      }
                    }}
                    w={"fit-content"}
                    mt={5}
                  >
                    <Checkbox
                      name="select_all"
                      onChange={(e: any) => setSelectAll(e.target.checked)}
                      checked={selectAll}
                      invalid={false}
                      size={"sm"}
                      colorPalette={themeConfig.colorPalette}
                    >
                      <Text>{l.select_all}</Text>
                    </Checkbox>
                  </Box>
                )}

                <CContainer>
                  <HStack wrap={"wrap"} pt={4} pb={[2, null, 4]}>
                    <OptionsList />
                  </HStack>
                </CContainer>
              </>
            )}
          </DisclosureBody>

          {fl !== undefined && fl !== null && (
            <DisclosureFooter>
              <BButton
                variant={"outline"}
                onClick={() => {
                  setSelected(undefined);
                }}
              >
                Clear
              </BButton>
              <BButton
                onClick={onConfirmSelected}
                colorPalette={themeConfig.colorPalette}
                disabled={nonNullable && !selected}
              >
                {l.confirm}
              </BButton>
            </DisclosureFooter>
          )}
        </DisclosureContent>
      </DisclosureRoot>
    </>
  );
};

export default SelectInput;
