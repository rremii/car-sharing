import { NavLink } from "react-router-dom";
import "./Header.css";
export const Header = () => {
  return (
    <header>
      <NavLink to="/client/rent">All rents</NavLink>
      <NavLink to="/client/map">Map</NavLink>
    </header>
  );
};
