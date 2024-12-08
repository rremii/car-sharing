import { clientApi } from "../../shared/store/api";

const meApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMeQuery } = meApi;
