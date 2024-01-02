import React, { useState } from "react";
import "./configModal.css";

function RankModal({ onClose, onSave }) {
  // State variables for managing form inputs and error handling
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [score, setScore] = useState("");
  const [isDefault, setIsDefault] = useState(true);
  const [nameError, setNameError] = useState("");
  const [scoreError, setScoreError] = useState("");
  const [imageError, setImageError] = useState("");

  // Function to handle saving the rank configuration and closing the modal
  const handleSave = () => {
    // Validate input fields for name, image, and score
    if (name.trim() === "") {
      setNameError("Không được để trống!");
      return;
    }

    if (score.trim() === "") {
      setScoreError("Không được để trống!");
      return;
    }

    if (image.trim() === "") {
      setImageError("Không được để trống!");
      return;
    }

    // Clear validation errors
    setNameError("");
    setScoreError("");
    setImageError("");

    // Call onSave with rank details and close the modal
    onSave({ name, image, score, isDefault });
    onClose();
  };

  // Function to handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You may want to perform additional validation for the file type, size, etc.
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Render the modal UI
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>TẠO MỚI</h2>

        {/* Input field for rank image URL */}
        <label htmlFor="image">Hình ảnh:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imageError && (
          <p className="error-message" style={{ color: "red" }}>
            {imageError}
          </p>
        )}

        {/* Input field for rank name */}
        <label htmlFor="name">Tên cấp bậc:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError("");
          }}
        />
        {nameError && (
          <p className="error-message" style={{ color: "red" }}>
            {nameError}
          </p>
        )}

        {/* Input field for rank score */}
        <label htmlFor="score">Điểm:</label>
        <input
          type="text"
          id="score"
          value={score}
          onChange={(e) => {
            setScore(e.target.value);
            setScoreError("");
          }}
        />
        {scoreError && (
          <p className="error-message" style={{ color: "red" }}>
            {scoreError}
          </p>
        )}

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

export default RankModal;
