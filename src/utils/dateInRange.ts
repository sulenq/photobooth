export default function dateInRange(
  date: Date | string,
  range: { from: Date | string; to: Date | string },
  includeStartDate?: boolean,
  includeEndDate?: boolean
) {
  const dateObj = new Date(date);
  const startDate = new Date(range?.from);
  const endDate = new Date(range?.to);

  return (
    (includeStartDate ? dateObj >= startDate : dateObj > startDate) &&
    (includeEndDate ? dateObj <= endDate : dateObj < endDate)
  );
}
