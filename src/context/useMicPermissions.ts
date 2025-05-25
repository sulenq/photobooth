import { create } from "zustand";

interface Props {
  micPermissionsStatus: PermissionState;
  updateMicPermissionsStatus: () => void;
}

const useMicPermissions = create<Props>((set) => {
  let initialStatus: PermissionState = "prompt";

  if (typeof navigator !== "undefined" && navigator.permissions) {
    navigator.permissions
      .query({ name: "microphone" as PermissionName })
      .then((result) => {
        initialStatus = result.state;
        set({ micPermissionsStatus: result.state });

        result.onchange = () => set({ micPermissionsStatus: result.state });
      })
      .catch(() => set({ micPermissionsStatus: "denied" }));
  }

  return {
    micPermissionsStatus: initialStatus,
    updateMicPermissionsStatus: async () => {
      try {
        const result = await navigator.permissions.query({
          name: "microphone" as PermissionName,
        });
        set({ micPermissionsStatus: result.state });
      } catch (error) {
        console.error(error);
        set({ micPermissionsStatus: "denied" });
      }
    },
  };
});

export default useMicPermissions;
