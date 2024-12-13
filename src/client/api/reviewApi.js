import { clientApi } from "../../shared/store/api";

const reviewApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    getCarReviews: builder.query({
      query: ({ carId }) => ({
        url: `/car/${carId}/reviews`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    createReview: builder.mutation({
      query: (body) => ({
        url: `/me/reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"],
    }),
    removeReview: builder.mutation({
      query: ({ id }) => ({
        url: `/me/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetCarReviewsQuery,
  useCreateReviewMutation,
  useRemoveReviewMutation,
} = reviewApi;
