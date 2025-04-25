import { useContext } from "react";
import { Link, useParams } from "react-router";
import { ActivityContext } from "../context/ActivitiesContext";

export const RenderActivity = () => {
  const { activities } = useContext(ActivityContext);
  const { id } = useParams<{ id: string }>();

  const activityIndex = parseInt(id ?? "", 10);
  const activity = activities[activityIndex];

  console.log(activity);

  return (
    <>
      Clicked activity {id}
      <Link to="/">Tillbaka</Link>
    </>
  );
};
