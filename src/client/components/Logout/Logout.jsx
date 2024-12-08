import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../../client/model/authSlice";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    localStorage.removeItem("accessToken");
    dispatch(setIsLoggedIn(false));
    navigate("/client/login");
  };

  return <button onClick={onClick}>Logout</button>;
};
