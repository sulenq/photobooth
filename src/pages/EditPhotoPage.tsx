import CContainer from "@/components/ui-custom/CContainer";
import BackButton from "@/components/widget/BackButton";
import Heading from "@/components/widget/Heading";
import PageContainer from "@/components/widget/PageContainer";
import SessionTimer from "@/components/widget/SessionTimer";
import { Box, HStack } from "@chakra-ui/react";

const EditPhotoPage = () => {
  return (
    <PageContainer borderless gap={10}>
      <HStack>
        <Box w={"250px"}>
          <BackButton />
        </Box>

        <Heading>Edit Photo</Heading>

        <SessionTimer w={"250px"} />
      </HStack>

      <CContainer border={"1px solid red"}></CContainer>
    </PageContainer>
  );
};

export default EditPhotoPage;
