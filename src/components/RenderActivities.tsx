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
          <StyledActivitiesWrapper key={index}>
            <div>
              <StyledWrapper direction="row" gap="8">
                {" "}
                <img src={a.icon} alt={a.name} width="20px" height="20px" />
                <h4>{a.name}</h4>
              </StyledWrapper>

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
