import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useToast } from "../../../shared/toast";
import { Review } from "./../../../shared/Review/Review";
import { useParams } from "react-router-dom";
import { useGetRentByIdQuery } from "../../api/rentalApi";
import { useGetMeQuery } from "../../api/meApi";
import { useFinishRentalMutation } from "../../api/rentalApi";
import { useRemoveRentalMutation } from "../../api/rentalApi";
import { useNavigate } from "react-router-dom";
import { useGetCarReviewsQuery } from "../../api/reviewApi";
import { useCreateReviewMutation } from "../../api/reviewApi";

const validatingSchema = yup
  .object({
    comment: yup.string().min(3).max(255).required(),
  })
  .required();

export const Rent = () => {
  const rentId = +useParams().id;
  const navigate = useNavigate();
  const { data: me } = useGetMeQuery();
  const { openToast } = useToast();

  const { data: rent } = useGetRentByIdQuery(+rentId);
  const { data: reviews } = useGetCarReviewsQuery(
    { carId: rent?.carId },
    {
      skip: !rent?.carId,
    }
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: "",
    },
    resolver: yupResolver(validatingSchema),
  });

  const [finishRental] = useFinishRentalMutation();
  const [removeRental] = useRemoveRentalMutation();
  const [createReviewMutation] = useCreateReviewMutation();

  const onFinish = () => {
    finishRental({ id: rent.id })
      .unwrap()
      .catch((error) => {
        openToast({
          content: error.message,
          type: "error",
        });
      });
  };

  useEffect(() => {
    if (errors.review)
      openToast({
        content: errors.review.message,
        type: "error",
      });
  }, [errors, openToast]);

  const onDelete = () => {
    removeRental({ id: rent.id })
      .unwrap()
      .then(() => {
        navigate("/client/rent");
        openToast({ content: "Rental deleted", type: "success" });
      })
      .catch((error) => {
        openToast({
          content: error.message,
          type: "error",
        });
      });
  };

  const createReview = ({ comment }) => {
    createReviewMutation({ carId: rent.carId, comment })
      .unwrap()
      .then(() => {
        openToast({ content: "Review created", type: "success" });
      })
      .catch((error) => {
        openToast({
          content: error.message,
          type: "error",
        });
      });
    reset();
  };

  return (
    <RentContainer>
      {rent ? (
        <>
          <h3>rent</h3>
          <span>rent id</span>
          <span>{rent.id}</span>
          <span>time</span>
          <span>{rent.time}</span>
          <span>cost</span>
          <span>{rent.cost}</span>
          <span>status</span>
          <span>{rent.status}</span>
          {rent.status === "active" && (
            <button onClick={onFinish}>finish</button>
          )}{" "}
          {rent.status === "finished" && (
            <button onClick={onDelete}>delete</button>
          )}
          <h3>reviews</h3>
          {reviews?.map((review) => {
            return (
              <Review
                key={review.id}
                id={review.id}
                withDelete={review.clientId === me?.id}
                comment={review.comment}
              />
            );
          })}
          {rent.status === "finished" && (
            <form onSubmit={handleSubmit(createReview)}>
              <textarea {...register("comment")} />
              <button type="submit">send</button>
            </form>
          )}
        </>
      ) : (
        <div>loading...</div>
      )}
    </RentContainer>
  );
};

const RentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
