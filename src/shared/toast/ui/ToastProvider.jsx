import React, { FC, PropsWithChildren, useReducer } from "react";
import {
  initialState,
  ToastContext,
  ToastDispatchContext,
  ToastReducer,
} from "../model/toastStore";
import { Toast } from "./Toast";
import { ToastBox } from "./ToastsBox";

export const ToastProvider = ({ children }) => {
  const [toastState, dispatch] = useReducer(ToastReducer, initialState);

  return (
    <ToastDispatchContext.Provider value={dispatch}>
      <ToastContext.Provider value={toastState}>
        <ToastBox>
          {toastState.toasts.map((toast, index) => (
            <Toast
              key={toast.id}
              {...toast}
              index={toastState.toasts.length - index - 1}
            />
          ))}
        </ToastBox>
        {children}
      </ToastContext.Provider>
    </ToastDispatchContext.Provider>
  );
};
