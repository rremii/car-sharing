import { createContext } from "react";

import { DEFAULT_TOAST_DURATION } from "../constants";

export const initialState = {
  toasts: [],
};

export const ToastDispatchContext = createContext(() => {});
export const ToastContext = createContext({
  toasts: [],
});

export const ToastReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const maxToastId = state.toasts.at(-1)?.id || 0;
      const id = maxToastId + 1;
      const toast = {
        ...action.payload,
        duration: action.payload.duration || DEFAULT_TOAST_DURATION,
        id,
      };

      return {
        ...state,
        toasts: [...state.toasts, toast],
      };
    }

    case "remove":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export function addToast(payload) {
  return {
    type: "add",
    payload,
  };
}

export const removeToast = (payload) => ({
  type: "remove",
  payload,
});
