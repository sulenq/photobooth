import { create } from "zustand";

interface Props {
  authToken?: string;
  role?: object;
  permissions?: number[];
  setAuthToken: (newState: Props["authToken"]) => void;
  setRole: (newState: Props["role"]) => void;
  setPermissions: (newState: Props["permissions"]) => void;
  hasPermissions: (allowedPermissions: number[]) => boolean;
}

const useAuthMiddleware = create<Props>((set, get) => ({
  authToken: localStorage.getItem("__auth_token") || undefined,
  setAuthToken: (newState) =>
    set(() => ({
      authToken: newState,
    })),

  role: undefined,
  setRole: (newState) =>
    set(() => ({
      role: newState,
    })),

  permissions: undefined,
  setPermissions: (newState) =>
    set(() => ({
      permissions: newState,
    })),

  hasPermissions: (allowedPermissions) => {
    const userPermissions = get().permissions ?? [];
    return allowedPermissions.every((perm) => {
      if (userPermissions) {
        return userPermissions.includes(perm);
      } else {
        return false;
      }
    });
  },
}));

export default useAuthMiddleware;
