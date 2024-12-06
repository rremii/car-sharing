import { NavLink } from "react-router-dom";
import { Header } from "./../../components/Header/Header";

export const RentListPage = () => {
  const rents = [
    {
      id: 0,
      carId: 0,
      clientId: 0,
      cost: 20,
      createdAt: new Date(),
      status: "active",
      time: 4,
    },
  ];

  return (
    <>
      <Header />
      <main>
        {rents.map((rent) => {
          return (
            <NavLink to={"/client/rent/" + rent.id} key={rent.id}>
              <span>cost</span>
              <span>{rent.cost}</span>

              <span>status</span>
              <span>{rent.status}</span>
            </NavLink>
          );
        })}
      </main>
    </>
  );
};
