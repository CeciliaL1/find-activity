import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SearchContext } from "../context/SearchContext";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { StyledWrapper } from "../components/styled/StyledWrapper";
import { getWeather } from "../helperfunctions/getWeather";
import { WeatherContext, WeatherEnum } from "../context/WeatherContext";
import { getActivitiesSun } from "../helperfunctions/getActivitiesSun";
import { getActivitiesRain } from "../helperfunctions/getActivitiesRain";
import { RenderActivities } from "../components/RenderActivities";
import { ActivitiesEnum, ActivityContext } from "../context/ActivitiesContext";

export const Start = () => {
  const { search } = useContext(SearchContext);
  const { weather, weatherDispatch } = useContext(WeatherContext);
  const { activities, activitiesDispatch } = useContext(ActivityContext);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [textMessage, setTextMessage] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(true);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const center = useMemo(() => {
    if (search.location.lat === 0 && search.location.lat === 0) {
      return { lat: 55.60587, lng: 13.00073 };
    }
    return {
      lat: search.location.lat,
      lng: search.location.lng,
    };
  }, [search.location]);

  const fetchSunPlaces = useCallback(
    async (
      service: google.maps.places.PlacesService,
      center: { lat: number; lng: number }
    ) => {
      try {
        const results = await getActivitiesSun(service, center);
        activitiesDispatch({
          type: ActivitiesEnum.ADD,
          payload: results,
        });
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    },
    [activitiesDispatch]
  );

  const fetchRainPlaces = useCallback(
    async (
      service: google.maps.places.PlacesService,
      center: { lat: number; lng: number }
    ) => {
      try {
        const results = await getActivitiesRain(service, center);
        activitiesDispatch({
          type: ActivitiesEnum.ADD,
          payload: results,
        });
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    },
    [activitiesDispatch]
  );
  useEffect(() => {
    if (search.location.lat === 0 && search.location.lng === 0) {
      setTextMessage(
        "Problem med hämtning av vädret och din plats, Aktiviteterna och platsen är inte anpassade"
      );
    }
    if (search.search && mapRef.current && window.google && !hasFetched) {
      const service = new window.google.maps.places.PlacesService(
        mapRef.current
      );

      const getWeatherData = async (
        service: google.maps.places.PlacesService
      ) => {
        try {
          setLoadingWeather(true);
          const response = await getWeather(center.lat, center.lng);

          weatherDispatch({
            type: WeatherEnum.ADDED,
            payload: response,
          });

          const precipitation =
            response?.forecastDays?.[0]?.daytimeForecast?.precipitation
              ?.probability?.percent ?? 100;

          if (precipitation < 30) {
            await fetchSunPlaces(service, center);
          } else {
            await fetchRainPlaces(service, center);
          }
          if (search.location.lat != 0 && search.location.lng != 0) {
            setTextMessage(`
    Idag är max temperaturen
    ${response.forecastDays[0].maxTemperature.degrees}°. Det är ${response.forecastDays[0].daytimeForecast.precipitation.probability.percent}% chans för nederbörd.
    Dessa aktiviteter är anpassade efter din filtrering.
  `);
          }
        } catch (error) {
          console.error("Weather fetch failed:", error);

          setTextMessage(
            "Problem med hämtning av vädret och din plats, Aktiviteterna och platsen är inte anpassade"
          );
        } finally {
          setLoadingWeather(false);
          setHasFetched(true);
        }
      };

      getWeatherData(service);
    }
  }, [
    search.search,
    center,
    weatherDispatch,
    hasFetched,
    fetchSunPlaces,
    fetchRainPlaces,
    weather.forecastDays,
  ]);

  return (
    <>
      <h5>
        {search.search
          ? loadingWeather
            ? "Laddar väder..."
            : textMessage
          : ""}
      </h5>
      <StyledWrapper direction="row" gap="30px">
        <RenderActivities activities={activities} />
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          libraries={["places"]}
        >
          <GoogleMap
            key={`${center.lat}-${center.lng}`}
            mapContainerStyle={{
              height: "600px",
              width: `${search.search ? "500px" : "900px"}`,
              marginBottom: "30px",
              position: "sticky",
              top: "50px",
              borderRadius: "5px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
            center={center}
            zoom={search.mapZoom}
            onLoad={onMapLoad}
          >
            {activities.map((place, index) => {
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
