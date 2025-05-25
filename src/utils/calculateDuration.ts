const calculateDuration = (timeFrom: string, timeTo: string): number => {
  const timeStart: Date = new Date(timeFrom);

  const timeEnd: Date = new Date(timeTo);

  const jarakWaktu: number = timeEnd.getTime() - timeStart.getTime();

  return jarakWaktu / 1000;
};

export default calculateDuration;
