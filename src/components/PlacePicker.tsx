import { useState } from "react";
import { StyledClickArea, StyledDropDown } from "./styled/StyledSearchBar";

export const PlacePicker = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <StyledDropDown isopen={isOpen.toString()}>
        <StyledClickArea onClick={handleToggleOpen}>
          <div className="text-section">
            <h3>Plats</h3>
            {isOpen ? (
              <i className="fa-solid fa-caret-up"></i>
            ) : (
              <i className="fa-solid fa-caret-down"></i>
            )}
          </div>
        </StyledClickArea>
        {isOpen && <div className="open-section"></div>}
      </StyledDropDown>
    </>
  );
};
