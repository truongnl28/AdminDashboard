import React, { useState } from "react";
import "./configModal.css";

// ManageProductModal component for creating a new product category
function ManageProductModal({ onClose, onSave }) {
  // State variables to manage form inputs, errors, and default setting
  const [categoryName, setCategoryName] = useState("");
  const [xPoints, setXPoints] = useState("");
  const [yPoints, setYPoints] = useState("");
  const [isDefault, setIsDefault] = useState(true);

  // State variable to track validation errors for each field
  const [errors, setErrors] = useState({
    categoryName: "",
    xPoints: "",
    yPoints: "",
  });

  // Handle save button click
  const handleSave = () => {
    // Check for empty fields and invalid inputs
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

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    // Reset errors if no errors
    setErrors({
      categoryName: "",
      xPoints: "",
      yPoints: "",
    });

    // Call the onSave callback with the form data
    onSave({ categoryName, xPoints, yPoints, isDefault });

    // Close the modal
    onClose();
  };

  // Handle input changes for each field
  const handleInputChange = (e, field) => {
    const value = e.target.value;

    // Clear error when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));

    // Update state based on input field
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

  // JSX structure for the ManageProductModal component
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>TẠO MỚI</h2>

        {/* Input for product category name */}
        <label htmlFor="productName">Tên danh mục sản phẩm:</label>
        <input
          type="text"
          id="productName"
          value={categoryName}
          onChange={(e) => handleInputChange(e, "categoryName")}
        />
        {errors.categoryName && (
          // Display error message if product category name is empty
          <p className="error-message" style={{ color: "red" }}>
            {errors.categoryName}
          </p>
        )}

        {/* Input for X points */}
        <label htmlFor="xPoints">Điểm X:</label>
        <input
          type="text"
          id="xPoints"
          value={xPoints}
          onChange={(e) => handleInputChange(e, "xPoints")}
        />
        {errors.xPoints && (
          // Display error message if X points are invalid
          <p className="error-message" style={{ color: "red" }}>
            {errors.xPoints}
          </p>
        )}

        {/* Input for Y points */}
        <label htmlFor="yPoints">Điểm Y:</label>
        <input
          type="text"
          id="yPoints"
          value={yPoints}
          onChange={(e) => handleInputChange(e, "yPoints")}
        />
        {errors.yPoints && (
          // Display error message if Y points are invalid
          <p className="error-message" style={{ color: "red" }}>
            {errors.yPoints}
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

export default ManageProductModal;
