export const FILTERS = [
  {
    key: "original",
    label: "Original",
    filter(this: any) {
      // no filter
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
    key: "bw",
    label: "B/W",
    filter(this: any) {
      this.greyscale().contrast(20);
    },
  },
  {
    key: "sepia",
    label: "Sepia",
    filter(this: any) {
      this.sepia(60);
    },
  },
  {
    key: "warm",
    label: "Warm",
    filter(this: any) {
      this.channels({ red: 30, green: 10, blue: -10 });
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
