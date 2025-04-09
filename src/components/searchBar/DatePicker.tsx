import { StyledDateInput } from "../styled/StyledInputs";

export const DatePicker = () => {
  const handleDate = (e) => {
    console.log(e.target.valueAsNumber);
  };
  return (
    <>
      <StyledDateInput
        onChange={(e) => {
          handleDate(e);
        }}
      />
    </>
  );
};
