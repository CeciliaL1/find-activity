import {
  StyledCheckboxContainer,
  StyledCheckbox,
  StyledLabel,
} from "./styled/StyledInputs";

interface ICheckboxProps {
  text: string;
}

export const Checkbox = ({ text }: ICheckboxProps) => {
  return (
    <>
      <StyledCheckboxContainer>
        <StyledCheckbox type="checkbox" id="presentation" checked={false} />
        <StyledLabel htmlFor="presentation">
          <span
            onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
              console.log(e);
            }}
          >
            {text}
          </span>
        </StyledLabel>
      </StyledCheckboxContainer>
    </>
  );
};
