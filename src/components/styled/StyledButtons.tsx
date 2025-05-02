import styled from "styled-components";

export const StyledSearchButton = styled.button`
  height: 30px;
  width: 120px;
  background-color: #f2f2f2;
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 1rem;
  position: relative;
  left: 190px;
  cursor: pointer;
  border: solid 1px #4c7958;

  &:hover {
    background-color: #4c7958;
  }

  @media screen and (max-width: 500px) {
    top: -16px;
    left: 130px;
  }
`;
