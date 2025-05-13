import { Link } from "react-router";
import { Rating } from "./Rating";
import { StyledActivitiesWrapper, StyledWrapper } from "./styled/StyledWrapper";
import { useContext, useEffect, useState } from "react";

import { SearchContext } from "../context/SearchContext";
import { WeatherContext } from "../context/WeatherContext";
import { StyledFavoriteButton } from "./styled/StyledButtons";

export interface IActivities {
  activities: google.maps.places.PlaceResult[];
}

export const RenderActivities = ({ activities }: IActivities) => {
  const { search } = useContext(SearchContext);
  const { weather } = useContext(WeatherContext);

  const [favorites, setfavorites] = useState<string[]>([]);
  activities.sort((a, b) => {
    const aRating = a?.rating ?? 0;
    const bRating = b?.rating ?? 0;
    return bRating - aRating;
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (placeId: string | undefined) => {
    if (!placeId) return;
    setfavorites((prevFavorites) =>
      prevFavorites.includes(placeId)
        ? prevFavorites
        : [...prevFavorites, placeId]
    );
  };
  const handleRemoveFavorite = (placeId: string | undefined) => {
    if (!placeId) return;
    setfavorites((prevFavorites) =>
      prevFavorites.filter((id) => id !== placeId)
    );
  };
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
            <div>
              {favorites.find((id) => id === a.place_id) ? (
                <StyledFavoriteButton
                  onClick={() => {
                    handleRemoveFavorite(a.place_id);
                  }}
                >
                  <i className="fa-solid fa-heart"></i>
                </StyledFavoriteButton>
              ) : (
                <StyledFavoriteButton
                  onClick={() => {
                    handleFavorite(a.place_id);
                  }}
                >
                  <i className="fa-regular fa-heart"></i>
                </StyledFavoriteButton>
              )}
            </div>
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
