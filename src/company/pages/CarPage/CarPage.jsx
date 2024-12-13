import { Header } from "../../components/Header/Header";
import { useGetCarByIdQuery } from "../../api/carApi";
import { useParams } from "react-router-dom";
import { useRemoveCarMutation } from "../../api/carApi";
import { useToast } from "../../../shared/toast";
import { useNavigate } from "react-router-dom";
import { useGetCarReviewsQuery } from "../../api/reviewApi";

export const CarPage = () => {
  const carId = +useParams().id;
  const navigate = useNavigate();
  const { openToast } = useToast();

  const { data: car } = useGetCarByIdQuery(carId);
  const { data: reviews } = useGetCarReviewsQuery(
    { carId: carId },
    { skip: !carId }
  );

  const [removeCar] = useRemoveCarMutation();

  const onDelete = () => {
    removeCar(carId)
      .unwrap()
      .then(() => {
        navigate("/company");
        openToast({
          content: "Car deleted",
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
    <>
      <Header />
      <div>
        <h2>Car info</h2>
        <h2>{car?.brand}</h2>
        <p>{car?.model}</p>
        <p>{car?.lat}</p>
        <p>{car?.lng}</p>
        <button onClick={onDelete}>delete</button>
      </div>
      <div>
        <h3>Reviews</h3>
        {reviews?.map((review) => (
          <div key={review.id}>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
};
