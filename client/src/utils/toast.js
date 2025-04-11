import { toast } from "react-toastify";
import React from "react";
import { Check, AlertCircle } from "lucide-react";

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  className: "rounded-[10px] text-lg",
  boxShadow: "none",
};

export const showToast = {
  success: (message) => {
    toast.success(message, {
      ...toastConfig,
      icon: React.createElement(Check, {
        size: 24,
        color: "var(--toast-accent-text)",
      }),
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
    });
  },
  error: (message) => {
    toast.error(message, {
      ...toastConfig,
      icon: React.createElement(AlertCircle, {
        size: 24,
        color: "var(--toast-error-text)",
      }),
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
    });
  },
};
