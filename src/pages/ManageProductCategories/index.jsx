import React, { useState } from "react";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import ManageProductModal from "../NewConfigModal/manageProductModal";
import PencilIcon from "../../assets/icons/pencil.svg";
import SaveIcon from "../../assets/icons/save.svg";
import TrashIcon from "../../assets/icons/trash.svg";

function ManageProductList() {
  // State for managing product data
  const [data, setData] = useState([
    {
      id: 1,
      categoryName: "Category 1",
      xPoints: "10",
      yPoints: "20",
      isDefault: true,
      isEditing: false,
    },
    {
      id: 2,
      categoryName: "Category 2",
      xPoints: "50",
      yPoints: "30",
      isDefault: false,
      isEditing: false,
    },
    {
      id: 3,
      categoryName: "Category 3",
      xPoints: "10",
      yPoints: "10",
      isDefault: true,
      isEditing: false,
    },
    // Add more rows as needed
  ]);

  // State for managing search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for managing modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for managing current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of rows to display per page
  const rowsPerPage = 6;

  // Filter products based on the search query
  const filteredData = data.filter((row) =>
    row.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get paginated data and page range based on search results
  const paginatedData = sliceData(filteredData, currentPage, rowsPerPage);
  const pageRange = calculateRange(filteredData, rowsPerPage);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handle edit mode for a product
  const handleEdit = (id) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, isEditing: true } : row))
    );
  };

  // Handle saving changes for a product
  const handleSave = (id) => {
    // Check if data is invalid (missing values)
    const isDataInvalid = data.some(
      (row) =>
        row.id === id &&
        (row.categoryName.trim() === "" ||
          row.xPoints.trim() === "" ||
          row.yPoints.trim() === "")
    );

    if (isDataInvalid) {
      alert("Vui lòng điền đầy đủ thông tin trước khi lưu.");
      return;
    }

    // Check for duplicate category name
    if (isDuplicateName(data.find((row) => row.id === id).categoryName, id)) {
      alert("Tên danh mục sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }

    // Update data to exit editing mode
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, isEditing: false } : row
      )
    );
  };

  // Handle input change for a product field
  const handleInputChange = (id, field, value) => {
    // Validate numeric fields (xPoints, yPoints)
    if (field === "xPoints" || field === "yPoints") {
      if (isNaN(value) || value.includes(".") || parseFloat(value) <= 0) {
        alert("Giá trị không hợp lệ. Vui lòng nhập lại");
        return;
      }
    }

    // Update data with the new value
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  // Handle change in the default filter for a product
  const handleFilterChange = (id, filter) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, isDefault: filter === "true" } : row
      )
    );
  };

  // Handle deletion of a product
  const handleDelete = (id) => {
    // Confirm deletion with the user
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");
    if (isConfirmed) {
      // Remove the product from the data
      setData((prevData) => prevData.filter((row) => row.id !== id));
    }
  };

  // Handle opening the modal for creating a new product
  const handleCreate = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Validate data for a new product
  const validateData = (newConfig) => {
    const { xPoints, yPoints } = newConfig;

    if (isNaN(xPoints) || xPoints.includes(".") || parseFloat(xPoints) <= 0) {
      return "Điểm X không hợp lệ. Vui lòng nhập số dương và không có dấu thập phân.";
    }

    if (isNaN(yPoints) || yPoints.includes(".") || parseFloat(yPoints) <= 0) {
      return "Điểm Y không hợp lệ. Vui lòng nhập số dương và không có dấu thập phân.";
    }

    return null;
  };

  // Handle saving changes for a new product from the modal
  const handleSaveModal = (newConfig) => {
    const { categoryName, xPoints, yPoints } = newConfig;

    // Check for missing values in the new product
    if (
      categoryName.trim() === "" ||
      xPoints.trim() === "" ||
      yPoints.trim() === ""
    ) {
      alert("Vui lòng điền đầy đủ thông tin trước khi lưu.");
      return;
    }

    // Validate numeric fields (xPoints, yPoints)
    const validationError = validateData(newConfig);

    if (validationError) {
      alert(validationError);
      return;
    }

    // Check for duplicate category name in the new product
    if (isDuplicateName(categoryName, 0)) {
      alert("Tên danh mục sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }

    // Add the new product to the data
    setData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        ...newConfig,
        isEditing: false,
      },
    ]);
  };

  // Check if a category name is a duplicate
  const isDuplicateName = (name, id) => {
    return data.some(
      (row) =>
        row.categoryName.toLowerCase() === name.toLowerCase() && row.id !== id
    );
  };

  // Handle change in the current page for pagination
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  // Render the component
  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Danh sách danh mục sản phẩm</h2>

          {/* Button for creating a new product */}
          <div className="content-create-btn">
            <button onClick={handleCreate}>Tạo mới</button>
          </div>

          {/* Search input for filtering products */}
          <div className="content-search">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className="content-input"
              onChange={handleSearch}
              value={searchQuery}
            />
          </div>
        </div>

        {/* Render the modal for creating a new product */}
        {isModalOpen && (
          <ManageProductModal
            onClose={handleCloseModal}
            onSave={handleSaveModal}
          />
        )}

        {/* Render the product data table if there are products */}
        {filteredData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Tên danh mục sản phẩm</th>
                <th>Điểm X</th>
                <th>Điểm Y</th>
                <th>Mặc định</th>
                <th>Thao tác</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through paginated data to display product rows */}
              {paginatedData.map((row) => (
                <tr key={row.id}>
                  {/* Render category name field */}
                  <td>
                    <span>
                      {row.isEditing ? (
                        <input
                          type="text"
                          value={row.categoryName}
                          onChange={(e) =>
                            handleInputChange(
                              row.id,
                              "categoryName",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        row.categoryName
                      )}
                    </span>
                  </td>

                  {/* Render xPoints field */}
                  <td>
                    <span>
                      {row.isEditing ? (
                        <input
                          type="text"
                          value={row.xPoints}
                          onChange={(e) =>
                            handleInputChange(row.id, "xPoints", e.target.value)
                          }
                        />
                      ) : (
                        row.xPoints
                      )}
                    </span>
                  </td>

                  {/* Render yPoints field */}
                  <td>
                    <span>
                      {row.isEditing ? (
                        <input
                          type="text"
                          value={row.yPoints}
                          onChange={(e) =>
                            handleInputChange(row.id, "yPoints", e.target.value)
                          }
                        />
                      ) : (
                        row.yPoints
                      )}
                    </span>
                  </td>

                  {/* Render isDefault field */}
                  <td>
                    <span>
                      {row.isEditing ? (
                        <div className="filter-dropdown">
                          <select
                            value={row.isDefault.toString()}
                            onChange={(e) =>
                              handleFilterChange(row.id, e.target.value)
                            }
                          >
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                          </select>
                        </div>
                      ) : row.isDefault ? (
                        "Có"
                      ) : (
                        "Không"
                      )}
                    </span>
                  </td>

                  {/* Render edit or save icon based on edit mode */}
                  <td>
                    <span>
                      {row.isEditing ? (
                        <img
                          src={SaveIcon}
                          alt=""
                          onClick={() => handleSave(row.id)}
                        />
                      ) : (
                        <img
                          src={PencilIcon}
                          alt=""
                          onClick={() => handleEdit(row.id)}
                        />
                      )}
                    </span>
                  </td>

                  {/* Render delete icon */}
                  <td>
                    <span>
                      <img
                        src={TrashIcon}
                        alt=""
                        onClick={() => handleDelete(row.id)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // Display a message when there is no product data
          <div className="empty-table">Không có dữ liệu!</div>
        )}

        {/* Render pagination buttons if there are products */}
        <div className="content-footer">
          {filteredData.length > 0
            ? pageRange.map((page) => (
                <span
                  key={page}
                  className={
                    page === currentPage ? "active-pagination" : "pagination"
                  }
                  onClick={() => handleChangePage(page)}
                >
                  {page}
                </span>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ManageProductList;
