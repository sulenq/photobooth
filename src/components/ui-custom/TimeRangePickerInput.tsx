import { Interface__TimeRangePicker } from "@/constants/interfaces";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useScreen from "@/hooks/useScreen";
import back from "@/utils/back";
import formatDuration from "@/utils/formatDuration";
import formatTime from "@/utils/formatTime";
import getSecondsDurationFromTimeRange from "@/utils/getSecondsDurationFromTimeRange";
import { getHours, getMinutes, getSeconds } from "@/utils/time";
import {
  Center,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
  useFieldContext,
  VStack,
} from "@chakra-ui/react";
import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconHourglassHigh,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "../ui/tooltip";
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

const TimeRangePickerInput = ({
  id,
  name,
  title,
  onConfirm,
  inputValue,
  withSeconds = false,
  placeholder,
  nonNullable,
  invalid,
  disclosureSize = withSeconds ? "xl" : "lg",
  ...props
}: Interface__TimeRangePicker) => {
  // Contexts
  const fc = useFieldContext();
  const { themeConfig } = useThemeConfig();
  const { l } = useLang();

  // States, Refs
  const finalPlaceholder =
    placeholder || l.time_range_picker_default_placeholder;
  const defaultTime = {
    from: "00:00:00",
    to: "00:00:00",
  };
  const [selected, setSelected] = useState<any>(inputValue);
  const [firstRender, setFirstRender] = useState(true);
  const [hoursFrom, setHoursFrom] = useState<number>(
    getHours(inputValue?.from)
  );
  const [minutesFrom, setMinutesFrom] = useState<number>(
    getMinutes(inputValue?.from)
  );
  const [secondsFrom, setSecondsFrom] = useState<number>(
    getSeconds(inputValue?.from)
  );
  const [hoursTo, setHoursTo] = useState<number>(getHours(inputValue?.to));
  const [minutesTo, setMinutesTo] = useState<number>(
    getMinutes(inputValue?.to)
  );
  const [secondsTo, setSecondsTo] = useState<number>(
    getSeconds(inputValue?.to)
  );
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
  const renderValue = withSeconds
    ? `${inputValue?.from} - ${inputValue?.to} (${formatDuration(
        getSecondsDurationFromTimeRange(inputValue?.from, inputValue?.to)
      )})`
    : `${formatTime(inputValue?.from)} - ${formatTime(
        inputValue?.to
      )} (${formatDuration(
        getSecondsDurationFromTimeRange(inputValue?.from, inputValue?.to)
      )})`;

  // Utils
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(
    id || `time-range-picker${name ? `-${name}` : ""}`,
    open,
    onOpen,
    onClose
  );
  const { sw } = useScreen();
  const overflow = sw < 450 && withSeconds;

  // Handle initial
  useEffect(() => {
    if (inputValue) {
      setHoursFrom(getHours(inputValue?.from));
      setMinutesFrom(getMinutes(inputValue?.from));
      setSecondsFrom(getSeconds(inputValue?.from));
      setHoursTo(getHours(inputValue?.to));
      setMinutesTo(getMinutes(inputValue?.to));
      setSecondsTo(getSeconds(inputValue?.to));
    }
  }, [inputValue]);
  useEffect(() => {
    setFirstRender(false);
  }, []);

  // Handle selected
  useEffect(() => {
    const fHours = String(hoursFrom).padStart(2, "0");
    const fMinutes = String(minutesFrom).padStart(2, "0");
    const fSeconds = String(secondsFrom).padStart(2, "0");
    if (!firstRender) {
      setSelected((ps: any) => ({
        ...ps,
        from: `${fHours}:${fMinutes}:${fSeconds}`,
      }));
    }
  }, [hoursFrom, minutesFrom, secondsFrom]);
  useEffect(() => {
    const fHours = String(hoursTo).padStart(2, "0");
    const fMinutes = String(minutesTo).padStart(2, "0");
    const fSeconds = String(secondsTo).padStart(2, "0");
    if (!firstRender) {
      setSelected((ps: any) => ({
        ...ps,
        to: `${fHours}:${fMinutes}:${fSeconds}`,
      }));
    }
  }, [hoursTo, minutesTo, secondsTo]);

  // Handle increment, decrement
  function handleMouseDownIncrementFrom(type: string) {
    if (timeoutIncrementRef.current || intervalIncrementRef.current) return;

    timeoutIncrementRef.current = setTimeout(() => {
      intervalIncrementRef.current = setInterval(() => {
        if (type === "hours") {
          setHoursFrom((ps) => (ps < 23 ? ps + 1 : 0));
        } else if (type === "minutes") {
          setMinutesFrom((ps) => (ps < 59 ? ps + 1 : 0));
        } else if (type === "seconds") {
          setSecondsFrom((ps) => (ps < 59 ? ps + 1 : 0));
        }
      }, 100);
    }, 300);
  }
  function handleMouseDownIncrementTo(type: string) {
    if (timeoutIncrementRef.current || intervalIncrementRef.current) return;

    timeoutIncrementRef.current = setTimeout(() => {
      intervalIncrementRef.current = setInterval(() => {
        if (type === "hours") {
          setHoursTo((ps) => (ps < 23 ? ps + 1 : 0));
        } else if (type === "minutes") {
          setMinutesTo((ps) => (ps < 59 ? ps + 1 : 0));
        } else if (type === "seconds") {
          setSecondsTo((ps) => (ps < 59 ? ps + 1 : 0));
        }
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
  function handleMouseDownDecrementFrom(type: string) {
    if (timeoutDecrementRef.current || intervalDecrementRef.current) return;

    timeoutDecrementRef.current = setTimeout(() => {
      intervalDecrementRef.current = setInterval(() => {
        if (type === "hours") {
          setHoursFrom((ps) => (ps > 0 ? ps - 1 : 23));
        } else if (type === "minutes") {
          setMinutesFrom((ps) => (ps > 0 ? ps - 1 : 59));
        } else if (type === "seconds") {
          setSecondsFrom((ps) => (ps > 0 ? ps - 1 : 59));
        }
      }, 100);
    }, 300);
  }
  function handleMouseDownDecrementTo(type: string) {
    if (timeoutDecrementRef.current || intervalDecrementRef.current) return;

    timeoutDecrementRef.current = setTimeout(() => {
      intervalDecrementRef.current = setInterval(() => {
        if (type === "hours") {
          setHoursTo((ps) => (ps > 0 ? ps - 1 : 23));
        } else if (type === "minutes") {
          setMinutesTo((ps) => (ps > 0 ? ps - 1 : 59));
        } else if (type === "seconds") {
          setSecondsTo((ps) => (ps > 0 ? ps - 1 : 59));
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

  // Handle confirm selected
  function onConfirmSelected() {
    let confirmable = false;
    if (!nonNullable) {
      confirmable = true;
    } else {
      if (selected) {
        confirmable = true;
      }
    }

    if (confirmable) {
      if (onConfirm) {
        onConfirm(selected);
      }
      back();
    }
  }

  return (
    <>
      <Tooltip content={inputValue ? renderValue : finalPlaceholder}>
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
          size={"md"}
          px={3}
          {...props}
        >
          <HStack w={"full"} justify={"space-between"}>
            {inputValue?.from && inputValue?.to ? (
              <Text truncate>{renderValue}</Text>
            ) : (
              <Text
                color={props?._placeholder?.color || "var(--placeholder)"}
                truncate
              >
                {finalPlaceholder}
              </Text>
            )}

            <Icon opacity={0.4}>
              <IconHourglassHigh stroke={1.5} />
            </Icon>
          </HStack>
        </BButton>
      </Tooltip>

      <DisclosureRoot open={open} size={disclosureSize}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent
              title={title || l.time_range_picker_default_title}
            />
          </DisclosureHeader>

          <DisclosureBody>
            <Stack
              gap={5}
              align={"stretch"}
              flexDir={
                (!withSeconds && sw < 680) || (withSeconds && sw < 900)
                  ? "column"
                  : "row"
              }
            >
              <CContainer>
                {/* <Text fontSize={"lg"} fontWeight={"semibold"} mb={2}>
                  Mulai
                </Text> */}
                <HStack
                  justify={"space-between"}
                  gap={1}
                  wrap={overflow ? "wrap" : ""}
                  gapY={overflow ? 4 : 0}
                >
                  <VStack flex={"1 1 120"} align={"stretch"} gap={0}>
                    <BButton
                      iconButton
                      aria-label="add hour button"
                      variant={"outline"}
                      onClick={() => {
                        setHoursFrom((ps) => (ps < 23 ? ps + 1 : 0));
                        if (!selected) {
                          setSelected(defaultTime);
                        }
                      }}
                      onMouseDown={() => {
                        handleMouseDownIncrementFrom("hours");
                      }}
                      onMouseUp={handleMouseUpIncrement}
                      onMouseLeave={handleMouseUpIncrement}
                      onTouchStart={() => {
                        handleMouseDownIncrementFrom("hours");
                      }}
                      onTouchEnd={handleMouseUpIncrement}
                    >
                      <Icon fontSize={"md"}>
                        <IconCaretUpFilled />
                      </Icon>
                    </BButton>

                    <VStack my={4}>
                      <StringInput
                        name="jam"
                        onChangeSetter={(input) => {
                          if (parseInt(input as string) < 24) {
                            setHoursFrom(parseInt(input as string));
                          }
                        }}
                        inputValue={
                          selected ? String(hoursFrom).padStart(2, "0") : "--"
                        }
                        fontSize={"64px !important"}
                        fontWeight={600}
                        h={"64px"}
                        textAlign={"center"}
                        border={"none !important"}
                        _focus={{ border: "none !important" }}
                      />
                      {/* <Text textAlign={"center"}>Jam</Text> */}
                    </VStack>

                    <BButton
                      iconButton
                      aria-label="reduce hour button"
                      variant={"outline"}
                      onClick={() => {
                        setHoursFrom((ps) => (ps > 0 ? ps - 1 : 23));
                        if (!selected) {
                          setSelected(defaultTime);
                        }
                      }}
                      onMouseDown={() => {
                        handleMouseDownDecrementFrom("hours");
                      }}
                      onMouseUp={handleMouseUpDecrement}
                      onMouseLeave={handleMouseUpDecrement}
                      onTouchStart={() => {
                        handleMouseDownDecrementFrom("hours");
                      }}
                      onTouchEnd={handleMouseUpDecrement}
                    >
                      <Icon fontSize={"md"}>
                        <IconCaretDownFilled />
                      </Icon>
                    </BButton>
                  </VStack>

                  {!overflow && (
                    <Text fontSize={50} opacity={0.2} mt={-9}>
                      :
                    </Text>
                  )}

                  <VStack flex={"1 1 120"} align={"stretch"} gap={0}>
                    <BButton
                      iconButton
                      aria-label="add hour button"
                      variant={"outline"}
                      onClick={() => {
                        setMinutesFrom((ps) => (ps < 59 ? ps + 1 : 0));
                        if (!selected) {
                          setSelected(defaultTime);
                        }
                      }}
                      onMouseDown={() => {
                        handleMouseDownIncrementFrom("minutes");
                      }}
                      onMouseUp={handleMouseUpIncrement}
                      onMouseLeave={handleMouseUpIncrement}
                      onTouchStart={() => {
                        handleMouseDownIncrementFrom("minutes");
                      }}
                      onTouchEnd={handleMouseUpIncrement}
                    >
                      <Icon fontSize={"md"}>
                        <IconCaretUpFilled />
                      </Icon>
                    </BButton>

                    <VStack my={4}>
                      <StringInput
                        name="jam"
                        onChangeSetter={(input) => {
                          if (parseInt(input as string) < 60) {
                            setMinutesFrom(parseInt(input as string));
                          }
                        }}
                        inputValue={
                          selected ? String(minutesFrom).padStart(2, "0") : "--"
                        }
                        fontSize={"64px !important"}
                        fontWeight={600}
                        h={"64px"}
                        textAlign={"center"}
                        border={"none !important"}
                        _focus={{ border: "none !important" }}
                      />
                      {/* <Text textAlign={"center"}>Menit</Text> */}
                    </VStack>

                    <BButton
                      iconButton
                      aria-label="reduce hour button"
                      variant={"outline"}
                      onClick={() => {
                        setMinutesFrom((ps) => (ps > 0 ? ps - 1 : 59));
                        if (!selected) {
                          setSelected(defaultTime);
                        }
                      }}
                      onMouseDown={() => {
                        handleMouseDownDecrementFrom("minutes");
                      }}
                      onMouseUp={handleMouseUpDecrement}
                      onMouseLeave={handleMouseUpDecrement}
                      onTouchStart={() => {
                        handleMouseDownDecrementFrom("minutes");
                      }}
                      onTouchEnd={handleMouseUpDecrement}
                    >
                      <Icon fontSize={"md"}>
                        <IconCaretDownFilled />
                      </Icon>
                    </BButton>
                  </VStack>

                  {withSeconds && (
                    <>
                      {!overflow && (
                        <Text fontSize={50} opacity={0.2} mt={-9}>
                          :
                        </Text>
                      )}

                      <VStack flex={"1 1 120"} align={"stretch"} gap={0}>
                        <BButton
                          iconButton
                          aria-label="add hour button"
                          variant={"outline"}
                          onClick={() => {
                            setSecondsFrom((ps) => (ps < 59 ? ps + 1 : 0));
                            if (!selected) {
                              setSelected(defaultTime);
                            }
                          }}
                          onMouseDown={() => {
                            handleMouseDownIncrementFrom("seconds");
                          }}
                          onMouseUp={handleMouseUpIncrement}
                          onMouseLeave={handleMouseUpIncrement}
                          onTouchStart={() => {
                            handleMouseDownIncrementFrom("seconds");
                          }}
                          onTouchEnd={handleMouseUpIncrement}
                        >
                          <Icon fontSize={"md"}>
                            <IconCaretUpFilled />
                          </Icon>
                        </BButton>

                        <VStack my={4}>
                          <StringInput
                            name="jam"
                            onChangeSetter={(input) => {
                              if (parseInt(input as string) < 60) {
                                setSecondsFrom(parseInt(input as string));
                              }
                            }}
                            inputValue={
                              selected
                                ? String(secondsFrom).padStart(2, "0")
                                : "--"
                            }
                            fontSize={"64px !important"}
                            fontWeight={600}
                            h={"64px"}
                            textAlign={"center"}
                            border={"none !important"}
                            _focus={{ border: "none !important" }}
                          />
                          {/* <Text textAlign={"center"}>Detik</Text> */}
                        </VStack>

                        <BButton
                          iconButton
                          aria-label="reduce hour button"
                          variant={"outline"}
                          onClick={() => {
                            setSecondsFrom((ps) => (ps > 0 ? ps - 1 : 59));
                            if (!selected) {
                              setSelected(defaultTime);
                            }
                          }}
                          onMouseDown={() => {
                            handleMouseDownDecrementFrom("seconds");
                          }}
                          onMouseUp={handleMouseUpDecrement}
                          onMouseLeave={handleMouseUpDecrement}
                          onTouchStart={() => {
                            handleMouseDownDecrementFrom("seconds");
                          }}
                          onTouchEnd={handleMouseUpDecrement}
                        >
                          <Icon fontSize={"md"}>
                            <IconCaretDownFilled />
                          </Icon>
                        </BButton>
                      </VStack>
                    </>
                  )}
                </HStack>
              </CContainer>

              <Center>
                <Text fontSize={"md"}>s/d</Text>
              </Center>

              <CContainer>
                {/* <Text fontSize={"lg"} fontWeight={"semibold"} mb={2}>
                  Selesai
                </Text> */}
                <HStack
                  justify={"space-between"}
                  gap={1}
                  wrap={overflow ? "wrap" : ""}
                  gapY={overflow ? 4 : 0}
                >
                  <VStack flex={"1 1 120"} align={"stretch"} gap={0}>
                    <BButton
                      iconButton
                      aria-label="add hour button"
                      variant={"outline"}
                      onClick={() => {
                        setHoursTo((ps) => (ps < 23 ? ps + 1 : 0));
                        if (!selected) {
                          setSelected(defaultTime);
                        }
                      }}
                      onMouseDown={() => {
                        handleMouseDownIncrementTo("hours");
                      }}
                      onMouseUp={handleMouseUpIncrement}
                      onMouseLeave={handleMouseUpIncrement}
                      onTouchStart={() => {
                        handleMouseDownIncrementTo("hours");
                      }}
                      onTouchEnd={handleMouseUpIncrement}
                    >
                      <Icon fontSize={"md"}>
                        <IconCaretUpFilled />
                      </Icon>
                    </BButton>

                    <VStack my={4}>
                      <StringInput
                        name="jam"
                        onChangeSetter={(input) => {
                          if (parseInt(input as string) < 24) {
                            setHoursTo(parseInt(input as string));
                          }
                        }}
                        inputValue={
                          selected ? String(hoursTo).padStart(2, "0") : "--"
                        }
                        fontSize={"64px !important"}
                        fontWeight={600}
                        h={"64px"}
                        textAlign={"center"}
                        border={"none !important"}
                        _focus={{ border: "none !important" }}
                      />
                      {/* <Text textAlign={"center"}>Jam</Text> */}
                    </VStack>

                    <BButton
                      iconButton
                      aria-label="reduce hour button"
                      variant={"outline"}
                      onClick={() => {
                        setHoursTo((ps) => (ps > 0 ? ps - 1 : 23));
                        if (!selected) {
                          setSelected(defaultTime);
                        }
                      }}
                      onMouseDown={() => {
                        handleMouseDownDecrementTo("hours");
                      }}
                      onMouseUp={handleMouseUpDecrement}
                      onMouseLeave={handleMouseUpDecrement}
                      onTouchStart={() => {
                        handleMouseDownDecrementTo("hours");
                      }}
                      onTouchEnd={handleMouseUpDecrement}
                    >
                      <Icon fontSize={"md"}>
                        <IconCaretDownFilled />
                      </Icon>
                    </BButton>
                  </VStack>

                  {!overflow && (
                    <Text fontSize={50} opacity={0.2} mt={-9}>
                      :
                    </Text>
                  )}

                  <VStack flex={"1 1 120"} align={"stretch"} gap={0}>
                    <BButton
                      iconButton
                      aria-label="add hour button"
                      variant={"outline"}
                      onClick={() => {
                        setMinutesTo((ps) => (ps < 59 ? ps + 1 : 0));
                        if (!selected) {
                          setSelected(defaultTime);
                        }
                      }}
                      onMouseDown={() => {
                        handleMouseDownIncrementTo("minutes");
                      }}
                      onMouseUp={handleMouseUpIncrement}
                      onMouseLeave={handleMouseUpIncrement}
                      onTouchStart={() => {
                        handleMouseDownIncrementTo("minutes");
                      }}
                      onTouchEnd={handleMouseUpIncrement}
                    >
                      <Icon fontSize={"md"}>
                        <IconCaretUpFilled />
                      </Icon>
                    </BButton>

                    <VStack my={4}>
                      <StringInput
                        name="jam"
                        onChangeSetter={(input) => {
                          if (parseInt(input as string) < 60) {
                            setMinutesTo(parseInt(input as string));
                          }
                        }}
                        inputValue={
                          selected ? String(minutesTo).padStart(2, "0") : "--"
                        }
                        fontSize={"64px !important"}
                        fontWeight={600}
                        h={"64px"}
                        textAlign={"center"}
                        border={"none !important"}
                        _focus={{ border: "none !important" }}
                      />
                      {/* <Text textAlign={"center"}>Menit</Text> */}
                    </VStack>

                    <BButton
                      iconButton
                      aria-label="reduce hour button"
                      variant={"outline"}
                      onClick={() => {
                        setMinutesTo((ps) => (ps > 0 ? ps - 1 : 59));
                        if (!selected) {
                          setSelected(defaultTime);
                        }
                      }}
                      onMouseDown={() => {
                        handleMouseDownDecrementTo("minutes");
                      }}
                      onMouseUp={handleMouseUpDecrement}
                      onMouseLeave={handleMouseUpDecrement}
                      onTouchStart={() => {
                        handleMouseDownDecrementTo("minutes");
                      }}
                      onTouchEnd={handleMouseUpDecrement}
                    >
                      <Icon fontSize={"md"}>
                        <IconCaretDownFilled />
                      </Icon>
                    </BButton>
                  </VStack>

                  {withSeconds && (
                    <>
                      {!overflow && (
                        <Text fontSize={50} opacity={0.2} mt={-9}>
                          :
                        </Text>
                      )}

                      <VStack flex={"1 1 120"} align={"stretch"} gap={0}>
                        <BButton
                          iconButton
                          aria-label="add hour button"
                          variant={"outline"}
                          onClick={() => {
                            setSecondsTo((ps) => (ps < 59 ? ps + 1 : 0));
                            if (!selected) {
                              setSelected(defaultTime);
                            }
                          }}
                          onMouseDown={() => {
                            handleMouseDownIncrementTo("seconds");
                          }}
                          onMouseUp={handleMouseUpIncrement}
                          onMouseLeave={handleMouseUpIncrement}
                          onTouchStart={() => {
                            handleMouseDownIncrementTo("seconds");
                          }}
                          onTouchEnd={handleMouseUpIncrement}
                        >
                          <Icon fontSize={"md"}>
                            <IconCaretUpFilled />
                          </Icon>
                        </BButton>

                        <VStack my={4}>
                          <StringInput
                            name="jam"
                            onChangeSetter={(input) => {
                              if (parseInt(input as string) < 60) {
                                setSecondsTo(parseInt(input as string));
                              }
                            }}
                            inputValue={
                              selected
                                ? String(secondsTo).padStart(2, "0")
                                : "--"
                            }
                            fontSize={"64px !important"}
                            fontWeight={600}
                            h={"64px"}
                            textAlign={"center"}
                            border={"none !important"}
                            _focus={{ border: "none !important" }}
                          />
                          {/* <Text textAlign={"center"}>Detik</Text> */}
                        </VStack>

                        <BButton
                          iconButton
                          aria-label="reduce hour button"
                          variant={"outline"}
                          onClick={() => {
                            setSecondsTo((ps) => (ps > 0 ? ps - 1 : 59));
                            if (!selected) {
                              setSelected(defaultTime);
                            }
                          }}
                          onMouseDown={() => {
                            handleMouseDownDecrementTo("seconds");
                          }}
                          onMouseUp={handleMouseUpDecrement}
                          onMouseLeave={handleMouseUpDecrement}
                          onTouchStart={() => {
                            handleMouseDownDecrementTo("seconds");
                          }}
                          onTouchEnd={handleMouseUpDecrement}
                        >
                          <Icon fontSize={"md"}>
                            <IconCaretDownFilled />
                          </Icon>
                        </BButton>
                      </VStack>
                    </>
                  )}
                </HStack>
              </CContainer>
            </Stack>
          </DisclosureBody>

          <DisclosureFooter>
            <BButton
              variant={"outline"}
              onClick={() => {
                if (
                  selected &&
                  hoursFrom === 0 &&
                  minutesFrom === 0 &&
                  secondsFrom === 0 &&
                  hoursTo === 0 &&
                  minutesTo === 0 &&
                  secondsTo === 0
                ) {
                  setSelected(undefined);
                  setHoursFrom(0);
                  setMinutesFrom(0);
                  setSecondsFrom(0);
                  setHoursTo(0);
                  setMinutesTo(0);
                  setSecondsTo(0);
                } else {
                  setSelected(defaultTime);
                  setHoursFrom(0);
                  setMinutesFrom(0);
                  setSecondsFrom(0);
                  setHoursTo(0);
                  setMinutesTo(0);
                  setSecondsTo(0);
                }
              }}
            >
              {selected &&
              hoursFrom === 0 &&
              minutesFrom === 0 &&
              secondsFrom === 0 &&
              hoursTo === 0 &&
              minutesTo === 0 &&
              secondsTo === 0
                ? "Clear"
                : "Reset"}
            </BButton>
            <BButton
              onClick={onConfirmSelected}
              disabled={nonNullable ? (selected ? false : true) : false}
              colorPalette={themeConfig.colorPalette}
            >
              {l.confirm}
            </BButton>
          </DisclosureFooter>
        </DisclosureContent>
      </DisclosureRoot>
    </>
  );
};

export default TimeRangePickerInput;
