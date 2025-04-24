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
      <StyledWrapper direction="column" gap="10">
        {activities.map((a, index) => (
          <StyledActivitiesWrapper key={index}>
            <div>
              <h4>{a.name}</h4>
              <p>{a.rating}</p>
            </div>

            <div>
              <p>{a.formatted_address ? a.formatted_address : a.vicinity}</p>
            </div>
          </StyledActivitiesWrapper>
        ))}
      </StyledWrapper>
    </>
  );
};
