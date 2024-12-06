import { ToastProvider } from "../ui/ToastProvider";

export const withToasts = (Component) => {
  return (props) => {
    return (
      <ToastProvider>
        <Component {...props} />
      </ToastProvider>
    );
  };
};
