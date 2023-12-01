import React, { useState } from "react";
import "../styles.css";
import ManageProductModal from "../NewConfigModal/manageProductModal";
import PencilIcon from "../../assets/icons/pencil.svg";
import SaveIcon from "../../assets/icons/save.svg";
import TrashIcon from "../../assets/icons/trash.svg";

function ManageProductList() {
  // State to manage the data for product categories
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

  // State to manage the search query for filtering categories
  const [searchQuery, setSearchQuery] = useState("");

  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle the search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter data based on the category name
    const filteredData = data.filter((row) =>
      row.categoryName.toLowerCase().includes(query)
    );
    setData(filteredData);
  };

  // Function to handle editing a product category
  const handleEdit = (id) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, isEditing: true } : row))
    );
  };

  // Function to save the edited product category
  const handleSave = (id) => {
    // Check if any required data is missing
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

    // Check for duplicate category names
    if (isDuplicateName(data.find((row) => row.id === id).categoryName, id)) {
      alert("Tên danh mục sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }

    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, isEditing: false } : row
      )
    );
  };

  // Function to handle input change for product category
  const handleInputChange = (id, field, value) => {
    if (field === "xPoints" || field === "yPoints") {
      // Validation: Check if the value is a positive integer
      if (isNaN(value) || value.includes(".") || parseFloat(value) <= 0) {
        alert("Giá trị không hợp lệ. Vui lòng nhập lại");
        return;
      }
    }

    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  // Function to handle filter change for default product category
  const handleFilterChange = (id, filter) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, isDefault: filter === "true" } : row
      )
    );
  };

  // Function to handle product category deletion
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");
    if (isConfirmed) {
      setData((prevData) => prevData.filter((row) => row.id !== id));
    }
  };

  // Function to open the modal for creating a new product category
  const handleCreate = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to validate data for a new product category
  const validateData = (newConfig) => {
    const { xPoints, yPoints } = newConfig;

    // Validation: Check if X points are a positive integer without decimal
    if (isNaN(xPoints) || xPoints.includes(".") || parseFloat(xPoints) <= 0) {
      return "Điểm X không hợp lệ. Vui lòng nhập số dương và không có dấu thập phân.";
    }

    // Validation: Check if Y points are a positive integer without decimal
    if (isNaN(yPoints) || yPoints.includes(".") || parseFloat(yPoints) <= 0) {
      return "Điểm Y không hợp lệ. Vui lòng nhập số dương và không có dấu thập phân.";
    }

    return null;
  };

  // Function to save a new product category from the modal
  const handleSaveModal = (newConfig) => {
    const { categoryName, xPoints, yPoints } = newConfig;

    // Validation: Check if any required data is missing
    if (
      categoryName.trim() === "" ||
      xPoints.trim() === "" ||
      yPoints.trim() === ""
    ) {
      alert("Vui lòng điền đầy đủ thông tin trước khi lưu.");
      return;
    }

    // Validation: Check for additional data validation
    const validationError = validateData(newConfig);

    if (validationError) {
      alert(validationError);
      return;
    }

    // Check for duplicate category names
    if (isDuplicateName(categoryName, 0)) {
      alert("Tên danh mục sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }

    // Handle logic to save new data to the state
    setData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        ...newConfig,
        isEditing: false,
      },
    ]);
  };

  // Function to check if a category name is a duplicate
  const isDuplicateName = (name, id) => {
    return data.some(
      (row) =>
        row.categoryName.toLowerCase() === name.toLowerCase() && row.id !== id
    );
  };

  // Render the component
  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Danh sách danh mục sản phẩm</h2>
          <div className="content-create-btn">
            {/* Button to create a new product category */}
            <button onClick={handleCreate}>Tạo mới</button>
          </div>
          <div className="content-search">
            {/* Search input to filter product categories */}
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className="content-input"
              onChange={handleSearch}
              value={searchQuery}
            />
          </div>
        </div>

        {/* Modal for creating/editing product categories */}
        {isModalOpen && (
          <ManageProductModal
            onClose={handleCloseModal}
            onSave={handleSaveModal}
          />
        )}

        {data.length > 0 ? (
          <table>
            <thead>
              {/* Table header */}
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
              {/* Table body with product category data */}
              {data.map((row) => (
                <tr key={row.id}>
                  {/* Cell for category name */}
                  <td>
                    <span>
                      {row.isEditing ? (
                        // Input for editing category name
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
                        // Display category name
                        row.categoryName
                      )}
                    </span>
                  </td>
                  {/* Cell for X points */}
                  <td>
                    <span>
                      {row.isEditing ? (
                        // Input for editing X points
                        <input
                          type="text"
                          value={row.xPoints}
                          onChange={(e) =>
                            handleInputChange(row.id, "xPoints", e.target.value)
                          }
                        />
                      ) : (
                        // Display X points
                        row.xPoints
                      )}
                    </span>
                  </td>
                  {/* Cell for Y points */}
                  <td>
                    <span>
                      {row.isEditing ? (
                        // Input for editing Y points
                        <input
                          type="text"
                          value={row.yPoints}
                          onChange={(e) =>
                            handleInputChange(row.id, "yPoints", e.target.value)
                          }
                        />
                      ) : (
                        // Display Y points
                        row.yPoints
                      )}
                    </span>
                  </td>
                  {/* Cell for default category filter */}
                  <td>
                    <span>
                      {row.isEditing ? (
                        // Dropdown for editing default category
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
                        // Display "Có" for default category
                        "Có"
                      ) : (
                        // Display "Không" for non-default category
                        "Không"
                      )}
                    </span>
                  </td>
                  {/* Cell for save/edit button */}
                  <td>
                    <span>
                      {row.isEditing ? (
                        // Save icon for saving changes
                        <img
                          src={SaveIcon}
                          alt=""
                          onClick={() => handleSave(row.id)}
                        />
                      ) : (
                        // Pencil icon for editing
                        <img
                          src={PencilIcon}
                          alt=""
                          onClick={() => handleEdit(row.id)}
                        />
                      )}
                    </span>
                  </td>
                  {/* Cell for delete button */}
                  <td>
                    <span>
                      {/* Trash icon for deleting the product category */}
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
          // Display a message if there is no data
          <div className="empty-table">Không có dữ liệu!</div>
        )}
      </div>
    </div>
  );
}

export default ManageProductList;
