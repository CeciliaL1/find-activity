import { SearchButton } from "./SearchButton";

import { StyledSearchBar } from "../styled/StyledSearchBar";
import { StyledWrapper } from "../styled/StyledWrapper";

export const SearchBar = () => {
  return (
    <>
      <StyledSearchBar>
        <StyledWrapper
          direction="column"
          justify="center"
          padding="30px"
          gap="32px"
        >
          <h1>Vad ska vi hitta på?</h1>
          <p>
            Det söks efter aktiviteter anpassade till din position och
            väderförhållande. Hoppas du hittar någon roligt att hitta på!
          </p>
          <SearchButton />
        </StyledWrapper>
      </StyledSearchBar>
    </>
  );
};
