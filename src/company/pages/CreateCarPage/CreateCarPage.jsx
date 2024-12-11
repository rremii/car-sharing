import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { LocationStep } from "./LocationStep";
import { InfoStep } from "./InfoStep";

export const CreateCarPage = () => {
  const [step, setStep] = useState("location");
  const [location, setLocation] = useState(null);

  const setLocationStep = () => {
    setStep("location");
  };
  const setInfoStep = () => {
    setStep("info");
  };

  return (
    <>
      <Header />
      {step === "location" && (
        <LocationStep onLocationChange={setLocation} onNextStep={setInfoStep} />
      )}
      {step === "info" && (
        <InfoStep goBack={setLocationStep} location={location} />
      )}
    </>
  );
};
