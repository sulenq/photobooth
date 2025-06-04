import {
  TEMPLATE_ASPECT_RATIO,
  TEMPLATE_H,
} from "@/constants/defaultAttributes";
import useSessionFilter from "@/context/useSessionFilter";
import {
  Center,
  HStack,
  SimpleGrid,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
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
  h?: string;
  w?: string;
  orientation?: "portrait" | "landscape";
  rotate?: boolean;
  value?: string | null;
  size?: "xs" | "sm" | "md";
}

const aspectRatio1 = 2 / 3;
const aspectRatio2 = 3 / 2;
const dropPhotoSlotZindex = 1;
const dropPhotoSlotBorder = "";

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
    h,
    w,
    orientation = "portrait",
    size = "md",
    rotate = false,
  } = props;

  // Hooks
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      numbering,
    },
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { filter } = useSessionFilter();

  // States
  const numberingGap = {
    xs: 0,
    sm: 1,
    md: 2,
  };
  const numberingFontSize = {
    xs: 16,
    sm: 20,
    md: 32,
  };
  const numberingBoxSize = {
    xs: "16px",
    sm: "28px",
    md: "50px",
  };
  const dropLabelFontSize = {
    xs: 10,
    sm: 14,
    md: 20,
  };

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
      h={h || `${hNumber}px`}
      w={w || `${hNumber * calculatedAspectRatio}px`}
      flexShrink={0}
      border={dropPhotoSlotBorder}
      overflow={"hidden"}
      bg={isOver ? "#ddd" : "transparent"}
      zIndex={dropPhotoSlotZindex}
      transform={"scale(1.01)"}
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
        <VStack gap={numberingGap[size]}>
          <Center
            transform={rotate ? "rotate(90deg)" : ""}
            p={2}
            bg={"white"}
            borderRadius={"full"}
            aspectRatio={1}
            w={numberingBoxSize[size]}
            h={numberingBoxSize[size]}
            flexShrink={0}
          >
            <Text
              className="df"
              fontSize={numberingFontSize[size]}
              fontWeight={"bold"}
              mb={"10px"}
            >
              {numbering}
            </Text>
          </Center>

          <Text fontSize={dropLabelFontSize[size]} fontWeight={"semibold"}>
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
      pt={"calc(190px / 3)"}
      gap={"calc(95px / 3)"}
    >
      <HStack justify="center" gap={"calc(130px / 3)"}>
        <DropPhotoSlot
          id="1"
          numbering={1}
          value={resPhotos["1"]}
          hNumber={705 / 3}
        />
        <DropPhotoSlot
          id="2"
          numbering={2}
          value={resPhotos["2"]}
          hNumber={705 / 3}
        />
      </HStack>

      <HStack justify="center" gap={"calc(130px / 3)"}>
        <DropPhotoSlot
          id="3"
          numbering={3}
          value={resPhotos["3"]}
          hNumber={705 / 3}
        />
        <DropPhotoSlot
          id="4"
          numbering={4}
          value={resPhotos["4"]}
          hNumber={705 / 3}
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
      pt={"calc(190px / 3)"}
      gap={"calc(95px / 3)"}
    >
      <HStack justify="center" gap={"calc(130px / 3)"}>
        <DropPhotoSlot
          id="1"
          numbering={1}
          value={resPhotos["1"]}
          hNumber={705 / 3}
          orientation="landscape"
          rotate
        />
        <DropPhotoSlot
          id="2"
          numbering={2}
          value={resPhotos["2"]}
          hNumber={705 / 3}
          orientation="landscape"
          rotate
        />
      </HStack>

      <HStack justify="center" gap={"calc(130px / 3)"}>
        <DropPhotoSlot
          id="3"
          numbering={3}
          value={resPhotos["3"]}
          hNumber={705 / 3}
          orientation="landscape"
          rotate
        />
        <DropPhotoSlot
          id="4"
          numbering={4}
          value={resPhotos["4"]}
          hNumber={705 / 3}
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
      pt={"calc(240px / 3)"}
      gap={"calc(100px / 3)"}
    >
      <HStack justify="center" gap={"calc(90px / 3)"}>
        <DropPhotoSlot
          id="1"
          numbering={1}
          value={resPhotos["1"]}
          hNumber={340 / 3}
          orientation="landscape"
        />
        <DropPhotoSlot
          id="2"
          numbering={2}
          value={resPhotos["2"]}
          hNumber={340 / 3}
          orientation="landscape"
        />
      </HStack>

      <HStack justify="center" gap={"calc(90px / 3)"}>
        <DropPhotoSlot
          id="3"
          numbering={2}
          value={resPhotos["2"]}
          hNumber={340 / 3}
          orientation="landscape"
        />
        <DropPhotoSlot
          id="4"
          numbering={3}
          value={resPhotos["3"]}
          hNumber={340 / 3}
          orientation="landscape"
        />
      </HStack>

      <HStack justify="center" gap={"calc(90px / 3)"}>
        <DropPhotoSlot
          id="5"
          numbering={3}
          value={resPhotos["3"]}
          hNumber={340 / 3}
          orientation="landscape"
        />
        <DropPhotoSlot
          id="6"
          numbering={4}
          value={resPhotos["4"]}
          hNumber={340 / 3}
          orientation="landscape"
        />
      </HStack>
    </LayoutContainer>
  );
};
export const Layout4 = (props: Interface__Layout) => {
  // Props
  const { resPhotos } = props;

  return (
    <LayoutContainer
      aspectRatio={TEMPLATE_ASPECT_RATIO}
      h={TEMPLATE_H}
      w="fit"
      pt={"calc(160px / 3)"}
      gap={"calc(60px / 3)"}
    >
      <HStack justify="center" gap={"calc(120px / 3)"}>
        <DropPhotoSlot
          id="1"
          numbering={1}
          value={resPhotos["1"]}
          hNumber={320 / 3}
          orientation="landscape"
        />
        <DropPhotoSlot
          id="2"
          numbering={1}
          value={resPhotos["1"]}
          hNumber={320 / 3}
          orientation="landscape"
        />
      </HStack>

      <HStack justify="center" gap={"calc(120px / 3)"}>
        <DropPhotoSlot
          id="3"
          numbering={2}
          value={resPhotos["2"]}
          hNumber={320 / 3}
          orientation="landscape"
        />
        <DropPhotoSlot
          id="4"
          numbering={2}
          value={resPhotos["2"]}
          hNumber={320 / 3}
          orientation="landscape"
        />
      </HStack>

      <HStack justify="center" gap={"calc(120px / 3)"}>
        <DropPhotoSlot
          id="5"
          numbering={3}
          value={resPhotos["3"]}
          hNumber={320 / 3}
          orientation="landscape"
        />
        <DropPhotoSlot
          id="6"
          numbering={3}
          value={resPhotos["3"]}
          hNumber={320 / 3}
          orientation="landscape"
        />
      </HStack>

      <HStack justify="center" gap={"calc(120px / 3)"}>
        <DropPhotoSlot
          id="7"
          numbering={4}
          value={resPhotos["4"]}
          hNumber={320 / 3}
          orientation="landscape"
        />
        <DropPhotoSlot
          id="8"
          numbering={4}
          value={resPhotos["4"]}
          hNumber={320 / 3}
          orientation="landscape"
        />
      </HStack>
    </LayoutContainer>
  );
};
// TODO: lanjut layout 5
export const Layout5 = (props: Interface__Layout) => {
  // Props
  const { resPhotos } = props;

  return (
    <LayoutContainer
      aspectRatio={TEMPLATE_ASPECT_RATIO}
      h={TEMPLATE_H}
      w="fit"
      pt={"calc(160px / 3)"}
      gap={"calc(60px / 3)"}
    >
      <SimpleGrid>
        <CContainer px={"calc(45px / 3)"} gap={"calc(100px / 3)"}>
          <DropPhotoSlot
            id="1"
            numbering={1}
            value={resPhotos["1"]}
            hNumber={340 / 3}
            orientation="landscape"
          />
          <DropPhotoSlot
            id="2"
            numbering={2}
            value={resPhotos["2"]}
            hNumber={340 / 3}
            orientation="landscape"
          />
          <DropPhotoSlot
            id="3"
            numbering={3}
            value={resPhotos["3"]}
            hNumber={340 / 3}
            orientation="landscape"
          />
        </CContainer>

        <CContainer bg={"red"}></CContainer>
      </SimpleGrid>
    </LayoutContainer>
  );
};
export const Layout6 = (props: Interface__Layout) => {
  // Props
  const { resPhotos } = props;

  return (
    <LayoutContainer
      aspectRatio={TEMPLATE_ASPECT_RATIO}
      h={TEMPLATE_H}
      w="fit"
      zIndex={99}
    >
      <SimpleGrid columns={2} flex={1}>
        {/* A */}
        <CContainer
          px={"calc(65px / 3)"}
          pt={"calc(190px / 3)"}
          gap={"calc(95px / 3)"}
        >
          <DropPhotoSlot
            id="1"
            numbering={1}
            value={resPhotos["1"]}
            hNumber={705 / 3}
          />
          <DropPhotoSlot
            id="2"
            numbering={2}
            value={resPhotos["2"]}
            hNumber={705 / 3}
          />
        </CContainer>

        <CContainer>
          <HStack align={"start"} flex={1} gap={0}>
            {/* B */}
            <CContainer
              w={"fit"}
              gap={"10px"}
              pt={"40px"}
              h={"full"}
              ml={"6px"}
            >
              <CContainer
                w={"calc(346px / 3)"}
                px={"calc(30px / 3)"}
                pt={"calc(75px / 3)"}
                pb={"calc(30px / 3)"}
                gap={"calc(40px / 3)"}
              >
                <DropPhotoSlot
                  id="3"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={190 / 3}
                  orientation="landscape"
                  size="sm"
                />

                <DropPhotoSlot
                  id="4"
                  numbering={3}
                  value={resPhotos["3"]}
                  hNumber={190 / 3}
                  orientation="landscape"
                  size="sm"
                />

                <DropPhotoSlot
                  id="5"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={190 / 3}
                  orientation="landscape"
                  size="sm"
                />
              </CContainer>

              <CContainer
                w={"calc(346px / 3)"}
                px={"calc(30px / 3)"}
                pt={"calc(75px / 3)"}
                pb={"calc(30px / 3)"}
                gap={"calc(40px / 3)"}
              >
                <DropPhotoSlot
                  id="6"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={190 / 3}
                  orientation="landscape"
                  size="sm"
                />

                <DropPhotoSlot
                  id="7"
                  numbering={3}
                  value={resPhotos["3"]}
                  hNumber={190 / 3}
                  orientation="landscape"
                  size="sm"
                />

                <DropPhotoSlot
                  id="8"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={190 / 3}
                  orientation="landscape"
                  size="sm"
                />
              </CContainer>
            </CContainer>

            {/* C */}
            <CContainer w={"fit"} gap={"9px"} pt={"40px"} h={"full"} ml={"4px"}>
              <CContainer
                w={"calc(207px / 3)"}
                px={"calc(13px / 3)"}
                pt={"calc(54px / 3)"}
                pb={"calc(15px / 3)"}
                gap={"calc(15px / 3)"}
                align={"center"}
              >
                <DropPhotoSlot
                  id="9"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />

                <DropPhotoSlot
                  id="10"
                  numbering={3}
                  value={resPhotos["3"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />

                <DropPhotoSlot
                  id="11"
                  numbering={4}
                  value={resPhotos["4"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />
              </CContainer>

              <CContainer
                w={"calc(207px / 3)"}
                px={"calc(13px / 3)"}
                pt={"calc(54px / 3)"}
                pb={"calc(15px / 3)"}
                gap={"calc(15px / 3)"}
                align={"center"}
              >
                <DropPhotoSlot
                  id="12"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />

                <DropPhotoSlot
                  id="13"
                  numbering={3}
                  value={resPhotos["3"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />

                <DropPhotoSlot
                  id="14"
                  numbering={4}
                  value={resPhotos["4"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />
              </CContainer>

              <CContainer
                w={"calc(207px / 3)"}
                px={"calc(13px / 3)"}
                pt={"calc(54px / 3)"}
                pb={"calc(15px / 3)"}
                gap={"calc(15px / 3)"}
                align={"center"}
              >
                <DropPhotoSlot
                  id="15"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />

                <DropPhotoSlot
                  id="16"
                  numbering={3}
                  value={resPhotos["3"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />

                <DropPhotoSlot
                  id="17"
                  numbering={4}
                  value={resPhotos["4"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />
              </CContainer>
            </CContainer>
          </HStack>
        </CContainer>
      </SimpleGrid>
    </LayoutContainer>
  );
};
export const Layout7 = (props: Interface__Layout) => {
  // Props
  const { resPhotos } = props;

  return (
    <LayoutContainer
      aspectRatio={TEMPLATE_ASPECT_RATIO}
      h={TEMPLATE_H}
      w="fit"
      zIndex={99}
    >
      <SimpleGrid columns={2} flex={1}>
        {/* A */}
        <CContainer
          px={"calc(65px / 3)"}
          pt={"calc(190px / 3)"}
          gap={"calc(95px / 3)"}
        >
          <DropPhotoSlot
            id="1"
            numbering={1}
            value={resPhotos["1"]}
            hNumber={705 / 3}
            orientation="landscape"
            rotate
          />
          <DropPhotoSlot
            id="2"
            numbering={2}
            value={resPhotos["2"]}
            hNumber={705 / 3}
            orientation="landscape"
            rotate
          />
        </CContainer>

        <CContainer>
          <HStack align={"start"} flex={1} gap={0}>
            {/* B */}
            <CContainer
              w={"fit"}
              gap={"10px"}
              pt={"40px"}
              h={"full"}
              ml={"6px"}
            >
              <CContainer
                w={"calc(346px / 3)"}
                px={"calc(30px / 3)"}
                pt={"calc(75px / 3)"}
                pb={"calc(30px / 3)"}
                gap={"calc(40px / 3)"}
              >
                <DropPhotoSlot
                  id="3"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={190 / 3}
                  orientation="landscape"
                  size="sm"
                />

                <DropPhotoSlot
                  id="4"
                  numbering={3}
                  value={resPhotos["3"]}
                  hNumber={190 / 3}
                  orientation="landscape"
                  size="sm"
                />

                <DropPhotoSlot
                  id="5"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={190 / 3}
                  orientation="landscape"
                  size="sm"
                />
              </CContainer>

              <CContainer
                w={"calc(346px / 3)"}
                px={"calc(30px / 3)"}
                pt={"calc(75px / 3)"}
                pb={"calc(30px / 3)"}
                gap={"calc(40px / 3)"}
              >
                <DropPhotoSlot
                  id="6"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={190 / 3}
                  orientation="landscape"
                  size="sm"
                />

                <DropPhotoSlot
                  id="7"
                  numbering={3}
                  value={resPhotos["3"]}
                  hNumber={190 / 3}
                  orientation="landscape"
                  size="sm"
                />

                <DropPhotoSlot
                  id="8"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={190 / 3}
                  orientation="landscape"
                  size="sm"
                />
              </CContainer>
            </CContainer>

            {/* C */}
            <CContainer w={"fit"} gap={"9px"} pt={"40px"} h={"full"} ml={"4px"}>
              <CContainer
                w={"calc(207px / 3)"}
                px={"calc(13px / 3)"}
                pt={"calc(54px / 3)"}
                pb={"calc(15px / 3)"}
                gap={"calc(15px / 3)"}
                align={"center"}
              >
                <DropPhotoSlot
                  id="9"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />

                <DropPhotoSlot
                  id="10"
                  numbering={3}
                  value={resPhotos["3"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />

                <DropPhotoSlot
                  id="11"
                  numbering={4}
                  value={resPhotos["4"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />
              </CContainer>

              <CContainer
                w={"calc(207px / 3)"}
                px={"calc(13px / 3)"}
                pt={"calc(54px / 3)"}
                pb={"calc(15px / 3)"}
                gap={"calc(15px / 3)"}
                align={"center"}
              >
                <DropPhotoSlot
                  id="12"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />

                <DropPhotoSlot
                  id="13"
                  numbering={3}
                  value={resPhotos["3"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />

                <DropPhotoSlot
                  id="14"
                  numbering={4}
                  value={resPhotos["4"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />
              </CContainer>

              <CContainer
                w={"calc(207px / 3)"}
                px={"calc(13px / 3)"}
                pt={"calc(54px / 3)"}
                pb={"calc(15px / 3)"}
                gap={"calc(15px / 3)"}
                align={"center"}
              >
                <DropPhotoSlot
                  id="15"
                  numbering={2}
                  value={resPhotos["2"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />

                <DropPhotoSlot
                  id="16"
                  numbering={3}
                  value={resPhotos["3"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />

                <DropPhotoSlot
                  id="17"
                  numbering={4}
                  value={resPhotos["4"]}
                  hNumber={120 / 3}
                  orientation="landscape"
                  size="xs"
                />
              </CContainer>
            </CContainer>
          </HStack>
        </CContainer>
      </SimpleGrid>
    </LayoutContainer>
  );
};
