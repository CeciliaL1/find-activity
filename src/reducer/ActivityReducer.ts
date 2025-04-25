import {
  ActivitiesEnum,
  IActionActivities,
} from "../context/ActivitiesContext";

export const ActivityReducer = (
  activities: google.maps.places.PlaceResult[],
  action: IActionActivities
) => {
  switch (action.type) {
    case ActivitiesEnum.ADD: {
      const newActivities = action.payload.filter(
        (place) => !activities.some((p) => p.place_id === place.place_id)
      );
      return [...activities, ...newActivities];
    }

    // other cases...
    default:
      return activities;
  }
};
