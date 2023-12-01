import React, { useState } from "react";
import "./configModal.css";

// RadiusModal component for creating a new configuration
function RadiusModal({ onClose, onSave }) {
  // State variables to manage form inputs and error handling
  const [config, setConfig] = useState("");
  const [isDefault, setIsDefault] = useState(true);
  const [configError, setConfigError] = useState("");

  // Handle save button click
  const handleSave = () => {
    // Check if the configuration input is not empty
    if (config.trim() === "") {
      setConfigError("Không được để trống!");
      return;
    }

    setConfigError(""); // Clear error message if valid
    onSave({ config, isDefault });
    onClose();
  };

  // JSX structure for the RadiusModal component
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>TẠO MỚI</h2>

        {/* Input for configuring the radius */}
        <label htmlFor="config">Cấu hình khoảng cách:</label>
        <input
          type="text"
          id="config"
          value={config}
          onChange={(e) => {
            setConfig(e.target.value);
            setConfigError(""); // Clear error when typing
          }}
        />
        {configError && (
          // Display error message if configuration is empty
          <p className="error-message" style={{ color: "red" }}>
            {configError}
          </p>
        )}

        {/* Dropdown for setting as default or not */}
        <label htmlFor="isDefault">Mặc định:</label>
        <select
          id="isDefault"
          value={isDefault}
          onChange={(e) => setIsDefault(e.target.value === "true")}
        >
          <option value="true">Có</option>
          <option value="false">Không</option>
        </select>

        {/* Buttons for canceling and submitting the form */}
        <div className="buttons-container">
          <button className="cancel-btn" type="cancel" onClick={onClose}>
            Đóng
          </button>
          <button className="submit-btn" type="submit" onClick={handleSave}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default RadiusModal;
