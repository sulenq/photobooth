import {
  IconApps,
  IconDeviceDesktop,
  IconExclamationCircle,
  IconGavel,
  IconHelpCircle,
  IconHome,
  IconLanguage,
  IconReceipt2,
  IconShieldHalf,
  IconShieldLock,
} from "@tabler/icons-react";

export const NAVS = [
  {
    labelKey: "navs.home",
    path: "/home",
    icon: IconHome,
  },
  {
    labelKey: "navs.invoice",
    path: "/invoice",
    icon: IconReceipt2,
  },
  {
    labelKey: "navs.services",
    path: "/services",
    icon: IconApps,
  },
  {
    labelKey: "navs.helpCenter",
    path: "/help-center",
    icon: IconHelpCircle,
  },
];

export const SETTINGS_NAVS = [
  {
    groupLabelKey: "settings_navs_group.main",
    list: [
      {
        icon: IconDeviceDesktop,
        labelKey: "settings_navs.display",
        path: "/settings/display",
      },
      {
        icon: IconLanguage,
        labelKey: "settings_navs.regional",
        path: "/settings/regional",
      },
      {
        icon: IconShieldHalf,
        labelKey: "settings_navs.permissions",
        path: "/settings/permissions",
      },
    ],
  },
  {
    groupLabelKey: "settings_navs_group.others",
    list: [
      {
        icon: IconExclamationCircle,
        labelKey: "settings_navs.report_problem",
        path: "/settings/report-problem",
      },
      {
        icon: IconGavel,
        labelKey: "settings_navs.terms_of_service",
        path: "/settings/terms-of-service",
      },
      {
        icon: IconShieldLock,
        labelKey: "settings_navs.privacy_policy",
        path: "/settings/privacy-policy",
      },
    ],
  },
];
