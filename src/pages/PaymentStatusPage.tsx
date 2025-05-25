import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import NavLink from "@/components/ui-custom/NavLink";
import PageContainer from "@/components/widget/PageContainer";
import { SVGS_PATH } from "@/constants/paths";
import { PRESET_MAIN_BUTTON } from "@/constants/presetProps";
import useRequest from "@/hooks/useRequest";
import { Image, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const STATUS_IMG = {
  success: `/success.svg`,
  failed: `/failed.svg`,
  canceled: `/canceled.svg`,
};
const PaymentStatusPage = () => {
  // Hooks
  const { invoice_number } = useParams();
  const { req, loading, response, error } = useRequest({
    id: "check-payment-status",
  });

  // States
  const status = response?.result?.transaction?.status;

  // Handle check status on page load
  useEffect(() => {
    const url = `/payment/cek-status`;
    const payload = {
      invoiceNumber: invoice_number,
    };

    req({
      config: {
        url,
        method: "post",
        data: payload,
      },
    });
  }, []);

  return (
    <PageContainer>
      <CContainer flex={1} p={5}>
        {loading && <Spinner size={"xl"} m={"auto"} />}

        {!loading && (
          <>
            {!error && (
              <CContainer flex={1} pos={"relative"}>
                {status === "success" && (
                  <>
                    <Image
                      src={`${SVGS_PATH}/bling.svg`}
                      w={"100px"}
                      position={"absolute"}
                    />
                    <Image
                      src={`${SVGS_PATH}/bling.svg`}
                      w={"100px"}
                      position={"absolute"}
                      bottom={0}
                      right={0}
                      transform={"rotate(30deg)"}
                    />
                  </>
                )}

                {status !== "success" && (
                  <>
                    <Image
                      src={`${SVGS_PATH}/!.svg`}
                      w={"100px"}
                      position={"absolute"}
                    />
                    <Image
                      src={`${SVGS_PATH}/!.svg`}
                      w={"100px"}
                      position={"absolute"}
                      bottom={0}
                      right={0}
                      transform={"rotate(30deg)"}
                    />
                  </>
                )}

                <CContainer m={"auto"} align={"center"} gap={10}>
                  <Image
                    src={`${SVGS_PATH}/payment_status${
                      STATUS_IMG[
                        (status as keyof typeof STATUS_IMG) || "failed"
                      ]
                    }`}
                    borderRadius={16}
                    w={"300px"}
                  />

                  <NavLink
                    to={status === "success" ? `/procedure` : `/choose-product`}
                  >
                    <BButton mx={"auto"} {...PRESET_MAIN_BUTTON}>
                      {status === "success" ? "START PHOTO" : "BACK TO PRODUCT"}
                    </BButton>
                  </NavLink>
                </CContainer>
              </CContainer>
            )}
          </>
        )}
      </CContainer>
    </PageContainer>
  );
};

export default PaymentStatusPage;
