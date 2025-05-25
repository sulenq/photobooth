import { create } from "zustand";

interface Props {
  locationPermissionsStatus: PermissionState;
  updateLocationPermissionsStatus: () => void;
}

const useLocationPermissions = create<Props>((set) => {
  let initialStatus: PermissionState = "prompt";

  if (typeof navigator !== "undefined" && navigator.permissions) {
    navigator.permissions
      .query({ name: "geolocation" as PermissionName })
      .then((result) => {
        initialStatus = result.state;
        set({ locationPermissionsStatus: result.state });

        result.onchange = () =>
          set({ locationPermissionsStatus: result.state });
      })
      .catch(() => set({ locationPermissionsStatus: "denied" }));
  }

  return {
    locationPermissionsStatus: initialStatus,
    updateLocationPermissionsStatus: async () => {
      try {
        const result = await navigator.permissions.query({
          name: "geolocation" as PermissionName,
        });
        set({ locationPermissionsStatus: result.state });
      } catch (error) {
        console.error(error);
        set({ locationPermissionsStatus: "denied" });
      }
    },
  };
});

export default useLocationPermissions;
