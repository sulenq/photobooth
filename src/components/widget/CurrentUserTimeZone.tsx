import useTimeZone from "@/context/useTimeZone";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { IconTimezone } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import BButton from "../ui-custom/BButton";
import CContainer from "../ui-custom/CContainer";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import HelperText from "../ui-custom/HelperText";
import useLang from "@/context/useLang";
import { Tooltip } from "../ui/tooltip";
import formatDate from "@/utils/formatDate";
import autoTimeZone from "@/utils/autoTimeZone";
import Clock from "./Clock";
import useDateFormat from "@/context/useDateFormat";
import { useThemeConfig } from "@/context/useThemeConfig";

const CurrentUserTimeZone = () => {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const { timeZone } = useTimeZone();
  const { dateFormat } = useDateFormat();
  const { l } = useLang();

  // States, Refs
  const autoTz = autoTimeZone();
  const userSelect = autoTz.key === timeZone.key;

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <div>
          <Tooltip content={l.time_zone}>
            <BButton iconButton unclicky variant="ghost">
              <Icon>
                <IconTimezone stroke={1.5} />
              </Icon>
            </BButton>
          </Tooltip>
        </div>
      </PopoverTrigger>

      <PopoverContent
        mr={2}
        w={"240px"}
        borderRadius={themeConfig.radii.container}
      >
        <CContainer px={1}>
          <HelperText mb={1}>{l.selected_time_zone}</HelperText>

          <HStack>
            <Text fontWeight={"medium"}>{formatDate(new Date())}</Text>
            <Clock fontWeight={"medium"} />
          </HStack>

          <Text color={"fg.muted"}>
            {timeZone.key} {timeZone.formattedOffset} ({timeZone.localAbbr})
          </Text>
        </CContainer>

        {!userSelect && (
          <CContainer px={1} mt={4}>
            <HelperText mb={1}>{l.auto_time_zone}</HelperText>

            <HStack>
              <Text fontWeight={"medium"}>
                {formatDate(new Date(), {
                  prefixTimeZoneKey: autoTz.key,
                  prefixDateFormat: dateFormat,
                })}
              </Text>
              <Clock fontWeight={"medium"} timeZoneKey={autoTimeZone().key} />
            </HStack>

            <Text color={"fg.muted"}>
              {autoTz.key} {autoTz.formattedOffset} ({autoTz.localAbbr})
            </Text>
          </CContainer>
        )}

        <Link to="/settings/regional">
          <BButton mt={3} variant="outline" size="sm" w="full">
            {l.change}
          </BButton>
        </Link>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default CurrentUserTimeZone;
