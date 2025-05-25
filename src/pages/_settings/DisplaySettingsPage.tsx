import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import HelperText from "@/components/ui-custom/HelperText";
import ItemContainer from "@/components/ui-custom/ItemContainer";
import ItemHeaderContainer from "@/components/ui-custom/ItemHeaderContainer";
import SelectInput from "@/components/ui-custom/SelectInput";
import StringInput from "@/components/ui-custom/StringInput";
import { useColorMode } from "@/components/ui/color-mode";
import { Switch } from "@/components/ui/switch";
import SettingsNavsContainer from "@/components/widget/SettingsNavsContainer";
import SettingsItemContainer from "@/components/widget/SettingsItemContainer";
import useADM from "@/context/useADM";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import { Center, HStack, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { IconCheck, IconMoon2, IconPalette } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import formatTime from "@/utils/formatTime";
import ItemHeaderTitle from "@/components/ui-custom/ItemHeaderTitle";
import { OPTIONS_RELIGION } from "@/static/selectOptions";

const ManualDarkModeSetting = () => {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const { l } = useLang();
  const { colorMode, setColorMode } = useColorMode();
  const { ADM } = useADM();

  // States, Refs
  const timeoutRef = useRef<any>(null);
  const [active, setActive] = useState(colorMode === "dark");

  // Handle active state
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setColorMode(active ? "dark" : "light");
      timeoutRef.current = null;
    }, 100);
  }, [active]);
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setActive(colorMode === "dark" ? true : false);
      timeoutRef.current = null;
    }, 100);
  }, [colorMode]);

  return (
    <SettingsItemContainer disabled={ADM === "true"}>
      <CContainer>
        <Text>{l.dark_mode_ui_settings.label}</Text>
        <Text color={"fg.subtle"}>{l.dark_mode_ui_settings.description}</Text>
      </CContainer>

      <Switch
        checked={active}
        onChange={() => {
          setActive(!active);
        }}
        colorPalette={themeConfig.colorPalette}
      />
    </SettingsItemContainer>
  );
};
const ADMSetting = () => {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const { l } = useLang();
  const { ADM, setADM } = useADM();

  // States, Refs
  const [active, setActive] = useState(ADM === "true" ? true : false);
  const timeoutRef = useRef<any>(null);

  // Handle active state
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setADM(active ? "true" : "false");
      timeoutRef.current = null;
    }, 100);
  }, [active]);

  return (
    <SettingsItemContainer>
      <CContainer>
        <Text>{l.adaptive_dark_mode_ui_settings.label}</Text>
        <Text color={"fg.subtle"}>
          {l.adaptive_dark_mode_ui_settings.description}{" "}
          {`${formatTime("18:00", {
            prefixTimeZoneKey: "UTC",
          })} - ${formatTime("06:00", { prefixTimeZoneKey: "UTC" })}`}
        </Text>
      </CContainer>

      <Switch
        checked={active}
        onChange={() => {
          setActive(!active);
        }}
        colorPalette={themeConfig.colorPalette}
      />
    </SettingsItemContainer>
  );
};
const DarkMode = () => {
  // Contexts
  const { l } = useLang();

  return (
    <ItemContainer>
      <ItemHeaderContainer>
        <HStack>
          <IconMoon2 size={20} />
          <ItemHeaderTitle>{l.dark_mode_settings_title}</ItemHeaderTitle>
        </HStack>
      </ItemHeaderContainer>

      <CContainer gap={4} py={3}>
        {/* Manual Dark Mode Toggle */}
        <ManualDarkModeSetting />

        {/* Adaptive Dark Mode Toggle */}
        <ADMSetting />
      </CContainer>
    </ItemContainer>
  );
};

const Theme = () => {
  // Contexts
  const { themeConfig, setThemeConfig } = useThemeConfig();
  const { l } = useLang();

  // States, Refs
  const colorPalettes = [
    { palette: "p", primaryHex: "#0062FF" },

    // Neutral & Dark Shades
    { palette: "gray", primaryHex: "#1B1B1B" },
    { palette: "brown", primaryHex: "#795548" },
    { palette: "mocha", primaryHex: "#9F5D39" },
    { palette: "caramel", primaryHex: "#C47B27" },
    { palette: "cream", primaryHex: "#D7BF8C" },

    // Reds & Pinks
    { palette: "maroon", primaryHex: "#800000" },
    { palette: "red", primaryHex: "#FF0000" },
    { palette: "salmon", primaryHex: "#FF6242" },
    { palette: "flamingoPink", primaryHex: "#FF478B" },
    { palette: "bubblegumPink", primaryHex: "#FF4ABB" },
    { palette: "pink", primaryHex: "#E91E63" },

    // Oranges & Yellows
    { palette: "orange", primaryHex: "#FF8E62" },
    { palette: "pastelSalmon", primaryHex: "#FF8E62" },
    { palette: "yellow", primaryHex: "#f6e05e" },

    // Greens
    { palette: "lime", primaryHex: "#CDDC39" },
    { palette: "olive", primaryHex: "#879F30" },
    { palette: "green", primaryHex: "#4CAF50" },
    { palette: "jade", primaryHex: "#00A86B" },
    { palette: "teal", primaryHex: "#009688" },

    // Cyans & Blues
    { palette: "kemenkes", primaryHex: "#16B3AC" },
    { palette: "cyan", primaryHex: "#00BCD4" },
    { palette: "sky", primaryHex: "#0EA5E9" },
    { palette: "blue", primaryHex: "#2196F3" },
    { palette: "sapphire", primaryHex: "#1939B7" },
    { palette: "discord", primaryHex: "#5865F2" },
    { palette: "indigo", primaryHex: "#3F51B5" },

    // Purples & Lavenders
    { palette: "lavender", primaryHex: "#7A42FF" },
    { palette: "powderLavender", primaryHex: "#AB87FF" },
    { palette: "purple", primaryHex: "#9C27B0" },
  ];
  const [select, setSelect] = useState<any>();

  return (
    <ItemContainer>
      <ItemHeaderContainer>
        <HStack>
          <IconPalette size={20} />
          <ItemHeaderTitle>{l.theme_settings_title}</ItemHeaderTitle>
        </HStack>
      </ItemHeaderContainer>

      <CContainer gap={4} py={3} px={3}>
        <SimpleGrid columns={[5, 10, null, null, 15]} gap={2}>
          {colorPalettes.map((color, i) => {
            const active = color.palette === themeConfig.colorPalette;

            return (
              <Center
                key={i}
                p={color.palette === themeConfig.colorPalette ? 1 : 0}
                border={"2px solid"}
                borderColor={
                  color.palette === themeConfig.colorPalette
                    ? themeConfig.primaryColor
                    : `${color.palette}.500`
                }
                borderRadius={themeConfig.radii.component}
                cursor={"pointer"}
                onClick={() => {
                  setThemeConfig({
                    colorPalette: color.palette,
                    primaryColor: `${color.palette}.500`,
                    primaryColorHex: color.primaryHex,
                  });
                }}
              >
                <Center
                  w={"full"}
                  aspectRatio={1}
                  borderRadius={4}
                  bg={`${color.palette}.500`}
                >
                  {active && (
                    <Icon color={`${themeConfig.colorPalette}.contrast`}>
                      <IconCheck />
                    </Icon>
                  )}
                </Center>
              </Center>
            );
          })}
        </SimpleGrid>

        {/* Example */}
        <HStack wrap={"wrap"} gapY={4}>
          <BButton
            flex={"1 1 100px"}
            colorPalette={themeConfig.colorPalette}
            size={"md"}
          >
            Button
          </BButton>
          <BButton
            flex={"1 1 100px"}
            colorPalette={themeConfig.colorPalette}
            size={"md"}
            variant={"outline"}
          >
            Button
          </BButton>
          <StringInput
            boxProps={{ flex: "1 1 100px" }}
            placeholder="example@email.com"
          />
          <SelectInput
            flex={"1 1 100px"}
            name="select1"
            title={l.religion}
            initialOptions={OPTIONS_RELIGION}
            onConfirm={(inputValue) => {
              setSelect(inputValue);
            }}
            inputValue={select}
          />
        </HStack>
      </CContainer>
    </ItemContainer>
  );
};

const DisplaySettingsPage = () => {
  // Contexts
  const { l } = useLang();

  return (
    <SettingsNavsContainer align={"stretch"} activePath="/settings/display">
      <CContainer gap={4}>
        <DarkMode />

        <Theme />
      </CContainer>

      <HelperText px={2} mt={4}>
        {l.display_settings_helper_text}
      </HelperText>
    </SettingsNavsContainer>
  );
};

export default DisplaySettingsPage;
