import { DatePicker } from "./DatePicker";
import { PlacePicker } from "./PlacePicker";
import { StyledSearchBar } from "./styled/StyledSearchBar";
import { StyledWrapper } from "./styled/StyledWrapper";

export const SearchBar = () => {
  return (
    <>
      <StyledSearchBar>
        <StyledWrapper direction="row" padding="30px">
          <StyledWrapper direction="column" gap="20px">
            <DatePicker />
            <PlacePicker />
          </StyledWrapper>
        </StyledWrapper>
      </StyledSearchBar>
    </>
  );
};
