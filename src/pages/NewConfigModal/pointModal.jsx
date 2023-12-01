import React, { useState } from "react";
import "./configModal.css";

// PointModal component for creating a new point configuration
function PointModal({ onClose, onSave }) {
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

    // Check if config is a positive integer
    const isPositiveInteger = /^\d+$/.test(config);
    if (!isPositiveInteger) {
      setConfigError("Cấu hình điểm mặc định phải là số!");
      return;
    }

    setConfigError(""); // Clear error message if valid
    onSave({ config, isDefault });
    onClose();
  };

  // JSX structure for the PointModal component
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>TẠO MỚI</h2>

        {/* Input for configuring the default point */}
        <label htmlFor="config">Cấu hình điểm mặc định:</label>
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
          // Display error message if configuration is empty or not a positive integer
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

export default PointModal;
