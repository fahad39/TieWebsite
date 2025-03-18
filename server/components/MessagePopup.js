import React, { useEffect } from "react";

const MessagePopup = ({ message, type, onClose }) => {
  // Automatically close the popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div className={`popup-content ${type}`}>
        <p>{message}</p>
        <button onClick={onClose} className="btn-close">
          &times;
        </button>
      </div>
    </div>
  );
};

export default MessagePopup;
