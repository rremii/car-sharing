import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useToast } from "../../../shared/toast";
import { Review } from "./../../../shared/Review/Review";

const validatingSchema = yup
  .object({
    review: yup.string().min(3).max(255).required(),
  })
  .required();

export const Rent = () => {
  const { openToast } = useToast();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      review: "",
    },
    resolver: yupResolver(validatingSchema),
  });

  useEffect(() => {
    if (errors.review)
      openToast({
        content: errors.review.message,
        type: "error",
      });
  }, [errors, openToast]);

  const onSubmit = ({ review }) => {
    console.log(review);
  };

  const reviews = [
    {
      id: 0,
      comment: "coool one",
      carId: 0,
      clientId: 0,
    },
  ];

  const rent = {
    id: 0,
    carId: 0,
    clientId: 0,
    cost: 20,
    createdAt: new Date(),
    status: "finished",
    time: 4,
  };

  return (
    <RentContainer>
      <span>rent number</span>
      <span>{rent.id}</span>

      <span>time</span>
      <span>{rent.time}</span>

      <span>cost</span>
      <span>{rent.cost}</span>

      <span>status</span>
      <span>{rent.status}</span>

      {rent.status === "active" && <button>finish</button>}

      {reviews?.map((review) => {
        return (
          <Review
            key={review.id}
            withDelete={true}
            comment={review.comment}
            onDelete={() => {}}
          />
        );
      })}

      {rent.status === "finished" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea {...register("review")} />
          <button type="submit">send</button>
        </form>
      )}
    </RentContainer>
  );
};

const RentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
