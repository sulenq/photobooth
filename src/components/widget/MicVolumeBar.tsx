import { useThemeConfig } from "@/context/useThemeConfig";
import { ProgressRange, ProgressRoot, ProgressTrack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const MicVolumeBar = ({ analyser }: { analyser: AnalyserNode | null }) => {
  // Contexts
  const { themeConfig } = useThemeConfig();

  // States, Refs
  const [volume, setVolume] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.fftSize);

    const updateVolume = () => {
      analyser.getByteTimeDomainData(dataArray);

      const maxAmplitude = Math.max(...dataArray);
      const normalizedVolume = (maxAmplitude / 255) * 100;
      setVolume(normalizedVolume - 50);

      animationFrameRef.current = requestAnimationFrame(updateVolume);
    };

    updateVolume();

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [analyser]);

  useEffect(() => {
    if (analyser === null) setVolume(0);
  }, [analyser]);

  return (
    <ProgressRoot
      value={volume * 5}
      max={100}
      colorPalette={themeConfig.colorPalette}
    >
      <ProgressTrack>
        <ProgressRange />
      </ProgressTrack>
    </ProgressRoot>
  );
};

export default MicVolumeBar;
