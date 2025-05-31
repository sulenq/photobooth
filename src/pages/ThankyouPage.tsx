import Heading from "@/components/widget/Heading";
import PageContainer from "@/components/widget/PageContainer";
import { Text } from "@chakra-ui/react";

const ThankyouPage = () => {
  return (
    <PageContainer align={"center"} justify={"center"} gap={20}>
      <Heading headingProps={{ fontSize: 80, maxW: "1000px" }}>
        Thank You for coming to Pop Box
      </Heading>

      <Text
        fontSize={20}
        fontWeight={"medium"}
        textAlign={"center"}
        maxW={"600px"}
      >
        Tag @PopBox.Kotalama to be featured and win the chance to win our
        monthly awared!
      </Text>
    </PageContainer>
  );
};

export default ThankyouPage;
