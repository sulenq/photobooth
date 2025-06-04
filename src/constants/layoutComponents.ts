import {
  Layout1,
  Layout2,
  Layout3,
  Layout4,
} from "@/components/widget/TemplateLayout";

type SlotNumberingMap = Record<number, number>;

type LayoutComponentConfig = {
  component: React.FC<any>;
  slotNumberingMap: SlotNumberingMap;
};

export const LAYOUT_COMPONENTS: Record<number, LayoutComponentConfig> = {
  1: {
    component: Layout1,
    slotNumberingMap: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
    },
  },
  2: {
    // same as 1 but rotate
    component: Layout2,
    slotNumberingMap: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
    },
  },
  3: {
    component: Layout3,
    slotNumberingMap: {
      1: 1,
      2: 2,
      3: 2,
      4: 3,
      5: 3,
      6: 4,
    },
  },
  4: {
    component: Layout4,
    slotNumberingMap: {
      1: 1,
      2: 1,
      3: 2,
      4: 2,
      5: 3,
      6: 3,
      7: 4,
      8: 4,
    },
  },
  5: {
    component: Layout2,
    slotNumberingMap: {
      1: 1,
      2: 1,
      3: 2,
      4: 3,
    },
  },
};
