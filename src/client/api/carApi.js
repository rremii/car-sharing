import { clientApi } from "../../shared/store/api";

const carApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => ({
        url: "/car",
        method: "GET",
        prefix: "/company",
      }),
    }),
  }),
});

export const { useGetAllCarsQuery } = carApi;
