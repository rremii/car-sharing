import { useNavigate } from "react-router-dom";

export const WelcomePage = () => {
  const navigate = useNavigate();

  const goToClient = () => {
    navigate("/client");
  };

  const goToCompany = () => {
    navigate("/company");
  };

  return (
    <div>
      <h1>Welcome</h1>

      <p>Choose your role</p>
      <button onClick={goToClient}>Client</button>
      <button onClick={goToCompany}>Company</button>
    </div>
  );
};
