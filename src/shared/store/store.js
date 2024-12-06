import { configureStore } from "@reduxjs/toolkit";
import { clientApi, companyApi } from "./api";

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clientApi.middleware)
      .concat(companyApi.middleware),
});
