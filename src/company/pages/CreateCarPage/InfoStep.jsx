import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useToast } from "../../../shared/toast";

const brands = ["Audi", "BMW", "Mercedes", "Volvo"];
const brandsRegex = new RegExp(brands.join("|"));

const InfoSchema = yup.object({
  brand: yup.string().matches(brandsRegex).required(),
  model: yup.string().required(),
});

export const InfoStep = ({ goBack, location }) => {
  const { openToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(InfoSchema),
  });

  useEffect(() => {
    if (errors.brand) {
      openToast({
        content: errors.brand.message,
        type: "error",
      });
    }
    if (errors.model) {
      openToast({
        content: errors.model.message,
        type: "error",
      });
    }
  }, [errors]);

  const onSubmit = ({ brand, model }) => {
    if (!brand || !model) return;
  };

  return (
    <div>
      <h2>Info</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <button onClick={goBack}>Go back</button>
        </div>

        <label>Brand</label>
        <select {...register("brand")}>
          {brands.map((brand) => (
            <option key={brand}>{brand}</option>
          ))}
        </select>
        <label>Model</label>
        <input type="text" {...register("model")} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};
