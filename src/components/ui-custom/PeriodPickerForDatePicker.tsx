import { Dispatch } from "react";
import BButton from "./BButton";
import PeriodPickerDisclosure from "./PeriodPickerDisclosure";
import formatDate from "@/utils/formatDate";
import moment from "moment-timezone";

interface Props {
  id?: string;
  name?: string;
  title?: string;
  month?: number;
  setMonth?: Dispatch<number>;
  year?: number;
  setYear?: Dispatch<number>;
  setDate?: Dispatch<Date>;
}

const PeriodPickerForDatePicker = ({
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  ...props
}: Props) => {
  return (
    <>
      <PeriodPickerDisclosure
        month={month}
        year={year}
        triggerProps={{ w: "full" }}
        {...props}
      >
        <BButton w={"full"} variant={"outline"} size={"md"}>
          {`${formatDate(new Date(year, month), {
            variant: "monthYear",
            prefixTimeZoneKey: moment.tz.guess(),
          })}`}
        </BButton>
      </PeriodPickerDisclosure>
    </>
  );
};

export default PeriodPickerForDatePicker;
