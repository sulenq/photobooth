export const FILTERS = [
  {
    key: "original",
    label: "Original",
    filter(this: any) {
      // no filter
    },
  },
  {
    key: "bw",
    label: "B/W",
    filter(this: any) {
      this.greyscale().contrast(1);
    },
  },
  {
    key: "retro",
    label: "Retro",
    filter(this: any) {
      this.sepia(60).brightness(-7);
    },
  },
  {
    key: "foodie",
    label: "Foodie",
    filter(this: any) {
      this.channels({ red: 10, green: 5, blue: -10 }).saturation(15).contrast(7).brightness(-1);
    },
  },
  {
    key: "vivid",
    label: "Vivid",
    filter(this: any) {
      this.exposure(10).contrast(15);
    },
  },
  {
    key: "bright",
    label: "Bright",
    filter(this: any) {
      this.brightness(15);
    },
  },

  {
    key: "cool",
    label: "Cool",
    filter(this: any) {
      this.channels({ red: -10, green: 10, blue: 30 });
    },
  },
  {
    key: "soft",
    label: "Soft",
    filter(this: any) {
      this.contrast(-10).brightness(10).saturation(-15);
    },
  },
];
