import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useScreen from "@/hooks/useScreen";
import back from "@/utils/back";
import {
  HStack,
  Icon,
  SimpleGrid,
  StackProps,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";
import { Dispatch, useEffect, useRef, useState } from "react";
import BButton from "./BButton";
import CContainer from "./CContainer";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "./Disclosure";
import DisclosureHeaderContent from "./DisclosureHeaderContent";
import StringInput from "./StringInput";
import useLang from "@/context/useLang";
import { MONTHS } from "@/constants/months";

interface Props {
  children?: any;
  id?: string;
  name?: string;
  title?: string;
  month?: number;
  setMonth?: Dispatch<number>;
  year?: number;
  setYear?: Dispatch<number>;
  setDate?: Dispatch<Date>;
  disabled?: boolean;
  triggerProps?: StackProps;
}

const PeriodPickerDisclosure = ({
  children,
  id,
  name,
  title,
  month = new Date().getMonth(),
  setMonth,
  year = new Date().getFullYear(),
  setYear,
  setDate,
  disabled = false,
  triggerProps,
}: Props) => {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const { l, lang } = useLang();

  // States, Refs
  const [monthLocal, setMonthLocal] = useState<number>(month);
  const [yearLocal, setYearLocal] = useState<number>(year);
  const validYear = (year: number) => {
    return year >= 100 && year <= 270000;
  };

  // Utils
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(
    id || `period-picker${name ? `-${name}` : ""}`,
    open,
    onOpen,
    onClose
  );
  const { sw } = useScreen();

  // Initial setter
  useEffect(() => {
    setMonthLocal(month);
  }, [month]);
  useEffect(() => {
    setYearLocal(year);
  }, [year]);

  // Handle year increment decrement w/ hold button
  const intervalIncrementRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const timeoutIncrementRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const intervalDecrementRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const timeoutDecrementRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  function handleMouseDownIncrement() {
    if (timeoutIncrementRef.current || intervalIncrementRef.current) return;

    timeoutIncrementRef.current = setTimeout(() => {
      intervalIncrementRef.current = setInterval(() => {
        setYearLocal((ps) => ps + 1);
      }, 100);
    }, 300);
  }
  function handleMouseUpIncrement() {
    if (timeoutIncrementRef.current) {
      clearTimeout(timeoutIncrementRef.current);
      timeoutIncrementRef.current = null;
    }
    if (intervalIncrementRef.current) {
      clearInterval(intervalIncrementRef.current);
      intervalIncrementRef.current = null;
    }
  }
  function handleMouseDownDecrement() {
    if (timeoutDecrementRef.current || intervalDecrementRef.current) return;

    timeoutDecrementRef.current = setTimeout(() => {
      intervalDecrementRef.current = setInterval(() => {
        if (yearLocal > 0) {
          setYearLocal((ps) => ps - 1);
        }
      }, 100);
    }, 300);
  }
  function handleMouseUpDecrement() {
    if (timeoutDecrementRef.current) {
      clearTimeout(timeoutDecrementRef.current);
      timeoutDecrementRef.current = null;
    }
    if (intervalDecrementRef.current) {
      clearInterval(intervalDecrementRef.current);
      intervalDecrementRef.current = null;
    }
  }

  // Handle confirm
  function onConfirm() {
    if (setMonth) {
      setMonth(monthLocal);
    }
    if (setYear) {
      setYear(yearLocal);
    }
    if (setDate) {
      setDate(new Date(yearLocal, monthLocal));
    }
    back();
  }

  return (
    <>
      <CContainer
        w={"unset"}
        onClick={disabled ? undefined : onOpen}
        {...triggerProps}
      >
        {children}
      </CContainer>

      <DisclosureRoot open={open} size={"xs"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent
              title={title || l.periode_picker_default_title}
            />
          </DisclosureHeader>

          <DisclosureBody>
            <Text fontWeight={"medium"} mb={2}>
              {l.year}
            </Text>
            <HStack>
              <BButton
                variant={"outline"}
                iconButton
                disabled={yearLocal <= 0}
                onClick={() => {
                  if (yearLocal > 0) {
                    setYearLocal(yearLocal - 1);
                  }
                }}
                onMouseDown={() => {
                  handleMouseDownDecrement();
                }}
                onMouseUp={handleMouseUpDecrement}
                onMouseLeave={handleMouseUpDecrement}
                onTouchStart={() => {
                  handleMouseDownDecrement();
                }}
                onTouchEnd={handleMouseUpDecrement}
              >
                <Icon h={"1rem"}>
                  <IconCaretLeftFilled />
                </Icon>
              </BButton>

              <StringInput
                name="tahun"
                textAlign={"center"}
                placeholder="Tahun"
                onChangeSetter={(inputValue) => {
                  setYearLocal(parseInt(inputValue as string));
                }}
                inputValue={yearLocal ? yearLocal.toString() : ""}
                borderColor={"border.muted"}
              />

              <BButton
                variant={"outline"}
                iconButton
                disabled={yearLocal <= 0}
                onClick={() => {
                  setYearLocal(yearLocal + 1);
                }}
                onMouseDown={() => {
                  handleMouseDownIncrement();
                }}
                onMouseUp={handleMouseUpIncrement}
                onMouseLeave={handleMouseUpIncrement}
                onTouchStart={() => {
                  handleMouseDownIncrement();
                }}
                onTouchEnd={handleMouseUpIncrement}
              >
                <Icon h={"1rem"}>
                  <IconCaretRightFilled />
                </Icon>
              </BButton>
            </HStack>

            <Text fontWeight={"medium"} mt={4} mb={2}>
              {l.month}
            </Text>
            <SimpleGrid columns={sw < 350 ? 2 : 3} gap={2}>
              {MONTHS[lang].map((month, i) => {
                const active = i === monthLocal;

                return (
                  <BButton
                    key={i}
                    flex={"1 1 100px"}
                    variant={"outline"}
                    borderColor={active ? themeConfig.primaryColor : ""}
                    onClick={() => {
                      setMonthLocal(i);
                    }}
                  >
                    {month}
                  </BButton>
                );
              })}
            </SimpleGrid>
          </DisclosureBody>

          <DisclosureFooter>
            <BButton
              onClick={onConfirm}
              colorPalette={themeConfig.colorPalette}
              disabled={!validYear(yearLocal)}
            >
              Konfirmasi
            </BButton>
          </DisclosureFooter>
        </DisclosureContent>
      </DisclosureRoot>
    </>
  );
};

export default PeriodPickerDisclosure;
