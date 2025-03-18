import React from "react";

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <div className="popup-buttons">
          <button onClick={onConfirm} className="btn-confirm">
            Confirm
          </button>
          <button onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
