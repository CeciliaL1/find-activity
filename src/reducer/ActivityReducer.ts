import {
  ActivitiesEnum,
  IActionActivities,
} from "../context/ActivitiesContext";

export const ActivityReducer = (
  activities: google.maps.places.PlaceResult[],
  action: IActionActivities
) => {
  switch (action.type) {
    case ActivitiesEnum.ADD:
      return action.payload;
    default:
      return activities;
  }
};
