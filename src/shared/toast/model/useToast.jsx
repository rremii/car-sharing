import { useContext } from "react";
import { addToast, removeToast, ToastDispatchContext } from "./toastStore";

export const useToast = () => {
  const dispatch = useContext(ToastDispatchContext);

  const openToast = (toastInfo) => {
    dispatch(addToast(toastInfo));
  };

  const close = (id) => {
    dispatch(removeToast({ id }));
  };

  return { openToast, closeToast: close };
};
