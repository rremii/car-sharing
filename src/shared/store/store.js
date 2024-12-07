import { configureStore } from "@reduxjs/toolkit";
import { clientApi, companyApi } from "./api";
import { authSlice } from "../../client/model/authSlice";

export const store = configureStore({
  reducer: {
    clientAuth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clientApi.middleware)
      .concat(companyApi.middleware),
});
