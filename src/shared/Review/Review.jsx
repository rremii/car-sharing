import { useToast } from "../../shared/toast";
import { useRemoveReviewMutation } from "../../client/api/reviewApi";

export const Review = ({ id, comment, withDelete }) => {
  const { openToast } = useToast();
  const [removeReview] = useRemoveReviewMutation();

  const onDelete = () => {
    removeReview({ id })
      .unwrap()
      .then(() => {
        openToast({ content: "Review deleted", type: "success" });
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
      <p>{comment}</p>
      {withDelete && <button onClick={onDelete}>delete</button>}
    </div>
  );
};
