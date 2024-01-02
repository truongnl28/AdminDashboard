import React, { useState, useEffect } from "react";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import RankModal from "../NewConfigModal/rankModal";
import PencilIcon from "../../assets/icons/pencil.svg";
import SaveIcon from "../../assets/icons/save.svg";
import TrashIcon from "../../assets/icons/trash.svg";

function RankList() {
  // State for managing rank data
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveModal = (newRank) => {
    const { name, image, score } = newRank;

    if (name.trim() === "" || score.trim() === "") {
      alert("Vui lòng nhập dữ liệu.");
      return;
    }

    if (isDuplicateRank(name, 0)) {
      alert("Dữ liệu đã tồn tại. Vui lòng chọn dữ liệu khác.");
      return;
    }

    setData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        ...newRank,
        isEditing: false,
      },
    ]);
  };

  const isDuplicateRank = (name, id) => {
    return data.some(
      (row) => row.name.toLowerCase() === name.toLowerCase() && row.id !== id
    );
  };

  const handleInputChange = (id, e) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, name: e.target.value } : row
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

  const handleEdit = (id) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, isEditing: true } : row))
    );
  };

  const handleSave = (id) => {
    const editedRank = data.find((row) => row.id === id);

    if (!editedRank || typeof editedRank.name !== "string") {
      alert("Dữ liệu không hợp lệ.");
      return;
    }

    const trimmedName = editedRank.name.trim();
    if (trimmedName === "") {
      alert("Vui lòng nhập dữ liệu.");
      return;
    }

    if (isDuplicateRank(trimmedName, id)) {
      alert("Dữ liệu đã tồn tại. Vui lòng chọn dữ liệu khác.");
      return;
    }

    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, isEditing: false, name: trimmedName } : row
      )
    );
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");

    if (isConfirmed) {
      setData((prevData) => prevData.filter((row) => row.id !== id));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Cấp bậc</h2>
          <div className="content-create-btn">
            <button onClick={handleCreate}>Tạo mới</button>
          </div>
        </div>

        {isModalOpen && (
          <RankModal onClose={handleCloseModal} onSave={handleSaveModal} />
        )}

        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên cấp bậc</th>
                <th>Điểm</th>
                <th>Chỉnh sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {sliceData(data, currentPage, rowsPerPage).map((row) => (
                <tr key={row.id}>
                  <td>
                    <span className="imageRank">
                      {row.isEditing ? (
                        <input
                          type="text"
                          value={row.image}
                          onChange={(e) => handleInputChange(row.id, e)}
                        />
                      ) : (
                        <img src={row.image} alt={row.name} />
                      )}
                    </span>
                  </td>

                  <td>
                    <span>
                      {row.isEditing ? (
                        <input
                          type="text"
                          value={row.name}
                          onChange={(e) => handleInputChange(row.id, e)}
                        />
                      ) : (
                        row.name
                      )}
                    </span>
                  </td>

                  <td>
                    <span>
                      {row.isEditing ? (
                        <input
                          type="text"
                          value={row.score}
                          onChange={(e) => handleInputChange(row.id, e)}
                        />
                      ) : (
                        row.score
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
          <div className="empty-table">Không có dữ liệu!</div>
        )}

        <div className="content-footer">
          {data.length > 0 ? (
            <div className="paginationTable">
              {calculateRange(data, rowsPerPage).map((page) => (
                <span
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={
                    currentPage === page ? "active-pagination" : "pagination"
                  }
                >
                  {page}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default RankList;
