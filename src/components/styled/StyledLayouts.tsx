import styled from "styled-components";

interface IMainProps {
  width?: string;
}

export const StyledHeader = styled.header`
  background-image: url("/background-img.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 400px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

export const Main = styled.main<IMainProps>`
  max-width: ${(props) => props.width};
  min-height: 100vh;
  margin: auto;
  margin-top: 48px;
`;
