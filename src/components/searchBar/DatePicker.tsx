import { StyledDateInput } from "../styled/StyledInputs";

export const DatePicker = () => {
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.valueAsDate) {
      return;
    }
    const formattedDate = e.target.valueAsDate.toDateString();
    localStorage.setItem("date", JSON.stringify(formattedDate));
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
