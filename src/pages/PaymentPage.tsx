import CContainer from "@/components/ui-custom/CContainer";
import Heading1 from "@/components/ui-custom/Heading1";
import PageContainer from "@/components/widget/PageContainer";
import { SVGS_PATH } from "@/constants/paths";
import useRequest from "@/hooks/useRequest";
import {
  Circle,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";

const HOW_TO_PAY_ID = [
  "Buka aplikasi M-Banking/E-Wallet di smartphone Anda",
  "Pilih menu bayar dengan QRIS",
  "Pindai kode QR pada layar",
  "Periksa detail pembayaran Anda pada aplikasi dan Bayar",
  "Pembayaran Berhasil",
];
const HOW_TO_PAY_EN = [
  "Open your M-Banking or E-Wallet app on your smartphone",
  "Select the option to pay with QRIS",
  "Scan the QR code on the screen",
  "Check your payment details in the app and proceed to pay",
  "Payment Successful",
];
const PAYMENT_SUPPORT_LOGOS = [
  `qris_logo.svg`,
  `dana_logo.svg`,
  `gopay_logo.svg`,
  `ovo_logo.png`,
  `sp_logo.svg`,
];
const PaymentPage = () => {
  // Hooks
  // const loading = true;
  const { req, loading } = useRequest({ id: "generate-qr" });
  useEffect(() => {
    const url = `/payment/generate-qr`;

    req({
      config: {
        url,
      },
    });
  }, []);

  return (
    <PageContainer>
      <SimpleGrid columns={[1, null, 2]} gap={10} flex={1}>
        {/* QR Code */}
        <CContainer
          borderRadius={16}
          overflow={"clip"}
          border={"2px solid {colors.pd}"}
        >
          <CContainer p={4} bg={"pd"}>
            <Heading1
              className="df"
              color={"p.100"}
              textAlign={"center"}
              fontWeight={"medium"}
            >
              Scan to Pay
            </Heading1>
          </CContainer>

          <CContainer bg={"white"} flex={1}>
            {loading && <Spinner size={"xl"} m={"auto"} />}

            {!loading && <></>}
          </CContainer>
        </CContainer>

        {/* Payment Tutor */}
        <CContainer gap={8}>
          <CContainer borderRadius={16} overflow={"clip"}>
            <CContainer py={4} px={6} bg={"pd"}>
              <Text fontSize={24} fontWeight={"medium"} color={"p.100"}>
                Cara Pembayaran
              </Text>
            </CContainer>

            <CContainer bg={"white"} flex={1} p={5} gap={4}>
              <Text fontSize={18}>
                Pembayaran melalui <b>M-Banking/E-Wallet</b>
              </Text>

              <CContainer gap={4}>
                {HOW_TO_PAY_ID.map((item, i) => (
                  <HStack key={i} align={"start"}>
                    <Circle p={"2px"} bg={"pd"} aspectRatio={1} w={"30px"}>
                      <Text color={"p.100"}>{i + 1}</Text>
                    </Circle>

                    <Text fontSize={18}>{item}</Text>
                  </HStack>
                ))}
              </CContainer>

              <Text fontSize={18} mt={4} fontStyle={"italic"}>
                Payment via <b>M-Banking/E-Wallet</b>
              </Text>

              <CContainer gap={4}>
                {HOW_TO_PAY_EN.map((item, i) => (
                  <HStack key={i} align={"start"}>
                    <Circle p={"2px"} bg={"pd"} aspectRatio={1} w={"30px"}>
                      <Text color={"p.100"}>{i + 1}</Text>
                    </Circle>

                    <Text fontSize={18} fontStyle={"italic"}>
                      {item}
                    </Text>
                  </HStack>
                ))}
              </CContainer>
            </CContainer>
          </CContainer>

          <CContainer gap={4}>
            <Text fontSize={18} fontWeight={"medium"}>
              Mendukung Pembayaran/Support Payment
            </Text>

            <HStack
              wrap={"wrap"}
              gapX={8}
              gapY={4}
              p={5}
              borderRadius={16}
              bg={"white"}
            >
              {PAYMENT_SUPPORT_LOGOS.map((item, i) => {
                return (
                  <Image key={i} src={`${SVGS_PATH}/payment_logo/${item}`} />
                );
              })}
            </HStack>
          </CContainer>
        </CContainer>
      </SimpleGrid>
    </PageContainer>
  );
};

export default PaymentPage;
