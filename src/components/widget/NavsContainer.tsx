import { NAVS } from "@/constants/navs";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useIsSmScreenWidth from "@/hooks/useIsSmScreenWidth";
import pluck from "@/utils/pluck";
import {
  Circle,
  CircleProps,
  HStack,
  Icon,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { IconSettings } from "@tabler/icons-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import BackButton from "../ui-custom/BackButton";
import BnwLogo from "../ui-custom/BnwLogo";
import CContainer from "../ui-custom/CContainer";
import FloatCounter from "../ui-custom/FloatCounter";
import Heading6 from "../ui-custom/Heading6";
import HelperText from "../ui-custom/HelperText";
import Logo from "../ui-custom/Logo";
import NavLink from "../ui-custom/NavLink";
import { Tooltip } from "../ui/tooltip";
import CurrentUserTimeZone from "./CurrentUserTimeZone";
import MerchantInbox from "./Inbox";
import { ColorModeButton } from "../ui/color-mode";
import useADM from "@/context/useADM";

const ActiveNavIndicator = ({ ...props }: CircleProps) => {
  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <Circle
      w={"12px"}
      h={"2px"}
      bg={themeConfig.primaryColor}
      position={"absolute"}
      bottom={0}
      {...props}
    />
  );
};

const NavItemContainer = (props: any) => {
  // Props
  const { children, active, ...restProps } = props;

  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <VStack
      gap={0}
      w={"40px"}
      h={"40px"}
      justify={"center"}
      position={"relative"}
      color={active ? "fg" : "fg.muted"}
      _hover={{ bg: "bg.muted" }}
      borderRadius={themeConfig.radii.component}
      transition={"200ms"}
      {...restProps}
    >
      {active && <ActiveNavIndicator bottom={[-2, null, 0]} />}

      {children}
    </VStack>
  );
};

const NavList = (props: any) => {
  // Props
  const { activePath } = props;

  // Hooks
  const iss = useIsSmScreenWidth();

  // Contexts
  const { l } = useLang();

  return (
    <>
      {NAVS.map((nav: any, i) => {
        const active = activePath === nav.path;

        return (
          <NavLink key={i} align={"center"} to={nav.path}>
            <Tooltip
              content={pluck(l, nav.labelKey)}
              positioning={{ placement: "right" }}
              contentProps={{ ml: 2 }}
            >
              <NavItemContainer active={active}>
                <FloatCounter
                  circleProps={{
                    h: "18px",
                    fontSize: "xs",
                    mt: "18px",
                    mr: "18px",
                  }}
                  display={"none"}
                >
                  2
                </FloatCounter>

                <Icon {...nav?.iconProps}>
                  <nav.icon strokeWidth={1.5} size={iss ? 24 : 20} />
                </Icon>

                {iss && (
                  <HelperText
                    color={active ? "" : "fg.muted"}
                    lineHeight={1}
                    mt={1}
                    truncate
                  >
                    {pluck(l, nav.labelKey)}
                  </HelperText>
                )}
              </NavItemContainer>
            </Tooltip>
          </NavLink>
        );
      })}
    </>
  );
};
const NavList2 = (props: any) => {
  // Props
  const { activePath } = props;

  // Hooks
  const iss = useIsSmScreenWidth();

  // Contexts
  const { l } = useLang();

  return (
    <>
      <NavLink to={"/settings"} align={"center"}>
        <Tooltip
          content={l.navs.settings}
          positioning={{ placement: "right" }}
          contentProps={{ ml: 2 }}
        >
          <NavItemContainer active={activePath === "/settings"}>
            <Icon>
              <IconSettings strokeWidth={1.5} size={iss ? 24 : 20} />
            </Icon>

            {iss && (
              <HelperText
                color={activePath === "/settings" ? "" : "fg.muted"}
                lineHeight={1}
                mt={1}
                truncate
              >
                {pluck(l, "navs.settings")}
              </HelperText>
            )}
          </NavItemContainer>
        </Tooltip>
      </NavLink>

      {/* {!iss && <Separator w={"full"} mb={2} />}

      <Link to={"/profile"}>
        <Center
          w={"40px"}
          h={"40px"}
          borderRadius={"full"}
          borderColor={themeConfig.primaryColor}
          position={"relative"}
        >
          {activePath === "/profile" && <ActiveNavIndicator />}

          <Avatar
            name="Jolitos Kurniawan"
            cursor={"pointer"}
            size={"xs"}
            w={"28px"}
            h={"28px"}
          />
        </Center>
      </Link> */}
    </>
  );
};

const NavContainer = (props: any) => {
  // Props
  const { children, title, backPath, activePath } = props;

  // Hooks
  const iss = useIsSmScreenWidth();

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { ADM } = useADM();

  // States, Refs
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Stack
      flexDir={iss ? "column" : "row"}
      h={"100dvh"}
      gap={0}
      overflowX={"clip"}
    >
      {/* Lg screen nav */}
      {!iss && (
        <VStack
          w={"fit"}
          align={"center"}
          px={2}
          pt={5}
          pb={4}
          overflowX={"clip"}
          overflowY={"scroll"}
          mr={"-6px"}
          className="scrollY"
          bg={"body"}
          borderRight={"1px solid"}
          borderColor={"border.muted"}
        >
          <Link to={"/"}>
            {themeConfig.colorPalette === "gray" ? (
              <BnwLogo />
            ) : (
              <Logo size={16} color={themeConfig.primaryColorHex} />
            )}
          </Link>

          <VStack justify={"center"} flex={1}>
            <NavList activePath={activePath} />
          </VStack>

          <VStack mt={"auto"}>
            <NavList2 activePath={activePath} />
          </VStack>
        </VStack>
      )}

      {/* Content */}
      <CContainer
        fRef={containerRef}
        position={"relative"}
        flex={1}
        overflowY={"scroll"}
        className="scrollY"
        overflowX={"clip"}
        bg={"bgContent"}
      >
        <HStack
          justify={"space-between"}
          p={2}
          px={4}
          position={"sticky"}
          top={0}
          zIndex={2}
          bg={iss ? "body" : "bgContent"}
          borderBottom={iss ? "1px solid {colors.border.subtle}" : ""}
        >
          <HStack>
            {backPath && <BackButton iconButton backPath={backPath} />}

            <Heading6 fontWeight={"bold"} truncate>
              {title}
            </Heading6>
          </HStack>

          {/* Quick Settings */}
          <HStack flexShrink={0} gap={0}>
            <ColorModeButton fontSize={"1.1rem"} disabled={ADM === "true"} />

            <CurrentUserTimeZone />

            <MerchantInbox />
          </HStack>
        </HStack>

        {children}
      </CContainer>

      {/* Sm screen nav */}
      {iss && (
        <HStack
          h={"80px"}
          justify={"space-around"}
          pt={1}
          pb={6}
          px={4}
          borderTop={"1px solid"}
          borderColor={"d2"}
          overflowX={"auto"}
          flexShrink={0}
          position={"sticky"}
          bottom={0}
        >
          <NavList activePath={activePath} />

          <NavList2 activePath={activePath} />
        </HStack>
      )}
    </Stack>
  );
};

export default NavContainer;
