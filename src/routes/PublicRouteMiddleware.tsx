import useSessionInvoice from "@/context/useSessionInvoice";
import { useEffect } from "react";

const PublicRouteMiddleware = (props: any) => {
  // Props
  const { children } = props;

  // Handle set invoice number to null
  const setInvoiceNumber = useSessionInvoice((s) => s.setInvoiceNumber);
  useEffect(() => {
    setInvoiceNumber(null);
  }, []);

  return <>{children}</>;
};

export default PublicRouteMiddleware;
