import ChooseTemplatePage from "@/pages/ChooseTemplatePage";
import ChooseProductPage from "@/pages/ChooseProductPage";
import EditPhotoPage from "@/pages/EditPhotoPage";
import PaymentPage from "@/pages/PaymentPage";
import PaymentStatusPage from "@/pages/PaymentStatusPage";
import PrintSendPage from "@/pages/PrintSendPage";
import ProcedurePage from "@/pages/ProcedurePage";
import RootPage from "@/pages/RootPage";
import SettingsPage from "@/pages/SettingsPage";
import TakePhotoPage from "@/pages/TakePhotoPage";
import ThankyouPage from "@/pages/ThankyouPage";
import DisplaySettingsPage from "@/pages/_settings/DisplaySettingsPage";
import PermissionsSettingsPage from "@/pages/_settings/PermissionsSettingsPage";
import PrivacyPolictPage from "@/pages/_settings/PrivacyPolictPage";
import RegionalSettingsPage from "@/pages/_settings/RegionalSettingsPage";
import ReportProblemPage from "@/pages/_settings/ReportProblemPage";
import TermsOfServicePage from "@/pages/_settings/TermsOfServicePage";
import { Interface__PrivateRoute, Interface__Route } from "./interfaces";

export const ROUTES: Interface__Route[] = [
  {
    path: "/",
    activePath: "/",
    element: <RootPage />,
  },
  {
    path: "/choose-product",
    activePath: "/choose-product",
    element: <ChooseProductPage />,
  },
  {
    path: "/payment",
    activePath: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/payment-status",
    activePath: "/payment-status",
    element: <PaymentStatusPage />,
  },
];

export const PRIVATE_ROUTES: Interface__PrivateRoute[] = [
  {
    path: "/procedure",
    activePath: "/procedure",
    element: <ProcedurePage />,
  },
  {
    path: "/take-photo",
    activePath: "/take-photo",
    element: <TakePhotoPage />,
  },
  {
    path: "/choose-template",
    activePath: "/choose-template",
    element: <ChooseTemplatePage />,
  },
  {
    path: "/edit-photo",
    activePath: "/edit-photo",
    element: <EditPhotoPage />,
  },
  {
    path: "/print-send",
    activePath: "/print-send",
    element: <PrintSendPage />,
  },
  {
    path: "/thankyou",
    activePath: "/thankyou",
    element: <ThankyouPage />,
  },

  // Settings
  {
    path: "/settings",
    activePath: "/settings",
    titleKey: "navs.settings",
    element: <SettingsPage />,
  },
  {
    path: "/settings/display",
    activePath: "/settings",
    titleKey: "settings_navs.display",
    backPath: "/settings",
    element: <DisplaySettingsPage />,
  },
  {
    path: "/settings/regional",
    activePath: "/settings",
    titleKey: "settings_navs.regional",
    backPath: "/settings",
    element: <RegionalSettingsPage />,
  },
  {
    path: "/settings/permissions",
    activePath: "/settings",
    titleKey: "settings_navs.permissions",
    backPath: "/settings",
    element: <PermissionsSettingsPage />,
  },
  {
    path: "/settings/report-problem",
    activePath: "/settings",
    titleKey: "settings_navs.report_problem",
    backPath: "/settings",
    element: <ReportProblemPage />,
  },
  {
    path: "/settings/terms-of-service",
    activePath: "/settings",
    titleKey: "settings_navs.terms_of_service",
    backPath: "/settings",
    element: <TermsOfServicePage />,
  },
  {
    path: "/settings/privacy-policy",
    activePath: "/settings",
    titleKey: "settings_navs.privacy_policy",
    backPath: "/settings",
    element: <PrivacyPolictPage />,
  },
  // {
  //   path: "/profile",
  //   labelKey: "navs.profile",
  //   element: <MerchantProfilePage />,
  // },
];
