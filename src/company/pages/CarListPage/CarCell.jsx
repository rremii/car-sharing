import { useNavigate } from "react-router-dom";

export const CarCell = ({ id, brand, model, lat, lng, companyId }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/company/car/${id}`);
  };

  return (
    <div onClick={onClick}>
      <h3>{brand}</h3>
      <p>{model}</p>
      <p>{lat}</p>
      <p>{lng}</p>
      <p>{lng}</p>
    </div>
  );
};
