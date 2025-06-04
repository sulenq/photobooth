import { Layout1, Layout2, Layout3 } from "@/components/widget/TemplateLayout";
import { SlotKey } from "./types";

type SlotNumberingMap = Record<SlotKey, number>;

type LayoutComponentConfig = {
  component: React.FC<any>;
  slotNumberingMap: SlotNumberingMap;
};

export const LAYOUT_COMPONENTS: Record<string, LayoutComponentConfig> = {
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
    component: Layout2,
    slotNumberingMap: {
      1: 1,
      2: 1,
      3: 2,
      4: 2,
    },
  },
  3: {
    component: Layout3,
    slotNumberingMap: {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
    },
  },
  4: {
    component: Layout2,
    slotNumberingMap: {
      1: 1,
      2: 2,
      3: 2,
      4: 3,
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
