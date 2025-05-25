const convertToSeconds = (time: string): number => {
  // Mengambil bagian jam, menit, dan detik dari format h:m:s
  const [hours, minutes, seconds] = time.split(":").map(Number);

  // Menghitung total detik
  return hours * 3600 + minutes * 60 + seconds;
};

const getSecondsDurationFromTimeRange = (
  timeFrom: string | undefined,
  timeTo: string | undefined
): number | undefined => {
  if (timeFrom && timeTo) {
    const secondsFrom = convertToSeconds(timeFrom);
    const secondsTo = convertToSeconds(timeTo);

    // Jika timeTo lebih kecil dari timeFrom, anggap timeTo adalah waktu setelah tengah malam
    let durationInSeconds =
      secondsTo >= secondsFrom
        ? secondsTo - secondsFrom
        : 24 * 3600 - secondsFrom + secondsTo;

    return durationInSeconds;
  } else {
    return undefined;
  }
};

export default getSecondsDurationFromTimeRange;
