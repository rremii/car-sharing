import { CarCell } from "./CarCell";
import { Header } from "../../components/Header/Header";

export const CarListPage = () => {
  const cars = [
    {
      id: 1,
      brand: "Toyota",
      model: "Camry",
      lat: 12.34,
      lng: 12.34,
      companyId: 1,
    },
    {
      id: 2,
      brand: "Toyota",
      model: "Camry",
      lat: 12.34,
      lng: 12.34,
      companyId: 1,
    },
  ];

  return (
    <>
      <Header />
      <div>
        {cars.map((car) => (
          <CarCell key={car.id} {...car} />
        ))}
      </div>
    </>
  );
};
