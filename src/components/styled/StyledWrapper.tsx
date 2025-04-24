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
  border: 0.5 solid black;
  padding: 30px;
  justify-content: space-between;
  margin: 5px;
  border-radius: 5px;
  background-color: ${(props) => props.background + "50"};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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

export const StarWrapper = styled.div<IWrapperProps>`
  background-color: #9b9b9b;
  width: fit-content;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: ${(props) => props.direction};
  margin-bottom: 8px;
`;
