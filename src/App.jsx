import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import "./shared/styles.css";
import { MapPage } from "./client/pages/MapPage/MapPage";
import { RentPage } from "./client/pages/RentPage/RentPage";
import { RentListPage } from "./client/pages/RentListPage/RentListPage";
import { CreateRentPage } from "./client/pages/CreateRentPage/CreateRentPage";
import { LoginPage } from "./client/pages/LoginPage/LoginPage";
import { RegisterPage } from "./client/pages/RegisterPage/RegisterPage";
import { useEffect } from "react";
import { withToasts } from "./shared/toast";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/client/map");
  }, []);

  return (
    <Routes>
      <Route path="/client/map" element={<MapPage />} />
      <Route path="/client/car/:id/rent" element={<CreateRentPage />} />
      <Route path="/client/rent/" element={<RentListPage />} />
      <Route path="/client/rent/:id" element={<RentPage />} />
      <Route path="/client/login" element={<LoginPage />} />
      <Route path="/client/register" element={<RegisterPage />} />

      <Route path="/company/car/list" element={<div>cars list</div>} />
      <Route path="/company/car/create" element={<div>create car</div>} />
      <Route
        path="/company/car/:id"
        element={<div>delete and check review</div>}
      />
      <Route path="/company/login" element={<div>Hello</div>} />
      <Route path="/company/register" element={<div>Hello</div>} />
    </Routes>
  );
}

export default withToasts(App);
