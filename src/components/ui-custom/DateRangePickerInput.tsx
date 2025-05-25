import { WEEKDAYS } from "@/constants/weekdays";
import { Interface__DateRangePicker } from "@/constants/interfaces";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import back from "@/utils/back";
import countDay from "@/utils/countDay";
import dateInRange from "@/utils/dateInRange";
import formatDate from "@/utils/formatDate";
import {
  Box,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useDisclosure,
  useFieldContext,
} from "@chakra-ui/react";
import {
  IconCalendarWeek,
  IconCaretLeftFilled,
  IconCaretRightFilled,
} from "@tabler/icons-react";
import { addDays, startOfWeek } from "date-fns";
import { useState } from "react";
import { Alert } from "../ui/alert";
import { toaster } from "../ui/toaster";
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
import PeriodPickerForDatePicker from "./PeriodPickerForDatePicker";
import { Type__DateRange } from "@/constants/types";
import interpolate from "@/utils/interpolate";
import moment from "moment-timezone";
import userTimeZone from "@/utils/userTimeZone";
import getTzOffsetMs from "@/utils/getTzOffsetMs";

const DateRangePickerInput = ({
  id,
  name,
  title,
  onConfirm,
  inputValue,
  placeholder,
  nonNullable,
  invalid,
  disclosureSize = "xs",
  preset = ["thisWeek", "thisMonth"],
  maxRange,
  ...props
}: Interface__DateRangePicker) => {
  // Contexts
  const fc = useFieldContext();
  const { themeConfig } = useThemeConfig();
  const { l, lang } = useLang();

  // States, Refs
  const userTz = userTimeZone();
  const finalPlaceholder =
    placeholder || l.date_range_picker_default_placeholder;
  const [date, setDate] = useState<Date>(
    new Date(inputValue?.from || inputValue?.to || Date.now())
  );
  const [month, setMonth] = useState<number>(date.getMonth());
  const [year, setYear] = useState<number>(date.getFullYear());
  const [selected, setSelected] = useState<any>(
    inputValue
      ? {
          from: new Date(
            new Date(inputValue?.from as any).getTime() -
              getTzOffsetMs(moment.tz.guess())
          ),
          to: new Date(
            new Date(inputValue?.to as any).getTime() -
              getTzOffsetMs(moment.tz.guess())
          ),
        }
      : undefined
  );
  const fullDates = () => {
    const firstDayOfMonth = new Date(year, month, 1);

    const startOfFirstWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }); // 0 = Sunday

    let weekDates = [];
    let currentWeek = [];

    for (let i = 0; i < 6; i++) {
      currentWeek = [];

      for (let j = 0; j < 7; j++) {
        const fullDate = addDays(startOfFirstWeek, i * 7 + j);
        currentWeek.push({
          fullDate: fullDate,
          date: fullDate.getDate(),
          month: fullDate.getMonth(),
          year: fullDate.getFullYear(),
        });
      }

      weekDates.push(currentWeek);
    }

    return weekDates;
  };
  const selectedRenderValue =
    selected?.from &&
    selected?.to &&
    `${formatDate(selected?.from, {
      prefixTimeZoneKey: moment.tz.guess(),
    })} - ${formatDate(selected?.to, {
      prefixTimeZoneKey: moment.tz.guess(),
    })} (${countDay(selected?.from, selected?.to)} hari)`;

  const renderValue =
    inputValue?.from &&
    inputValue?.to &&
    `${formatDate(new Date(inputValue?.from), {
      prefixTimeZoneKey: moment.tz.guess(),
    })} - ${formatDate(new Date(inputValue?.to), {
      prefixTimeZoneKey: moment.tz.guess(),
    })} (${countDay(inputValue?.from, inputValue?.to)} hari)`;

  // Utils
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(
    id || `date-range-picker${name ? `-${name}` : ""}`,
    open,
    onOpen,
    onClose
  );

  // Preset setter
  function setSelectedToThisWeek() {
    const today = new Date();

    // Get the current day of the week (0 - Sunday, 6 - Saturday)
    const dayOfWeek = today.getDay();

    // Calculate the date of the start of the week (Monday)
    const startOfWeek = new Date(today);
    const dayDiffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // if today is Sunday, set the difference to 6, else subtract 1
    startOfWeek.setDate(today.getDate() - dayDiffToMonday);

    // Calculate the date of the end of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // 6 days after Monday is Sunday

    // Set the state with the calculated dates
    setDate(today);
    setSelected({ from: startOfWeek, to: endOfWeek });
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  }
  function setSelectedToNextWeek() {
    const today = new Date();

    // Get the current day of the week (0 - Sunday, 6 - Saturday)
    const dayOfWeek = today.getDay();

    // Calculate the date of the start of the next week (Monday)
    const startOfNextWeek = new Date(today);
    const dayDiffToNextMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek; // if today is Sunday, set the difference to 1, else calculate to next Monday
    startOfNextWeek.setDate(today.getDate() + dayDiffToNextMonday);

    // Calculate the date of the end of the next week (Sunday)
    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6); // 6 days after Monday is Sunday

    // Set the state with the calculated dates
    setDate(today);
    setSelected({ from: startOfNextWeek, to: endOfNextWeek });
    setMonth(startOfNextWeek.getMonth());
    setYear(startOfNextWeek.getFullYear());
  }
  function setSelectedToThisMonth() {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    setDate(today);
    setSelected({ from: startOfMonth, to: endOfMonth });
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  }
  function setSelectedToNextMonth() {
    const today = new Date();

    // Calculate the date of the start of the next month
    const startOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );

    // Calculate the date of the end of the next month
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      0
    );

    // Set the state with the calculated dates
    setDate(today);
    setSelected({ from: startOfNextMonth, to: endOfNextMonth });
    setMonth(startOfNextMonth.getMonth());
    setYear(startOfNextMonth.getFullYear());
  }
  const renderPresets = {
    thisMonth: (
      <BButton
        w={"full"}
        size={"md"}
        variant={"outline"}
        onClick={setSelectedToThisMonth}
        disabled={!!(maxRange && maxRange < 31)}
      >
        {l.this_month}
      </BButton>
    ),
    nextMonth: (
      <BButton
        w={"full"}
        size={"md"}
        variant={"outline"}
        onClick={setSelectedToNextMonth}
        disabled={!!(maxRange && maxRange < 31)}
      >
        {l.next_month}
      </BButton>
    ),
    thisWeek: (
      <BButton
        w={"full"}
        size={"md"}
        variant={"outline"}
        onClick={setSelectedToThisWeek}
        disabled={!!(maxRange && maxRange < 7)}
      >
        {l.this_week}
      </BButton>
    ),
    nextWeek: (
      <BButton
        w={"full"}
        size={"md"}
        variant={"outline"}
        onClick={setSelectedToNextWeek}
        disabled={!!(maxRange && maxRange < 7)}
      >
        {l.next_week}
      </BButton>
    ),
  };

  // Period increment decrement
  function nextMonth() {
    const currentMonth = date.getMonth();
    const currentyear = date.getFullYear();

    const nextMonth = new Date(
      month === 12 ? currentyear + 1 : year,
      month === 12 ? 0 : currentMonth + 1
    );
    setDate(nextMonth);
    setMonth(nextMonth.getMonth());
    setYear(nextMonth.getFullYear());
  }
  function prevMonth() {
    const currentMonth = date.getMonth();
    const currentyear = date.getFullYear();

    const prevMonth = new Date(
      month === 1 ? currentyear - 1 : year,
      month === 1 ? 11 : currentMonth - 1
    );
    setDate(prevMonth);
    setMonth(prevMonth.getMonth());
    setYear(prevMonth.getFullYear());
  }

  // Handle confirm selected
  function onConfirmSelected() {
    if (!nonNullable || selected.length > 0) {
      onConfirm?.({
        from: new Date(
          new Date(selected?.from as any).getTime() +
            getTzOffsetMs(moment.tz.guess())
        ).toISOString(),
        to: new Date(
          new Date(selected?.to as any).getTime() +
            getTzOffsetMs(moment.tz.guess())
        ).toISOString(),
      });
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
              setSelected({
                from: moment
                  .utc(inputValue.from as any)
                  .tz(userTz.key)
                  .toDate(),
                to: moment
                  .utc(inputValue.to as any)
                  .tz(userTz.key)
                  .toDate(),
              });
            }
            onOpen();
          }}
          size={"md"}
          px={3}
          {...props}
        >
          <HStack w={"full"} justify={"space-between"}>
            {inputValue ? (
              <Text fontWeight={"normal"} truncate>
                {renderValue}
              </Text>
            ) : (
              <Text
                color={props?._placeholder?.color || "var(--placeholder)"}
                truncate
              >
                {finalPlaceholder}
              </Text>
            )}

            <Icon fontSize={"1.1rem"} opacity={0.4}>
              <IconCalendarWeek stroke={1.5} />
            </Icon>
          </HStack>
        </BButton>
      </Tooltip>

      <DisclosureRoot open={open} size={disclosureSize}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent
              title={title || l.date_range_picker_default_title}
            />
          </DisclosureHeader>

          <DisclosureBody>
            {maxRange && (
              <Alert
                variant={"surface"}
                status="warning"
                title={interpolate(l.date_range_picker_max_range_alert, {
                  maxRange,
                })}
                mb={4}
              />
            )}

            {/* Period picker */}
            <HStack mb={5}>
              <BButton iconButton variant={"outline"} onClick={prevMonth}>
                <Icon h={"1rem"}>
                  <IconCaretLeftFilled />
                </Icon>
              </BButton>

              <PeriodPickerForDatePicker
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
              />

              <BButton iconButton variant={"outline"} onClick={nextMonth}>
                <Icon h={"1rem"}>
                  <IconCaretRightFilled />
                </Icon>
              </BButton>
            </HStack>

            {/* Date picker */}
            <SimpleGrid
              columns={[7]}
              gap={2}
              borderBottom={"1px solid"}
              borderColor={"var(--d3)"}
              pb={2}
              mb={2}
            >
              {WEEKDAYS[lang].map((day, i) => (
                <Text key={i} fontWeight={"semibold"} textAlign={"center"}>
                  {day.substring(0, 3)}
                </Text>
              ))}
            </SimpleGrid>
            <CContainer gap={2}>
              {fullDates().map((weeks, i) => (
                <SimpleGrid columns={[7]} key={i} gap={2}>
                  {weeks.map((date, ii) => {
                    const today = new Date();
                    const dateSelected =
                      (selected?.from?.getDate() === date.fullDate.getDate() &&
                        selected?.from?.getMonth() === date.month &&
                        selected?.from?.getFullYear() === date.year) ||
                      (selected?.to?.getDate() === date.fullDate.getDate() &&
                        selected?.to?.getMonth() === date.month &&
                        selected?.to?.getFullYear() === date.year);

                    const dateToday =
                      date.date === today.getDate() &&
                      date.month === today.getMonth() &&
                      date.year === today.getFullYear();

                    return (
                      <BButton
                        key={ii}
                        borderRadius={"full"}
                        onClick={() => {
                          if (
                            (!selected?.from && !selected?.to) ||
                            (selected?.from && selected?.to) ||
                            selected === undefined
                          ) {
                            setSelected({
                              from: date.fullDate,
                              to: undefined,
                            });
                          }

                          if (selected?.from && selected?.to === undefined) {
                            const isWithinRange = maxRange
                              ? countDay(date.fullDate, selected?.from || 0) <=
                                maxRange
                              : true;

                            // error toast
                            const showError = () => {
                              toaster.create({
                                type: "error",
                                title: l.date_range_picker_error_toast.title,
                                description:
                                  l.date_range_picker_error_toast.description,
                                action: {
                                  label: "Close",
                                  onClick: () => {},
                                },
                              });
                            };

                            if (isWithinRange) {
                              if (date.fullDate < selected?.from) {
                                setSelected((ps: Type__DateRange) => ({
                                  from: date.fullDate,
                                  to: ps.from,
                                }));
                              } else {
                                setSelected((ps: Type__DateRange) => ({
                                  from: ps.from,
                                  to: date.fullDate,
                                }));
                              }
                            } else {
                              showError();
                            }
                          }
                        }}
                        variant={
                          dateInRange(date.fullDate, selected, true, true) ||
                          dateSelected
                            ? "outline"
                            : "ghost"
                        }
                        borderColor={
                          dateInRange(date.fullDate, selected, true, true) ||
                          dateSelected
                            ? themeConfig.primaryColor
                            : ""
                        }
                        aspectRatio={1}
                      >
                        <Text
                          opacity={
                            date.month === month ||
                            dateInRange(date.fullDate, selected, true, true) ||
                            dateSelected
                              ? 1
                              : 0.3
                          }
                          color={dateToday ? themeConfig.primaryColor : ""}
                          fontWeight={dateToday ? "bold" : ""}
                        >
                          {date.date}
                        </Text>
                      </BButton>
                    );
                  })}
                </SimpleGrid>
              ))}
            </CContainer>

            {/* Preset Buttons */}
            <HStack mt={2}>
              {preset?.map((item, i) => (
                <Box w={"50%"} key={i}>
                  {renderPresets[item]}
                </Box>
              ))}
            </HStack>

            <CContainer
              // border={"1px solid"}
              borderColor={"border.muted"}
              bg={"bg.muted"}
              p={3}
              borderRadius={6}
              mt={2}
            >
              <Text textAlign={"center"} fontWeight={"semibold"}>
                {selectedRenderValue || finalPlaceholder}
              </Text>
            </CContainer>
          </DisclosureBody>

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
              disabled={
                (nonNullable && !(selected?.from && selected?.to)) ||
                (!nonNullable && selected?.from && !selected?.to)
              }
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

export default DateRangePickerInput;
