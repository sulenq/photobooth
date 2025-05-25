import { useState, useEffect } from "react";
import { Text, TextProps } from "@chakra-ui/react";
import useTimeZone from "@/context/useTimeZone";
import formatTime from "@/utils/formatTime";
import { makeTime } from "@/utils/time";
import getTzOffsetMs from "@/utils/getTzOffsetMs";
import autoTimeZone from "@/utils/autoTimeZone";

interface Props extends TextProps {
  timeZoneKey?: string;
}
const Clock = ({ timeZoneKey, ...props }: Props) => {
  const { timeZone } = useTimeZone();
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const now = new Date().getTime() - getTzOffsetMs(autoTimeZone().key);
      const formattedTime = formatTime(makeTime(now), {
        prefixTimeZoneKey: timeZoneKey,
      });

      setCurrentTime(formattedTime);
    };

    // Set interval to update every second
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timeZone.key]);

  return <Text {...props}>{currentTime}</Text>;
};

export default Clock;
