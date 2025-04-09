import styled from "styled-components";

export const StyledDateInput = styled.input.attrs({
  type: "date",
})`
  width: 180px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: #f2f2f2;
`;

export const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledCheckbox = styled.input`
  width: 30px;
  height: 20px;
  background: #f2f2f2;
  border: 2px solid #f2f2f2;
  border-radius: 4px;
  cursor: pointer;
`;

export const StyledLabel = styled.label`
  font-size: 1rem;
  width: 200px;
  color: black;
  cursor: pointer;
  user-select: none;
`;
