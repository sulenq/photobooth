import { create } from "zustand";

interface Props {
  invoiceNumber: string | null;
  setInvoiceNumber: (newState: any) => void;
}

const useSessionInvoice = create<Props>((set) => {
  return {
    invoiceNumber: null,
    setInvoiceNumber: (newState) => set({ invoiceNumber: newState }),
  };
});

export default useSessionInvoice;
