import {
  useCallback,
  useState,
} from "react";

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export const useLocation = () => {
  const [location, setLocation] =
    useState<UserLocation | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const getCurrentLocation = useCallback(
    () => {
      if (!navigator.geolocation) {
        setError(
          "Geolocation is not supported by this browser."
        );

        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude:
              position.coords.latitude,
            longitude:
              position.coords.longitude,
            accuracy:
              position.coords.accuracy,
          });

          setLoading(false);
        },

        (positionError) => {
          let message =
            "Unable to detect your location.";

          if (
            positionError.code ===
            positionError.PERMISSION_DENIED
          ) {
            message =
              "Location permission was denied. You can select the location manually.";
          }

          setError(message);
          setLoading(false);
        },

        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 30000,
        }
      );
    },
    []
  );

  return {
    location,
    loading,
    error,
    getCurrentLocation,
  };
};

export default useLocation;