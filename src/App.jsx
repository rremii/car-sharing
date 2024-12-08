import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import "./shared/styles.css";
import { MapPage } from "./client/pages/MapPage/MapPage";
import { RentPage } from "./client/pages/RentPage/RentPage";
import { RentListPage } from "./client/pages/RentListPage/RentListPage";
import { CreateRentPage } from "./client/pages/CreateRentPage/CreateRentPage";
import { LoginPage } from "./client/pages/LoginPage/LoginPage";
import { withToasts } from "./shared/toast";
import { RegisterEmail } from "./client/pages/RegisterSteper/RegisterEmail";
import { RegisterCode } from "./client/pages/RegisterSteper/RegisterCode";
import { RegisterInfo } from "./client/pages/RegisterSteper/RegisterInfo";
import { WelcomePage } from "./shared/ui/Welcome/WelcomePage";
import { useClientAuth } from "./client/model/useClientAuth";
import { ProfilePage } from "./client/pages/ProfilePage/ProfilePage";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") navigate("/welcome");
  }, [location]);

  useClientAuth();

  return (
    <Routes>
      <Route path="/client" element={<MapPage />} />
      <Route path="/client/car/:id/rent" element={<CreateRentPage />} />
      <Route path="/client/rent/" element={<RentListPage />} />
      <Route path="/client/rent/:id" element={<RentPage />} />
      <Route path="/client/profile" element={<ProfilePage />} />
      <Route path="/client/login" element={<LoginPage />} />
      <Route path="/client/register/email" element={<RegisterEmail />} />
      <Route path="/client/register/code" element={<RegisterCode />} />
      <Route path="/client/register/info" element={<RegisterInfo />} />

      <Route path="/welcome" element={<WelcomePage />} />

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
