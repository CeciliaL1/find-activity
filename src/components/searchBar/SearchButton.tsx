import { useContext, useEffect, useState } from "react";
import { getLocalStorage } from "../../helperfunctions/getLocalStorage";
import { IChecks, ILocation } from "../../models/ISearch";
import { StyledSearchButton } from "../styled/StyledButtons";
import { SearchContext, SearchEnum } from "../../context/SearchContext";

export const SearchButton = () => {
  const { searchDispatch } = useContext(SearchContext);
  const [location, setLocation] = useState<ILocation>({ lat: 0, lng: 0 });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSearch = () => {
    const age: number[] = getLocalStorage<number[]>("age");
    let date: string = getLocalStorage<string>("date");
    const price: number[] = getLocalStorage<number[]>("price");
    const checks: IChecks[] = getLocalStorage<IChecks[]>("checks");

    if (!date || Array.isArray(date)) {
      date = new Date().toDateString();
    }

    const newSearch = {
      search: true,
      age,
      date,
      price,
      checks,
      location: location,
      mapZoom: 11,
    };

    searchDispatch({ type: SearchEnum.SEARCH, payload: newSearch });
  };
  return (
    <>
      <StyledSearchButton onClick={handleSearch}>Sök</StyledSearchButton>
    </>
  );
};
