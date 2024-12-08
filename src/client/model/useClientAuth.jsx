import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "./authSlice";
import { useRefreshMutation } from "../api/authApi";

const notProtectedRoutes = [
  "/client/login",
  "/client/register/email",
  "/client/register/code",
  "/client/register/info",
];

export const useClientAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isClientLoggedIn = useSelector((state) => state.clientAuth.isLoggedIn);
  const [refresh] = useRefreshMutation();

  const isProtectedRoute =
    location.pathname.startsWith("/client") &&
    !notProtectedRoutes.includes(location.pathname);

  useEffect(() => {
    if (!location.pathname.startsWith("/client")) return;
    if (!localStorage.getItem("accessToken")) navigate("/client/login");
  }, []);

  useEffect(() => {
    if (
      !location.pathname.startsWith("/client") ||
      isClientLoggedIn ||
      !isProtectedRoute
    )
      return;

    refresh()
      .unwrap()
      .then(({ accessToken }) => {
        localStorage.setItem("accessToken", accessToken);
        dispatch(setIsLoggedIn(true));
      })
      .catch((error) => {
        navigate("/client/login");
      });
  }, [location]);
};
