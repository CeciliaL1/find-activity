import { StyledDateInput } from "../styled/StyledInputs";

export const DatePicker = () => {
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("date", JSON.stringify(e.target.valueAsNumber));
  };
  return (
    <>
      <StyledDateInput
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleDate(e);
        }}
      />
    </>
  );
};
