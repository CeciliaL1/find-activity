import styled from "styled-components";

interface IDropDownProps {
  isopen: string;
}

export const StyledSearchBar = styled.div`
  position: relative;
  top: 120px;
  width: 550px;
  height: 270px;
  margin: auto;
  border-radius: 5px;
  background-color: #d9d9d9;
  opacity: 0.9;

  @media screen and (max-width: 500px) {
    width: 350px;
  }
`;

export const StyledClickArea = styled.div`
  height: 30px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 5px;
`;

export const StyledDropDown = styled.div<IDropDownProps>`
  width: 200px;
  min-height: 30px;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  color: black;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;

  .text-section {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
  .open-section {
    width: 150px;
    height: ${(props) => (props.isopen === "true" ? "300px" : "0")};
    background-color: #f2f2f2;
    overflow: hidden;
    transition: height 0.5s ease-in-out;
    padding: ${(props) => (props.isopen === "true" ? "25px" : "0")};
  }

  i {
    margin-top: 3px;
    margin-right: 7px;
    color: black;
  }
`;
