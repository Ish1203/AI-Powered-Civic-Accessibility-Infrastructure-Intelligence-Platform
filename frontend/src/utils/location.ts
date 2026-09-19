import type { LocationData } from "../types/reports";

export const getCurrentLocation =
  (): Promise<GeolocationPosition> => {
    return new Promise(
      (resolve, reject) => {
        if (!navigator.geolocation) {
          reject(
            new Error(
              "Geolocation is not supported by this browser."
            )
          );

          return;
        }

        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 30000,
          }
        );
      }
    );
  };

export const getCoordinates =
  async (): Promise<LocationData> => {
    const position =
      await getCurrentLocation();

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  };

export const formatCoordinates = (
  latitude: number,
  longitude: number
) => {
  return `${latitude.toFixed(
    6
  )}, ${longitude.toFixed(6)}`;
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const earthRadius = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadius * c;
};

export const isValidCoordinates = (
  latitude: number,
  longitude: number
) => {
  return (
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
};