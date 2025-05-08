import { Rating } from "./Rating";

interface IActivityPresentationProps {
  activity: google.maps.places.PlaceResult | undefined;
  placeDetails: google.maps.places.PlaceResult | null;
  distance: string | null;
  photoUrl: string;
  openHours: string[];
}

export const ActivityPresentation = ({
  activity,
  placeDetails,
  distance,
  photoUrl,
  openHours,
}: IActivityPresentationProps) => {
  if (!activity) return; // add error message when no activity found
  return (
    <>
      <div className="text-content-wrapper">
        <div className="first-text-section">
          <div className="link-wrapper">
            {placeDetails && placeDetails.website && (
              <a href={placeDetails.website}>
                <img
                  src="/external-link-svgrepo-com.svg"
                  alt=""
                  width="25px"
                  height="25px"
                />
                <h3>{activity.name}</h3>
              </a>
            )}
          </div>
        </div>
        <div>
          {" "}
          {activity.rating ? <Rating rating={activity.rating}></Rating> : ""}
        </div>

        <div>
          {distance && (
            <p>
              Avstånd till {activity.name}: {distance}
            </p>
          )}
        </div>
        <p>
          {activity.formatted_address
            ? activity.formatted_address
            : activity.vicinity}
        </p>
        <div className="img-container">
          <img src={photoUrl ? photoUrl : activity.name} alt={activity.name} />
        </div>
      </div>

      <div className="opening-hours">
        {placeDetails && placeDetails.opening_hours?.weekday_text && (
          <>
            <strong>Öppettider:</strong>
            <ul>
              {openHours.map((day, index) => (
                <li key={index}>{day}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
