import { getLocalStorage } from "../../helperfunctions/getLocalStorage";
import { IChecks } from "../../models/ISearch";
import { StyledSearchButton } from "../styled/StyledButtons";

export const SearchButton = () => {
  const handleSearch = () => {
    const age: number[] = getLocalStorage<number[]>("age");
    const date: number = getLocalStorage<number>("date");
    const price: number[] = getLocalStorage<number[]>("price");
    const checks: IChecks[] = getLocalStorage<IChecks[]>("checks");

    console.log("age", age);
    console.log("date", date);
    console.log("price", price);
    console.log("checks", checks);
  };
  return (
    <>
      <StyledSearchButton onClick={handleSearch}>Sök</StyledSearchButton>
    </>
  );
};
