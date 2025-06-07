import { PRIVATE_ROUTES, ROUTES } from "@/constants/routes";
import MaintenancePage from "@/pages/_error/MaintenancePage";
import MissingPage from "@/pages/_error/MissingPage";
import ServerErrorPage from "@/pages/_error/ServerErrorPage";
import { Route, Routes } from "react-router-dom";
import PublicRouteMiddleware from "./PublicRouteMiddleware";
import PrivateRouteMiddleware from "./PrivateRouteMiddleware";

const Routing = () => {
  return (
    <Routes>
      {ROUTES.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PublicRouteMiddleware>{element}</PublicRouteMiddleware>}
        />
      ))}

      {PRIVATE_ROUTES.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PrivateRouteMiddleware>{element}</PrivateRouteMiddleware>}
          // element={element}
        />
      ))}

      <Route path="*" element={<MissingPage />} />
      <Route path="/server-error" element={<ServerErrorPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
    </Routes>
  );
};

export default Routing;
