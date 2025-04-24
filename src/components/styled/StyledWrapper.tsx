import styled from "styled-components";

interface IWrapperProps {
  direction: string;
  gap?: string;
  padding?: string;
  justify?: string;
}

interface IActivitesWrapperProps {
  background: string;
}

export const StyledWrapper = styled.div<IWrapperProps>`
  background-color: transparent;
  display: flex;
  flex-direction: ${(props) => props.direction};
  flex-wrap: wrap;
  gap: ${(props) => props.gap};
  padding: ${(props) => props.padding};

  @media screen and (max-width: 500px) {
    justify-content: center;
    gap: 16px;
  }
`;

export const StyledActivitiesWrapper = styled.div<IActivitesWrapperProps>`
  display: flex;
  flex-direction: column;
  width: 550px;
  border: 1px solid black;
  padding: 30px;
  justify-content: space-between;
  margin: 5px;
  border-radius: 5px;
  background-color: ${(props) => props.background + "50"};

  a {
    color: black;
  }
  div {
    &:nth-child(1) {
      display: flex;
      flex-direction: row;
    }
  }
`;
