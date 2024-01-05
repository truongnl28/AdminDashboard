import React, { useState } from "react";
import "./configModal.css";

function RankModal({ onClose, onSave }) {
  // State variables for managing form inputs and error handling
  const [rankName, setName] = useState("");
  const [imageUrl, setImageURL] = useState("");
  const [image, setImage] = useState(null);
  const [point, setScore] = useState("");
  const [nameError, setNameError] = useState("");
  const [scoreError, setScoreError] = useState("");
  const [imageError, setImageError] = useState("");

  // Function to handle saving the rank configuration and closing the modal
  const handleSave = () => {
    // Validate input fields for name, image, and score
    if (rankName.trim() === "") {
      setNameError("Không được để trống!");
      return;
    }

    if (point.trim() === "") {
      setScoreError("Không được để trống!");
      return;
    }

    if (image === null) {
      setImageError("Không được để trống!");
      return;
    }

    // Clear validation errors
    setNameError("");
    setScoreError("");
    setImageError("");

    // Call onSave with rank details and close the modal
    onSave({ rankName, imageUrl,image, point});
    onClose();
  };

  // Function to handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You may want to perform additional validation for the file type, size, etc.
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
        setImage(file)
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
          value={rankName}
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
          value={point}
          onChange={(e) => {
            if (isNaN(e.target.value) || e.target.value.includes(".") || parseFloat(e.target.value) <= 0) {
              return setScoreError("Vui lòng nhập số dương và không có dấu thập phân.");
            }else{
              setScore(e.target.value);
              setScoreError("");
            }
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
