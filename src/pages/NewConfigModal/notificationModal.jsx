import React, { useState } from "react";
import "./configModal.css";

function NotificationModal({ onClose, onSave }) {
  const [config, setConfig] = useState("");
  const [isDefault, setIsDefault] = useState(true);
  const [configError, setConfigError] = useState("");

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

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>TẠO MỚI</h2>
        <label htmlFor="config">Cấu hình tần suất thông báo:</label>
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
          <p className="error-message" style={{ color: "red" }}>
            {configError}
          </p>
        )}
        <label htmlFor="isDefault">Mặc định:</label>
        <select
          id="isDefault"
          value={isDefault.toString()} // Convert boolean to string
          onChange={(e) => setIsDefault(e.target.value === "true")}
        >
          <option value="true">Có</option>
          <option value="false">Không</option>
        </select>

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
