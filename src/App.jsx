import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import "./shared/styles.css";
import { MapPage } from "./client/pages/MapPage/MapPage";
import { RentPage } from "./client/pages/RentPage/RentPage";
import { RentListPage } from "./client/pages/RentListPage/RentListPage";
import { CreateRentPage } from "./client/pages/CreateRentPage/CreateRentPage";
import { LoginPage as ClientLoginPage } from "./client/pages/LoginPage/LoginPage";
import { withToasts } from "./shared/toast";
import { RegisterEmail as ClientRegisterEmail } from "./client/pages/RegisterSteper/RegisterEmail";
import { RegisterCode as ClientRegisterCode } from "./client/pages/RegisterSteper/RegisterCode";
import { RegisterInfo as ClientRegisterInfo } from "./client/pages/RegisterSteper/RegisterInfo";
import { LoginPage as CompanyLoginPage } from "./company/pages/LoginPage/LoginPage";
import { RegisterEmail as CompanyRegisterEmail } from "./company/pages/RegisterSteper/RegisterEmail";
import { RegisterCode as CompanyRegisterCode } from "./company/pages/RegisterSteper/RegisterCode";
import { RegisterInfo as CompanyRegisterInfo } from "./company/pages/RegisterSteper/RegisterInfo";
import { WelcomePage } from "./shared/ui/Welcome/WelcomePage";
import { useClientAuth } from "./client/model/useClientAuth";
import { ProfilePage as ClientProfilePage } from "./client/pages/ProfilePage/ProfilePage";
import { ProfilePage as CompanyProfilePage } from "./company/pages/ProfilePage/ProfilePage";
import { useEffect } from "react";
import { useCompanyAuth } from "./company/model/useCompanyAuth";
import { CarListPage } from "./company/pages/CarListPage/CarListPage";
import { CreateCarPage } from "./company/pages/CreateCarPage/CreateCarPage";
import { CarPage } from "./company/pages/CarPage/CarPage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") navigate("/welcome");
  }, [location]);

  useClientAuth();
  useCompanyAuth();

  return (
    <Routes>
      <Route path="/client" element={<MapPage />} />
      <Route path="/client/car/:id/rent" element={<CreateRentPage />} />
      <Route path="/client/rent/" element={<RentListPage />} />
      <Route path="/client/rent/:id" element={<RentPage />} />
      <Route path="/client/profile" element={<ClientProfilePage />} />
      <Route path="/client/login" element={<ClientLoginPage />} />
      <Route path="/client/register/email" element={<ClientRegisterEmail />} />
      <Route path="/client/register/code" element={<ClientRegisterCode />} />
      <Route path="/client/register/info" element={<ClientRegisterInfo />} />

      <Route path="/welcome" element={<WelcomePage />} />

      <Route path="/company" element={<CarListPage />} />
      <Route path="/company/car/create" element={<CreateCarPage />} />
      <Route path="/company/car/:id" element={<CarPage />} />
      <Route path="/company/profile" element={<CompanyProfilePage />} />
      <Route path="/company/login" element={<CompanyLoginPage />} />
      <Route
        path="/company/register/email"
        element={<CompanyRegisterEmail />}
      />
      <Route path="/company/register/code" element={<CompanyRegisterCode />} />
      <Route path="/company/register/info" element={<CompanyRegisterInfo />} />
    </Routes>
  );
}

export default withToasts(App);
