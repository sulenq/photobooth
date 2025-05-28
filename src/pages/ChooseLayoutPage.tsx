import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Heading1 from "@/components/ui-custom/Heading1";
import NextButton from "@/components/widget/NextButton";
import SessionTimer from "@/components/widget/SessionTimer";
import { LAYOUT_OPTIONS } from "@/constants/layoutOptions";
import useSessionTemplate from "@/context/useSessionTemplate";
import { Box, HStack, Icon, Image } from "@chakra-ui/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const ChooseLayoutPage = () => {
  const { template, setTemplate } = useSessionTemplate();

  return (
    <Box h={"100dvh"}>
      <Box flexShrink={0} h={"50%"} bg={"p.100"} p={10}>
        <HStack align={"start"} h={"full"} w={"full"} justify={"space-between"}>
          <SessionTimer w={"250px"} />

          <CContainer h={"full"} w={"fit"}>
            <Image src={template?.src} h={"full"} objectFit={"contain"} />
          </CContainer>

          <NextButton to={"/edit-photo"} disabled={!template} />
        </HStack>
      </Box>

      <Box flexShrink={0} h={"50%"} bg={"p.900"} p={10}>
        <Heading1
          className="df"
          color={"p.100"}
          fontWeight={"semibold"}
          textAlign={"center"}
          mb={8}
        >
          Choose a Template
        </Heading1>

        <Box pos={"relative"} h={"calc(100% - 64px - 20px)"}>
          {/* Controls */}
          <HStack
            position={"absolute"}
            top={"50%"}
            transform={"translateY(-50%)"}
            w={"full"}
            justify={"space-between"}
            zIndex={2}
            pointerEvents={"none"}
          >
            <BButton
              iconButton
              pointerEvents={"auto"}
              w={"fit"}
              borderRadius={"full"}
              bg={"white"}
              size={"xl"}
              ml={-4}
            >
              <Icon color={"p.900"} boxSize={6}>
                <IconChevronLeft stroke={3} />
              </Icon>
            </BButton>

            <BButton
              iconButton
              pointerEvents={"auto"}
              w={"fit"}
              borderRadius={"full"}
              bg={"white"}
              size={"xl"}
              mr={-4}
            >
              <Icon color={"p.900"} boxSize={6}>
                <IconChevronRight stroke={3} />
              </Icon>
            </BButton>
          </HStack>

          {/* Option List */}
          <Box h={"full"} overflowX={"auto"} className="noScroll">
            <HStack h={"full"} w={"max"} align={"stretch"}>
              {LAYOUT_OPTIONS.map((item, i) => {
                return (
                  <CContainer
                    key={i}
                    h={"full"}
                    w={"fit"}
                    cursor={"pointer"}
                    className="clicky"
                    onClick={() => setTemplate(item)}
                  >
                    <Image src={item?.thumbnail} h={"full"} />
                  </CContainer>
                );
              })}
            </HStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChooseLayoutPage;
