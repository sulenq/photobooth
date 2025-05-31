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
