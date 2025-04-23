import styled from "styled-components";

interface IWrapperProps {
  direction: string;
  gap?: string;
  padding?: string;
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
