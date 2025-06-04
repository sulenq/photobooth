import {
  Layout1,
  Layout2,
  Layout3,
  Layout4,
  Layout5,
  Layout6,
  Layout7,
} from "@/components/widget/TemplateLayout";
import { FC } from "react";

type LayoutComponentConfig = {
  component: FC<any>;
};

// format item => slotId:numbering
export const LAYOUT_COMPONENTS: Record<number, LayoutComponentConfig> = {
  1: {
    component: Layout1,
  },
  2: {
    // same as 1 but rotate
    component: Layout2,
  },
  3: {
    component: Layout3,
  },
  4: {
    component: Layout4,
  },
  5: {
    component: Layout5,
  },
  6: {
    component: Layout6,
  },
  7: {
    component: Layout7,
  },
};
