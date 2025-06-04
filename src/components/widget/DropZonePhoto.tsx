import { useDroppable } from "@dnd-kit/core";
import CContainer from "../ui-custom/CContainer";
import { Center, Text, VStack } from "@chakra-ui/react";

const DropZonePhoto = (props: any) => {
  // Props
  const { id, numbering } = props;

  // Hooks
  const { setNodeRef } = useDroppable({
    id,
    data: {
      numbering,
    },
  });

  return (
    <CContainer
      fRef={setNodeRef}
      flexShrink={0}
      border={"2px dashed gray"}
      borderRadius={8}
      overflow={"hidden"}
      bg={"p.200"}
      zIndex={2}
      aspectRatio={3 / 2}
      justify={"center"}
      maxW={"calc(25% - 6px)"}
    >
      <VStack gap={2}>
        <Center
          p={2}
          bg={"white"}
          borderRadius={"full"}
          aspectRatio={1}
          w={"50px"}
          h={"50px"}
          flexShrink={0}
        >
          <Text className="df" fontSize={32} fontWeight={"bold"} mb={"10px"}>
            {numbering}
          </Text>
        </Center>

        <Text fontSize={20} fontWeight={"semibold"}>
          Drop Here
        </Text>
      </VStack>
    </CContainer>
  );
};

export default DropZonePhoto;
