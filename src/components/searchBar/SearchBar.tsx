import { Checkbox } from "./CheckBox";
import { DatePicker } from "./DatePicker";
import { PlacePicker } from "./PlacePicker";
import { SearchButton } from "./SearchButton";
import { SliderPicker } from "./SliderPicker";
import { StyledSearchBar } from "../styled/StyledSearchBar";
import { StyledWrapper } from "../styled/StyledWrapper";

export const SearchBar = () => {
  return (
    <>
      <StyledSearchBar>
        <StyledWrapper direction="row" padding="30px" gap="60px">
          <StyledWrapper direction="column" gap="20px">
            <DatePicker />
            <PlacePicker />

            <SliderPicker
              min={0}
              max={1000}
              type="price"
              text="Prisintervall"
            />
            <SliderPicker min={0} max={100} type="age" text="Åldersintervall" />
          </StyledWrapper>
          <StyledWrapper direction="column" gap="10px">
            <Checkbox />

            <SearchButton />
          </StyledWrapper>
        </StyledWrapper>
      </StyledSearchBar>
    </>
  );
};
