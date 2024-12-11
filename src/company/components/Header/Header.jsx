import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      <NavLink to="/company/car/create">Create car</NavLink>
      <NavLink end to="/company">
        My cars
      </NavLink>
      <NavLink to="/company/profile">Profile</NavLink>
    </header>
  );
};
