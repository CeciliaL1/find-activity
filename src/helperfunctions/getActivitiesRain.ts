import { ILocation } from "../models/ISearch";

export const getActivitiesRain = (
  service: google.maps.places.PlacesService,
  center: ILocation
): Promise<google.maps.places.PlaceResult[]> => {
  const activitiesRain = [
    "amusement_park",
    "aquarium",
    "book_store",
    "bowling_alley",
    "movie_theater",
    "museum",
    "shopping_mall",
    "tourist_attraction",
  ];

  const nearbyRequest = {
    location: new window.google.maps.LatLng(center.lat, center.lng),
    radius: 30000,
    types: activitiesRain,
  };

  return new Promise((resolve, reject) => {
    const allResults: google.maps.places.PlaceResult[] = [];

    service.nearbySearch(nearbyRequest, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results
      ) {
        allResults.push(...results);
      } else {
        console.error("Nearby search failed:", status);
      }
      resolve(allResults);
    });
  });
};
