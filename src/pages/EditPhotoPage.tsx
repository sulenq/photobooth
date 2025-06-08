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
import useChoosedProduct from "@/context/useChoosedProduct";
import useSessionFilter from "@/context/useSessionFilter";
import useSessionPhotos from "@/context/useSessionPhotos";
import useSessionResPhotos from "@/context/useSessionResPhotos";
import useSessionTemplate from "@/context/useSessionTemplate";
import useSessionTimeout from "@/context/useSessionTimeout";
import useSessionTimer from "@/context/useSessionTimer";
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
        const targetRatio = 3 / 2;

        const origWidth = img.width;
        const origHeight = img.height;
        const origRatio = origWidth / origHeight;

        let canvasWidth: number;
        let canvasHeight: number;

        // Tentukan ukuran canvas fixed, misal width = 600 (bisa disesuaikan)
        canvasWidth = 600;
        canvasHeight = canvasWidth / targetRatio; // 600 / 1.5 = 400

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Hitung ukuran gambar yang di-scale supaya masuk canvas tanpa stretch
        let drawWidth: number;
        let drawHeight: number;
        let offsetX = 0;
        let offsetY = 0;

        if (origRatio > targetRatio) {
          // Gambar lebih lebar, sesuaikan width canvas dan center vertikal
          drawWidth = canvasWidth;
          drawHeight = drawWidth / origRatio;
          offsetY = (canvasHeight - drawHeight) / 2;
        } else {
          // Gambar lebih tinggi, sesuaikan height canvas dan center horizontal
          drawHeight = canvasHeight;
          drawWidth = drawHeight * origRatio;
          offsetX = (canvasWidth - drawWidth) / 2;
        }

        // Gambar tanpa stretch, ditengah canvas
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

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

      <SimpleGrid columns={[1, 2]} gap={4} p={5} bg={"#303030"}>
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
              aspectRatio={3 / 2}
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

                  // aspectRatio: 3 / 2,
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
  const { defaultTemplate, template } = useSessionTemplate();
  const { resPhotos, setResPhotos } = useSessionResPhotos();
  const setSessionTimeout = useSessionTimeout((s) => s.setSessionTimeout);
  const setFinished = useSessionTimer((s) => s.setFinished);
  const { choosedProduct } = useChoosedProduct();

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
  const finalLayoutId =
    template?.layoutId ||
    choosedProduct?.product?.defaultTemplate?.layoutId ||
    defaultTemplate?.layoutId;
  const layoutData =
    LAYOUT_COMPONENTS[finalLayoutId as keyof typeof LAYOUT_COMPONENTS];
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
          <HStack h="full" gap={10} align="start" justify={"center"}>
            <CContainer gap={10} maxW={"500px"}>
              {/* Stock photos  */}
              <CContainer gap={2}>
                <Text fontSize={20} fontWeight="semibold">
                  CHOOSE & DRAG PHOTO TO YOUR TEMPLATE
                </Text>

                <SimpleGrid columns={[1, 2]} gap={4}>
                  {photos.map((item, i) => (
                    <DraggablePhoto
                      key={i}
                      id={`photo-${i}`}
                      src={item}
                      borderRadius={8}
                      border={"4px solid {colors.p.500}"}
                    />
                  ))}
                </SimpleGrid>

                {/* <HStack>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <DropZonePhoto key={i} numbering={i + 1} />
                  ))}
                </HStack> */}
              </CContainer>

              <CContainer bg={"p.500"} borderRadius={8} p={4} gap={4}>
                <Text fontWeight={"medium"}>
                  Tips: Untuk meletakkan elemen di area kecil, seret elemen ke
                  zona drop hingga zona tersebut berubah warna menjadi merah.
                  Warna merah menandakan bahwa elemen akan ditempatkan di area
                  tersebut.
                </Text>

                <Text fontWeight={"medium"} fontStyle={"italic"}>
                  Tip: To drop an item into a small target area, drag it over
                  the drop zone until it turns red. The red highlight indicates
                  that the item will be placed in that spot.
                </Text>
              </CContainer>
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
                  src={template?.production || defaultTemplate?.production}
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
                  setFinished(true);
                  setSessionTimeout(false);
                }}
              />
            </CContainer>

            <CContainer maxW={"500px"}>
              {/* Filter list */}
              <FilterList />
            </CContainer>
          </HStack>
        </CContainer>
      </PageContainer>
    </DndContext>
  );
};

export default EditPhotoPage;
