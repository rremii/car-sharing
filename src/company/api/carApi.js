import { companyApi } from "../../shared/store/api";

const carApi = companyApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyCars: builder.query({
      query: () => ({
        url: "/me/car",
        method: "GET",
      }),
      providesTags: ["Cars"],
    }),
    createCar: builder.mutation({
      query: (body) => ({
        url: "/me/car",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cars"],
    }),
    getCarById: builder.query({
      query: (id) => ({
        url: `/car/${id}`,
        method: "GET",
      }),
    }),
    removeCar: builder.mutation({
      query: (id) => ({
        url: `/me/car/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),
  }),
});

export const {
  useGetMyCarsQuery,
  useCreateCarMutation,
  useGetCarByIdQuery,
  useRemoveCarMutation,
} = carApi;
