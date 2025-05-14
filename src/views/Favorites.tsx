import { Link } from "react-router";
import { getLocalStorage } from "../helperfunctions/getLocalStorage";

export const Favorites = () => {
  const favorites = getLocalStorage<string[]>("favorites");

  console.log(favorites);
  return (
    <>
      <Link to="/">Tillbaka</Link>
    </>
  );
};
