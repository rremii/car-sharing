import { CarCell } from "./CarCell";
import { Header } from "../../components/Header/Header";
import { useGetMyCarsQuery } from "../../api/carApi";

export const CarListPage = () => {
  const { data: cars } = useGetMyCarsQuery();

  return (
    <>
      <Header />
      <div>
        {cars?.map((car) => (
          <CarCell key={car.id} {...car} />
        ))}
      </div>
    </>
  );
};
