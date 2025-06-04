import CContainer from "@/components/ui-custom/CContainer";
import BackButton from "@/components/widget/BackButton";
import Heading from "@/components/widget/Heading";
import NextButton from "@/components/widget/NextButton";
import PageContainer from "@/components/widget/PageContainer";
import SessionTimer from "@/components/widget/SessionTimer";
import {
  TEMPLATE_ASPECT_RATIO,
  TEMPLATE_H,
} from "@/constants/defaultAttributes";
import { FILTERS } from "@/constants/filters";
import { LAYOUT_COMPONENTS } from "@/constants/layoutComponents";
import { SlotKey } from "@/constants/types";
import useSessionFilter from "@/context/useSessionFilter";
import useSessionPhotos from "@/context/useSessionPhotos";
import useSessionResPhotos from "@/context/useSessionResPhotos";
import useSessionTemplate from "@/context/useSessionTemplate";
import useSessionTimeout from "@/context/useSessionTimeout";
import {
  Box,
  Center,
  HStack,
  Image as ImageComponent,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSSProperties, useEffect, useRef } from "react";

const DraggablePhoto = ({
  id,
  src,
  aspectRatio,
  borderRadius,
  border,
}: any) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { src },
    });

  const dndStyle: CSSProperties = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: isDragging ? 999 : 99,
  };

  return (
    <Box
      zIndex={99}
      ref={setNodeRef}
      style={dndStyle}
      touchAction={"none"}
      {...listeners}
      {...attributes}
    >
      <ImageComponent
        id={id}
        src={src}
        aspectRatio={aspectRatio}
        borderRadius={borderRadius}
        border={border}
      />
    </Box>
  );
};

const FilterList = () => {
  // Contexts
  const { photos } = useSessionPhotos();
  const { filter, setFilter } = useSessionFilter();

  // States
  const base64 = photos[0];

  // Refs
  const canvasRefs = useRef<Record<string, HTMLCanvasElement | null>>({});

  // Handle render filter
  useEffect(() => {
    if (!base64 || !window.Caman) return;

    FILTERS.forEach(({ key, filter }) => {
      const canvas = canvasRefs.current[key];
      if (!canvas) return;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = base64;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        if (key !== "original") {
          setTimeout(() => {
            window.Caman(canvas, function (this: any) {
              this.revert(true);
              filter.call(this);
              this.render();
            });
          }, 10);
        }
      };
    });
  }, [base64]);
  if (!base64) return null;

  return (
    <CContainer gap={2}>
      <Text fontSize={20} fontWeight="semibold">
        CHOOSE & DRAG PHOTO TO YOUR TEMPLATE
      </Text>

      <SimpleGrid columns={[1, 2, 4]} gap={4} p={5} bg={"#303030"}>
        {FILTERS.map((item, i) => {
          const active = item?.key === filter?.key;

          return (
            <CContainer
              key={i}
              w="auto"
              pos={"relative"}
              cursor={"pointer"}
              onClick={() => {
                setFilter(item);
              }}
              borderRadius={8}
              boxShadow={active ? "0 0 0 2px {colors.p.500}" : ""}
            >
              {active && (
                <Center
                  w={"10px"}
                  aspectRatio={1}
                  bg={"p.500"}
                  pos={"absolute"}
                  right={4}
                  top={4}
                ></Center>
              )}

              <canvas
                ref={(el) => (canvasRefs.current[item.key] = el)}
                width={100}
                height={100}
                style={{ borderRadius: 8, background: "#ccc" }}
              />

              <Box
                px={2}
                py={1}
                borderRadius={8}
                bg={"p.500"}
                pos={"absolute"}
                bottom={2}
                left={2}
              >
                <Text textAlign="center" fontWeight={"semibold"} color={"pd"}>
                  {item.label}
                </Text>
              </Box>
            </CContainer>
          );
        })}
      </SimpleGrid>
    </CContainer>
  );
};

const EditPhotoPage = () => {
  // Contexts
  const { photos } = useSessionPhotos();
  const { template } = useSessionTemplate();
  const { resPhotos, setResPhotos } = useSessionResPhotos();
  const setSessionTimeout = useSessionTimeout((s) => s.setSessionTimeout);

  // States
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );
  const layoutData =
    LAYOUT_COMPONENTS[template.layout.id as keyof typeof LAYOUT_COMPONENTS];
  const LayoutComponent = layoutData.component;
  const slotNumberingMap = layoutData.slotNumberingMap;

  // Utils
  function handleDragEnd(event: any) {
    const { over, active } = event;
    if (!over || !active) return;

    const droppedSlotId = over.id;
    const draggedSrc = active.data.current?.src;
    if (!draggedSrc || !slotNumberingMap[Number(droppedSlotId) as SlotKey])
      return;

    const targetNumbering = slotNumberingMap[Number(droppedSlotId) as SlotKey];

    setResPhotos((prev) => {
      const updated = { ...prev };

      for (const [slotId, numbering] of Object.entries(slotNumberingMap)) {
        if (numbering === targetNumbering) {
          const numericId = Number(slotId) as SlotKey;
          updated[numericId] = draggedSrc;
        }
      }

      return updated;
    });
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <PageContainer h="100dvh" borderless gap={10} overflowX="clip">
        <HStack>
          <Box w="250px">
            <BackButton />
          </Box>

          <Heading>Edit Photo</Heading>

          <SessionTimer w="250px" />
        </HStack>

        <CContainer my={"auto"}>
          <HStack h="full" gap={10} align="start">
            <CContainer flex={1} gap={10}>
              <CContainer gap={2}>
                <Text fontSize={20} fontWeight="semibold">
                  CHOOSE & DRAG PHOTO TO YOUR TEMPLATE
                </Text>

                <HStack>
                  {photos.map((item, i) => (
                    <CContainer key={i}>
                      <DraggablePhoto
                        id={`photo-${i}`}
                        src={item}
                        aspectRatio={4 / 3}
                        borderRadius={8}
                        border={"4px solid {colors.p.500}"}
                      />
                    </CContainer>
                  ))}
                </HStack>
              </CContainer>

              <FilterList />
            </CContainer>

            <CContainer w="fit" gap={2}>
              <Text fontSize={20} fontWeight="semibold">
                CHOOSE FILTER
              </Text>

              <CContainer
                pos="relative"
                h={`calc(${TEMPLATE_H})`}
                aspectRatio={TEMPLATE_ASPECT_RATIO}
              >
                <ImageComponent
                  src={template?.production}
                  pos="absolute"
                  left={0}
                  top={0}
                  h={`calc(${TEMPLATE_H})`}
                  aspectRatio={TEMPLATE_ASPECT_RATIO}
                  zIndex={1}
                />

                <LayoutComponent
                  zIndex={2}
                  resPhotos={resPhotos}
                  setResPhotos={setResPhotos}
                />
              </CContainer>

              <NextButton
                to="/print-send"
                wrapperProps={{ mx: "auto", mt: 4 }}
                disabled={
                  !Object.values(resPhotos).every((val) => val !== null)
                }
                onClick={() => {
                  setSessionTimeout(false);
                }}
              />
            </CContainer>
          </HStack>
        </CContainer>
      </PageContainer>
    </DndContext>
  );
};

export default EditPhotoPage;
