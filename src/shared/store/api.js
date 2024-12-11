import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { withTokenInterceptor } from "./interceptors";
import { authRejectInterceptor } from "./interceptors";

const createAxiosBaseQuery =
  (api, urlPrefix = "") =>
  async ({
    url,
    method,
    body,
    params,
    withCredentials,
    prefix = urlPrefix,
  }) => {
    try {
      const requestConfig = {
        url: prefix + url,
        method,
        data: body,
        params,
        withCredentials,
      };

      const result = await api.request(requestConfig);

      return { data: result.data };
    } catch (error) {
      if (error) {
        throw error.response?.data;
      }

      throw error;
    }
  };

export const clientApiInstance = axios.create({
  withCredentials: false,
  baseURL: "http://localhost:3000/",
});
clientApiInstance.interceptors.request.use(withTokenInterceptor);
clientApiInstance.interceptors.response.use(undefined, authRejectInterceptor);

export const companyApiInstance = axios.create({
  withCredentials: false,
  baseURL: "http://localhost:3000/",
});
companyApiInstance.interceptors.request.use(withTokenInterceptor);
companyApiInstance.interceptors.response.use(undefined, authRejectInterceptor);

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: createAxiosBaseQuery(clientApiInstance, "client"),
  endpoints: () => ({}),
});

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: createAxiosBaseQuery(companyApiInstance, "company"),
  endpoints: () => ({}),
});
