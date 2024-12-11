import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../../../shared/toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../../client/model/authSlice";
import { useRegisterMutation } from "../../api/authApi";

const infoSchema = yup.object({
  about: yup.string().min(3).max(255).required(),
  name: yup.string().min(3).max(255).required(),
  password: yup.string().min(6).max(255).required(),
});

export const RegisterInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.companyAuth.email);
  const { openToast } = useToast();

  const [registerCompany] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(infoSchema),
  });

  useEffect(() => {
    if (errors.name)
      openToast({
        content: errors.name.message,
        type: "error",
      });
    if (errors.password)
      openToast({
        content: errors.password.message,
        type: "error",
      });
  }, [errors]);

  const onSubmit = ({ name, password, about }) => {
    if (!name || !password || !email || !about) return;

    registerCompany({
      email,
      name,
      password,
      about,
    })
      .unwrap()
      .then(({ accessToken }) => {
        localStorage.setItem("accessToken", accessToken);
        dispatch(setIsLoggedIn(true));
        navigate("/company");
        openToast({
          content: "Registration successful",
          type: "success",
        });
      })
      .catch((error) => {
        openToast({
          content: error.message,
          type: "error",
        });
      });
  };

  return (
    <div>
      <h2>Info</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input type="text" {...register("name")} />
        <label>Password</label>
        <input type="password" {...register("password")} />
        <label>About</label>
        <textarea type="text" {...register("about")} />
        <button type="submit">register</button>
      </form>
    </div>
  );
};
