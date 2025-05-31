import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Heading1 from "@/components/ui-custom/Heading1";
import NextButton from "@/components/widget/NextButton";
import SessionTimer from "@/components/widget/SessionTimer";
import { DUMMY_TEMPLATE_OPTIONS } from "@/constants/dummyTemplateOptions";
import useSessionTemplate from "@/context/useSessionTemplate";
import { Box, HStack, Icon, Image } from "@chakra-ui/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useRef } from "react";

const OptionList = () => {
  // Contexts
  const setTemplate = useSessionTemplate((s) => s.setTemplate);

  // Refs
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Utils
  function prev() {
    if (carouselContainerRef.current) {
      carouselContainerRef.current.scrollLeft -= 300;
    }
  }
  function next() {
    if (carouselContainerRef.current) {
      carouselContainerRef.current.scrollLeft += 300;
    }
  }

  return (
    <CContainer
      flexShrink={0}
      h={"50%"}
      bg={"p.900"}
      overflow={"clip"}
      gap={8}
      pt={6}
    >
      <Heading1
        className="df"
        color={"p.100"}
        fontWeight={"semibold"}
        textAlign={"center"}
      >
        Choose a Template
      </Heading1>

      <Box pos={"relative"} h={"calc(100% - 64px - 20px)"} pb={10}>
        {/* Controls */}
        <HStack
          position={"absolute"}
          top={"50%"}
          transform={"translateY(-50%)"}
          w={"full"}
          justify={"space-between"}
          zIndex={2}
          pointerEvents={"none"}
          p={10}
        >
          <BButton
            iconButton
            pointerEvents={"auto"}
            w={"fit"}
            borderRadius={"full"}
            bg={"white"}
            size={"xl"}
            ml={-4}
            onClick={prev}
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
            onClick={next}
          >
            <Icon color={"p.900"} boxSize={6}>
              <IconChevronRight stroke={3} />
            </Icon>
          </BButton>
        </HStack>

        {/* Option List */}
        <Box
          ref={carouselContainerRef}
          scrollBehavior={"smooth"}
          h={"full"}
          overflowX={"auto"}
          className="noScroll"
        >
          <HStack h={"full"} w={"max"} align={"stretch"} gap={8} px={10}>
            {DUMMY_TEMPLATE_OPTIONS.map((item, i) => {
              return (
                <CContainer
                  key={i}
                  h={"full"}
                  w={"fit"}
                  cursor={"pointer"}
                  className="clicky"
                  onClick={() => setTemplate(item)}
                >
                  <Image src={item?.templateThumbnail} h={"full"} />
                </CContainer>
              );
            })}
          </HStack>
        </Box>
      </Box>
    </CContainer>
  );
};

const ChooseLayoutPage = () => {
  // Contexts
  const template = useSessionTemplate((s) => s.template);

  return (
    <Box h={"100dvh"}>
      <Box flexShrink={0} h={"50%"} bg={"p.100"} p={10}>
        <HStack align={"start"} h={"full"} w={"full"} justify={"space-between"}>
          <SessionTimer w={"250px"} />

          <CContainer h={"full"} w={"fit"}>
            <Image
              src={template?.templateThumbnail}
              h={"full"}
              objectFit={"contain"}
            />
          </CContainer>

          <NextButton to={"/edit-photo"} disabled={!template} />
        </HStack>
      </Box>

      <OptionList />
    </Box>
  );
};

export default ChooseLayoutPage;
