import styled from "styled-components";

interface IWrapperProps {
  direction: string;
  gap?: string;
  padding?: string;
  justify?: string;
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

export const StyledActivitiesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
  border: 1px solid black;
  padding: 30px;
  justify-content: space-between;
  margin: 5px;
`;

export const StyledMapWrapper = styled.div`
  position: "fixed";
  top: "20px";
  right: "20px";
  width: "400px";
  height: "400px";
  z-index: 1000;
  box-shadow: "0 0 10px rgba(0,0,0,0.3)";
  border-radius: "10px";
  overflow: "hidden";
`;
