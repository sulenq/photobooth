interface ElectronAPI {
  printPhoto: (base64: string, qty: number) => Promise<any>;
  generateVideo: (images: string[]) => Promise<string>;
}

interface Window {
  Caman: any;
  electronAPI: ElectronAPI;
}
