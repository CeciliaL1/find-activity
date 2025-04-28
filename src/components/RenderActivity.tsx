import { useContext, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { ActivityContext } from "../context/ActivitiesContext";
import { StyledWrapper } from "./styled/StyledWrapper";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { SearchContext } from "../context/SearchContext";
import { Main } from "./styled/StyledLayouts";

export const RenderActivity = () => {
  const { search } = useContext(SearchContext);
  const { activities } = useContext(ActivityContext);
  const { id } = useParams<{ id: string }>();
  const mapRef = useRef<google.maps.Map | null>(null);

  const activityIndex = parseInt(id ?? "", 10);
  const activity = activities[activityIndex];

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const location = activity.geometry?.location;
  if (!location) return null;

  const center = {
    lat: location.lat(),
    lng: location.lng(),
  };

  return (
    <>
      <Main width="900px">
        <StyledWrapper direction="row" gap="50px">
          <div>
            <h4>{activity.name}</h4>
            <p>
              {activity.formatted_address
                ? activity.formatted_address
                : activity.vicinity}
            </p>
          </div>

          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            libraries={["places"]}
          >
            <GoogleMap
              mapContainerStyle={{
                height: "600px",
                width: "45%",
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
            </GoogleMap>
          </LoadScript>
        </StyledWrapper>
        <Link to="/">Tillbaka</Link>
      </Main>
    </>
  );
};
