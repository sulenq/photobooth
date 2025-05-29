const parseBase64 = (base64: string, mimeType = "image/png"): string => {
  return `data:${mimeType};base64,${base64}`;
};

export default parseBase64;
