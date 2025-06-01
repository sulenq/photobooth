import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
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
import useSessionPhotos from "@/context/useSessionPhotos";
import useSessionResPhotos from "@/context/useSessionResPhotos";
import useSessionTemplate from "@/context/useSessionTemplate";
import useSessionTimeout from "@/context/useSessionTimeout";
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
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";

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
    const element = document.getElementById("finalResult");
    if (!element) {
      console.error("Element with id 'finalResult' not found");
      return;
    }

    // Use a higher scale for better resolution
    html2canvas(element, {
      scale: 3, // 3x bigger than original element size
      useCORS: true, // if images cross-origin
      backgroundColor: null, // preserve transparent background if any
    }).then((canvas) => {
      const base64Image = canvas.toDataURL("image/png", 1); // quality 1 for PNG

      const url = `/send-drive/go`;
      req({
        config: {
          url,
          method: "post",
          data: {
            images: [base64Image, ...photos],
          },
        },
      });
    });
  }

  // Handle generate drive link QR on load
  useEffect(() => {
    setTimeout(() => {
      generateDriveLink();
    }, 100);
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
        {loading && (
          <CContainer justify={"center"} align={"center"} gap={10}>
            <Spinner size={"xl"} />

            <Text fontSize={20}>Sedang menyiapkan Google Drive</Text>
          </CContainer>
        )}

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

const Print = () => {
  // Contexts
  const { template } = useSessionTemplate();
  const { photos } = useSessionPhotos();
  const { resPhotos, setResPhotos } = useSessionResPhotos();
  const { sessionTimeout } = useSessionTimeout();

  // States
  const LayoutComponent =
    LAYOUT_COMPONENTS[template.layout.id as keyof typeof LAYOUT_COMPONENTS];

  // Refs
  const printRef = useRef<HTMLDivElement>(null);

  // Utils
  function handlePrint() {
    const element = document.getElementById("finalResult");
    if (!element) return;

    html2canvas(element, {
      scale: 4, // biar resolusinya tajem
      useCORS: true,
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");

      const printWindow = window.open("", "_blank");
      if (!printWindow) return;

      printWindow.document.write(`
          <html>
            <head>
              <title>Print</title>
              <style>
                @page {
                  size: 10.2cm 15.2cm;
                  margin: 0;
                }
                html, body {
                  margin: 0;
                  padding: 0;
                  width: 10.2cm;
                  height: 15.2cm;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: white;
                }
                img {
                  width: 100%;
                  height: auto;
                }
              </style>
            </head>
            <body>
              <img src="${dataUrl}" />
            </body>
          </html>
        `);

      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    });
  }

  // Handle assign photos automaticaly when time run out
  useEffect(() => {
    // console.log("sessionTimeout", sessionTimeout);

    if (!photos || photos.length === 0) return;

    setResPhotos(() => {
      const newSlots: any = {
        1: null,
        2: null,
        3: null,
        4: null,
      };

      for (let i = 0; i < 4; i++) {
        newSlots[i + 1] = photos[i % photos.length];
      }

      return newSlots;
    });
  }, [sessionTimeout, photos]);

  return (
    <CContainer align="center" gap={8}>
      <CContainer
        id="finalResult"
        fRef={printRef}
        pos="relative"
        h={`calc(${TEMPLATE_H})`}
        w="fit"
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

      <BButton
        onClick={handlePrint}
        {...PRESET_MAIN_BUTTON}
        w="full !important"
      >
        PRINT
      </BButton>
    </CContainer>
  );
};

const PrintSendPage = () => {
  // Contexts
  // TODO handle session data null maka navigate /take-photo

  // States
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
          <Print />

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
