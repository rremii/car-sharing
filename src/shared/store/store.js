import { configureStore } from "@reduxjs/toolkit";
import { clientApi, companyApi } from "./api";
import { authSlice } from "../../client/model/authSlice";

export const store = configureStore({
  reducer: {
    clientAuth: authSlice.reducer,
    companyAuth: authSlice.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clientApi.middleware)
      .concat(companyApi.middleware),
});
