import {
  IconCashBanknote,
  IconCreditCard,
  IconLock,
  IconWalletOff,
} from "@tabler/icons-react";

const PRICING_BENEFITS = [
  {
    id: "gap_overlap_detection",
    label: "Deteksi gap & overlap",
    description:
      "Mendeteksi kesalahan pada bidang seperti gap dan overlap secara otomatis.",
  },
  {
    id: "dashboard_access",
    label: "Akses dashboard",
    description: "Dashboard interaktif untuk memantau data Anda.",
  },
  {
    id: "data_analysis",
    label: "Analisis data tanah",
    description:
      "Menyediakan alat analisis data untuk memetakan tanah dengan akurasi tinggi.",
  },
  {
    id: "priority_support",
    label: "Dukungan prioritas",
    description: "Dukungan pelanggan dengan waktu tanggapan lebih cepat.",
  },
  {
    id: "report_export",
    label: "Export laporan (PDF/Excel)",
    description:
      "Fitur ekspor laporan dalam berbagai format seperti PDF dan Excel.",
  },
  {
    id: "api_integration",
    label: "Integrasi API pihak ketiga",
    description:
      "Menghubungkan aplikasi GIS dengan layanan pihak ketiga menggunakan API.",
  },
  {
    id: "customization",
    label: "Kustomisasi fitur",
    description:
      "Opsi untuk menyesuaikan fitur sesuai dengan kebutuhan bisnis Anda.",
  },
];

const PRICING_LIST: Record<
  string,
  { name: string; monthly_base_price: number }
> = {
  essential: {
    name: "Essential",
    monthly_base_price: 500000,
  },
  business: {
    name: "Business",
    monthly_base_price: 500000,
  },
  enterprise: {
    name: "Enterprise",
    monthly_base_price: 0,
  },
};

const PRICING_TRUST_SIGNALS = [
  {
    icon: IconCreditCard,
    label: "Pilihan pembayaran yang diterima",
    description:
      "Pilih dari Visa, Mastercard, PayPal, Google Pay, Apple Pay, Amex, Diners, JCB, dan UnionPay.",
  },
  {
    icon: IconLock,
    label: "Pembayaran yang aman",
    description:
      "Transaksi Anda dilindungi dengan enkripsi SSL 256-bit yang canggih.",
  },
  {
    icon: IconWalletOff,
    label: "Pembayaran yang mudah dan cepat",
    description:
      "Nikmati kemudahan dalam proses pembayaran yang cepat dan tanpa ribet menggunakan berbagai pilihan yang tersedia.",
  },
  {
    icon: IconCashBanknote,
    label: "Jaminan pengembalian dana",
    description:
      "Nikmati jaminan pengembalian dana dalam 30 hari jika Anda tidak puas dengan pembelian Anda.",
  },
];

const BILLING_CYCLES: Record<string, { label: string }> = {
  monthly: {
    label: "Ditagih setiap bulan",
  },
  yearly: {
    label: "Ditagih setiap tahun",
  },
};

export {
  PRICING_BENEFITS,
  PRICING_LIST,
  PRICING_TRUST_SIGNALS,
  BILLING_CYCLES,
};
