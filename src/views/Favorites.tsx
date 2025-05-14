import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useState, useRef, useCallback, useEffect, useContext } from "react";
import { getLocalStorage } from "../helperfunctions/getLocalStorage";
import { Rating } from "../components/Rating";
import {
  StyledWrapper,
  StyledActivitiesWrapper,
} from "../components/styled/StyledWrapper";
import { SearchContext } from "../context/SearchContext";
import { WeatherContext } from "../context/WeatherContext";
import { Link } from "react-router";

export const Favorites = () => {
  const { search } = useContext(SearchContext);
  const { weather } = useContext(WeatherContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const [placesDetails, setPlacesDetails] = useState<
    google.maps.places.PlaceResult[]
  >([]);
  const dummyDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = (map: google.maps.Map) => {
    console.log("Google Map loaded", map);
    mapRef.current = map;
  };

  const fetchPlaceDetails = useCallback(
    (placeId: string, service: google.maps.places.PlacesService) => {
      return new Promise<google.maps.places.PlaceResult | null>((resolve) => {
        const request: google.maps.places.PlaceDetailsRequest = {
          placeId,
          fields: [
            "place_id",
            "name",
            "rating",
            "formatted_address",
            "website",
            "opening_hours",
            "photos",
            "icon",
            "icon_background_color",
          ],
        };

        service.getDetails(request, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            resolve(place);
          } else {
            console.error(`Failed to fetch details for ${placeId}`, status);
            resolve(null);
          }
        });
      });
    },
    []
  );

  const fetchAllFavorites = useCallback(async () => {
    if (!window.google || !dummyDivRef.current) return;

    const favorites = getLocalStorage<string[]>("favorites") || [];
    const service = new google.maps.places.PlacesService(dummyDivRef.current);

    const detailPromises = favorites.map((id) =>
      fetchPlaceDetails(id, service)
    );
    const allDetails = await Promise.all(detailPromises);
    setPlacesDetails(
      allDetails.filter(
        (place): place is google.maps.places.PlaceResult => !!place
      )
    );
    setIsLoading(false);
  }, [fetchPlaceDetails]);
  useEffect(() => {
    if (isScriptLoaded && dummyDivRef.current) {
      fetchAllFavorites();
    }
  }, [isScriptLoaded, fetchAllFavorites]);

  return (
    <>
      <Link to="/">Tillbaka</Link>

      {isLoading && <h2>Loading...</h2>}

      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        libraries={["places"]}
        onLoad={() => {
          console.log("Google Maps script loaded");
          setIsScriptLoaded(true);
        }}
      >
        <div ref={dummyDivRef} style={{ display: "none" }} />
        <GoogleMap onLoad={onMapLoad} />
      </LoadScript>

      {placesDetails.map((place, index) => (
        <StyledWrapper direction="column" gap="16" margintop="45px" key={index}>
          <StyledActivitiesWrapper
            background={
              place.icon_background_color
                ? place.icon_background_color
                : "#f2f2f2"
            }
            key={index}
          >
            <div>
              <div>
                <img
                  src={place.icon}
                  alt={place.name}
                  width="20px"
                  height="20px"
                />
                <h4>
                  <Link
                    to={`/${place.place_id}/${weather.forecastDays[0].daytimeForecast.precipitation.probability.percent}/${search.location.lat}/${search.location.lng}`}
                  >
                    {place.name}
                  </Link>
                </h4>
              </div>
            </div>
            <div>
              {place.rating ? <Rating rating={place.rating}></Rating> : ""}
            </div>
            <div>
              <p>
                {place.formatted_address
                  ? place.formatted_address
                  : place.vicinity}
              </p>
            </div>
          </StyledActivitiesWrapper>
        </StyledWrapper>
      ))}
    </>
  );
};
