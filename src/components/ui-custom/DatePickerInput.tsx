import {
  Interface__DatePicker,
  Interface__SelectedDateList,
} from "@/constants/interfaces";
import { WEEKDAYS } from "@/constants/weekdays";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import back from "@/utils/back";
import formatDate from "@/utils/formatDate";
import getTzOffsetMs from "@/utils/getTzOffsetMs";
import resetDateTime from "@/utils/resetDateTime";
import userTimeZone from "@/utils/userTimeZone";
import {
  HStack,
  Icon,
  ListItem,
  ListRoot,
  SimpleGrid,
  Text,
  useDisclosure,
  useFieldContext,
} from "@chakra-ui/react";
import {
  IconCalendar,
  IconCaretLeftFilled,
  IconCaretRightFilled,
} from "@tabler/icons-react";
import { addDays, startOfWeek } from "date-fns";
import moment from "moment-timezone";
import { useState } from "react";
import { Tooltip } from "../ui/tooltip";
import BackButton from "./BackButton";
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

const SelectedDateList = ({
  selectedDates,
  selectedRenderValue,
}: Interface__SelectedDateList) => {
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`selected-date-list`, open, onOpen, onClose);

  return (
    <>
      <CContainer
        borderColor={"border.muted"}
        bg={"bg.muted"}
        p={3}
        borderRadius={6}
        mt={2}
        cursor={"pointer"}
        onClick={onOpen}
      >
        <Text
          textAlign={"center"}
          fontWeight={"semibold"}
          maxW={"calc(100% - 16px)"}
          mx={"auto"}
          truncate
        >
          {selectedRenderValue}
        </Text>
      </CContainer>

      <DisclosureRoot open={open} size={"xs"} scrollBehavior={"inside"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent title="Tanggal dipilih" />
          </DisclosureHeader>
          <DisclosureBody>
            <CContainer px={2} pl={4} pt={1}>
              <ListRoot gap={2}>
                {selectedDates.map((item, i) => {
                  return (
                    <ListItem key={i}>
                      {formatDate(item, {
                        variant: "weekdayFullMonth",
                      })}
                    </ListItem>
                  );
                })}
              </ListRoot>
            </CContainer>
          </DisclosureBody>
          <DisclosureFooter>
            <BackButton />
          </DisclosureFooter>
        </DisclosureContent>
      </DisclosureRoot>
    </>
  );
};

const DatePickerInput = ({
  id,
  name,
  title,
  onConfirm,
  inputValue,
  placeholder,
  nonNullable,
  invalid,
  disclosureSize = "xs",
  multiple,
  ...props
}: Interface__DatePicker) => {
  // Contexts
  const fc = useFieldContext();
  const { themeConfig } = useThemeConfig();
  const { l, lang } = useLang();

  // States, Refs
  const userTz = userTimeZone();
  const offsetInMs = moment.tz(userTz.key).utcOffset() * 60 * 1000;
  const finalPlaceholder = placeholder || l.date_picker_default_placeholder;
  const [date, setDate] = useState<Date>(
    inputValue?.[0] ? new Date(inputValue?.[0]) : new Date()
  );
  const [month, setMonth] = useState<number>(date.getMonth());
  const [year, setYear] = useState<number>(date.getFullYear());
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    inputValue
      ? inputValue.map(
          (item) =>
            new Date(new Date(item).getTime() - getTzOffsetMs(userTz.key))
        )
      : []
  );

  const fullDates = () => {
    const firstDayOfMonth = new Date(year, month, 1);

    const startOfFirstWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

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
    selectedDates?.length > 0
      ? selectedDates
          .map((date) => formatDate(date, { prefixTimeZoneKey: userTz.key }))
          .join(", ")
      : finalPlaceholder;

  const renderValue =
    inputValue && inputValue?.length > 0
      ? inputValue
          .map((date) =>
            formatDate(new Date(date), { prefixTimeZoneKey: userTz.key })
          )
          .join(", ")
      : finalPlaceholder;

  // Utils
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(
    id || `date-picker${name ? `-${name}` : ""}`,
    open,
    onOpen,
    onClose
  );

  // Preset setter
  function setSelectedToToday() {
    const today = resetDateTime(new Date());
    setSelectedDates([today]);
    setDate(today);
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  }
  function setSelectedToTomorrow() {
    const today = resetDateTime(new Date());
    const tomorrow = resetDateTime(new Date(today));
    tomorrow.setDate(today.getDate() + 1);

    setSelectedDates([tomorrow]);
    setDate(tomorrow);
    setMonth(tomorrow.getMonth());
    setYear(tomorrow.getFullYear());
  }
  function setSelectedToThisWeek() {
    const today = resetDateTime(new Date());
    const dayOfWeek = today.getDay();
    const startOfWeek = resetDateTime(new Date(today));

    startOfWeek.setDate(
      today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    );

    const selectedDates = [];
    for (let i = 0; i < 7; i++) {
      const date = resetDateTime(new Date(startOfWeek));
      date.setDate(startOfWeek.getDate() + i);
      selectedDates.push(date);
    }

    setSelectedDates(selectedDates);
    setDate(startOfWeek);
    setMonth(startOfWeek.getMonth());
    setYear(startOfWeek.getFullYear());
  }
  function setSelectedToThisMonth() {
    const today = resetDateTime(new Date());
    const startOfMonth = resetDateTime(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );
    const endOfMonth = resetDateTime(
      new Date(today.getFullYear(), today.getMonth() + 1, 0)
    );

    const selectedDates = [];
    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      selectedDates.push(
        resetDateTime(new Date(today.getFullYear(), today.getMonth(), i))
      );
    }

    setSelectedDates(selectedDates);
    setDate(startOfMonth);
    setMonth(startOfMonth.getMonth());
    setYear(startOfMonth.getFullYear());
  }

  // Period increment decrement
  function nextMonth() {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);

    setDate(nextMonthDate);
    setMonth(nextMonthDate.getMonth());
    setYear(nextMonthDate.getFullYear());
  }
  function prevMonth() {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);

    setDate(prevMonthDate);
    setMonth(prevMonthDate.getMonth());
    setYear(prevMonthDate.getFullYear());
  }

  // Handle confirm selected
  function onConfirmSelected() {
    if (!nonNullable || selectedDates.length > 0) {
      onConfirm?.(
        selectedDates.map((item) =>
          new Date(item.getTime() + getTzOffsetMs(userTz.key)).toISOString()
        )
      );
      back();
    }
  }

  return (
    <>
      <Tooltip content={inputValue ? selectedRenderValue : finalPlaceholder}>
        <BButton
          w={"full"}
          unclicky
          variant={"ghost"}
          border={"1px solid"}
          borderColor={invalid ?? fc?.invalid ? "border.error" : "border.muted"}
          onClick={() => {
            if (inputValue) {
              setSelectedDates(
                inputValue.map(
                  (item) => new Date(new Date(item).getTime() - offsetInMs)
                )
              );
            }
            onOpen();
          }}
          px={3}
          size={"md"}
          {...props}
        >
          <HStack w={"full"} justify={"space-between"}>
            {inputValue && inputValue?.length > 0 ? (
              <Text fontWeight={"normal"} truncate>
                {renderValue}
              </Text>
            ) : (
              <Text
                color={props?._placeholder?.color || "placeholder"}
                truncate
              >
                {finalPlaceholder}
              </Text>
            )}

            <Icon fontSize={"1.1rem"} opacity={0.4}>
              <IconCalendar stroke={1.5} />
            </Icon>
          </HStack>
        </BButton>
      </Tooltip>

      <DisclosureRoot open={open} size={disclosureSize}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent
              title={title || l.date_picker_default_title}
            />
          </DisclosureHeader>

          <DisclosureBody>
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
                setDate={setDate}
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
                    const dateSelected = selectedDates.some(
                      (selectedDate) =>
                        selectedDate.getDate() === date.fullDate.getDate() &&
                        selectedDate.getMonth() === date.month &&
                        selectedDate.getFullYear() === date.year
                    );
                    const dateToday =
                      date.date === today.getDate() &&
                      date.month === today.getMonth() &&
                      date.year === today.getFullYear();

                    return (
                      <BButton
                        key={ii}
                        borderRadius={"full"}
                        onClick={() => {
                          if (multiple) {
                            const newSelectedDates = selectedDates.some(
                              (selectedDate) =>
                                selectedDate.getDate() ===
                                  date.fullDate.getDate() &&
                                selectedDate.getMonth() === date.month &&
                                selectedDate.getFullYear() === date.year
                            )
                              ? selectedDates.filter(
                                  (selectedDate) =>
                                    !(
                                      selectedDate.getDate() ===
                                        date.fullDate.getDate() &&
                                      selectedDate.getMonth() === date.month &&
                                      selectedDate.getFullYear() === date.year
                                    )
                                )
                              : [...selectedDates, date.fullDate].sort(
                                  (a, b) => a.getTime() - b.getTime()
                                );
                            setSelectedDates(newSelectedDates);
                          } else {
                            if (dateSelected) {
                              setSelectedDates([]);
                            } else {
                              setSelectedDates([date.fullDate]);
                            }
                          }
                        }}
                        variant={dateSelected ? "outline" : "ghost"}
                        borderColor={
                          dateSelected ? themeConfig.primaryColor : ""
                        }
                        aspectRatio={1}
                      >
                        <Text
                          opacity={
                            date.month !== month && !dateSelected ? 0.3 : 1
                          }
                          color={dateToday ? themeConfig.primaryColor : ""}
                          fontWeight={dateToday ? "extrabold" : ""}
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
              {!multiple && (
                <>
                  <BButton
                    flex={"1 1 120px"}
                    size={"md"}
                    variant={"outline"}
                    onClick={setSelectedToToday}
                  >
                    {l.today}
                  </BButton>

                  <BButton
                    flex={"1 1 120px"}
                    size={"md"}
                    variant={"outline"}
                    onClick={setSelectedToTomorrow}
                  >
                    {l.tomorrow}
                  </BButton>
                </>
              )}

              {multiple && (
                <>
                  <BButton
                    flex={"1 1 120px"}
                    size={"md"}
                    variant={"outline"}
                    onClick={setSelectedToThisWeek}
                  >
                    {l.this_week}
                  </BButton>

                  <BButton
                    flex={"1 1 120px"}
                    size={"md"}
                    variant={"outline"}
                    onClick={setSelectedToThisMonth}
                  >
                    {l.this_month}
                  </BButton>
                </>
              )}
            </HStack>

            <SelectedDateList
              selectedDates={selectedDates}
              selectedRenderValue={selectedRenderValue}
            />
          </DisclosureBody>

          <DisclosureFooter>
            <BButton
              variant={"outline"}
              onClick={() => {
                setSelectedDates([]);
              }}
            >
              Clear
            </BButton>
            <BButton
              onClick={onConfirmSelected}
              disabled={nonNullable && selectedDates.length === 0}
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

export default DatePickerInput;
