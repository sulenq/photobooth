const formatNumber = (numParam: number | string | undefined | null): string => {
  if (numParam === null || numParam === undefined) return "";

  let num: number;

  if (typeof numParam === "string") {
    num = parseFloat(numParam.replace(",", "."));
  } else {
    num = numParam;
  }

  // Cek apakah angka memiliki desimal
  const hasDecimal = num.toString().includes(".");

  // Format angka
  const formattedNum = hasDecimal
    ? num.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20,
      })
    : num.toLocaleString("id-ID");

  return formattedNum;
};

export default formatNumber;
