import CContainer from "@/components/ui-custom/CContainer";
import useSessionInvoice from "@/context/useSessionInvoice";
import useRequest from "@/hooks/useRequest";
import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteMiddleware = (props: any) => {
  // Props
  const { children } = props;

  // Hooks
  const { loading, req, response, error } = useRequest({
    id: "invoice-number-status",
    showLoadingToast: false,
    showErrorToast: false,
    showSuccessToast: false,
  });

  // Contexts
  const { invoiceNumber, setInvoiceNumber } = useSessionInvoice();

  // Utils
  function getInvoiceNumber() {
    req({
      config: {
        url: `payment/payment-status`,
      },
    });
  }

  useEffect(() => {
    const newInvoiceNumberState = response;

    if (!invoiceNumber) {
      getInvoiceNumber();

      setInvoiceNumber(newInvoiceNumberState);
    }
  }, [response]);

  return (
    <>
      {loading && (
        <CContainer justify={"center"} align={"center"}>
          <Spinner size={"xl"} />
        </CContainer>
      )}

      {!loading && (
        <>
          {error && <Navigate to={"/choose-product"} />}

          {!error && <>{children}</>}
        </>
      )}
    </>
  );
};

export default PrivateRouteMiddleware;
