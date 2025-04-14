import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { StyledWrapper } from "../components/styled/StyledWrapper";

export const Start = () => {
  const { search } = useContext(SearchContext);

  const center = {
    lat: search.location.lat,
    lng: search.location.lng,
  };
  return (
    <>
      <h3>
        Den [datum] ska det [väder]. Dessa aktiviteter är anpassade efter din
        filtrering. Längre ner kan du se alla aktiviteter möjliga [datum] -
        [plats]
      </h3>

      <StyledWrapper direction="row" gap="30px">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "50%" }}
            center={center}
            zoom={search.mapZoom}
          />
        </LoadScript>
      </StyledWrapper>
    </>
  );
};
