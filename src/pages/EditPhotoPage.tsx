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

const DraggablePhoto = (props: any) => {
  // Props
  const { id, src, borderRadius, border } = props;

  // Contexts
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { src },
    });

  // States
  const dndStyle: CSSProperties = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px) scale(${
          isDragging ? 0.3 : 1
        })`
      : undefined,
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: isDragging ? 999 : 99,
  };

  return (
    <CContainer
      zIndex={99}
      fRef={setNodeRef}
      style={dndStyle}
      touchAction="none"
      aspectRatio={3 / 2}
      {...listeners}
      {...attributes}
    >
      <ImageComponent
        id={id}
        src={src}
        aspectRatio={3 / 2}
        borderRadius={borderRadius}
        border={border}
      />
    </CContainer>
  );
};

const FilterList = () => {
  // Contexts
  const { photos } = useSessionPhotos();
  const { filter, setFilter } = useSessionFilter();

  // States
  const imgSrc = photos[0];

  // Refs
  const canvasRefs = useRef<Record<string, HTMLCanvasElement | null>>({});

  // Handle render filter
  useEffect(() => {
    if (!imgSrc || !window.Caman) return;

    FILTERS.forEach(({ key, filter }) => {
      const canvas = canvasRefs.current[key];
      if (!canvas) return;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imgSrc;

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
  }, [imgSrc]);
  if (!imgSrc) return null;

  return (
    <CContainer gap={2}>
      <Text fontSize={20} fontWeight="semibold">
        CHOOSE FILTER
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
              overflow={"clip"}
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
                style={{
                  borderRadius: 8,
                  background: "#ccc",
                  transform: "scale(1.2)",
                }}
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
    LAYOUT_COMPONENTS[template.layoutId as keyof typeof LAYOUT_COMPONENTS];
  const LayoutComponent = layoutData?.component;

  // Utils
  function handleDragEnd(event: any) {
    const { over, active } = event;
    if (!over || !active) return;

    const draggedSrc = active.data.current?.src;
    const targetNumbering = over.data.current?.numbering;
    // console.log(targetNumbering);
    if (!draggedSrc || targetNumbering == null) return;

    setResPhotos((prev) => ({
      ...prev,
      [targetNumbering]: draggedSrc,
    }));
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <PageContainer h="100dvh" borderless gap={10}>
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
              {/* Stock photos  */}
              <CContainer gap={2}>
                <Text fontSize={20} fontWeight="semibold">
                  CHOOSE & DRAG PHOTO TO YOUR TEMPLATE
                </Text>

                <HStack>
                  {photos.map((item, i) => (
                    <DraggablePhoto
                      key={i}
                      id={`photo-${i}`}
                      src={item}
                      borderRadius={8}
                      border={"4px solid {colors.p.500}"}
                    />
                  ))}
                </HStack>

                {/* <HStack>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <DropZonePhoto key={i} numbering={i + 1} />
                  ))}
                </HStack> */}
              </CContainer>

              {/* Filter list */}
              <FilterList />

              <Text fontWeight={"medium"}>
                Tips: untuk drag & drop ke tempat yang kecil, drag ke drop zone
                hingga drop zone berwarna merah yang artinya foto akan di drop
                disitu.
              </Text>
            </CContainer>

            {/* Res photos */}
            <CContainer w="fit" gap={2}>
              <Text fontSize={20} fontWeight="semibold">
                RESULT HERE
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
                  zIndex={3}
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
