import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { ActivityContext } from "../context/ActivitiesContext";
import { StyledActivityWrapper } from "./styled/StyledWrapper";
import {
  LoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { SearchContext } from "../context/SearchContext";
import { Main } from "./styled/StyledLayouts";

import { formatOpeningHours } from "../helperfunctions/formatOpeningHours";
import { ActivityPresentation } from "./AcitivityPresentation";

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
    calculateDirections();
  };

  const [placeDetails, setPlaceDetails] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>("");

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [openHours, setOpenHours] = useState<string[]>([]);

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
    if (placeDetails && placeDetails?.opening_hours?.weekday_text) {
      const open = placeDetails.opening_hours.weekday_text;
      const formattedTime = formatOpeningHours(open);
      setOpenHours(formattedTime);
    }
  }, [placeDetails]);

  const calculateDirections = () => {
    if (mapRef.current) {
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
    }
  };
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
      <Main width="1500px">
        <StyledActivityWrapper direction="row" gap="32px">
          <ActivityPresentation
            activity={activity}
            placeDetails={placeDetails}
            openHours={openHours}
            distance={distance}
            photoUrl={photoUrl}
          />

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
              />

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
        </StyledActivityWrapper>
      </Main>
    </>
  );
};
