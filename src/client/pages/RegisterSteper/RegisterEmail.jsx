import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../../../shared/toast";
import { useDispatch } from "react-redux";
import { setEmail } from "../../../client/model/authSlice";
import { useSendCodeMutation } from "../../api/authApi";
import { setCode } from "../../../client/model/authSlice";

const emailSchema = yup.object({
  email: yup.string().email().required(),
});

export const RegisterEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { openToast } = useToast();

  const [sendCode] = useSendCodeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  useEffect(() => {
    if (errors.email)
      openToast({
        content: errors.email.message,
        type: "error",
      });
  }, [errors]);

  const onSubmit = ({ email }) => {
    if (!email) return;

    sendCode({ email })
      .unwrap()
      .then((data) => {
        dispatch(setEmail(email));
        dispatch(setCode(data.code));
        navigate("/client/register/code");
        openToast({
          content: "Code was sent",
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

  const goLogin = () => {
    navigate("/client/login");
  };

  return (
    <div>
      <h2>Register</h2>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="text" {...register("email")} />
        <button type="submit">next</button>
      </form>
      <p onClick={goLogin}>Dont have an account</p>
    </div>
  );
};
