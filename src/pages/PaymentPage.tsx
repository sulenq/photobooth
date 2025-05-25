import CContainer from "@/components/ui-custom/CContainer";
import Heading1 from "@/components/ui-custom/Heading1";
import CountDown from "@/components/widget/CountDown";
import PageContainer from "@/components/widget/PageContainer";
import { SVGS_PATH } from "@/constants/paths";
import useRequest from "@/hooks/useRequest";
import formatNumber from "@/utils/formatNumber";
import {
  Circle,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const { req, loading, response, error } = useRequest({ id: "generate-qr" });
  const navigate = useNavigate();

  // Utils
  function generateqr() {
    const url = `/payment/generate-qr`;

    req({
      config: {
        url,
      },
    });
  }

  // Handle generate on page load
  useEffect(() => {
    generateqr();
  }, []);

  // Handle listen payment status
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/order-status/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "PAID") {
            clearInterval(interval);
            navigate("/payment-success");
          } else if (data.status === "EXPIRED" || data.status === "FAILED") {
            clearInterval(interval);
            navigate("/payment-failed");
          }
        });
    }, 3000); // polling tiap 3 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <PageContainer>
      <SimpleGrid columns={[1, null, 2]} gap={10} flex={1}>
        {/* QR Code */}
        <CContainer
          borderRadius={16}
          overflow={"clip"}
          border={"2px solid {colors.pd}"}
          h={"fit"}
        >
          <CContainer p={6} bg={"pd"}>
            <Heading1
              className="df"
              color={"p.100"}
              textAlign={"center"}
              fontWeight={"medium"}
            >
              Scan to Pay
            </Heading1>
          </CContainer>

          <CContainer bg={"white"} flex={1} pb={10}>
            {loading && <Spinner size={"xl"} m={"auto"} />}

            {!loading && (
              <>
                {!error && (
                  <CContainer p={5} gap={10}>
                    {/* Payment timeout */}
                    <HStack
                      p={4}
                      borderRadius={8}
                      border={"2px solid {colors.pd}"}
                      justify={"space-between"}
                      bg={"p.100"}
                    >
                      <Text fontSize={20} fontWeight={"medium"}>
                        Selesaikan pembayaran sebelum
                      </Text>

                      <CountDown
                        initialValue={
                          response?.data?.result?.response?.payment
                            ?.payment_due_date
                        }
                        options={{
                          initialValueType: "minutes",
                        }}
                      />
                    </HStack>

                    {/* QR code */}
                    <CContainer justify={"center"} align={"center"}>
                      <QRCodeCanvas
                        value={response?.data?.result?.response?.payment?.url}
                        size={300}
                      />
                      {/* <QrCodeRoot
                        value={response?.data?.result?.response?.payment?.url}
                        size={"2xl"}
                      >
                        <QrCodeFrame>
                          <QrCodePattern />
                        </QrCodeFrame>
                      </QrCodeRoot> */}
                    </CContainer>

                    {/* Price */}
                    <CContainer
                      border={"2px solid {colors.pd}"}
                      p={4}
                      minW={"400px"}
                      mx={"auto"}
                      borderRadius={8}
                      bg={"p.100"}
                      w={"fit"}
                    >
                      <Text
                        fontSize={32}
                        fontWeight={"semibold"}
                        textAlign={"center"}
                      >
                        Rp{" "}
                        {formatNumber(
                          response?.data?.result?.response?.order?.amount
                        )}
                      </Text>
                    </CContainer>
                  </CContainer>
                )}
              </>
            )}
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
