const makeDateTime = (isoDate: string, time: string): Date => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const dateObj = new Date(isoDate);

  dateObj.setHours(hours, minutes, seconds, 0);

  return dateObj;
};

export default makeDateTime;
