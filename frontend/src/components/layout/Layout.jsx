import { Outlet } from "react-router-dom";
import NavBar from "../shared/navBar/NavBar";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
