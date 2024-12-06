export const Review = ({ comment, withDelete, onDelete }) => {
  return (
    <div>
      <p>{comment}</p>
      {withDelete && <button onClick={onDelete}>delete</button>}
    </div>
  );
};
