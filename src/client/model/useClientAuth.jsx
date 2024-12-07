import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "./authSlice";

export const useClientAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isClientLoggedIn = useSelector((state) => state.clientAuth.isLoggedIn);

  useEffect(() => {
    if (isClientLoggedIn) return navigate("/client/map");
    return navigate("/welcome");
  }, [isClientLoggedIn]);

  useEffect(() => {
    if (location.pathname !== "/client" || isClientLoggedIn) return;

    const isTokenValid = false;

    if (isTokenValid) {
      dispatch(setIsLoggedIn(true));
    } else {
      dispatch(setIsLoggedIn(false));
      navigate("/client/login");
    }
  }, [location]);

  return { isClientLoggedIn };
};
