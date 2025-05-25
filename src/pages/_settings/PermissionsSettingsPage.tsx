import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "@/components/ui-custom/Disclosure";
import DisclosureHeaderContent from "@/components/ui-custom/DisclosureHeaderContent";
import HelperText from "@/components/ui-custom/HelperText";
import ItemContainer from "@/components/ui-custom/ItemContainer";
import ItemHeaderContainer from "@/components/ui-custom/ItemHeaderContainer";
import { Switch } from "@/components/ui/switch";
import { toaster } from "@/components/ui/toaster";
import MicVolumeBar from "@/components/widget/MicVolumeBar";
import SettingsItemContainer from "@/components/widget/SettingsItemContainer";
import SettingsNavsContainer from "@/components/widget/SettingsNavsContainer";
import useCameraPermission from "@/context/useCameraPermissions";
import useLang from "@/context/useLang";
import useLocationPermissions from "@/context/useLocationPermissions";
import useMicPermissions from "@/context/useMicPermissions";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import { startCamera, stopCamera } from "@/utils/camera";
import getAddress from "@/utils/getAddress";
import getLocation from "@/utils/getLocation";
import { HStack, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { IconCamera, IconMapPin, IconMicrophone } from "@tabler/icons-react";
import { useRef, useState } from "react";

const Camera = () => {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const { l } = useLang();
  const { cameraPermissionsStatus } = useCameraPermission();

  // Request permissions func
  async function requestCameraMic() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Access denied:", error);
    }
  }

  // Status helper text
  const getBrowserSettingsLink = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome")) {
      return l.chrome_permissions_settings_link;
    } else if (userAgent.includes("Firefox")) {
      return l.firefox_permissions_settings_link;
    } else if (userAgent.includes("Edg")) {
      return l.edge_permissions_settings_link;
    }
    return l.default_permissions_settings_link;
  };

  // Components
  const Test = () => {
    // Utils
    const { open, onOpen, onClose } = useDisclosure();
    function handleClose() {
      stopCamera(videoRef, streamRef, () => setCameraOpen(false));
      onClose();
    }
    useBackOnClose("camera-test", open, onOpen, handleClose);

    // States, Refs
    const [cameraOpen, setCameraOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    return (
      <>
        <BButton
          size={"xs"}
          variant={"outline"}
          onClick={onOpen}
          disabled={cameraPermissionsStatus !== "granted"}
        >
          {l.try_label} {l.camera.toLowerCase()}
        </BButton>

        <DisclosureRoot open={open} lazyLoad size={"xs"}>
          <DisclosureContent>
            <DisclosureHeader>
              <DisclosureHeaderContent title={`${l.try_label} ${l.camera}`} />
            </DisclosureHeader>

            <DisclosureBody p={"0 !important"}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "100%",
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
                    width: "100%",
                    height: "100%",
                    transform: "scaleX(-1)", // Mirror
                    objectFit: "cover",
                  }}
                />
              </div>
            </DisclosureBody>

            <DisclosureFooter>
              <BButton
                variant="outline"
                onClick={() =>
                  stopCamera(videoRef, streamRef, () => setCameraOpen(false))
                }
                disabled={!cameraOpen}
              >
                {l.close} {l.camera.toLowerCase()}
              </BButton>
              <BButton
                colorPalette={themeConfig.colorPalette}
                disabled={cameraOpen}
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  if (!loading) {
                    startCamera(
                      videoRef,
                      streamRef,
                      () => {
                        setLoading(false);
                        setCameraOpen(true);
                      },
                      () => {
                        setLoading(false);
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
                }}
              >
                {l.open} {l.camera.toLowerCase()}
              </BButton>
            </DisclosureFooter>
          </DisclosureContent>
        </DisclosureRoot>
      </>
    );
  };

  return (
    <ItemContainer>
      <ItemHeaderContainer>
        <HStack>
          <Icon maxW={"20px"}>
            <IconCamera />
          </Icon>
          <Text fontWeight={"bold"} fontSize={"md"}>
            {l.camera}
          </Text>
        </HStack>

        <Test />
      </ItemHeaderContainer>

      <CContainer gap={4} py={3}>
        <SettingsItemContainer>
          <CContainer>
            <Text>{l.camera_permissions_settings.label}</Text>
            <Text color={"fg.subtle"}>
              {l.camera_permissions_settings.description}
            </Text>
          </CContainer>

          <Switch
            checked={cameraPermissionsStatus === "granted"}
            disabled={
              cameraPermissionsStatus === "granted" ||
              cameraPermissionsStatus === "denied"
            }
            onChange={requestCameraMic}
            colorPalette={themeConfig.colorPalette}
          />
        </SettingsItemContainer>

        {(cameraPermissionsStatus === "granted" ||
          cameraPermissionsStatus === "denied") && (
          <CContainer px={4}>
            <Text color={"fg.subtle"}>
              {cameraPermissionsStatus === "granted"
                ? l.permissions_granted_helper
                : l.permissions_denied_helper}
            </Text>
            <Text color={"fg.subtle"}>
              {getBrowserSettingsLink()}
              {l.camera}
            </Text>
          </CContainer>
        )}
      </CContainer>
    </ItemContainer>
  );
};

const Microphone = () => {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const { l } = useLang();
  const { micPermissionsStatus } = useMicPermissions();

  // Request permissions func
  async function requestMicPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Akses mikrofon ditolak:", error);
    }
  }

  // Status helper text
  const getBrowserSettingsLink = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome")) {
      return l.chrome_permissions_settings_link;
    } else if (userAgent.includes("Firefox")) {
      return l.firefox_permissions_settings_link;
    } else if (userAgent.includes("Edg")) {
      return l.edge_permissions_settings_link;
    }
    return l.default_permissions_settings_link;
  };

  // Components
  const Test = () => {
    // States, Refs
    const [micOpen, setMicOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Utils
    const { open, onOpen, onClose } = useDisclosure();
    function handleClose() {
      stopMicTest();
      onClose();
    }
    useBackOnClose("mic-test", open, onOpen, handleClose);

    // Handle test mic
    const startMicTest = async () => {
      try {
        setLoading(true);
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream;
        setMicOpen(true);

        // Setup audio context
        audioContextRef.current = new AudioContext();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        const analyserNode = audioContextRef.current.createAnalyser();
        analyserNode.fftSize = 512;
        source.connect(analyserNode);
        setAnalyser(analyserNode); // Update state analyser

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Gagal mengakses mikrofon:", error);
      }
    };

    const stopMicTest = () => {
      if (streamRef.current)
        streamRef.current.getTracks().forEach((t) => t.stop());
      if (audioContextRef.current) audioContextRef.current.close();
      setMicOpen(false);
      setAnalyser(null);
    };

    return (
      <>
        <BButton
          size="xs"
          variant="outline"
          onClick={onOpen}
          disabled={micPermissionsStatus !== "granted"}
        >
          {l.try_label} {l.mic.toLowerCase()}
        </BButton>

        <DisclosureRoot open={open} lazyLoad size="xs">
          <DisclosureContent>
            <DisclosureHeader>
              <DisclosureHeaderContent title={`${l.try_label} ${l.mic}`} />
            </DisclosureHeader>

            <DisclosureBody>
              <CContainer py={4}>
                <Text mb={2}>Volume</Text>

                {/* Ini progress bar real-time */}
                <MicVolumeBar analyser={analyser} />
              </CContainer>
            </DisclosureBody>

            <DisclosureFooter>
              <BButton
                variant="outline"
                onClick={stopMicTest}
                disabled={!micOpen}
              >
                {l.close} {l.mic.toLowerCase()}
              </BButton>
              <BButton
                colorPalette={themeConfig.colorPalette}
                disabled={micOpen}
                loading={loading}
                onClick={startMicTest}
              >
                {l.open} {l.mic.toLowerCase()}
              </BButton>
            </DisclosureFooter>
          </DisclosureContent>
        </DisclosureRoot>
      </>
    );
  };

  return (
    <ItemContainer>
      <ItemHeaderContainer>
        <HStack>
          <Icon maxW={"20px"}>
            <IconMicrophone />
          </Icon>
          <Text fontWeight={"bold"} fontSize={"md"}>
            {l.mic}
          </Text>
        </HStack>

        <Test />
      </ItemHeaderContainer>

      <CContainer gap={4} py={3}>
        <SettingsItemContainer>
          <CContainer>
            <Text>{l.mic_permissions_settings.label}</Text>
            <Text color={"fg.subtle"}>
              {l.mic_permissions_settings.description}
            </Text>
          </CContainer>

          <Switch
            checked={micPermissionsStatus === "granted"}
            disabled={
              micPermissionsStatus === "granted" ||
              micPermissionsStatus === "denied"
            }
            onChange={requestMicPermission}
            colorPalette={themeConfig.colorPalette}
          />
        </SettingsItemContainer>

        {(micPermissionsStatus === "granted" ||
          micPermissionsStatus === "denied") && (
          <CContainer px={4}>
            <Text color={"fg.subtle"}>
              {micPermissionsStatus === "granted"
                ? l.permissions_granted_helper
                : l.permissions_denied_helper}
            </Text>
            <Text color={"fg.subtle"}>
              {getBrowserSettingsLink()}
              {l.mic}
            </Text>
          </CContainer>
        )}
      </CContainer>
    </ItemContainer>
  );
};

const Location = () => {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const { l } = useLang();
  const { locationPermissionsStatus } = useLocationPermissions();

  // Request permissions func
  const requestLocationPermission = () => {
    getLocation()
      .then(() => {})
      .catch((error) => {
        console.error(error);
        switch (error.code) {
          case error.POSITION_UNAVAILABLE:
            toaster.error({
              title: l.location_not_supported_toast.title,
              description: l.location_not_supported_toast.description,
              action: {
                label: "Close",
                onClick: () => {},
              },
            });
            break;
          default:
            toaster.error({
              title: l.location_fail_toast.title,
              description: l.location_fail_toast.description,
              action: {
                label: "Close",
                onClick: () => {},
              },
            });
            break;
        }
        toaster.error({
          title: l.location_not_supported_toast.title,
          description: l.location_not_supported_toast.description,
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        return;
      });
  };

  // Status helper text
  const getBrowserSettingsLink = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome")) {
      return l.chrome_permissions_settings_link;
    } else if (userAgent.includes("Firefox")) {
      return l.firefox_permissions_settings_link;
    } else if (userAgent.includes("Edg")) {
      return l.edge_permissions_settings_link;
    }
    return l.default_permissions_settings_link;
  };

  // Components
  const Test = () => {
    // States, Refs
    const [loading, setLoading] = useState(false);
    const [center, setCenter] = useState<{ lat: number; long: number } | null>(
      null
    );
    const [address, setAddress] = useState<string | null>(null);

    // Utils
    const { open, onOpen, onClose } = useDisclosure();
    useBackOnClose("location-test", open, onOpen, onClose);

    // Handle test
    function startLocationTest() {
      setLoading(true);
      getLocation().then(({ coords }) => {
        setCenter({ lat: coords.latitude, long: coords.longitude });
        getAddress(coords.latitude, coords.longitude)
          .then((data) => {
            setAddress(data.display_name || l.address_not_found);
          })
          .catch((error) => {
            console.error("Gagal mendapatkan alamat:", error);
            toaster.error({
              title: l.location_address_fail_toast.title,
              description: l.location_address_fail_toast.description,
              action: {
                label: "Close",
                onClick: () => {},
              },
            });
          })
          .finally(() => {
            setLoading(false);
          });
      });
    }

    return (
      <>
        <BButton
          size="xs"
          variant="outline"
          onClick={onOpen}
          disabled={locationPermissionsStatus !== "granted"}
        >
          {l.try_label} {l.location.toLowerCase()}
        </BButton>

        <DisclosureRoot open={open} lazyLoad size="xs">
          <DisclosureContent>
            <DisclosureHeader>
              <DisclosureHeaderContent title={`${l.try_label} ${l.location}`} />
            </DisclosureHeader>

            <DisclosureBody>
              {!address && <Text>{l.location_test_helper}</Text>}
              {address && center && (
                <CContainer gap={2}>
                  <HStack align={"start"}>
                    <Text w={"100px"} color={"fg.muted"} flexShrink={0}>
                      Latitude
                    </Text>
                    <Text>{center.lat}</Text>
                  </HStack>

                  <HStack align={"start"}>
                    <Text w={"100px"} color={"fg.muted"} flexShrink={0}>
                      Longitude
                    </Text>
                    <Text>{center.long}</Text>
                  </HStack>

                  <HStack align={"start"}>
                    <Text w={"100px"} color={"fg.muted"} flexShrink={0}>
                      {l.address}
                    </Text>
                    <Text>{address}</Text>
                  </HStack>
                </CContainer>
              )}
            </DisclosureBody>

            <DisclosureFooter>
              <BButton
                colorPalette={themeConfig.colorPalette}
                loading={loading}
                onClick={startLocationTest}
              >
                {l.get} {l.location.toLowerCase()}
              </BButton>
            </DisclosureFooter>
          </DisclosureContent>
        </DisclosureRoot>
      </>
    );
  };

  return (
    <ItemContainer>
      <ItemHeaderContainer>
        <HStack>
          <Icon maxW={"20px"}>
            <IconMapPin />
          </Icon>
          <Text fontWeight={"bold"} fontSize={"md"}>
            {l.location}
          </Text>
        </HStack>

        <Test />
      </ItemHeaderContainer>

      <CContainer gap={4} py={3}>
        <SettingsItemContainer>
          <CContainer>
            <Text>{l.location_permissions_settings.label}</Text>
            <Text color={"fg.subtle"}>
              {l.location_permissions_settings.description}
            </Text>
          </CContainer>

          <Switch
            checked={locationPermissionsStatus === "granted"}
            disabled={
              locationPermissionsStatus === "granted" ||
              locationPermissionsStatus === "denied"
            }
            onChange={requestLocationPermission}
            colorPalette={themeConfig.colorPalette}
          />
        </SettingsItemContainer>

        {(locationPermissionsStatus === "granted" ||
          locationPermissionsStatus === "denied") && (
          <CContainer px={4}>
            <Text color={"fg.subtle"}>
              {locationPermissionsStatus === "granted"
                ? l.permissions_granted_helper
                : l.permissions_denied_helper}
            </Text>
            <Text color={"fg.subtle"}>
              {getBrowserSettingsLink()} {l.location}
            </Text>
          </CContainer>
        )}
      </CContainer>
    </ItemContainer>
  );
};

const PermissionsSettingsPage = () => {
  // Contexts
  const { l } = useLang();

  return (
    <SettingsNavsContainer align={"stretch"} activePath="/settings/permissions">
      <CContainer gap={4}>
        <Camera />

        <Microphone />

        <Location />
      </CContainer>

      <HelperText px={2} mt={4}>
        {l.permissions_settings_helper_text}
      </HelperText>
    </SettingsNavsContainer>
  );
};

export default PermissionsSettingsPage;
