import { ILocation } from "../models/ISearch";

export const getActivitiesSun = (
  service: google.maps.places.PlacesService,
  center: ILocation
): Promise<google.maps.places.PlaceResult[]> => {
  const activitiesSun = [
    "amusement_park",
    "aquarium",
    "book_store",
    "bowling_alley",
    "movie_theater",
    "museum",
    "shopping_mall",
    "tourist_attraction",
    "park",
    "zoo",
    "campground",
    "town_square",
  ];

  const nearbyRequest = {
    location: new window.google.maps.LatLng(center.lat, center.lng),
    radius: 30000,
    types: activitiesSun,
  };

  const natureReserveRequest = {
    query: "nature reserve",
    location: new window.google.maps.LatLng(center.lat, center.lng),
    radius: 20000,
    keyword: "nature reserve",
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

      service.textSearch(natureReserveRequest, (textResults, textStatus) => {
        if (
          textStatus === window.google.maps.places.PlacesServiceStatus.OK &&
          textResults
        ) {
          allResults.push(...textResults);
        } else {
          console.error("Text search for nature reserves failed:", textStatus);
        }

        resolve(allResults);
      });
    });
  });
};
