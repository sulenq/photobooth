import { toaster } from "@/components/ui/toaster";
import useAuthMiddleware from "@/context/useAuthMiddleware";
import useLang from "@/context/useLang";
import useRequest from "@/hooks/useRequest";
import { Center, Icon, Spinner } from "@chakra-ui/react";
import { IconShieldCheckFilled } from "@tabler/icons-react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface Props {
  allowedPermissions?: number[];
  children: any;
  redirectTo?: string;
}

const AuthMiddleware = ({
  allowedPermissions = [],
  children,
  redirectTo = "/",
}: Props) => {
  // Contexts
  const { l } = useLang();
  const { authToken, permissions, setPermissions, hasPermissions } =
    useAuthMiddleware();

  // Utils
  const { req, loading } = useRequest({
    id: "middleware",
    showLoadingToast: false,
    showSuccessToast: false,
  });
  const navigate = useNavigate();

  // No auth token toast on 1st render
  useEffect(() => {
    if (!authToken || !hasPermissions(allowedPermissions)) {
      toaster.create({
        type: "error",
        title: l.no_auth_toast.title,
        description: l.no_auth_toast.description,
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  }, [authToken, permissions]);

  // Handle permissions
  useEffect(() => {
    function handleOnSuccess(r: any) {
      const permissions = r?.data?.data?.permission;
      if (Array.isArray(permissions)) {
        setPermissions(permissions);
      }
    }

    if (authToken) {
      if (!permissions) {
        const config = {
          url: `/rski/dashboard/user-info`,
        };
        req({
          config,
          onResolve: {
            onSuccess: handleOnSuccess,
            onError: () => {
              navigate(redirectTo);
            },
          },
        });
      }
    }
  }, []);

  // Handle redirect to
  const Redirect = () => {
    return <Navigate to={redirectTo} />;
  };

  return (
    <>
      {!authToken && <Redirect />}

      {(loading || !permissions) && (
        <Center w={"100w"} minH={"100dvh"} color={"fg.subtle"}>
          <Center position={"relative"}>
            <Spinner position={"absolute"} w={"60px"} h={"60px"} />
            <Icon>
              <IconShieldCheckFilled size={32} />
            </Icon>
          </Center>
        </Center>
      )}

      {!loading && permissions && (
        <>{hasPermissions(allowedPermissions) ? children : <Redirect />}</>
      )}
    </>
  );
};

export default AuthMiddleware;
