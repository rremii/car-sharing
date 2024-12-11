import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "./authSlice";
import { useRefreshMutation } from "../api/authApi";

const notProtectedRoutes = [
  "/company/login",
  "/company/register/email",
  "/company/register/code",
  "/company/register/info",
];

export const useCompanyAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isCompanyLoggedIn = useSelector(
    (state) => state.companyAuth.isLoggedIn
  );
  const [refresh] = useRefreshMutation();
  const isProtectedRoute =
    location.pathname.startsWith("/company") &&
    !notProtectedRoutes.includes(location.pathname);

  useEffect(() => {
    if (!location.pathname.startsWith("/company")) return;
    if (!localStorage.getItem("accessToken")) navigate("/company/login");
  }, []);

  useEffect(() => {
    if (
      !location.pathname.startsWith("/company") ||
      isCompanyLoggedIn ||
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
        navigate("/company/login");
      });
  }, [location]);
};
