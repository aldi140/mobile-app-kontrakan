import { useState } from "react";
import { AppError } from "@/lib/AppError";

export const useErrorModal = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showError = (err: unknown) => {
    let msg = "Terjadi kesalahan.";
    if (typeof err === "string") {
      msg = err;
    } else if (err instanceof AppError) {
      msg = err.message;
    } else if (err && typeof err === "object") {
      const anyErr = err as any;
      if (anyErr.message && typeof anyErr.message === "string") {
        msg = anyErr.message;
      } else if (anyErr.response?.data?.message) {
        msg = anyErr.response.data.message;
      }
    }
    setMessage(msg);
    setVisible(true);
  };

  const hideError = () => {
    setVisible(false);
    setMessage("");
  };

  return {
    visible,
    message,
    showError,
    hideError,
  };
};
