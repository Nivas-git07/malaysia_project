import { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function AlertPopup({
  message,
  type = "success",
  onClose,
  duration = 2500,
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="toast-container">
      <div className={`toast-box ${type}`}>
        {type === "success" ? (
          <FaCheckCircle className="toast-icon success" />
        ) : (
          <FaTimesCircle className="toast-icon error" />
        )}

        <span className="toast-message">{message}</span>

        <button className="toast-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}