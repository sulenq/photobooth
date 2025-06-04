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
import useChoosedProduct from "@/context/useChoosedProduct";
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

interface DriveQRProps {
  driveLink: string;
  setDriveLink: (link: string) => void;
  setGetDriveLinkLoading: (loading: boolean) => void;
}

interface SendEmailProps {
  driveLink: string;
  driveLinkLoading: boolean;
}

const DriveQR = (props: DriveQRProps) => {
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
    if (!element) return;

    html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    }).then((canvas) => {
      const base64Image = canvas.toDataURL("image/png", 1);

      req({
        config: {
          url: `/send-drive/go`,
          method: "post",
          data: {
            images: [base64Image, ...photos],
          },
        },
      });
    });
  }

  // Handle generate qr drive on page load
  useEffect(() => {
    // setTimeout(() => generateDriveLink(), 100);
  }, []);

  // Handle qr drive response
  useEffect(() => {
    const link = response?.data?.driveLink;
    if (link) setDriveLink(link);
  }, [response]);

  // Handle qr drive loading
  useEffect(() => {
    setGetDriveLinkLoading(loading);
  }, [loading]);

  return (
    <CContainer p={2} bg={"p.900"} borderRadius={16} gap={3} flex={1}>
      <Text
        fontSize={20}
        fontWeight="bold"
        color="white"
        textAlign="center"
        mt={1}
        px={2}
      >
        Scan Me to Download
      </Text>
      <Center bg="white" borderRadius={16} p={5} flex={1}>
        {loading ? (
          <CContainer justify="center" align="center" gap={10}>
            <Spinner size="xl" />
            <Text fontSize={20} textAlign={"center"}>
              Sedang menyiapkan Google Drive
            </Text>
          </CContainer>
        ) : error ? (
          <FeedbackRetry onRetry={generateDriveLink} />
        ) : (
          <QRCodeCanvas value={driveLink} size={300} />
        )}
      </Center>
    </CContainer>
  );
};

const SendEmail = ({ driveLink, driveLinkLoading }: SendEmailProps) => {
  // Hooks
  const { loading, req } = useRequest({ id: "generate-drive-qr" });
  const [email, setEmail] = useState("");

  // Utils
  function sendEmail() {
    req({
      config: {
        url: `/send-email/go`,
        method: "post",
        data: { email, driveLink },
      },
    });
  }

  return (
    <CContainer p={2} bg="p.900" borderRadius={16} gap={4}>
      <Text fontSize={20} fontWeight="bold" color="white" mt={1} px={2}>
        Email
      </Text>
      <StringInput
        bg="white"
        placeholder="Enter your email address to send file"
        borderRadius={6}
        onChangeSetter={setEmail}
        inputValue={email}
      />
      <BButton
        w="fit"
        colorPalette="p"
        ml="auto"
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
  const { choosedProduct } = useChoosedProduct();

  // States
  const layoutData =
    LAYOUT_COMPONENTS[template.layout.id as keyof typeof LAYOUT_COMPONENTS];
  const LayoutComponent = layoutData.component;
  const printRef = useRef<HTMLDivElement>(null);

  // Utils
  function handlePrint() {
    const element = document.getElementById("finalResult");
    if (!element) return;

    html2canvas(element, {
      width: element.offsetWidth,
      height: element.offsetHeight,
      scale: 3,
      useCORS: true,
      backgroundColor: "#FFFFFF",
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      const copies = choosedProduct?.qty || 1;

      window.electronAPI.printPhoto(dataUrl, copies);
    });
  }

  // Handle auto assign res photos
  useEffect(() => {
    if (!photos?.length) return;

    setResPhotos(() => {
      const newSlots: Record<1 | 2 | 3 | 4, string | null> = {
        1: null,
        2: null,
        3: null,
        4: null,
      };

      for (let i = 0; i < 4; i++) {
        newSlots[(i + 1) as 1 | 2 | 3 | 4] = photos[i % photos.length];
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
          src={template?.production}
          pos="absolute"
          left={0}
          top={0}
          h={`calc(${TEMPLATE_H})`}
          aspectRatio={TEMPLATE_ASPECT_RATIO}
          zIndex={2}
        />
        <LayoutComponent
          resPhotos={resPhotos}
          setResPhotos={setResPhotos}
          zIndex={2}
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
  // States
  const [driveLink, setDriveLink] = useState("");
  const [driveLinkLoading, setGetDriveLinkLoading] = useState<boolean>(false);

  return (
    <PageContainer>
      <HStack mb={20}>
        <Box w="250px" />
        <Heading>Print & Send</Heading>
        <NextButton to="/thankyou" label="FINISH" />
      </HStack>

      <CContainer my="auto">
        <SimpleGrid
          columns={[1, null, 2]}
          gap={20}
          w="full"
          maxW="65%"
          mx="auto"
        >
          <Print />

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
