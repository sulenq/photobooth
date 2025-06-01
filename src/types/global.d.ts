interface ElectronAPI {
  printPhoto: (base64: string, qty: number) => Promise<any>;
}

interface Window {
  electronAPI: ElectronAPI;
}
