import {
  TEMPLATE_ASPECT_RATIO,
  TEMPLATE_H,
} from "@/constants/defaultAttributes";
import useSessionFilter from "@/context/useSessionFilter";
import { HStack, StackProps, Text, VStack } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { useEffect, useRef } from "react";
import CContainer from "../ui-custom/CContainer";

interface Interface__Layout extends StackProps {
  resPhotos?: any;
  setResPhotos?: any;
}
interface DropPhotoSlotProps {
  id: string;
  hNumber: number;
  value?: string | null;
  aspectRatio: number;
}

const aspectRatio1 = 2 / 3;
// const aspectRatio2 = 3 / 2;

const LayoutContainer = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  return <CContainer aspectRatio={2 / 3} {...restProps}></CContainer>;
};

const DropPhotoSlot = ({
  id,
  value,
  hNumber,
  aspectRatio,
}: DropPhotoSlotProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Assume useSessionFilter returns current filter object with filter func
  const { filter } = useSessionFilter();

  useEffect(() => {
    if (!value || !window.Caman || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; // prevent CORS issues
    img.src = value;

    img.onload = () => {
      img.decode().then(() => {
        canvas.width = hNumber * aspectRatio;
        canvas.height = hNumber;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // hitung draw size
        const imgAspect = img.width / img.height;
        const canvasAspect = canvas.width / canvas.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;

        if (imgAspect > canvasAspect) {
          drawHeight = canvas.height;
          drawWidth = img.width * (canvas.height / img.height);
        } else {
          drawWidth = canvas.width;
          drawHeight = img.height * (canvas.width / img.width);
        }

        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        // kasih jeda biar canvas bisa commit pixel-nya
        setTimeout(() => {
          window.Caman(canvas, function (this: any) {
            this.revert(true);
            filter.filter.call(this);
            this.render();
          });
        }, 50); // 10 kadang terlalu cepat
      });
    };
  }, [value, filter]);

  return (
    <div
      ref={setNodeRef}
      style={{
        height: `${hNumber}px`,
        aspectRatio,
        border: "2px dashed #aaa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: isOver ? "gray" : "transparent",
      }}
    >
      {value ? (
        <canvas
          id={`res-img-${id}`}
          key={value}
          ref={canvasRef}
          style={{ maxHeight: `${hNumber}px`, width: `166.67px`, aspectRatio }}
        />
      ) : (
        <VStack>
          <Text fontSize={20}>Drop Here</Text>
        </VStack>
      )}
    </div>
  );
};

export const Layout1 = (props: Interface__Layout) => {
  // Props
  const { resPhotos } = props;

  return (
    <LayoutContainer
      aspectRatio={TEMPLATE_ASPECT_RATIO}
      h={TEMPLATE_H}
      w="fit"
      justify="center"
      gap="10px"
      pt="10px"
    >
      <HStack justify="center" gap={8}>
        <DropPhotoSlot
          id="1"
          value={resPhotos["1"]}
          aspectRatio={aspectRatio1}
          hNumber={250}
        />
        <DropPhotoSlot
          id="2"
          value={resPhotos["2"]}
          aspectRatio={aspectRatio1}
          hNumber={250}
        />
      </HStack>
      <HStack justify="center" gap={8}>
        <DropPhotoSlot
          id="3"
          value={resPhotos["3"]}
          aspectRatio={aspectRatio1}
          hNumber={250}
        />
        <DropPhotoSlot
          id="4"
          value={resPhotos["4"]}
          aspectRatio={aspectRatio1}
          hNumber={250}
        />
      </HStack>
    </LayoutContainer>
  );
};
