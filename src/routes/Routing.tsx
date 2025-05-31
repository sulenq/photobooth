import { PRIVATE_ROUTES, ROUTES } from "@/constants/routes";
import MaintenancePage from "@/pages/_error/MaintenancePage";
import MissingPage from "@/pages/_error/MissingPage";
import ServerErrorPage from "@/pages/_error/ServerErrorPage";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
  return (
    <Routes>
      {ROUTES.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {PRIVATE_ROUTES.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            // <AuthMiddleware>
            element
            // </AuthMiddleware>
          }
        />
      ))}

      <Route path="*" element={<MissingPage />} />
      <Route path="/server-error" element={<ServerErrorPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
    </Routes>
  );
};

export default Routing;
