import CContainer from "@/components/ui-custom/CContainer";
import BackButton from "@/components/widget/BackButton";
import Heading from "@/components/widget/Heading";
import PageContainer from "@/components/widget/PageContainer";
import PhotoFilter from "@/components/widget/PhotoFilter";
import SessionTimer from "@/components/widget/SessionTimer";
import useSessionPhotos from "@/context/useSessionPhotos";
import parseBase64 from "@/utils/parseBase64";
import { Box, HStack, Text } from "@chakra-ui/react";

const FitlerList = () => {
  return (
    <CContainer gap={4}>
      <Text fontSize={20} fontWeight={"semibold"}>
        CHOOSE FILTER
      </Text>
    </CContainer>
  );
};

const EditPhotoPage = () => {
  // Contexts
  const photos = useSessionPhotos((s) => s.photos);
  const dummyArr = [1, 2, 3, 4];
  const dummyBase64 =
    "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";

  return (
    <PageContainer h={"100dvh"} borderless gap={10}>
      <HStack>
        <Box w={"250px"}>
          <BackButton />
        </Box>

        <Heading>Edit Photo</Heading>

        <SessionTimer w={"250px"} />
      </HStack>

      <CContainer flex={1} border={"1px solid red"}>
        <HStack h={"full"}>
          <CContainer gap={10}>
            {/* Result */}
            <CContainer gap={4}>
              <Text fontSize={20} fontWeight={"semibold"}>
                CHOOSE & DRAG PHOTO TO YOUR TEMPLATE
              </Text>

              <PhotoFilter base64={parseBase64(dummyBase64)} />

              <HStack>
                {dummyArr?.map((item, i) => {
                  return (
                    <CContainer key={i}>
                      {/* <Image
                        id={`tralala-${i}`}
                        src={`${IMAGES_PATH}/tralala.jpg`}
                        aspectRatio={4 / 3}
                        borderRadius={8}
                        border={"4px solid {colors.p.500}"}
                      /> */}
                    </CContainer>
                  );
                })}
              </HStack>
            </CContainer>

            {/* Filters */}
            <FitlerList />
          </CContainer>
        </HStack>
      </CContainer>
    </PageContainer>
  );
};

export default EditPhotoPage;
