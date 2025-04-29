import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { ActivityContext } from "../context/ActivitiesContext";
import { StyledWrapper } from "./styled/StyledWrapper";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { SearchContext } from "../context/SearchContext";
import { Main } from "./styled/StyledLayouts";
import { Rating } from "./Rating";

export const RenderActivity = () => {
  const { search } = useContext(SearchContext);
  const { activities } = useContext(ActivityContext);
  const { id } = useParams<{ id: string }>();
  const mapRef = useRef<google.maps.Map | null>(null);

  const activityIndex = parseInt(id ?? "", 10);
  const activity = activities[activityIndex];

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    fetchPlaceDetails();
  };

  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [placeDetails, setPlaceDetails] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

  const location = activity.geometry?.location;

  const searchCenter = useMemo(
    () => ({
      lat: search.location.lat,
      lng: search.location.lng,
    }),
    [search.location.lat, search.location.lng]
  );

  const center = useMemo(
    () => ({
      lat: location?.lat() ?? 0,
      lng: location?.lng() ?? 0,
    }),
    [location]
  );

  useEffect(() => {
    const calculateDirections = () => {
      if (!mapRef.current) return;

      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: searchCenter,
          destination: center,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);

            if (result?.routes[0].legs[0]) {
              const distanceText = result.routes[0].legs[0]?.distance?.text;

              setDistance(distanceText ?? null);
            }
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    };

    if (searchCenter && center) {
      calculateDirections();
    }
  }, [searchCenter, center]);

  const fetchPlaceDetails = () => {
    if (!mapRef.current || !activity.place_id) return;

    const service = new google.maps.places.PlacesService(mapRef.current);

    const request: google.maps.places.PlaceDetailsRequest = {
      placeId: activity.place_id,
      fields: [
        "name",
        "rating",
        "formatted_address",
        "website",
        "opening_hours",
        "photos",
      ],
    };

    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        if (place.photos && place.photos.length > 0) {
          setPhotoUrl(place.photos[0].getUrl({ maxWidth: 350 }));
        }

        setPlaceDetails(place);
      } else {
        console.error("Failed to get place details:", status);
      }
    });
  };

  if (!location) return null;

  return (
    <>
      <Link to="/">Tillbaka</Link>
      <Main width="1000px">
        <StyledWrapper direction="row" gap="16px">
          <div>
            <h4>{activity.name}</h4>
            <div>
              {activity.rating ? (
                <Rating rating={activity.rating}></Rating>
              ) : (
                ""
              )}
              <p>
                {distance && (
                  <span>
                    Avstånd till {activity.name}: {distance}
                  </span>
                )}
              </p>
              <p>
                {activity.formatted_address
                  ? activity.formatted_address
                  : activity.vicinity}
              </p>
              <div>
                <img src={photoUrl} alt={activity.name} />
              </div>

              <div>
                {placeDetails && placeDetails.opening_hours?.weekday_text && (
                  <>
                    <strong>Öppettider:</strong>
                    <ul>
                      {placeDetails.opening_hours.weekday_text.map(
                        (day, index) => (
                          <li key={index}>{day}</li>
                        )
                      )}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div>
              {placeDetails && placeDetails.website && (
                <a href={placeDetails.website}>Gå till hemsidan</a>
              )}
            </div>
          </div>
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            libraries={["places", "geometry"]}
          >
            <GoogleMap
              mapContainerStyle={{
                height: "600px",
                width: "500px",
                top: "0px",
                borderRadius: "5px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
              center={center}
              zoom={search.mapZoom}
              onLoad={onMapLoad}
            >
              <Marker
                position={{
                  lat: location.lat(),
                  lng: location.lng(),
                }}
                title={activity.name}
                onMouseOver={() => {
                  setInfoWindowOpen(true);
                }}
              />
              {infoWindowOpen && placeDetails && (
                <InfoWindow
                  position={center}
                  onCloseClick={() => setInfoWindowOpen(false)}
                  options={{
                    pixelOffset: new google.maps.Size(0, -30),
                  }}
                >
                  <div style={{ maxWidth: "300px" }}>
                    <h4>{placeDetails.name}</h4>
                  </div>
                </InfoWindow>
              )}
              <Marker position={searchCenter} title="Din plats"></Marker>
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    suppressMarkers: true,
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </StyledWrapper>
      </Main>
    </>
  );
};
