import { StyledDateInput } from "../styled/StyledInputs";

export const DatePicker = () => {
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.valueAsNumber);
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
