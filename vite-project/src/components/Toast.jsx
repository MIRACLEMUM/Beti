// src/components/Toast.jsx
import { useEffect } from "react";

export default function Toast({ message, onClose, type = "success" }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const baseStyle = "fixed top-5 right-5 text-white px-4 py-2 rounded shadow z-50 animate-slide-in";

  const typeStyle = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div className={`${baseStyle} ${typeStyle[type] || typeStyle.success}`}>
      {message}
    </div>
  );
}
