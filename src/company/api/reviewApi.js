import { clientApi } from "../../shared/store/api";

const reviewApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    getCarReviews: builder.query({
      query: ({ carId }) => ({
        url: `/car/${carId}/reviews`,
        method: "GET",
        prefix: "/client",
      }),
      providesTags: ["Review"],
    }),
  }),
});

export const { useGetCarReviewsQuery } = reviewApi;
