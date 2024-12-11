import { companyApi } from "../../shared/store/api";

const authApi = companyApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    sendCode: builder.mutation({
      query: (body) => ({
        url: "/send-code",
        method: "POST",
        body,
      }),
    }),
    refresh: builder.mutation({
      query: (body) => ({
        url: "/refresh",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendCodeMutation,
  useRefreshMutation,
} = authApi;
