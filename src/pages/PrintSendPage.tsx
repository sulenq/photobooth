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
import useRequest from "@/hooks/useRequest";
import {
  Box,
  Center,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import useSessionPhotos from "@/context/useSessionPhotos";

const DriveQR = (props: any) => {
  // Props
  const { driveLink, setDriveLink, setGetDriveLinkLoading } = props;

  // Hooks
  const { loading, req, response, error } = useRequest({
    id: "generate-drive-qr",
    showLoadingToast: false,
    showErrorToast: false,
    showSuccessToast: false,
  });

  // Contexts
  const { photos } = useSessionPhotos();

  // Utils
  function generateDriveLink() {
    const url = `/send-drive/go`;
    const payload = photos;

    req({
      config: {
        url,
        method: "post",
        data: {
          images: payload,
        },
      },
    });
  }

  // Handle generate drive link QR on load
  useEffect(() => {
    generateDriveLink();
  }, []);
  useEffect(() => {
    const driveLink = response?.data?.driveLink;

    if (driveLink) {
      setDriveLink(driveLink);
    }
  }, [response]);

  // Handle drive link loading
  useEffect(() => {
    setGetDriveLinkLoading(loading);
  }, [loading]);

  return (
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
      <Center bg={"white"} borderRadius={16} p={5} flex={1}>
        {loading && <Spinner size={"xl"} />}

        {!loading && (
          <>
            {error && <FeedbackRetry onRetry={generateDriveLink} />}

            {!error && <QRCodeCanvas value={driveLink} size={300} />}
          </>
        )}
      </Center>
    </CContainer>
  );
};

const SendEmail = (props: any) => {
  // Props
  const { driveLink, driveLinkLoading } = props;

  // Hooks
  const { loading, req } = useRequest({
    id: "generate-drive-qr",
  });

  // States
  const [email, setEmail] = useState("");

  // Utils
  function sendEmail() {
    const url = `/send-email/go`;
    const payload = {
      email: email,
      driveLink: driveLink,
    };

    req({
      config: {
        url,
        method: "post",
        data: payload,
      },
    });
  }

  return (
    <CContainer p={2} bg={"p.900"} borderRadius={16} gap={4}>
      <Text fontSize={20} fontWeight={"bold"} color={"white"} mt={1} px={2}>
        Email
      </Text>

      <StringInput
        bg={"white"}
        placeholder="Enter your email address to send file"
        borderRadius={6}
        onChangeSetter={(input) => {
          setEmail(input);
        }}
        inputValue={email}
      />

      <BButton
        w={"fit"}
        colorPalette={"p"}
        ml={"auto"}
        onClick={sendEmail}
        loading={loading || driveLinkLoading}
      >
        Send to Email
      </BButton>
    </CContainer>
  );
};

const PrintSendPage = () => {
  // Contexts
  const { template } = useSessionTemplate();
  const { resPhotos, setResPhotos } = useSessionResPhotos();

  // States
  const LayoutComponent =
    LAYOUT_COMPONENTS[template.layout.id as keyof typeof LAYOUT_COMPONENTS];
  const [driveLink, setDriveLink] = useState("");
  const [driveLinkLoading, setGetDriveLinkLoading] = useState<boolean>(false);

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
          {/* Print */}
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
                zIndex={2}
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

          {/* Drive n Send Email */}
          <CContainer gap={8}>
            <DriveQR
              driveLink={driveLink}
              setDriveLink={setDriveLink}
              setGetDriveLinkLoading={setGetDriveLinkLoading}
            />

            <SendEmail
              driveLink={driveLink}
              driveLinkLoading={driveLinkLoading}
            />
          </CContainer>
        </SimpleGrid>
      </CContainer>
    </PageContainer>
  );
};

export default PrintSendPage;
