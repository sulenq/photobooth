const parseNumber = (numString: string | undefined | null): number | null => {
  if (!numString) return null;

  // Ganti koma dengan titik untuk parsing
  const cleanedString = numString.replace(/\./g, "").replace(",", ".");

  const parsedNumber = parseFloat(cleanedString);
  return isNaN(parsedNumber) ? null : parsedNumber;
};

export default parseNumber;
