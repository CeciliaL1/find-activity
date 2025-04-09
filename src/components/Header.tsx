import { SearchBar } from "./searchBar/SearchBar";
import { StyledHeader } from "./styled/StyledLayouts";

export const Header = () => {
  return (
    <>
      <StyledHeader>
        <SearchBar />
      </StyledHeader>
    </>
  );
};
