import { companyApi } from "../../shared/store/api";

const meApi = companyApi.injectEndpoints({
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
