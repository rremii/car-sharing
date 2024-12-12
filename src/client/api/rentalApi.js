import { clientApi } from "../../shared/store/api";

const rentalApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyRentals: builder.query({
      query: () => ({
        url: `/me/rentals`,
        method: "GET",
      }),
      providesTags: ["Rental"],
    }),
    finishRental: builder.mutation({
      query: ({ id }) => ({
        url: `/me/rentals/${id}/finish`,
        method: "PUT",
      }),
      invalidatesTags: ["Rental"],
    }),
    createRental: builder.mutation({
      query: (rental) => ({
        url: `/me/rentals`,
        method: "POST",
        body: rental,
      }),
      invalidatesTags: ["Rental"],
    }),
  }),
});

export const {
  useGetMyRentalsQuery,
  useFinishRentalMutation,
  useCreateRentalMutation,
} = rentalApi;
