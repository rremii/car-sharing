import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      <NavLink to="/client/rent">All rents</NavLink>
      <NavLink end to="/client">
        Map
      </NavLink>
      <NavLink to="/client/profile">Profile</NavLink>
    </header>
  );
};
