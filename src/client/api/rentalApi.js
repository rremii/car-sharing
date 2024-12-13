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
        method: "PATCH",
      }),
      invalidatesTags: ["Rental", "Cars"],
    }),
    createRental: builder.mutation({
      query: (rental) => ({
        url: `/me/rentals`,
        method: "POST",
        body: rental,
      }),
      invalidatesTags: ["Rental", "Cars"],
    }),

    removeRental: builder.mutation({
      query: ({ id }) => ({
        url: `/me/rentals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rental", "Cars"],
    }),
    getRentById: builder.query({
      query: (id) => ({
        url: `/rentals/${id}`,
        method: "GET",
      }),
      providesTags: ["Rental"],
    }),
  }),
});

export const {
  useGetMyRentalsQuery,
  useFinishRentalMutation,
  useCreateRentalMutation,
  useGetRentByIdQuery,
  useRemoveRentalMutation,
} = rentalApi;
