import { createContext, Dispatch } from "react";

interface IActivitiesContext {
  activities: google.maps.places.PlaceResult[];
  activitiesDispatch: Dispatch<IActionActivities>;
}

export interface IActionActivities {
  type: ActivitiesEnum;
  payload: google.maps.places.PlaceResult[];
}
export enum ActivitiesEnum {
  ADD,
}
export const ActivityContext = createContext<IActivitiesContext>({
  activities: [],
  activitiesDispatch: () => {},
});
