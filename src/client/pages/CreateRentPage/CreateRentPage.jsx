import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "./../../components/Header/Header";
import { useEffect, useState } from "react";
import { useToast } from "./../../../shared/toast";
import { useCreateRentalMutation } from "./../../api/rentalApi";
import { useNavigate } from "react-router-dom";
import { useGetCarByIdQuery } from "../../../company/api/carApi";

const calculateCost = (time, car) => {
  if (!time || !car) return 0;

  const { model, brand } = car;
  let cost = 0;

  let basePrise = 50;
  const moneyPerHour = 5;

  switch (brand) {
    case "BMW":
      basePrise *= 1.5;
      break;
    case "AUDI":
      basePrise *= 1.2;
      break;
    case "MERCEDES":
      basePrise *= 1.3;
      break;
    default:
      cost = 0;
      break;
  }

  cost = basePrise + moneyPerHour * time;

  return cost;
};

const validatingSchema = yup
  .object({
    cardNumber: yup.string().length(16).required(),
    time: yup.number().integer().min(1).max(24).required(),
    month: yup.number().integer().min(0).max(11).required(),
    year: yup.number().integer().min(2000).max(2030).required(),
  })
  .required();

export const CreateRentPage = () => {
  const { id: carId } = useParams();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");

  const { data: car } = useGetCarByIdQuery(carId);

  const { openToast } = useToast();
  const [createRental] = useCreateRentalMutation();

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardNumber: "",
      time: 0,
      month: 0,
      year: 0,
    },
    resolver: yupResolver(validatingSchema),
  });
  const time = watch("time");
  const cost = calculateCost(time, car);

  useEffect(() => {
    if (!Object.values(errors).length) return;

    openToast({
      content: Object.values(errors)[0].message,
      type: "error",
    });
  }, [errors]);

  const onSubmit = ({ time, cardNumber, month, year }) => {
    console.log(+cardNumber);

    if (!time || !cardNumber || (!month && month !== 0) || !year) return;
    if (!+cardNumber && +cardNumber !== 0)
      return openToast({
        content: "Enter valid card number",
        type: "error",
      });

    createRental({
      carId: +carId,
      time: new Date(new Date().getTime() + time * 3600 * 1000),
      cost,
    })
      .unwrap()
      .then(() => {
        openToast({ content: "Money was withdrawn", type: "success" });
        openToast({
          content: "Rental created",
          type: "success",
        });
        navigate("/client/rent");
      })
      .catch(({ response }) => {
        openToast({
          content: response.data.message,
          type: "error",
        });
      });

    reset();
  };
  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="time">Time:</label>
          <input required type="number" {...register("time")} />
        </div>
        <div style={{ display: "flex" }}>
          <label htmlFor="cardNumber">Card number:</label>
          <input
            value={watch("cardNumber").slice(0, 16)}
            {...register("cardNumber")}
          />
        </div>
        <div>
          <label htmlFor="month">Month:</label>
          <input required type="number" {...register("month")} />
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <input required type="number" {...register("year")} />
        </div>
        <button type="submit">submit</button>
      </form>
    </>
  );
};
