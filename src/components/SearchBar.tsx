import { DropDown } from "./DropDown";
import { StyledSearchBar } from "./styled/StyledSearchBar";
import { StyledWrapper } from "./styled/StyledWrapper";

export const SearchBar = () => {
  return (
    <>
      <StyledSearchBar>
        <StyledWrapper direction="row" padding="30px">
          <StyledWrapper direction="column" gap="20px">
            <DropDown text="Datum" />
            <DropDown text="Plats" />
          </StyledWrapper>
        </StyledWrapper>
      </StyledSearchBar>
    </>
  );
};
