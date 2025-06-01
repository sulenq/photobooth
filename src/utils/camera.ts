import { MutableRefObject, RefObject } from "react";

export const startCamera = async (
  videoRef: React.RefObject<HTMLVideoElement>,
  streamRef: React.MutableRefObject<MediaStream | null>,
  onSuccess?: () => void,
  onError?: () => void
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        facingMode: "user",
      },
      audio: false,
    });

    streamRef.current = stream;
    const video = videoRef.current;
    if (video) {
      video.srcObject = stream;
    }

    onSuccess?.();
  } catch (err) {
    console.error("Camera error:", err);
    onError?.();
  }
};

export function stopCamera(
  videoRef: React.RefObject<HTMLVideoElement>,
  streamRef: React.MutableRefObject<MediaStream | null>,
  onClose?: () => void
) {
  if (streamRef.current) {
    streamRef.current.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }
  if (videoRef.current) {
    videoRef.current.srcObject = null;
  }
  onClose?.();
}

export const getCaptureCardDeviceId = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter((d) => d.kind === "videoinput");

  const captureCard = videoDevices.find((d) =>
    // d.label.toLowerCase().includes("usb video capture")
    d?.label.includes("USB Video")
  );

  return captureCard?.deviceId;
};

export const startCaptureCardCamera = async (
  videoRef: RefObject<HTMLVideoElement>,
  streamRef: MutableRefObject<MediaStream | null>,
  onSuccess?: () => void,
  onError?: (err: unknown) => void
): Promise<void> => {
  // const devices = await navigator.mediaDevices.enumerateDevices();
  // console.log("Capture Devices:", devices);

  try {
    const deviceId = await getCaptureCardDeviceId();
    if (!deviceId) throw new Error("Capture card not found");

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: deviceId } },
      audio: false,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    streamRef.current = stream;

    onSuccess?.();
  } catch (err) {
    console.error("[startCaptureCardCamera]", err);
    onError?.(err);
  }
};
