import { useParams } from "react-router";

export const RenderActivity = () => {
  const { id } = useParams<{ id: string }>();

  return <>Clicked activity {id}</>;
};
