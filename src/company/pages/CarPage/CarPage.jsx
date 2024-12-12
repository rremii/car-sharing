import { Header } from "../../components/Header/Header";
import { useGetCarByIdQuery } from "../../api/carApi";
import { useParams } from "react-router-dom";
import { useRemoveCarMutation } from "../../api/carApi";
import { useToast } from "../../../shared/toast";
import { useNavigate } from "react-router-dom";

export const CarPage = () => {
  const carId = useParams().id;
  const navigate = useNavigate();
  const { openToast } = useToast();

  const { data: car } = useGetCarByIdQuery(carId);

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

  const reviews = [
    {
      id: 1,
      comment: "comment",
      carId: 1,
      userId: 1,
    },
    {
      id: 2,
      comment: "comment",
      carId: 1,
      userId: 1,
    },
  ];

  return (
    <>
      <Header />
      <div>
        <h2>{car?.brand}</h2>
        <p>{car?.model}</p>
        <p>{car?.lat}</p>
        <p>{car?.lng}</p>
        <button onClick={onDelete}>delete</button>
      </div>
      <div>
        {reviews.map((review) => (
          <div key={review.id}>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
};
