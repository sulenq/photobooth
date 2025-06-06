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
  Button,
  Center,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { DndContext } from "@dnd-kit/core";
import { IconX } from "@tabler/icons-react";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface DriveQRProps {
  driveLink: string;
  setDriveLink: (link: string) => void;
  setGetDriveLinkLoading: (loading: boolean) => void;
}

interface SendEmailProps {
  driveLink: string;
  driveLinkLoading: boolean;
}

const Print = () => {
  // Contexts
  const { template } = useSessionTemplate();
  const { photos } = useSessionPhotos();
  const { resPhotos, setResPhotos } = useSessionResPhotos();
  const { sessionTimeout } = useSessionTimeout();
  const { choosedProduct } = useChoosedProduct();

  // States
  const [printed, setPrinted] = useState<boolean>(false);
  const layoutData =
    LAYOUT_COMPONENTS[template.layoutId as keyof typeof LAYOUT_COMPONENTS];
  const LayoutComponent = layoutData.component;
  const printRef = useRef<HTMLDivElement>(null);

  // Utils
  // function handlePrint() {
  //   setPrinted(true);

  //   const element = document.getElementById("finalResult");
  //   if (!element) return;

  //   // Create wrapper with padding
  //   const wrapper = document.createElement("div");
  //   wrapper.style.padding = "6px 9px";
  //   wrapper.style.backgroundColor = "#FFFFFF";
  //   wrapper.style.position = "fixed";
  //   wrapper.style.top = "-9999px";
  //   wrapper.style.left = "-9999px";
  //   wrapper.style.zIndex = "-1";

  //   const clone = element.cloneNode(true) as HTMLElement;
  //   wrapper.appendChild(clone);
  //   document.body.appendChild(wrapper);

  //   html2canvas(wrapper, {
  //     scale: 3,
  //     useCORS: true,
  //     backgroundColor: "#FFFFFF",
  //   })
  //     .then((canvas) => {
  //       const dataUrl = canvas.toDataURL("image/png");
  //       const copies = choosedProduct?.qty || 1;
  //       window.electronAPI.printPhoto(dataUrl, copies);
  //       document.body.removeChild(wrapper);
  //     })
  //     .catch(() => {
  //       document.body.removeChild(wrapper);
  //     });
  // }

  function handlePrint() {
    setPrinted(true);

    const element = document.getElementById("finalResult");
    if (!element || !element.parentElement) return;

    const originalParent = element.parentElement;
    const originalNextSibling = element.nextSibling;

    // Bikin wrapper dengan padding
    const wrapper = document.createElement("div");
    wrapper.style.padding = "6.5px 9.5px 6.5px 9.5px";
    wrapper.style.backgroundColor = "#FFFFFF";
    wrapper.style.position = "fixed";
    wrapper.style.top = "-9999px";
    wrapper.style.left = "-9999px";
    wrapper.style.zIndex = "-1";

    // Pindahkan elemen asli ke wrapper
    wrapper.appendChild(element);
    document.body.appendChild(wrapper);

    html2canvas(wrapper, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#FFFFFF",
    })
      .then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");
        const copies = choosedProduct?.qty || 1;
        window.electronAPI.printPhoto(dataUrl, copies);

        // Balikin elemen ke posisi semula
        if (originalNextSibling) {
          originalParent.insertBefore(element, originalNextSibling);
        } else {
          originalParent.appendChild(element);
        }
        document.body.removeChild(wrapper);
      })
      .catch(() => {
        if (originalNextSibling) {
          originalParent.insertBefore(element, originalNextSibling);
        } else {
          originalParent.appendChild(element);
        }
        document.body.removeChild(wrapper);
      });
  }

  // function handlePrint() {
  //   const element = document.getElementById("finalResult");
  //   if (!element) return;

  //   // Ukuran target kertas (misal: 4x6 inch photo = 1200x1800 px @300dpi)
  //   const targetWidth = 1200;
  //   const targetHeight = 1800;

  //   html2canvas(element, {
  //     width: element.offsetWidth,
  //     height: element.offsetHeight,
  //     scale: Math.min(
  //       targetWidth / element.offsetWidth,
  //       targetHeight / element.offsetHeight
  //     ),
  //     useCORS: true,
  //     backgroundColor: "#FFFFFF",
  //     scrollX: 0,
  //     scrollY: 0,
  //     windowWidth: document.documentElement.offsetWidth,
  //     windowHeight: document.documentElement.offsetHeight,
  //   }).then((canvas) => {
  //     const dataUrl = canvas.toDataURL("image/png");
  //     const copies = choosedProduct?.qty || 1;

  //     window.electronAPI.printPhoto(dataUrl, copies);
  //   });
  // }

  // function handleExportThenPrint() {
  //   const element = document.getElementById("finalResult");
  //   if (!element) return;

  //   const options = {
  //     margin: 0,
  //     filename: "photo.pdf",
  //     image: { type: "jpeg", quality: 1 },
  //     html2canvas: {
  //       scale: 3, // high DPI capture
  //       useCORS: true,
  //       backgroundColor: "#FFFFFF",
  //     },
  //     jsPDF: {
  //       unit: "pt",
  //       format: [288, 432], // 4x6 inch = 288pt x 432pt
  //       orientation: "portrait",
  //     },
  //   };

  //   html2pdf()
  //     .set(options)
  //     .from(element)
  //     .outputPdf("datauristring")
  //     .then((dataUri: any) => {
  //       const base64 = dataUri.split(",")[1];
  //       const copies = choosedProduct?.qty || 1;
  //       window.electronAPI.printPhoto(base64, copies);
  //     });
  // }

  // function handleExportThenPrint() {
  //   setPrinted(false);

  //   const target = document.getElementById("finalResult");
  //   if (!target) return;

  //   // Create padded wrapper
  //   const wrapper = document.createElement("div");
  //   wrapper.style.padding = "40px"; // adjust if needed
  //   wrapper.style.backgroundColor = "#FFFFFF"; // biar sama kayak PDF
  //   wrapper.style.position = "fixed";
  //   wrapper.style.top = "-9999px";
  //   wrapper.style.left = "-9999px";
  //   wrapper.style.zIndex = "-1";

  //   // Clone content
  //   const clone = target.cloneNode(true) as HTMLElement;
  //   wrapper.appendChild(clone);
  //   document.body.appendChild(wrapper);

  //   const options = {
  //     margin: 0,
  //     filename: "photo.pdf",
  //     image: { type: "jpeg", quality: 1 },
  //     html2canvas: {
  //       scale: 3,
  //       useCORS: true,
  //       backgroundColor: "#FFFFFF",
  //     },
  //     jsPDF: {
  //       unit: "pt",
  //       format: [288, 432], // 4x6 inch
  //       orientation: "portrait",
  //     },
  //   };

  //   html2pdf()
  //     .set(options)
  //     .from(wrapper)
  //     .outputPdf("datauristring")
  //     .then((dataUri: string) => {
  //       const base64 = dataUri.split(",")[1];
  //       const copies = choosedProduct?.qty || 1;
  //       window.electronAPI.printPhoto(base64, copies);
  //       document.body.removeChild(wrapper);
  //     })
  //     .catch(() => {
  //       document.body.removeChild(wrapper);
  //     });
  // }

  // Handle auto assign res photoss
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
        disabled={printed}
        onClick={handlePrint}
        {...PRESET_MAIN_BUTTON}
        w="full !important"
        maxW={"400px"}
      >
        PRINT
      </BButton>
    </CContainer>
  );
};

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

  // States
  const [videoBase64, setVideoBase64] = useState<string | null>(null);
  const [loadingGenerateVideo, setLoadingGenerateVideo] =
    useState<boolean>(false);

  // Utils
  async function generateGifVideo() {
    try {
      setLoadingGenerateVideo(true);
      const videoBase64 = await window.electronAPI.generateVideo(photos);
      setVideoBase64(`data:video/mp4;base64,${videoBase64}`);
    } catch (err) {
      console.error("Gagal generate video:", err);
    } finally {
      setLoadingGenerateVideo(false);
    }
  }
  function generateDriveLink() {
    const element = document.getElementById("finalResult");
    if (!element) return;

    const options = {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    };

    html2canvas(element, { ...options }).then((canvas) => {
      const base64Image = canvas.toDataURL("image/png", 1);

      req({
        config: {
          url: `/send-drive/go`,
          method: "post",
          data: {
            images: [base64Image, ...photos, videoBase64],
          },
        },
      });
    });

    // html2pdf()
    //   .from(element)
    //   .outputPdf("datauristring")
    //   .then((dataUri: any) => {
    //     const base64Pdf = dataUri.split(",")[1];

    //     window.electronAPI
    //       .convertPdfToImage(base64Pdf)
    //       .then((imageBase64: string) => {
    //         req({
    //           config: {
    //             url: `/send-drive/go`,
    //             method: "post",
    //             data: {
    //               images: [...photos, videoBase64, imageBase64],
    //             },
    //           },
    //         });
    //       });
    //   });

    // toJpeg(element, { quality: 3 })
    //   .then((dataUrl) => {
    //     const base64Image = dataUrl.split(",")[1];

    //     req({
    //       config: {
    //         url: `/send-drive/go`,
    //         method: "post",
    //         data: {
    //           images: [...photos, parseBase64(base64Image)],
    //         },
    //       },
    //     });
    //   })
    //   .catch((err) => {
    //     console.error("Export error:", err);
    //   });
  }

  // Handle generate video from session Photos
  useEffect(() => {
    generateGifVideo();
  }, []);

  // Handle generate qr drive on page load
  useEffect(() => {
    if (videoBase64 && !loadingGenerateVideo) generateDriveLink();
  }, [videoBase64]);

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
        {(loading || loadingGenerateVideo) && (
          <CContainer justify="center" align="center" gap={10}>
            <Spinner size="xl" />
            <Text fontSize={18} textAlign={"center"}>
              Sedang menyiapkan Google Drive
            </Text>
          </CContainer>
        )}

        {!loading && (
          <>
            {error && <FeedbackRetry onRetry={generateGifVideo} />}

            {!error && driveLink && (
              <QRCodeCanvas value={driveLink} size={300} />
            )}
          </>
        )}
      </Center>
    </CContainer>
  );
};

const SendEmail = ({ driveLink, driveLinkLoading }: SendEmailProps) => {
  // Hooks
  const { loading, req } = useRequest({ id: "generate-drive-qr" });
  const [email, setEmail] = useState("");
  const [kbOpen, setKbOpen] = useState(false);

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
        onFocus={() => setKbOpen(true)}
      />

      {kbOpen && (
        <CContainer
          w={"fit"}
          pos={"absolute"}
          zIndex={999999}
          left={-4}
          bottom={0}
        >
          <Button
            onClick={() => {
              setKbOpen(false);
            }}
          >
            <Icon>
              <IconX />
            </Icon>
            Close Keyboard
          </Button>
          <Keyboard onChange={setEmail} />
        </CContainer>
      )}

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

const PrintSendPage = () => {
  // States
  const [driveLink, setDriveLink] = useState("");
  const [driveLinkLoading, setGetDriveLinkLoading] = useState<boolean>(false);

  return (
    <DndContext>
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
            pos={"relative"}
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
    </DndContext>
  );
};

export default PrintSendPage;
