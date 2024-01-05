import React, { useState } from "react";
import "./configModal.css";

function RadiusModal({ onClose, onSave }) {
  // State variables for managing form inputs and error handling
  const [radius, setRadius] = useState("");
  // const [isDefault, setIsDefault] = useState(true);
  const [configError, setConfigError] = useState("");

  // Function to handle saving the radius configuration and closing the modal
  const handleSave = () => {
    // Validate input field for radius configuration
    if (radius.trim() === "") {
      setConfigError("Không được để trống!");
      return;
    }

    // Clear validation error
    setConfigError("");

    // Call onSave with radius details and close the modal
    onSave({ radius });
    onClose();
  };

  // Render the modal UI
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>TẠO MỚI</h2>

        {/* Input field for radius configuration */}
        <label htmlFor="config">Cấu hình khoảng cách:</label>
        <input
          type="text"
          id="config"
          value={radius}
          onChange={(e) => {
            setRadius(e.target.value);
            setConfigError("");
          }}
        />
        {configError && (
          <p className="error-message" style={{ color: "red" }}>
            {configError}
          </p>
        )}

        {/* Dropdown for selecting default status */}
        {/* <label htmlFor="isDefault">Mặc định:</label>
        <select
          id="isDefault"
          value={isDefault.toString()}
          onChange={(e) => setIsDefault(e.target.value === "true")}
        >
          <option value="true">Có</option>
          <option value="false">Không</option>
        </select> */}

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

export default RadiusModal;
