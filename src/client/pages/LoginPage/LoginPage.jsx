import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useToast } from "../../../shared/toast";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../../client/model/authSlice";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/authApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { openToast } = useToast();
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (errors.email)
      openToast({
        content: errors.email.message,
        type: "error",
      });
  }, [errors]);

  const onSubmit = ({ email, password }) => {
    if (!email || !password) return;

    login({ email, password })
      .unwrap()
      .then(({ accessToken }) => {
        localStorage.setItem("accessToken", accessToken);
        dispatch(setIsLoggedIn(true));
        navigate("/client");
      })
      .catch((error) => {
        openToast({
          content: error.message,
          type: "error",
        });
      });
  };

  const goToRegister = () => {
    navigate("/client/register/email");
  };

  return (
    <div>
      <h3 onClick={() => navigate("/welcome")}>Go to welcome</h3>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="text" {...register("email")} />
        <label>Password</label>
        <input type="password" {...register("password")} />
        <button type="submit">login</button>
      </form>
      <p onClick={goToRegister}>Already have an account</p>
    </div>
  );
};
