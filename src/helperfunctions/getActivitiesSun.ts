export const getActivitiesSun = (service, center) => {
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

  service.nearbySearch(nearbyRequest, (results, status) => {
    if (
      status === window.google.maps.places.PlacesServiceStatus.OK &&
      results
    ) {
      return results;
    } else {
      console.error("Nearby search failed:", status);
    }
  });

  const natureReserveRequest = {
    query: "nature reserve",
    location: new window.google.maps.LatLng(center.lat, center.lng),
    radius: 20000,
    keyword: "nature reserve",
  };

  service.textSearch(natureReserveRequest, (results, status) => {
    if (
      status === window.google.maps.places.PlacesServiceStatus.OK &&
      results
    ) {
      setPlaces((prev) => {
        const newResults = results.filter(
          (place) => !prev.some((p) => p.place_id === place.place_id)
        );
        return [...prev, ...newResults];
      });
    } else {
      console.error("Text search for nature reserves failed:", status);
    }
  });
};
