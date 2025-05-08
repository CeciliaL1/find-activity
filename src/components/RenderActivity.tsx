import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router";

import { StyledActivityWrapper } from "./styled/StyledWrapper";
import {
  LoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { Main } from "./styled/StyledLayouts";
import { getActivitiesRain } from "../helperfunctions/getActivitiesRain";
import { getActivitiesSun } from "../helperfunctions/getActivitiesSun";
import { formatOpeningHours } from "../helperfunctions/formatOpeningHours";
import { ActivityPresentation } from "./AcitivityPresentation";

export const RenderActivity = () => {
  console.log("API Key:", import.meta.env.VITE_GOOGLE_API_KEY);

  const { placeId } = useParams<{ placeId: string }>();
  const { weather } = useParams<{ weather: string }>();
  const { lat } = useParams<{ lat: string }>();
  const { lng } = useParams<{ lng: string }>();

  const mapRef = useRef<google.maps.Map | null>(null);
  const [activity, setActivity] = useState<google.maps.places.PlaceResult>();

  const [placeDetails, setPlaceDetails] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>("");

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [openHours, setOpenHours] = useState<string[]>([]);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    getActivities(mapRef.current);
    fetchPlaceDetails();
    calculateDirections();
  };

  const originLocation = useMemo(() => {
    return { lat: Number(lat), lng: Number(lng) };
  }, [lat, lng]);
  console.log(originLocation);

  const searchCenter = useMemo(() => {
    if (!activity || activity === undefined || !activity.geometry?.location) {
      return {
        lat: Number(lat),
        lng: Number(lng),
      };
    }

    return {
      lat: activity.geometry.location.lat?.() ?? Number(lat),
      lng: activity.geometry.location.lng?.() ?? Number(lng),
    };
  }, [lat, lng, activity]);
  console.log(searchCenter);

  const fetchSunPlaces = useCallback(
    async (
      service: google.maps.places.PlacesService,
      center: { lat: number; lng: number }
    ) => {
      try {
        const results = await getActivitiesSun(service, center);
        console.log(
          "Available places:",
          results.map((p) => p.place_id)
        );
        const currentResult = results.find(
          (place) => place.place_id === placeId
        );

        setActivity(currentResult);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    },
    [placeId]
  );

  const fetchRainPlaces = useCallback(
    async (
      service: google.maps.places.PlacesService,
      center: { lat: number; lng: number }
    ) => {
      try {
        if (!placeId) return;
        const results = await getActivitiesRain(service, center);
        const currentResult = results.find(
          (place) => place.place_id === placeId
        );
        setActivity(currentResult);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    },
    [placeId]
  );

  const getActivities = useCallback(
    async (mapRef: google.maps.Map) => {
      if (!mapRef || !placeId) {
        console.log("no map");
        return;
      }

      const service = new google.maps.places.PlacesService(mapRef);

      if (Number(weather) < 30) {
        await fetchSunPlaces(service, searchCenter);
      } else {
        await fetchRainPlaces(service, searchCenter);
      }
    },
    [placeId, fetchRainPlaces, fetchSunPlaces, searchCenter, weather]
  );

  const fetchPlaceDetails = useCallback(() => {
    if (!mapRef.current || !placeId) return;

    const service = new google.maps.places.PlacesService(mapRef.current);
    const request: google.maps.places.PlaceDetailsRequest = {
      placeId: placeId,
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
        if (place.photos?.length) {
          setPhotoUrl(place.photos[0].getUrl({ maxWidth: 350 }));
        }
        setPlaceDetails(place);
      } else {
        console.error("Failed to get place details:", status);
      }
    });
  }, [placeId]);

  const calculateDirections = useCallback(() => {
    if (mapRef.current) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: originLocation,
          destination: searchCenter,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
            const distanceText = result?.routes[0].legs[0]?.distance?.text;
            setDistance(distanceText ?? null);
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    }
  }, [searchCenter, originLocation]);

  console.log(directions);
  useEffect(() => {
    if (placeDetails && placeDetails?.opening_hours?.weekday_text) {
      const open = placeDetails.opening_hours.weekday_text;
      const formattedTime = formatOpeningHours(open);
      setOpenHours(formattedTime);
    }
  }, [placeDetails, weather, fetchSunPlaces, fetchRainPlaces]);

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
            onLoad={() => console.log("Google Maps script loaded")}
          >
            <GoogleMap
              mapContainerStyle={{
                height: "600px",
                width: "500px",
                top: "0px",
                borderRadius: "5px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
              center={searchCenter}
              zoom={10}
              onLoad={onMapLoad}
            >
              <Marker
                position={{
                  lat: searchCenter.lat,
                  lng: searchCenter.lng,
                }}
                title={activity?.name}
              />
              <Marker position={originLocation} title="Din plats" />
            </GoogleMap>
          </LoadScript>
        </StyledActivityWrapper>
      </Main>
    </>
  );
};
