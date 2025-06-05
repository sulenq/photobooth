import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import { toaster } from "@/components/ui/toaster";
import Heading from "@/components/widget/Heading";
import NextButton from "@/components/widget/NextButton";
import PageContainer from "@/components/widget/PageContainer";
import SessionTimer from "@/components/widget/SessionTimer";
import { FILTERS } from "@/constants/filters";
import { IMAGES_PATH } from "@/constants/paths";
import useLang from "@/context/useLang";
import useSessionFilter from "@/context/useSessionFilter";
import useSessionPhotos from "@/context/useSessionPhotos";
import useSessionResPhotos from "@/context/useSessionResPhotos";
import useSessionShutterTimer from "@/context/useSessionShutterTimer";
import useSessionTemplate from "@/context/useSessionTemplate";
import useSessionTimeout from "@/context/useSessionTimeout";
import useSessionTimer from "@/context/useSessionTimer";
import useCountdown from "@/hooks/useCountdown";
import useRequest from "@/hooks/useRequest";
import { startCamera, stopCamera } from "@/utils/camera";
import {
  Box,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconCamera } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShutterTimer = (props: any) => {
  // Props
  const { remaining } = props;

  return (
    <Text
      fontSize={100}
      className="df"
      fontWeight={"bold"}
      pos={"absolute"}
      left={"50%"}
      top={"50%"}
      transform={"translate(-50%, -50%)"}
      color={"white"}
    >
      {remaining}
    </Text>
  );
};

const Camera = (props: any) => {
  // Props
  const { startCountdown, running, remaining } = props;

  // Hooks
  const navigate = useNavigate();
  const startTimer = useSessionTimer((s) => s.startTimer);
  const { req, response, error } = useRequest({
    id: "get-session-timer",
    showLoadingToast: false,
    showErrorToast: false,
    showSuccessToast: false,
  });

  // Contexts
  const { l } = useLang();
  const { photos, addPhoto, clearPhotos } = useSessionPhotos();
  const { defaultTemplate, setTemplate } = useSessionTemplate();
  const clearResPhotos = useSessionResPhotos((s) => s.clearResPhotos);
  const { sessionShutterTimer, setSessionShutterTimer } =
    useSessionShutterTimer();
  const { sessionTimeout, setSessionTimeout } = useSessionTimeout();
  const { setFilter } = useSessionFilter();

  // States
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);
  const sessionTimerInitialSeconds = response?.data?.result?.value * 60;

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Utils
  function getSessionTimer() {
    const url = `/rules/photo-duration`;
    req({ config: { url } });
  }
  function handleStartTimer(initialSeconds: number) {
    startTimer({
      initialSeconds: initialSeconds,
      onFinished: () => {
        setSessionTimeout(true);
        navigate("/print-send");
      },
    });
  }
  const takePhoto = async (): Promise<string | null> => {
    const video = videoRef.current;
    if (!video) return null;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Flip canvas horizontally (mirror effect)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    // Draw the mirrored image
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg");
  };

  // Handle get sesion timer on page load
  useEffect(() => {
    getSessionTimer();
  }, []);

  // Handle open camera on page load
  useEffect(() => {
    if (sessionTimerInitialSeconds) {
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
    }
  }, [sessionTimerInitialSeconds]);

  // Handle start session
  useEffect(() => {
    setSessionTimeout(false);
    clearPhotos();
    setTemplate(defaultTemplate);
    setFilter(FILTERS[0]);
    clearResPhotos();

    const seconds = sessionTimerInitialSeconds; // session timer

    if (cameraOpen && seconds) {
      clearResPhotos();
      handleStartTimer(seconds);
    }
  }, [cameraOpen]);

  // Handle stop camera when unmount
  useEffect(() => {
    return () => {
      stopCamera(videoRef, streamRef);
    };
  }, []);

  return (
    <CContainer w={"60%"} mx={"auto"} pos={"relative"}>
      {error && <FeedbackRetry onRetry={getSessionTimer} />}

      {!error && (
        <>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: 3 / 2,
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
                aspectRatio: 3 / 2,
                width: "100%",
                height: "fit",
                transform: "scaleX(-1)", // Mirror
                objectFit: "cover",
              }}
            />
          </div>

          {/* Portrait Guideline */}
          <Box
            aspectRatio={2 / 3}
            h={"full"}
            w={"auto"}
            borderLeft={"1px solid white"}
            borderRight={"1px solid white"}
            pos={"absolute"}
            left={"50%"}
            top={"50%"}
            transform={"translate(-50%, -50%)"}
          />

          {cameraOpen && (
            <>
              {/* Shutter Indicator */}
              {running && <ShutterTimer remaining={remaining} />}

              {/* Shutter Button */}
              <VStack
                pos={"absolute"}
                left={"50%"}
                bottom={0}
                pb={"8px"}
                w={"full"}
                justify={"center"}
                transform={"translateX(-50%)"}
              >
                <BButton
                  iconButton
                  w={"fit"}
                  loading={running}
                  disabled={photos?.length === 4}
                  borderRadius={"full"}
                  size={"2xl"}
                  bg={"white"}
                  color={"pd"}
                  onClick={() => {
                    if (!sessionTimeout) {
                      startCountdown();

                      setTimeout(() => {
                        takePhoto().then((data) => {
                          if (data) {
                            addPhoto(data);
                          }
                        });
                      }, sessionShutterTimer * 1000);
                    }
                  }}
                >
                  <Icon color={"pd"} boxSize={8}>
                    <IconCamera />
                  </Icon>
                </BButton>
              </VStack>
            </>
          )}

          {/* Shutter Timer List */}
          <CContainer
            align={"center"}
            gap={2}
            pos={"absolute"}
            left={"8px"}
            bottom={"8px"}
            w={"fit"}
          >
            <Text color={"white"}>Timer</Text>

            <VStack justify={"center"}>
              {Array.from({ length: 3 }).map((_, i) => {
                return (
                  <BButton
                    key={i}
                    variant={"outline"}
                    color={i + 3 === sessionShutterTimer ? "pd" : "white"}
                    bg={i + 3 === sessionShutterTimer ? "white" : "transparent"}
                    onClick={() => setSessionShutterTimer(i + 3)}
                  >
                    {i + 3}
                  </BButton>
                );
              })}
            </VStack>
          </CContainer>
        </>
      )}
    </CContainer>
  );
};

const TakePhotoPage = () => {
  // Contexts
  const { photos, popPhoto } = useSessionPhotos();
  const { sessionShutterTimer } = useSessionShutterTimer();
  const { running, startCountdown, remaining } = useCountdown({
    initialValue: sessionShutterTimer,
  });

  // States
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Handle active index
  useEffect(() => {
    if (photos?.length > activeIndex) setActiveIndex(photos.length - 1);
  }, [photos?.length]);

  return (
    <PageContainer borderless gap={10}>
      <HStack justify={"space-between"}>
        <SessionTimer w={"250px"} />

        <Heading>Take Photo</Heading>

        <NextButton to={"/choose-layout"} disabled={photos?.length < 4} />
      </HStack>

      <CContainer gap={8} my={"auto"}>
        <Camera
          startCountdown={startCountdown}
          running={running}
          remaining={remaining}
        />

        <SimpleGrid columns={[1, 2, 4]} gap={8} maxW={"60%"} mx={"auto"}>
          {Array.from({ length: 4 }).map((_, i) => {
            return (
              <CContainer
                key={i}
                border={"4px solid {colors.p.500}"}
                pos={"relative"}
                aspectRatio={3 / 2}
                borderRadius={16}
              >
                <Image
                  aspectRatio={3 / 2}
                  src={photos?.[i] || `${IMAGES_PATH}/no_img.png`}
                  borderRadius={12}
                />

                {activeIndex === i && photos?.[i] && (
                  <HStack
                    justify={"center"}
                    pos={"absolute"}
                    left={0}
                    w={"full"}
                    bottom={"-20px"}
                  >
                    <BButton
                      colorPalette={"p"}
                      bg={"p.700"}
                      size={"sm"}
                      w={"fit"}
                      onClick={() => {
                        popPhoto();
                      }}
                      color={"white"}
                      disabled={running}
                    >
                      Retake
                    </BButton>
                  </HStack>
                )}
              </CContainer>
            );
          })}
        </SimpleGrid>
      </CContainer>
    </PageContainer>
  );
};

export default TakePhotoPage;
