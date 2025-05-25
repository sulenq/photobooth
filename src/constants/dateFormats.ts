export const DATE_FORMATS = [
  {
    key: "dmy",
    description: "Day-Month-Year",
    label: "DMY", // Format: Day-Month-Year
    basic: { day: "numeric", month: "numeric", year: "numeric" },
    // example: 5-11-2001

    shortMonth: { day: "numeric", month: "short", year: "numeric" },
    // example: 5 Nov 2001

    fullMonth: { day: "numeric", month: "long", year: "numeric" },
    // example: 5 November 2001

    monthYear: { month: "long", year: "numeric" },
    // example: November 2001

    shortMonthDay: { day: "numeric", month: "short" },
    // example: 5 Nov

    fullMonthDay: { day: "numeric", month: "long" },
    // example: 5 November

    // Variant with weekday
    weekdayBasic: {
      weekday: "short",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    },
    // example: Sen, 5-11-2001

    weekdayShortMonth: {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    },
    // example: Sen, 5 Nov 2001

    weekdayFullMonth: {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
    // example: Senin, 5 November 2001
  },
  {
    key: "mdy",
    description: "Month-Day-Year",
    label: "MDY", // Format: Month-Day-Year
    basic: { month: "numeric", day: "numeric", year: "numeric" },
    // example: 11-5-2001

    shortMonth: { month: "short", day: "numeric", year: "numeric" },
    // example: Nov 5 2001

    fullMonth: { month: "long", day: "numeric", year: "numeric" },
    // example: November 5, 2001

    monthYear: { month: "long", year: "numeric" },
    // example: November 2001

    shortMonthDay: { month: "short", day: "numeric" },
    // example: Nov 5

    fullMonthDay: { month: "long", day: "numeric" },
    // example: November 5

    // Variant with weekday
    weekdayBasic: {
      weekday: "short",
      month: "numeric",
      day: "numeric",
      year: "numeric",
    },
    // example: Sen, 11-5-2001

    weekdayShortMonth: {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    },
    // example: Sen, Nov 5 2001

    weekdayFullMonth: {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
    // example: Senin, November 5, 2001
  },
  {
    key: "ymd",
    description: "Year-Month-Day",
    label: "YMD", // Format: Year-Month-Day
    basic: { year: "numeric", month: "numeric", day: "numeric" },
    // example: 2001-11-5

    shortMonth: { year: "numeric", month: "short", day: "numeric" },
    // example: 2001 Nov 5

    fullMonth: { year: "numeric", month: "long", day: "numeric" },
    // example: 2001 November 5

    monthYear: { year: "numeric", month: "long" },
    // example: 2001 November

    shortMonthDay: { month: "short", day: "numeric" },
    // example: Nov 5

    fullMonthDay: { month: "long", day: "numeric" },
    // example: November 5

    // Variant with weekday
    weekdayBasic: {
      weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    },
    // example: Sen, 2001-11-5

    weekdayShortMonth: {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    // example: Sen, 2001 Nov 5

    weekdayFullMonth: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
    // example: Senin, 2001 November 5
  },
];
