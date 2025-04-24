import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { StyledWrapper } from "../components/styled/StyledWrapper";
import { getWeather } from "../helperfunctions/getWeather";
import { WeatherContext, WeatherEnum } from "../context/WeatherContext";
import { getActivitiesSun } from "../helperfunctions/getActivitiesSun";
import { getActivitiesRain } from "../helperfunctions/getActivitiesRain";
import { RenderActivities } from "../components/RenderActivities";

export const Start = () => {
  const { search } = useContext(SearchContext);
  const { weather, weatherDispatch } = useContext(WeatherContext);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const center = useMemo(
    () => ({
      lat: search.location.lat,
      lng: search.location.lng,
    }),
    [search.location.lat, search.location.lng]
  );

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
        const precipitation =
          response?.forecastDays?.[0]?.dayTimeForecast?.precipitation
            .probability.percent ?? 100;

        if (precipitation > 30) {
          fetchSunPlaces(service, center, setPlaces);
        } else if (precipitation < 50) {
          fetchRainPlaces(service, center, setPlaces);
        }
      };

      getWeatherData();
    }
  }, [search.search, center, weatherDispatch]);

  const fetchSunPlaces = async (
    service: google.maps.places.PlacesService,
    center: { lat: number; lng: number },
    setPlaces: React.Dispatch<
      React.SetStateAction<google.maps.places.PlaceResult[]>
    >
  ) => {
    try {
      const results = await getActivitiesSun(service, center);
      setPlaces((prev) => {
        const newResults = results.filter(
          (place) => !prev.some((p) => p.place_id === place.place_id)
        );
        return [...prev, ...newResults];
      });
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };
  const fetchRainPlaces = async (
    service: google.maps.places.PlacesService,
    center: { lat: number; lng: number },
    setPlaces: React.Dispatch<
      React.SetStateAction<google.maps.places.PlaceResult[]>
    >
  ) => {
    try {
      const results = await getActivitiesRain(service, center);
      setPlaces((prev) => {
        const newResults = results.filter(
          (place) => !prev.some((p) => p.place_id === place.place_id)
        );
        return [...prev, ...newResults];
      });
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  return (
    <>
      <h3>
        Den {weather.forecastDays[0].interval.startTime} ska det vara{" "}
        {weather.forecastDays[0].maxTemperature.degrees}. Dessa aktiviteter är
        anpassade efter din filtrering. Längre ner kan du se alla aktiviteter
        möjliga [datum] - [plats]
      </h3>

      <StyledWrapper direction="row" gap="30px">
        <RenderActivities activities={places} />
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "40%" }}
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
