import CContainer from "@/components/ui-custom/CContainer";
import Heading from "@/components/widget/Heading";
import NextButton from "@/components/widget/NextButton";
import PageContainer from "@/components/widget/PageContainer";
import SessionTimer from "@/components/widget/SessionTimer";
import { IMAGES_PATH } from "@/constants/paths";
import useSessionPhotos from "@/context/useSessionPhotos";
import useSessionTimer from "@/context/useSessionTimer";
import { HStack, Image, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Camera = () => {
  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
  // Hooks
  const navigate = useNavigate();
  const startTimer = useSessionTimer((s) => s.startTimer);

  // Contexts
  const photos = useSessionPhotos((s) => {
    s.photos;
  });

  // Utils
  function handleStart() {
    startTimer({
      initialSeconds: 7 * 60,
      onFinished: () => navigate("/print-send"),
    });
  }

  // Handle start session
  useEffect(() => {
    // TODO: Fetch timer rule data

    handleStart();
  }, []);

  return (
    <PageContainer gap={10}>
      <HStack justify={"space-between"}>
        <SessionTimer w={"250px"} />

        <Heading>Take Photo</Heading>

        <NextButton />
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
