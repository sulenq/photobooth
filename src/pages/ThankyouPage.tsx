import Heading from "@/components/widget/Heading";
import PageContainer from "@/components/widget/PageContainer";
import useSessionInvoice from "@/context/useSessionInvoice";
import useCountdown from "@/hooks/useCountdown";
import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ThankyouPage = () => {
  // Hooks
  const navigate = useNavigate();
  const { startCountdown, remaining } = useCountdown({
    initialValue: 10,
    onTick: () => {},
    onFinished: () => {
      setInvoiceNumber(null);
      navigate("/");
    },
  });

  // Contexts
  const setInvoiceNumber = useSessionInvoice((s) => s.setInvoiceNumber);

  // Handle navigate countdown 10s
  useEffect(() => {
    startCountdown();
  }, []);

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

      <Text textAlign={"center"}>
        Kembali ke halaman awal dalam {remaining} detik
      </Text>
    </PageContainer>
  );
};

export default ThankyouPage;
