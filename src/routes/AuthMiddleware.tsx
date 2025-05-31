import CContainer from "@/components/ui-custom/CContainer";
import useSessionInvoice from "@/context/useSessionInvoice";
import useRequest from "@/hooks/useRequest";
import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";

const AuthMiddleware = (props: any) => {
  // Props
  const { children } = props;

  // Hooks
  const { loading, req, response, error } = useRequest({
    id: "invoice-number-status",
  });

  // Contexts
  const { invoiceNumber, setInvoiceNumber } = useSessionInvoice();

  // Utils
  function getInvoiceNumber() {
    req({
      config: {
        url: `/payment/status`,
      },
    });
  }

  useEffect(() => {
    const invoiceStatus = response;

    if (!invoiceNumber) {
      getInvoiceNumber();

      setInvoiceNumber(invoiceStatus);
    }
  }, [response]);

  return (
    <>
      {loading && (
        <CContainer justify={"center"} align={"center"}>
          <Spinner size={"xl"} />
        </CContainer>
      )}

      {!loading && <>{!error && { children }}</>}
    </>
  );
};

export default AuthMiddleware;
