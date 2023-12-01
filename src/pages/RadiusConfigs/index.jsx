import React, { useState } from "react";
import "../styles.css";
import RadiusModal from "../NewConfigModal/radiusModal";
import PencilIcon from "../../assets/icons/pencil.svg";
import SaveIcon from "../../assets/icons/save.svg";
import TrashIcon from "../../assets/icons/trash.svg";

function RadiusList() {
  // State to manage the data for the radius configurations
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

  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle editing a configuration
  const handleEdit = (id) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, isEditing: true } : row))
    );
  };

  // Function to save the edited configuration
  const handleSave = (id) => {
    const editedConfig = data.find((row) => row.id === id);

    // Validation: Check if the edited configuration is not empty
    if (editedConfig.config.trim() === "") {
      alert("Vui lòng nhập dữ liệu.");
      return;
    }

    // Validation: Check for duplicate configurations
    if (isDuplicateConfig(editedConfig.config, id)) {
      alert("Dữ liệu đã tồn tại. Vui lòng chọn dữ liệu khác.");
      return;
    }

    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, isEditing: false } : row
      )
    );
  };

  // Function to handle input change for configuration
  const handleInputChange = (id, e) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, config: e.target.value } : row
      )
    );
  };

  // Function to handle filter change for default configuration
  const handleFilterChange = (id, filter) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, isDefault: filter === "true" } : row
      )
    );
  };

  // Function to handle configuration deletion
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");

    if (isConfirmed) {
      setData((prevData) => prevData.filter((row) => row.id !== id));
    }
  };

  // Function to open the modal for creating a new configuration
  const handleCreate = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to save a new configuration from the modal
  const handleSaveModal = (newConfig) => {
    const { config } = newConfig;

    // Validation: Check if the new configuration is not empty
    if (config.trim() === "") {
      alert("Vui lòng nhập dữ liệu.");
      return;
    }

    // Validation: Check for duplicate configurations
    if (isDuplicateConfig(config, 0)) {
      alert("Dữ liệu đã tồn tại. Vui lòng chọn dữ liệu khác.");
      return;
    }

    // Add the new configuration to the data
    setData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        ...newConfig,
        isEditing: false,
      },
    ]);
  };

  // Function to check if a configuration is a duplicate
  const isDuplicateConfig = (config, id) => {
    return data.some(
      (row) =>
        row.config.toLowerCase() === config.toLowerCase() && row.id !== id
    );
  };

  // Render the component
  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Danh sách cấu hình khoảng cách</h2>
          <div className="content-create-btn">
            {/* Button to create a new configuration */}
            <button onClick={handleCreate}>Tạo mới</button>
          </div>
        </div>

        {/* Render the modal if isModalOpen is true */}
        {isModalOpen && (
          <RadiusModal onClose={handleCloseModal} onSave={handleSaveModal} />
        )}

        {/* Render the table if there is data, otherwise show a message */}
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Cấu hình khoảng cách</th>
                <th>Mặc định</th>
                <th>Chỉnh sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through the data to render rows in the table */}
              {data.map((row) => (
                <tr key={row.id}>
                  <td>
                    {/* Render an input for editing or display the configuration */}
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
                    {/* Render a dropdown for editing or display the default value */}
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
                    {/* Render a save icon if editing, otherwise render an edit icon */}
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
                    {/* Render a trash icon for deleting a configuration */}
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
          // Display a message if there is no data
          <div className="empty-table">Không có dữ liệu!</div>
        )}
      </div>
    </div>
  );
}

export default RadiusList;
