import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Main } from "../components/styled/StyledLayouts";

export const Layout = () => {
  return (
    <>
      <Header />
      <Main width="1300px">
        <Outlet></Outlet>
      </Main>
    </>
  );
};
