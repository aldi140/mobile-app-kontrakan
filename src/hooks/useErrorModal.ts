// hooks/useErrorModal.ts

import { useState } from "react";

export const useErrorModal = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showError = (message: string) => {
    setMessage(message);
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
