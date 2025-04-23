import { IChecks } from "../../models/ISearch";
import {
  StyledCheckboxContainer,
  StyledCheckbox,
} from "../styled/StyledInputs";
import { useState } from "react";

export const Checkbox = () => {
  const [checks, setChecks] = useState<IChecks[]>([
    { label: "Kiosk/Café/Restaurang", value: false, searchWord: "cafe" },
    { label: "Grillmöjligheter", value: false, searchWord: "grill" },
  ]);

  const handleChange = (index: number) => {
    const updatedChecks = [...checks];
    updatedChecks[index].value = !updatedChecks[index].value;
    setChecks(updatedChecks);

    localStorage.setItem("checks", JSON.stringify(checks));
  };

  return (
    <>
      <ul>
        {checks.map((check, index) => (
          <li key={index}>
            <StyledCheckboxContainer>
              <StyledCheckbox
                type="checkbox"
                id={check.label}
                checked={check.value}
                onChange={() => handleChange(index)}
              />
              <label htmlFor={check.label}>{check.label}</label>
            </StyledCheckboxContainer>
          </li>
        ))}
      </ul>
    </>
  );
};
