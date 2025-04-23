import { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { StyledWrapper } from "../components/styled/StyledWrapper";
import { getWeather } from "../helperfunctions/getWeather";
import { WeatherContext, WeatherEnum } from "../context/WeatherContext";

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

export const Start = () => {
  const { search } = useContext(SearchContext);
  const { weather, weatherDispatch } = useContext(WeatherContext);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);

  const center = {
    lat: search.location.lat,
    lng: search.location.lng,
  };

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    if (search.search && mapRef.current && window.google) {
      const service = new window.google.maps.places.PlacesService(
        mapRef.current
      );

      const getWeatherData = async () => {
        const response = await getWeather(center.lat, center.lng);
        weatherDispatch({
          type: WeatherEnum.ADDED,
          payload: response,
        });
      };
      getWeatherData();

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
          setPlaces((prev) => {
            const newResults = results.filter(
              (place) => !prev.some((p) => p.place_id === place.place_id)
            );
            return [...prev, ...newResults];
          });
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
    }
  }, [search.search, search.checks, center.lat, center.lng, weatherDispatch]);

  return (
    <>
      <h3>
        Den {weather.forecastDays[0].interval.startTime} ska det vara{" "}
        {weather.forecastDays[0].maxTemperature.degrees}. Dessa aktiviteter är
        anpassade efter din filtrering. Längre ner kan du se alla aktiviteter
        möjliga [datum] - [plats]
      </h3>

      <StyledWrapper direction="row" gap="30px">
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "50%" }}
            center={center}
            zoom={search.mapZoom}
            onLoad={onMapLoad}
          >
            {places.map((place, index) => {
              const location = place.geometry?.location;
              if (!location) return null;

              return (
                <Marker
                  key={index}
                  position={{
                    lat: location.lat(),
                    lng: location.lng(),
                  }}
                  title={place.name}
                />
              );
            })}
          </GoogleMap>
        </LoadScript>
      </StyledWrapper>
    </>
  );
};
