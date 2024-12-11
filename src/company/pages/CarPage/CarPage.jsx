import { Header } from "../../components/Header/Header";

export const CarPage = ({ id, brand, model, lat, lng, companyId }) => {
  return (
    <>
      <Header />
      <div>
        <h2>{brand}</h2>
        <p>{model}</p>
        <p>{lat}</p>
        <p>{lng}</p>
      </div>
    </>
  );
};
