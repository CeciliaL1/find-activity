import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

export const Start = () => {
  const { search } = useContext(SearchContext);

  console.log(search);
  return (
    <>
      <h3>
        Den [datum] ska det [väder]. Dessa aktiviteter är anpassade efter din
        filtrering. Längre ner kan du se alla aktiviteter möjliga [datum] -
        [plats]
      </h3>
    </>
  );
};
