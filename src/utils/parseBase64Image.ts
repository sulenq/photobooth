/**
 * Converts base64 image data into a data URL string usable in <img src="">
 * @param base64 - Base64 string without the prefix (e.g. "iVBORw0KGgo...")
 * @param mimeType - MIME type of the image, default is "image/png"
 * @returns full data URL string
 */
const parseBase64Image = (base64: string, mimeType = "image/png"): string => {
  return `data:${mimeType};base64,${base64}`;
};

export default parseBase64Image;
