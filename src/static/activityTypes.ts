const ACTIVITY_TYPES: Record<
  string,
  { title: string; description: string; metadata?: string[] }
> = {
  subscription_purchase: {
    title: "Pembelian Berlangganan",
    description: "melakukan pembelian berlangganan",
    metadata: ["pricing", "features"],
  },
  upgrade: {
    title: "Upgrade",
    description: "melakukan upgrade paket",
    metadata: ["pricing", "features"],
  },
  payment: {
    title: "Pembayaran",
    description: "melakukan pembayaran paket",
    metadata: ["pricing", "features"],
  },
  name_update: {
    title: "Update Nama",
    description: "melakukan update nama",
    metadata: ["pricing", "features"],
  },
  email_update: {
    title: "Update Email",
    description: "melakukan update email",
    metadata: ["pricing", "features"],
  },
  pasword_update: {
    title: "Update Password",
    description: "melakukan update password",
    metadata: ["pricing", "features"],
  },
};

export { ACTIVITY_TYPES };
