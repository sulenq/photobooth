import { Group, SimpleGrid, useFieldContext } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DatePickerInput from "./DatePickerInput";
import TimePickerInput from "./TimePickerInput";
import { Type__DisclosureSizes } from "@/constants/types";
import makeDateTime from "@/utils/makeDateTime";
import moment from "moment-timezone";
import userTimeZone from "@/utils/userTimeZone";
import autoTimeZone from "@/utils/autoTimeZone";
import { makeTime } from "@/utils/time";
import resetDateTime from "@/utils/resetDateTime";
import empty from "@/utils/empty";
import { useThemeConfig } from "@/context/useThemeConfig";

interface Props {
  id?: string;
  name?: string;
  onChangeSetter?: (inputValue: string) => void;
  inputValue?: string;
  size?: Type__DisclosureSizes;
}
const DateTimePicker = ({
  id,
  name,
  onChangeSetter,
  inputValue,
  size,
}: Props) => {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const fc = useFieldContext();

  // States, Refs
  const userTz = userTimeZone();
  const autoTz = autoTimeZone();
  const userOffsetInMs = moment.tz(userTz.key).utcOffset() * 60 * 1000;
  const autoOffsetInMs = moment.tz(autoTz.key).utcOffset() * 60 * 1000;
  const initialDate = inputValue
    ? [
        new Date(
          resetDateTime(
            new Date(
              new Date(inputValue).getTime() - autoOffsetInMs + userOffsetInMs
            )
          ).getTime() + autoOffsetInMs
        ).toISOString(),
      ]
    : undefined;
  const initialTime = inputValue
    ? makeTime(
        new Date(
          new Date(inputValue).getTime() - autoOffsetInMs + userOffsetInMs
        )
      )
    : undefined;

  const [date, setDate] = useState<string[] | undefined>(initialDate);
  const [time, setTime] = useState<string | undefined>(initialTime);

  // Handle onchange all
  useEffect(() => {
    if (date && !empty(date) && time) {
      const dateTime = new Date(
        makeDateTime(date[0], time).getTime() - userOffsetInMs + autoOffsetInMs
      );
      onChangeSetter?.(dateTime.toISOString());
    }
  }, [date, time]);

  useEffect(() => {
    if (empty(date)) {
      setTime(undefined);
    }

    if (date && !empty(date) && !time) {
      setTime("00:00:00");
    }
  }, [date]);

  return (
    <SimpleGrid
      columns={2}
      w={"full"}
      border={fc.invalid ? "1px solid {colors.border.error}" : ""}
      borderRadius={themeConfig.radii.component}
    >
      <Group attached mr={"-1px"}>
        <DatePickerInput
          id={`${id}-date-picker`}
          name={`${name}-date-picker`}
          onConfirm={(input) => {
            setDate(input);
          }}
          inputValue={date}
          size={size}
          invalid={false}
          borderColor={fc.invalid ? "transparent" : "border.muted"}
        />

        <TimePickerInput
          id={`${id}-time-picker`}
          name={`${name}-time-picker`}
          onConfirm={(input) => {
            setTime(input);
          }}
          inputValue={time}
          size={size}
          disabled={!!empty(date)}
          nonNullable
          invalid={false}
          borderColor={fc.invalid ? "transparent" : "border.muted"}
          borderLeft={"1px solid {colors.border.muted} !important"}
        />
      </Group>
    </SimpleGrid>
  );
};

export default DateTimePicker;
