const getLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(null);

    navigator.geolocation.getCurrentPosition(resolve, () => reject(null));
  });
};

export default getLocation;
