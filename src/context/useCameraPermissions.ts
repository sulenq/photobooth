import { create } from "zustand";

interface Props {
  cameraPermissionsStatus: PermissionState;
  updateCameraPermissionsStatus: () => void;
}

const useCameraPermission = create<Props>((set) => {
  let initialStatus: PermissionState = "prompt";

  if (typeof navigator !== "undefined" && navigator.permissions) {
    navigator.permissions
      .query({ name: "camera" as PermissionName })
      .then((result) => {
        initialStatus = result.state;
        set({ cameraPermissionsStatus: result.state });

        result.onchange = () => set({ cameraPermissionsStatus: result.state });
      })
      .catch(() => set({ cameraPermissionsStatus: "denied" }));
  }

  return {
    cameraPermissionsStatus: initialStatus,
    updateCameraPermissionsStatus: async () => {
      try {
        const result = await navigator.permissions.query({
          name: "camera" as PermissionName,
        });
        set({ cameraPermissionsStatus: result.state });
      } catch (error) {
        console.error(error);
        set({ cameraPermissionsStatus: "denied" });
      }
    },
  };
});

export default useCameraPermission;
