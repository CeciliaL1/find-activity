import { useContext } from "react";
import { getLocalStorage } from "../../helperfunctions/getLocalStorage";
import { IChecks } from "../../models/ISearch";
import { StyledSearchButton } from "../styled/StyledButtons";
import { SearchContext, SearchEnum } from "../../context/SearchContext";

export const SearchButton = () => {
  const { searchDispatch } = useContext(SearchContext);

  const handleSearch = () => {
    const age: number[] = getLocalStorage<number[]>("age");
    let date: string = getLocalStorage<string>("date");
    const price: number[] = getLocalStorage<number[]>("price");
    const checks: IChecks[] = getLocalStorage<IChecks[]>("checks");
    if (!date || Array.isArray(date)) {
      date = new Date().toDateString();
    }

    const newSearch = {
      age,
      date,
      price,
      checks,
    };
    searchDispatch({ type: SearchEnum.SEARCH, payload: newSearch });
  };
  return (
    <>
      <StyledSearchButton onClick={handleSearch}>Sök</StyledSearchButton>
    </>
  );
};
