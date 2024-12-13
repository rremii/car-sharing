import { NavLink } from "react-router-dom";
import { Header } from "./../../components/Header/Header";
import { useGetMyRentalsQuery } from "./../../api/rentalApi";

export const RentListPage = () => {
  const { data: rentals } = useGetMyRentalsQuery();

  return (
    <>
      <Header />
      <main>
        {rentals?.map((rent) => {
          return (
            <NavLink to={"/client/rent/" + rent.id} key={rent.id}>
              <div>
                <span>cost</span>
                <span>{rent.cost}</span>
              </div>
              <div>
                <span>status</span>
                <span>{rent.status}</span>
              </div>

              <div>
                <span>ending time</span>
                <span>{rent.time}</span>
              </div>
            </NavLink>
          );
        })}
      </main>
    </>
  );
};
