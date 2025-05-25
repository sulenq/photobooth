const rgbaToHex = ({ red, green, blue, alpha }: any) => {
  const toHex = (c: number) => c.toString(16).padStart(2, "0");
  const hex = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;

  if (alpha !== 1) {
    const alphaValue = Math.round(alpha * 255);
    return `${hex}${toHex(alphaValue)}`;
  }
  return hex;
};

export default rgbaToHex;
