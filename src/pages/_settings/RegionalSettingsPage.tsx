import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import CheckIndicator from "@/components/ui-custom/CheckIndicator";
import FeedbackNotFound from "@/components/ui-custom/FeedbackNotFound";
import HelperText from "@/components/ui-custom/HelperText";
import ItemContainer from "@/components/ui-custom/ItemContainer";
import ItemHeaderContainer from "@/components/ui-custom/ItemHeaderContainer";
import ItemHeaderTitle from "@/components/ui-custom/ItemHeaderTitle";
import SearchInput from "@/components/ui-custom/SearchInput";
import SettingsNavsContainer from "@/components/widget/SettingsNavsContainer";
import { DATE_FORMATS } from "@/constants/dateFormats";
import { LANGUAGES } from "@/constants/languages";
import { TIME_FORMATS } from "@/constants/timeFormats";
import {
  Type__DateFormat,
  Type__LanguageOptions,
  Type__TimeFormat,
} from "@/constants/types";
import { UOM_FORMATS } from "@/constants/uomFormats";
import useDateFormat from "@/context/useDateFormat";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useTimeFormat from "@/context/useTimeFormat";
import useTimeZone from "@/context/useTimeZone";
import useUOM from "@/context/useUOM";
import useScreen from "@/hooks/useScreen";
import autoTimeZone from "@/utils/autoTimeZone";
import capsFirstLetterEachWord from "@/utils/capsFirstLetterEachWord";
import formatDate from "@/utils/formatDate";
import formatTime from "@/utils/formatTime";
import { makeTime } from "@/utils/time";
import pluck from "@/utils/pluck";
import { TIME_ZONES } from "@/utils/timeZones";
import { chakra, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import {
  IconCalendar,
  IconClock12,
  IconLanguage,
  IconRulerMeasure,
  IconTimezone,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { AutoSizer, Grid, GridCellRenderer } from "react-virtualized";

const Language = () => {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const { lang, setLang, l } = useLang();

  return (
    <ItemContainer>
      <ItemHeaderContainer>
        <HStack>
          <IconLanguage size={20} />
          <ItemHeaderTitle>{l.language_settings_title}</ItemHeaderTitle>
        </HStack>
      </ItemHeaderContainer>

      <CContainer gap={4} py={2}>
        <SimpleGrid px={2} columns={[1, 2]}>
          {LANGUAGES.map((item, i) => {
            const active = lang === item.key;

            return (
              <BButton
                key={i}
                unclicky
                borderRadius={themeConfig.radii.component}
                gap={1}
                variant={"ghost"}
                justifyContent={"start"}
                px={[3, null, 3]}
                onClick={() => {
                  setLang(item.key as Type__LanguageOptions);
                }}
              >
                <Text fontWeight={"bold"} truncate>
                  {item.label}{" "}
                  <chakra.span color={"fg.subtle"} mx={2} fontWeight={"normal"}>
                    {item.code}
                  </chakra.span>
                </Text>

                {active && <CheckIndicator />}
              </BButton>
            );
          })}
        </SimpleGrid>
      </CContainer>
    </ItemContainer>
  );
};

const TimeZone = () => {
  // Contexts
  const { l } = useLang();
  const { timeZone, setTimeZone } = useTimeZone();

  // Constants
  const autoTZ = useMemo(() => autoTimeZone(), []);
  const FINAL_TIME_ZONES = useMemo(() => [autoTZ, ...TIME_ZONES], [autoTZ]);

  // States
  const [search, setSearch] = useState("");

  // Filtered Timezones
  const fd = useMemo(() => {
    if (!search) return FINAL_TIME_ZONES;
    const searchTerm = search.toLowerCase().normalize("NFD");
    return FINAL_TIME_ZONES.filter(({ key, formattedOffset, localAbbr }) =>
      `${key} ${formattedOffset} ${localAbbr}`
        .toLowerCase()
        .includes(searchTerm)
    );
  }, [search, FINAL_TIME_ZONES]);

  // Utils
  const { sw } = useScreen();
  const iss = sw < 1000;
  const columnCount = iss ? 1 : 2;

  // Cell Renderer vz
  const cellRenderer: GridCellRenderer = ({
    columnIndex,
    rowIndex,
    key,
    style,
  }) => {
    const itemIndex = rowIndex * columnCount + columnIndex; // exceeds fd.length
    if (itemIndex >= fd.length) return null; // handle exceeds
    const item = fd[itemIndex];

    return (
      <div
        key={key}
        style={{
          ...style,
          paddingLeft: itemIndex % 2 === 0 || iss ? "8px" : "",
          paddingRight: itemIndex % 2 === 0 && !iss ? "" : "8px",
        }}
      >
        <BButton
          unclicky
          onClick={() => setTimeZone(item)}
          variant="ghost"
          justifyContent="start"
          px={[3, null, 3]}
          w={"full"}
        >
          <Text fontWeight="bold" truncate>
            {item.label}
          </Text>
          <Text color="fg.subtle">{item.formattedOffset}</Text>
          <Text color="fg.subtle" ml={-1}>
            ({item.localAbbr})
          </Text>
          {item.key === timeZone.key && <CheckIndicator />}
        </BButton>
      </div>
    );
  };

  return (
    // <Profiler id="TimeZone" onRender={onRenderCallback}>
    <ItemContainer>
      <ItemHeaderContainer borderless={iss} gap={2}>
        <HStack truncate>
          <HStack>
            <IconTimezone size={20} />
            <ItemHeaderTitle>
              {capsFirstLetterEachWord(l.time_zone)}
            </ItemHeaderTitle>
          </HStack>

          <Text color="fg.subtle" truncate>
            {timeZone.key} {timeZone.formattedOffset} ({timeZone.localAbbr})
          </Text>
        </HStack>

        {!iss && (
          <SearchInput
            onChangeSetter={setSearch}
            inputValue={search}
            inputProps={{ size: "xs" }}
            maxW="300px"
          />
        )}
      </ItemHeaderContainer>

      <CContainer>
        {iss && (
          <CContainer px={3} mt={2}>
            <SearchInput
              onChangeSetter={setSearch}
              inputValue={search}
              inputProps={{
                variant: "flushed",
                borderRadius: 0,
                pl: "36px",
              }}
              iconProps={{ ml: "-6px" }}
            />
          </CContainer>
        )}

        <CContainer h="178px" mb={2}>
          {fd.length === 0 ? (
            <FeedbackNotFound />
          ) : (
            <AutoSizer>
              {({ height, width }) => (
                <Grid
                  width={width}
                  height={height}
                  columnCount={columnCount}
                  columnWidth={width / columnCount}
                  rowCount={Math.ceil(fd.length / columnCount)}
                  rowHeight={40}
                  cellRenderer={cellRenderer}
                  className="scrollY timezones-list"
                  style={{
                    paddingTop: "8px",
                    // paddingBottom: "8px",
                    overflowX: "clip",
                  }}
                />
              )}
            </AutoSizer>
          )}
        </CContainer>
      </CContainer>
    </ItemContainer>
    // </Profiler>
  );
};

const DateFormat = () => {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const { l } = useLang();
  const { dateFormat, setDateFormat } = useDateFormat();

  return (
    <ItemContainer>
      <ItemHeaderContainer>
        <HStack>
          <IconCalendar size={20} />
          <ItemHeaderTitle>{l.date_format_settings_title}</ItemHeaderTitle>
        </HStack>
      </ItemHeaderContainer>

      <CContainer gap={4} py={2}>
        <SimpleGrid px={2} columns={[1, 2, 3]}>
          {DATE_FORMATS.map((item, i) => {
            const active = item.key === dateFormat;

            return (
              <CContainer
                key={i}
                px={[3, null, 3]}
                py={3}
                borderRadius={themeConfig.radii.component}
                onClick={() => {
                  setDateFormat(item.key as Type__DateFormat);
                }}
                cursor={"pointer"}
                _hover={{ bg: "gray.subtle" }}
                _active={{ bg: "gray.subtle" }}
                transition={"200ms"}
              >
                <HStack align={"start"}>
                  <Text fontWeight={"bold"} truncate>
                    {item.label}
                  </Text>

                  {active && <CheckIndicator />}
                </HStack>

                <Text color={"fg.muted"} mb={2}>
                  {item.description}
                </Text>

                {/* Example */}
                <Text color={"fg.subtle"}>
                  {formatDate(new Date(), {
                    variant: "weekdayFullMonth",
                    prefixDateFormat: item.key as Type__DateFormat,
                  })}
                </Text>
              </CContainer>
            );
          })}
        </SimpleGrid>
      </CContainer>
    </ItemContainer>
  );
};

const TimeFormat = () => {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const { l } = useLang();
  const { timeFormat, setTimeFormat } = useTimeFormat();

  return (
    <ItemContainer>
      <ItemHeaderContainer>
        <HStack>
          <IconClock12 size={20} />
          <ItemHeaderTitle>{l.time_format_settings_title}</ItemHeaderTitle>
        </HStack>
      </ItemHeaderContainer>

      <CContainer gap={4} py={2}>
        <SimpleGrid px={2} columns={[1, 2]}>
          {TIME_FORMATS.map((item, i) => {
            const active = item.key === timeFormat;

            return (
              <CContainer
                key={i}
                px={[3, null, 3]}
                py={3}
                borderRadius={themeConfig.radii.component}
                onClick={() => {
                  setTimeFormat(item.key);
                }}
                cursor={"pointer"}
                _hover={{ bg: "gray.subtle" }}
                _active={{ bg: "gray.subtle" }}
                transition={"200ms"}
              >
                <HStack align={"start"}>
                  <Text fontWeight={"bold"} truncate>
                    {item.label}
                  </Text>

                  {active && <CheckIndicator />}
                </HStack>

                <Text>
                  {formatTime(makeTime(new Date().toISOString()), {
                    prefixTimeFormat: item.key as Type__TimeFormat,
                  })}
                </Text>
              </CContainer>
            );
          })}
        </SimpleGrid>
      </CContainer>
    </ItemContainer>
  );
};

const UOMFormat = () => {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const { l } = useLang();
  const { UOM, setUOM } = useUOM();

  return (
    <ItemContainer>
      <ItemHeaderContainer>
        <HStack>
          <IconRulerMeasure size={20} />
          <ItemHeaderTitle>
            {l.measurment_unit_format_settings_title}
          </ItemHeaderTitle>
        </HStack>
      </ItemHeaderContainer>

      <CContainer gap={4} py={2}>
        <SimpleGrid px={2} columns={[1, 2, 3]}>
          {UOM_FORMATS.map((item, i) => {
            const active = item.key === UOM;

            return (
              <CContainer
                key={i}
                px={[3, null, 3]}
                py={3}
                borderRadius={themeConfig.radii.component}
                onClick={() => {
                  setUOM(item.key);
                }}
                cursor={"pointer"}
                _hover={{ bg: "gray.subtle" }}
                _active={{ bg: "gray.subtle" }}
                transition={"200ms"}
              >
                <HStack align={"start"}>
                  <Text fontWeight={"bold"} truncate>
                    {item.label}
                  </Text>

                  {active && <CheckIndicator />}
                </HStack>

                <Text color={"fg.muted"} mb={2}>
                  {pluck(l, item.descriptionKey)}
                </Text>

                {/* Example */}
                <HStack wrap={"wrap"} mt={"auto"}>
                  <Text color={"fg.subtle"}>{item.units.mass}</Text>
                  <Text color={"fg.subtle"}>{item.units.length}</Text>
                  <Text color={"fg.subtle"}>{item.units.height}</Text>
                  <Text color={"fg.subtle"}>{item.units.volume}</Text>
                  <Text color={"fg.subtle"}>{item.units.area}</Text>
                  <Text color={"fg.subtle"}>{item.units.speed}</Text>
                </HStack>
              </CContainer>
            );
          })}
        </SimpleGrid>
      </CContainer>
    </ItemContainer>
  );
};

const RegionalSettingsPage = () => {
  // Contexts
  const { l } = useLang();

  return (
    <SettingsNavsContainer align={"stretch"} activePath="/settings/regional">
      <CContainer gap={4}>
        {/* Language */}
        <Language />

        {/* Time Zone */}
        <TimeZone />

        {/* Date Format */}
        <DateFormat />

        {/* Time Format */}
        <TimeFormat />

        {/* Measurment Unit Format */}
        <UOMFormat />
      </CContainer>

      <HelperText px={2} mt={4}>
        {l.regional_settings_helper_text}
      </HelperText>
    </SettingsNavsContainer>
  );
};

export default RegionalSettingsPage;
