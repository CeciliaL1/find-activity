import {
  StyledCheckboxContainer,
  StyledCheckbox,
} from "../styled/StyledInputs";
import { useState } from "react";

interface IChecks {
  label: string;
  value: boolean;
}

export const Checkbox = () => {
  const [checks, setChecks] = useState<IChecks[]>([
    { label: "Kolla vädret", value: false },
    { label: "Kollektivtrafik", value: false },
    { label: "Kiosk/Café/Restaurang", value: false },
    { label: "Grillmöjligheter", value: false },
  ]);

  const handleChange = (index: number) => {
    const updatedChecks = [...checks];
    updatedChecks[index].value = !updatedChecks[index].value;
    setChecks(updatedChecks);
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
