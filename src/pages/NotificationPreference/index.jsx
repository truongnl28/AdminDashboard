import React, { useState } from "react";

import "../styles.css";

import NotificationModal from "../NewConfigModal/notificationModal";
import PencilIcon from "../../assets/icons/pencil.svg";
import SaveIcon from "../../assets/icons/save.svg";
import TrashIcon from "../../assets/icons/trash.svg";

function NotificationList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      config: "Config 1",
      isDefault: true,
      isEditing: false,
    },
    {
      id: 2,
      config: "Config 2",
      isDefault: false,
      isEditing: false,
    },
    // Add more rows as needed
  ]);

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

  const handleInputChange = (id, e) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, config: e.target.value } : row
      )
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
    // Hiển thị xác nhận hoặc sử dụng thư viện modal
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
          <h2>Danh sách cấu hình tần suất thông báo</h2>
          <div className="content-create-btn">
            <button onClick={handleCreate}>Tạo mới</button>
          </div>
        </div>

        {isModalOpen && (
          <NotificationModal
            onClose={handleCloseModal}
            onSave={handleSaveModal}
          />
        )}

        <table>
          <thead>
            <tr>
              <th>Cấu hình tần suất thông báo</th>
              <th>Mặc định</th>
              <th>Chỉnh sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>
                  <span>
                    {row.isEditing ? (
                      <input
                        type="text"
                        value={row.config}
                        onChange={(e) => handleInputChange(row.id, e)}
                      />
                    ) : (
                      row.config
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
      </div>
    </div>
  );
}

export default NotificationList;
