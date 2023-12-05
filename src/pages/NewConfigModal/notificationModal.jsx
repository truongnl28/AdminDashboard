import React, { useState } from "react";
import "./configModal.css";

function NotificationModal({ onClose, onSave }) {
  // State variables for modal fields and errors
  const [config, setConfig] = useState("");
  const [isDefault, setIsDefault] = useState(true);
  const [configError, setConfigError] = useState("");

  // Function to handle saving the notification and closing the modal
  const handleSave = () => {
    // Validate input field for configuration
    if (config.trim() === "") {
      setConfigError("Không được để trống!");
      return;
    }

    // Clear validation error
    setConfigError("");
    
    // Call onSave with notification details and close the modal
    onSave({ config, isDefault });
    onClose();
  };

  // Render the modal UI
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>TẠO MỚI</h2>

        {/* Input field for notification configuration */}
        <label htmlFor="config">Cấu hình tần suất thông báo:</label>
        <input
          type="text"
          id="config"
          value={config}
          onChange={(e) => {
            setConfig(e.target.value);
            setConfigError("");
          }}
        />
        {configError && (
          <p className="error-message" style={{ color: "red" }}>
            {configError}
          </p>
        )}

        {/* Dropdown for selecting default status */}
        <label htmlFor="isDefault">Mặc định:</label>
        <select
          id="isDefault"
          value={isDefault.toString()}
          onChange={(e) => setIsDefault(e.target.value === "true")}
        >
          <option value="true">Có</option>
          <option value="false">Không</option>
        </select>

        {/* Buttons for closing or saving the modal */}
        <div className="buttons-container">
          <button className="cancel-btn" type="button" onClick={onClose}>
            Đóng
          </button>
          <button className="submit-btn" type="button" onClick={handleSave}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
