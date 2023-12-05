import React, { useState } from "react";
import "./configModal.css";

function ManageProductModal({ onClose, onSave }) {
  // State variables for modal fields and errors
  const [categoryName, setCategoryName] = useState("");
  const [xPoints, setXPoints] = useState("");
  const [yPoints, setYPoints] = useState("");
  const [isDefault, setIsDefault] = useState(true);

  // State for validation errors
  const [errors, setErrors] = useState({
    categoryName: "",
    xPoints: "",
    yPoints: "",
  });

  // Function to handle saving the product and closing the modal
  const handleSave = () => {
    // Validate input fields
    const newErrors = {
      categoryName: !categoryName.trim()
        ? "Tên danh mục sản phẩm không được để trống!"
        : "",
      xPoints:
        !xPoints.trim() ||
        isNaN(xPoints) ||
        xPoints <= 0 ||
        xPoints.includes(".")
          ? "Điểm X không hợp lệ!"
          : "",
      yPoints:
        !yPoints.trim() ||
        isNaN(yPoints) ||
        yPoints <= 0 ||
        yPoints.includes(".")
          ? "Điểm Y không hợp lệ!"
          : "",
    };

    // If there are validation errors, set them and prevent saving
    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    // Clear validation errors
    setErrors({
      categoryName: "",
      xPoints: "",
      yPoints: "",
    });

    // Call onSave with product details and close the modal
    onSave({ categoryName, xPoints, yPoints, isDefault });
    onClose();
  };

  // Function to handle input changes and clear validation errors
  const handleInputChange = (e, field) => {
    const value = e.target.value;

    // Clear validation error for the current field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));

    // Update state based on the field
    switch (field) {
      case "categoryName":
        setCategoryName(value);
        break;
      case "xPoints":
        setXPoints(value);
        break;
      case "yPoints":
        setYPoints(value);
        break;
      default:
        break;
    }
  };

  // Render the modal UI
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>TẠO MỚI</h2>

        {/* Input fields for product details */}
        <label htmlFor="productName">Tên danh mục sản phẩm:</label>
        <input
          type="text"
          id="productName"
          value={categoryName}
          onChange={(e) => handleInputChange(e, "categoryName")}
        />
        {errors.categoryName && (
          <p className="error-message" style={{ color: "red" }}>
            {errors.categoryName}
          </p>
        )}

        <label htmlFor="xPoints">Điểm X:</label>
        <input
          type="text"
          id="xPoints"
          value={xPoints}
          onChange={(e) => handleInputChange(e, "xPoints")}
        />
        {errors.xPoints && (
          <p className="error-message" style={{ color: "red" }}>
            {errors.xPoints}
          </p>
        )}

        <label htmlFor="yPoints">Điểm Y:</label>
        <input
          type="text"
          id="yPoints"
          value={yPoints}
          onChange={(e) => handleInputChange(e, "yPoints")}
        />
        {errors.yPoints && (
          <p className="error-message" style={{ color: "red" }}>
            {errors.yPoints}
          </p>
        )}

        {/* Dropdown for selecting default status */}
        <label htmlFor="isDefault">Mặc định:</label>
        <select
          id="isDefault"
          value={isDefault}
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

export default ManageProductModal;
