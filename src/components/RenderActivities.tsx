import { Rating } from "./Rating";
import { StyledActivitiesWrapper, StyledWrapper } from "./styled/StyledWrapper";

interface IActivities {
  activities: google.maps.places.PlaceResult[];
}

export const RenderActivities = ({ activities }: IActivities) => {
  activities.sort((a, b) => {
    const aRating = a?.rating ?? 0;
    const bRating = b?.rating ?? 0;
    return bRating - aRating;
  });
  return (
    <>
      <StyledWrapper direction="column" gap="16">
        {activities.map((a, index) => (
          <>
            <StyledActivitiesWrapper
              background={
                a.icon_background_color ? a.icon_background_color : "#f2f2f2"
              }
              key={index}
            >
              <div>
                <img src={a.icon} alt={a.name} width="20px" height="20px" />
                <h4>
                  <a href="">{a.name}</a>
                </h4>
              </div>
              <div>{a.rating ? <Rating rating={a.rating}></Rating> : ""}</div>

              <div>
                <p>{a.formatted_address ? a.formatted_address : a.vicinity}</p>
              </div>
            </StyledActivitiesWrapper>
          </>
        ))}
      </StyledWrapper>
    </>
  );
};
