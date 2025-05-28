import CContainer from "@/components/ui-custom/CContainer";
import { toaster } from "@/components/ui/toaster";
import Heading from "@/components/widget/Heading";
import NextButton from "@/components/widget/NextButton";
import PageContainer from "@/components/widget/PageContainer";
import SessionTimer from "@/components/widget/SessionTimer";
import { IMAGES_PATH } from "@/constants/paths";
import useLang from "@/context/useLang";
import useSessionPhotos from "@/context/useSessionPhotos";
import useSessionTimer from "@/context/useSessionTimer";
import { startCamera, stopCamera } from "@/utils/camera";
import { HStack, Image, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Camera = () => {
  // Hooks
  const navigate = useNavigate();
  const startTimer = useSessionTimer((s) => s.startTimer);

  // Contexts
  const { l } = useLang();

  // States
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Utils
  function handleStart() {
    startTimer({
      initialSeconds: 7 * 60,
      onFinished: () => navigate("/choose-layout"),
    });
  }

  // Handle open camera on page load
  useEffect(() => {
    startCamera(
      videoRef,
      streamRef,
      () => {
        setCameraOpen(true);
      },
      () => {
        toaster.error({
          title: l.camera_fail_toast.title,
          description: l.camera_fail_toast.description,
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      }
    );
  }, []);

  // Handle start session
  useEffect(() => {
    // TODO: Fetch timer rule data
    const seconds = 7 * 60;

    if (cameraOpen && seconds) handleStart();
  }, [cameraOpen]);

  // Handle stop camera when unmount
  useEffect(() => {
    return () => {
      stopCamera(videoRef, streamRef);
    };
  }, []);

  return (
    <CContainer w={"60%"} mx={"auto"} pos={"relative"}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: 4 / 3,
          // paddingBottom: "100%",
          backgroundColor: "black",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            aspectRatio: 4 / 3,
            width: "100%",
            height: "100%",
            transform: "scaleX(-1)", // Mirror
            objectFit: "cover",
          }}
        />
      </div>
    </CContainer>
  );
};

const TakePhotoPage = () => {
  // Contexts
  const photos = useSessionPhotos((s) => {
    s.photos;
  });

  return (
    <PageContainer borderless gap={10}>
      <HStack justify={"space-between"}>
        <SessionTimer w={"250px"} />

        <Heading>Take Photo</Heading>

        <NextButton to={"/choose-layout"} />
      </HStack>

      <CContainer gap={8}>
        <Camera />

        <SimpleGrid columns={[1, 2, 4]} gap={8} maxW={"70%"} mx={"auto"}>
          {Array.from({ length: 4 }).map((_, i) => {
            return (
              <CContainer
                key={i}
                borderRadius={16}
                border={"4px solid {colors.p.500}"}
                overflow={"clip"}
              >
                <Image src={photos?.[i] || `${IMAGES_PATH}/no_img.png`} />
              </CContainer>
            );
          })}
        </SimpleGrid>
      </CContainer>
    </PageContainer>
  );
};

export default TakePhotoPage;
