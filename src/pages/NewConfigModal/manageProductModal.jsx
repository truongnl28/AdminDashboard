import React, { useState } from "react";
import "./configModal.css";

function ManageProductModal({ onClose, onSave }) {
  const [categoryName, setCategoryName] = useState("");
  const [xPoints, setXPoints] = useState("");
  const [yPoints, setYPoints] = useState("");
  const [isDefault, setIsDefault] = useState(true);

  const [errors, setErrors] = useState({
    categoryName: "",
    xPoints: "",
    yPoints: "",
  });

  const handleSave = () => {
    // Check for empty fields
    const newErrors = {
      categoryName: !categoryName.trim()
        ? "Tên danh mục sản phẩm không được để trống!"
        : "",
      xPoints:
        !xPoints.trim() || isNaN(xPoints) || xPoints <= 0
          ? "Điểm X không hợp lệ!"
          : "",
      yPoints:
        !yPoints.trim() || isNaN(yPoints) || yPoints <= 0
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

    onSave({ categoryName, xPoints, yPoints, isDefault });
    onClose();
  };

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

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>TẠO MỚI</h2>
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

        <label htmlFor="isDefault">Mặc định:</label>
        <select
          id="isDefault"
          value={isDefault}
          onChange={(e) => setIsDefault(e.target.value === "true")}
        >
          <option value="true">Có</option>
          <option value="false">Không</option>
        </select>

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

export default ManageProductModal;
