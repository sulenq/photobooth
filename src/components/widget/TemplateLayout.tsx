import {
  TEMPLATE_ASPECT_RATIO,
  TEMPLATE_H,
} from "@/constants/defaultAttributes";
import useSessionFilter from "@/context/useSessionFilter";
import { Center, HStack, StackProps, Text, VStack } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { useEffect, useRef } from "react";
import CContainer from "../ui-custom/CContainer";

interface Interface__Layout extends StackProps {
  resPhotos?: any;
  setResPhotos?: any;
  setSlotNumberingMap: (map: Record<string, number>) => void;
}
interface DropPhotoSlotProps {
  id: string;
  numbering: number;
  hNumber: number;
  orientation?: "portrait" | "landscape";
  rotate?: boolean;
  value?: string | null;
}

const aspectRatio1 = 2 / 3;
const aspectRatio2 = 3 / 2;
const dropPhotoSlotZindex = 1;

const LayoutContainer = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  return <CContainer aspectRatio={2 / 3} {...restProps}></CContainer>;
};

const DropPhotoSlot = (props: DropPhotoSlotProps) => {
  // Props
  const {
    id,
    numbering,
    value,
    hNumber,
    orientation = "portrait",
    rotate = false,
  } = props;

  // Hooks
  const { setNodeRef, isOver } = useDroppable({ id });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { filter } = useSessionFilter();

  // Hanndle filter
  useEffect(() => {
    if (!value || !window.Caman || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = value;

    img.onload = () => {
      img.decode().then(() => {
        // Step 1: calculate final aspect ratio
        let aspectRatio =
          orientation === "landscape" ? aspectRatio2 : aspectRatio1;
        if (rotate) aspectRatio = 1 / aspectRatio;

        // Step 2: set canvas size
        let width = hNumber * aspectRatio;
        let height = hNumber;
        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height);

        if (rotate) {
          ctx.save();
          ctx.translate(width / 2, height / 2);
          ctx.rotate((90 * Math.PI) / 180);

          const rotatedWidth = height;
          const rotatedHeight = width;

          const scale = Math.max(
            rotatedWidth / img.width,
            rotatedHeight / img.height
          );

          const drawWidth = img.width * scale;
          const drawHeight = img.height * scale;

          ctx.drawImage(
            img,
            -drawWidth / 2,
            -drawHeight / 2,
            drawWidth,
            drawHeight
          );

          ctx.restore();
        } else {
          const scale = Math.max(width / img.width, height / img.height);

          const drawWidth = img.width * scale;
          const drawHeight = img.height * scale;

          const offsetX = (width - drawWidth) / 2;
          const offsetY = (height - drawHeight) / 2;

          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }

        // Apply Caman filter after short delay
        setTimeout(() => {
          window.Caman(canvas, function (this: any) {
            this.revert(true);
            filter.filter.call(this);
            this.render();
          });
        }, 10);
      });
    };
  }, [value, filter, orientation, rotate, hNumber]);

  // Calculate container aspect ratio
  const calculatedAspectRatio = (() => {
    let ar = orientation === "landscape" ? 3 / 2 : 2 / 3;
    if (rotate) ar = 1 / ar;
    return ar;
  })();

  return (
    <Center
      ref={setNodeRef}
      h={`${hNumber}px`}
      w={`${hNumber * calculatedAspectRatio}px`}
      flexShrink={0}
      border={"4px dashed"}
      borderColor={"#aaa"}
      // borderColor={"red"}
      overflow={"hidden"}
      bg={isOver ? "gray" : "transparent"}
      zIndex={dropPhotoSlotZindex}
    >
      {value ? (
        <canvas
          id={`res-img-${id}`}
          key={value}
          ref={canvasRef}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      ) : (
        <VStack>
          <Center
            transform={rotate ? "rotate(90deg)" : ""}
            p={2}
            bg={"white"}
            borderRadius={"full"}
            aspectRatio={1}
            w={"50px"}
            h={"50px"}
            flexShrink={0}
          >
            <Text className="df" fontSize={32} fontWeight={"bold"} mt={"-8px"}>
              {numbering}
            </Text>
          </Center>

          <Text fontSize={20} fontWeight={"semibold"}>
            Drop Here
          </Text>
        </VStack>
      )}
    </Center>
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
          numbering={1}
          value={resPhotos["1"]}
          hNumber={250}
        />
        <DropPhotoSlot
          id="2"
          numbering={2}
          value={resPhotos["2"]}
          hNumber={250}
        />
      </HStack>
      <HStack justify="center" gap={8}>
        <DropPhotoSlot
          id="3"
          numbering={3}
          value={resPhotos["3"]}
          hNumber={250}
        />
        <DropPhotoSlot
          id="4"
          numbering={4}
          value={resPhotos["4"]}
          hNumber={250}
        />
      </HStack>
    </LayoutContainer>
  );
};
export const Layout2 = (props: Interface__Layout) => {
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
          numbering={1}
          value={resPhotos["1"]}
          hNumber={250}
          orientation="landscape"
          rotate
        />
        <DropPhotoSlot
          id="2"
          numbering={2}
          value={resPhotos["2"]}
          hNumber={250}
          orientation="landscape"
          rotate
        />
      </HStack>
      <HStack justify="center" gap={8}>
        <DropPhotoSlot
          id="3"
          numbering={3}
          value={resPhotos["3"]}
          hNumber={250}
          orientation="landscape"
          rotate
        />
        <DropPhotoSlot
          id="4"
          numbering={4}
          value={resPhotos["4"]}
          hNumber={250}
          orientation="landscape"
          rotate
        />
      </HStack>
    </LayoutContainer>
  );
};
export const Layout3 = (props: Interface__Layout) => {
  // Props
  const { resPhotos } = props;

  return (
    <LayoutContainer
      aspectRatio={TEMPLATE_ASPECT_RATIO}
      h={TEMPLATE_H}
      w="fit"
      justify="center"
      gap="15px"
      pb={"34px"}
    >
      <HStack justify="center" gap={"12px"}>
        <DropPhotoSlot
          id="1"
          numbering={1}
          value={resPhotos["1"]}
          hNumber={126}
          orientation="landscape"
        />
        <DropPhotoSlot
          id="2"
          numbering={2}
          value={resPhotos["2"]}
          hNumber={126}
          orientation="landscape"
        />
      </HStack>

      <HStack justify="center" gap={"12px"}>
        <DropPhotoSlot
          id="3"
          numbering={2}
          value={resPhotos["2"]}
          hNumber={126}
          orientation="landscape"
        />
        <DropPhotoSlot
          id="4"
          numbering={3}
          value={resPhotos["3"]}
          hNumber={126}
          orientation="landscape"
        />
      </HStack>

      <HStack justify="center" gap={"12px"}>
        <DropPhotoSlot
          id="5"
          numbering={3}
          value={resPhotos["3"]}
          hNumber={126}
          orientation="landscape"
        />
        <DropPhotoSlot
          id="6"
          numbering={4}
          value={resPhotos["4"]}
          hNumber={120}
          orientation="landscape"
        />
      </HStack>
    </LayoutContainer>
  );
};
