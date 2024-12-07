import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../../../shared/toast";

const validatingSchema = yup
  .object({
    code: yup
      .string()
      .min(6, "code is invalid")
      .max(6, "code is invalid")
      .required(),
  })
  .required();

export const RegisterCode = () => {
  const navigate = useNavigate();

  const { openToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validatingSchema),
  });

  useEffect(() => {
    if (errors.code)
      openToast({
        content: errors.code.message,
        type: "error",
      });
  }, [errors]);

  const onSubmit = ({ code }) => {
    if (!code) return;

    navigate("/client/register/info");
  };

  return (
    <div>
      <h2>Code</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Code</label>
        <input type="text" {...register("code")} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
