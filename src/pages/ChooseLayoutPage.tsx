import CContainer from "@/components/ui-custom/CContainer";
import NextButton from "@/components/widget/NextButton";
import SessionTimer from "@/components/widget/SessionTimer";
import { HStack } from "@chakra-ui/react";

const ChooseLayoutPage = () => {
  return (
    <CContainer minH={"100dvh"}>
      <CContainer flex={1} h={"50%"} bg={"p.100"} p={10}>
        <HStack align={"start"}>
          <SessionTimer w={"250px"} />

          <CContainer></CContainer>

          <NextButton to={"/edit-photo"} />
        </HStack>
      </CContainer>

      <CContainer flex={1} h={"50%"} bg={"p.900"} p={10}></CContainer>
    </CContainer>
  );
};

export default ChooseLayoutPage;
