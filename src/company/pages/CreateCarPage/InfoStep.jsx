import { useToast } from "../../../shared/toast";
import { useCreateCarMutation } from "../../../company/api/carApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientApi } from "../../../shared/store/api";

const brandsWithModels = {
  Audi: ["A3", "A4", "A5", "A6", "Q5", "Q7", "S4", "S5", "S6", "S8", "TT"],
  BMW: ["3-series", "5-series", "6-series", "7-series", "8-series"],
  Mercedes: ["C-class", "E-class", "S-class", "SL-class"],
  Volvo: ["XC90", "XC70", "XC40", "XC30", "V70", "V50", "V40", "V30"],
};
const brands = Object.keys(brandsWithModels);

export const InfoStep = ({ goBack, location }) => {
  const { openToast } = useToast();
  const navigate = useNavigate();

  const [chosenBrand, setChosenBrand] = useState(brands[0]);
  const [chosenModel, setChosenModel] = useState(
    brandsWithModels[chosenBrand][0]
  );

  const [createCar] = useCreateCarMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!chosenBrand || !chosenModel || !location) return;

    createCar({ brand: chosenBrand, model: chosenModel, ...location })
      .unwrap()
      .then(() => {
        navigate("/company");
        openToast({
          content: "Car created",
          type: "success",
        });
        clientApi.util.invalidateTags(["Cars"]);
      })
      .catch((error) => {
        openToast({
          content: error.message,
          type: "error",
        });
      });
  };

  return (
    <div>
      <h2>Info</h2>
      <form onSubmit={onSubmit}>
        <div>
          <button onClick={goBack}>Go back</button>
        </div>

        <label>Brand</label>
        <select onChange={(e) => setChosenBrand(e.target.value)}>
          {brands.map((brand) => (
            <option key={brand}>{brand}</option>
          ))}
        </select>
        <label>Model</label>
        <select
          value={chosenModel}
          onChange={(e) => setChosenModel(e.target.value)}
        >
          {brandsWithModels[chosenBrand].map((model) => (
            <option key={model}>{model}</option>
          ))}
        </select>

        <button type="submit">create</button>
      </form>
    </div>
  );
};
