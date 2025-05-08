import { Link } from "react-router";
import { Rating } from "./Rating";
import { StyledActivitiesWrapper, StyledWrapper } from "./styled/StyledWrapper";
import { useContext } from "react";

import { SearchContext } from "../context/SearchContext";
import { WeatherContext } from "../context/WeatherContext";

export interface IActivities {
  activities: google.maps.places.PlaceResult[];
}

export const RenderActivities = ({ activities }: IActivities) => {
  const { search } = useContext(SearchContext);
  const { weather } = useContext(WeatherContext);
  activities.sort((a, b) => {
    const aRating = a?.rating ?? 0;
    const bRating = b?.rating ?? 0;
    return bRating - aRating;
  });
  return (
    <StyledWrapper direction="column" gap="16" margintop="45px">
      {activities.map((a, index) => (
        <StyledActivitiesWrapper
          background={
            a.icon_background_color ? a.icon_background_color : "#f2f2f2"
          }
          key={index}
        >
          <div>
            <img src={a.icon} alt={a.name} width="20px" height="20px" />
            <h4>
              <Link
                to={`/${a.place_id}/${weather.forecastDays[0].daytimeForecast.precipitation.probability.percent}/${search.location.lat}/${search.location.lng}`}
              >
                {a.name}
              </Link>
            </h4>
          </div>
          <div>{a.rating ? <Rating rating={a.rating}></Rating> : ""}</div>

          <div>
            <p>{a.formatted_address ? a.formatted_address : a.vicinity}</p>
          </div>
        </StyledActivitiesWrapper>
      ))}
    </StyledWrapper>
  );
};
