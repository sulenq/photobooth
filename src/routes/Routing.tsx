import NavsContainer from "@/components/widget/NavsContainer";
import { PRIVATE_ROUTES, ROUTES } from "@/constants/routes";
import useLang from "@/context/useLang";
import MaintenancePage from "@/pages/_error/MaintenancePage";
import MissingPage from "@/pages/_error/MissingPage";
import ServerErrorPage from "@/pages/_error/ServerErrorPage";
import pluck from "@/utils/pluck";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
  // Contexts
  const { l } = useLang();

  return (
    <Routes>
      {ROUTES.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {PRIVATE_ROUTES.map(
        ({ path, activePath, backPath, titleKey, element }) => (
          <Route
            key={path}
            path={path}
            element={
              // <AuthMiddleware allowedPermissions={permissions}>
              <NavsContainer
                activePath={activePath}
                title={pluck(l, titleKey)}
                backPath={backPath}
              >
                {element}
              </NavsContainer>
              // </AuthMiddleware>
            }
          />
        )
      )}

      <Route path="*" element={<MissingPage />} />
      <Route path="/server-error" element={<ServerErrorPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
    </Routes>
  );
};

export default Routing;
