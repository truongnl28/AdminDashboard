import React, { useState } from "react";

import "../styles.css";

import ManageProductModal from "../NewConfigModal/manageProductModal";
import PencilIcon from "../../assets/icons/pencil.svg";
import SaveIcon from "../../assets/icons/save.svg";
import TrashIcon from "../../assets/icons/trash.svg";

function ManageProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialData = [
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
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Lọc dữ liệu dựa trên tên danh mục sản phẩm
    const filteredData = initialData.filter((row) =>
      row.categoryName.toLowerCase().includes(query)
    );
    setData(filteredData);
  };

  const handleEdit = (id) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, isEditing: true } : row))
    );
  };

  const handleSave = (id) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, isEditing: false } : row
      )
    );
  };

  const handleInputChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleFilterChange = (id, filter) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, isDefault: filter === "true" } : row
      )
    );
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");
    if (isConfirmed) {
      setData((prevData) => prevData.filter((row) => row.id !== id));
    }
  };

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveModal = (newConfig) => {
    // Xử lý logic lưu dữ liệu mới vào state
    setData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        ...newConfig,
        isEditing: false,
      },
    ]);
  };

  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Danh sách danh mục sản phẩm</h2>
          <div className="content-create-btn">
            <button onClick={handleCreate}>Tạo mới</button>
          </div>
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

        {isModalOpen && (
          <ManageProductModal
            onClose={handleCloseModal}
            onSave={handleSaveModal}
          />
        )}

        {data.length > 0 ? (
          <table>
            <tr>
              <th>Tên danh mục sản phẩm</th>
              <th>Điểm X</th>
              <th>Điểm Y</th>
              <th>Mặc định</th>
              <th>Thao tác</th>
              <th>Xóa</th>
            </tr>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
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
          <div className="empty-table">Không có dữ liệu này</div>
        )}
      </div>
    </div>
  );
}

export default ManageProductList;
