import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "./../../components/Header/Header";
import { useEffect } from "react";
import { useToast } from "./../../../shared/toast";

const validatingSchema = yup
  .object({
    time: yup.number().integer().min(1).max(24).required(),
    cardNumber: yup.string().length(16).required(),
    month: yup.number().integer().min(0).max(11).required(),
    year: yup.number().integer().min(2000).max(2030).required(),
  })
  .required();

export const CreateRentPage = () => {
  const { id: carId } = useParams();

  const { openToast } = useToast();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      time: 0,
      cardNumber: 0,
      month: 0,
      year: 0,
    },
    resolver: yupResolver(validatingSchema),
  });

  const onSubmit = ({ time, cardNumber, month, year }) => {
    if (typeof +cardNumber !== "number")
      return openToast({
        content: "Enter valid card number",
        type: "error",
      });

    reset();
    console.log({ time, cardNumber, month, year });
  };

  useEffect(() => {
    if (!Object.values(errors).length) return;

    openToast({
      content: Object.values(errors)[0].message,
      type: "error",
    });
  }, [errors]);

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input required type="number" {...register("time")} />

        <span className="cost">15$</span>

        <input required type="number" {...register("cardNumber")} />
        <input required type="number" {...register("month")} />
        <input required type="number" {...register("year")} />

        <button type="submit">submit</button>
      </form>
    </>
  );
};
