import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import StringInput from "@/components/ui-custom/StringInput";
import Heading from "@/components/widget/Heading";
import NextButton from "@/components/widget/NextButton";
import PageContainer from "@/components/widget/PageContainer";
import {
  TEMPLATE_ASPECT_RATIO,
  TEMPLATE_H,
} from "@/constants/defaultAttributes";
import { LAYOUT_COMPONENTS } from "@/constants/layoutComponents";
import { PRESET_MAIN_BUTTON } from "@/constants/presetProps";
import useSessionResPhotos from "@/context/useSessionResPhotos";
import useSessionTemplate from "@/context/useSessionTemplate";
import { Box, HStack, Image, SimpleGrid, Text } from "@chakra-ui/react";

const PrintSendPage = () => {
  // Contexts
  const { template } = useSessionTemplate();
  const { resPhotos, setResPhotos } = useSessionResPhotos();

  // States
  const LayoutComponent =
    LAYOUT_COMPONENTS[template.layout.id as keyof typeof LAYOUT_COMPONENTS];

  // Handle upload to gdrive and generate QR
  // TODO

  return (
    <PageContainer>
      <HStack mb={20}>
        <Box w={"250px"} />

        <Heading>Print & Send</Heading>

        <NextButton to="/thankyou" label="FINISH" />
      </HStack>

      <CContainer my={"auto"}>
        <SimpleGrid
          columns={[1, null, 2]}
          gap={20}
          w={"full"}
          maxW={"65%"}
          mx={"auto"}
        >
          <CContainer align={"center"} gap={8}>
            <CContainer
              pos="relative"
              h={`calc(${TEMPLATE_H})`}
              w={"fit"}
              aspectRatio={TEMPLATE_ASPECT_RATIO}
            >
              <Image
                src={template?.template}
                pos="absolute"
                left={0}
                top={0}
                h={`calc(${TEMPLATE_H})`}
                aspectRatio={TEMPLATE_ASPECT_RATIO}
              />

              <LayoutComponent
                zIndex={2}
                resPhotos={resPhotos}
                setResPhotos={setResPhotos}
              />
            </CContainer>

            <BButton {...PRESET_MAIN_BUTTON} w={"full !important"}>
              PRINT
            </BButton>
          </CContainer>

          <CContainer gap={8}>
            <CContainer p={2} bg={"p.900"} borderRadius={16} gap={3} flex={1}>
              <Text
                fontSize={20}
                fontWeight={"bold"}
                color={"white"}
                textAlign={"center"}
                mt={1}
                px={2}
              >
                Scan Me to Download
              </Text>

              <CContainer
                bg={"white"}
                borderRadius={16}
                p={5}
                flex={1}
              ></CContainer>
            </CContainer>

            <CContainer p={2} bg={"p.900"} borderRadius={16} gap={4}>
              <Text
                fontSize={20}
                fontWeight={"bold"}
                color={"white"}
                mt={1}
                px={2}
              >
                Email
              </Text>

              <StringInput
                bg={"white"}
                placeholder="Enter your email address to send file"
                borderRadius={6}
              />

              <BButton w={"fit"} colorPalette={"p"} ml={"auto"}>
                Send to Email
              </BButton>
            </CContainer>
          </CContainer>
        </SimpleGrid>
      </CContainer>
    </PageContainer>
  );
};

export default PrintSendPage;
