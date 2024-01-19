import React, { useEffect, useState } from "react";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import RadiusModal from "../NewConfigModal/radiusModal";
import PencilIcon from "../../assets/icons/pencil.svg";
import SaveIcon from "../../assets/icons/save.svg";
import TrashIcon from "../../assets/icons/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRadius,
  getRadius,
  postRadius,
  updateRadius,
} from "../../actions/configs";

function RadiusList() {
  const dispatch = useDispatch();
  const listAllRadius = useSelector(
    (state) => state.listRadiusReducer.listRadius
  );
  // State for managing radius data
  const [data, setData] = useState([]);
  const [numberUpdate, setNumberUpdate] = useState(-1);
  const [numberRadius, setNumberRadius] = useState(0);
  const [isDefault, setIsDefault] = useState(undefined);
  console.log(isDefault, numberRadius);
  useEffect(() => {
    dispatch(getRadius());
  }, [dispatch]);
  useEffect(() => {
    if (listAllRadius) {
      setData(listAllRadius);
    }
  }, [listAllRadius]);
  // State for managing modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for managing current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of rows to display per page
  const rowsPerPage = 8;

  const [sort, setSort] = useState(true);
  const handleSort = () => {
    // Clone the original list to avoid modifying the Redux state directly
    const sortedList = [...listAllRadius];

    // Perform sorting based on isDefault value
    sortedList.sort((a, b) => {
      if (sort) {
        setSort(!sort);
        return a.isDefault - b.isDefault;
      } else {
        setSort(!sort);
        return b.isDefault - a.isDefault;
      }
    });
    setData(sortedList);
  };

  // Handle edit mode for a radius
  const handleEdit = (index, id) => {
    if (numberUpdate === index) {
      setNumberUpdate(-1);
    } else {
      setNumberUpdate(index);
      dispatch(getRadius());
      const editedRadius = data.find((row) => row.id === id);
      const valueDefault = editedRadius.isDefault;
      const takeDefault = editedRadius.radius;
      setIsDefault(valueDefault);
      setNumberRadius(takeDefault);
    }
  };

  // Handle saving changes for a radius
  const handleSave = (id, index) => {
    // Get the edited radius iduration
    const editedRadius = data.find((row) => row.id === id);

    // Check if the radius iduration is empty
    if (editedRadius.radius === "") {
      alert("Vui lòng nhập dữ liệu.");
      return;
    }

    // Check for duplicate radius
    if (isDuplicateRadius(editedRadius.radius, id)) {
      alert("Dữ liệu đã tồn tại. Vui lòng chọn dữ liệu khác.");
      return;
    }

    // Update data to exit editing mode
    if (numberUpdate === index) {
      setNumberUpdate(-1);
      if (
        listAllRadius?.find((row) => row?.id === id)?.radius !== numberRadius ||
        listAllRadius?.find((row) => row?.id === id)?.isDefault !== isDefault
      ) {
        const NewData = {
          radius: numberRadius,
          isDefault: isDefault,
        };
        // console.log("first", NewData);
        dispatch(updateRadius(NewData, id));
      }
    } else {
      setNumberUpdate(index);
    }
  };

  // Handle input change for a radius iduration
  const handleInputChange = (id, e) => {
    if (!/^\d+$/.test(e.target.value) || parseFloat(e.target.value) <= 0) {
      alert("Không hợp lệ, vui lòng nhập lại.");
      return;
    }
    setNumberRadius(e.target.value);
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, radius: e.target.value } : row
      )
    );
  };

  // Handle change in the default filter for a radius
  const handleFilterChange = (id, filter) => {
    const matchingRow = data.find((row) => row.id === id);
    const initialIsDefault = matchingRow ? matchingRow.isDefault : undefined;
    setIsDefault(filter ? filter : initialIsDefault);
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, isDefault: filter === "true" } : row
      )
    );
  };

  // Handle deletion of a radius
  const handleDelete = (id) => {
    // Confirm deletion with the user
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");

    if (isConfirmed) {
      // Remove the radius from the data
      setData((prevData) => prevData.filter((row) => row.id !== id));
      dispatch(deleteRadius(id));
    }
  };

  // Handle opening the modal for creating a new radius
  const handleCreate = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle saving changes for a new radius from the modal
  const handleSaveModal = (newRadius) => {
    const { radius } = newRadius;

    // Check if the new radius iduration is empty
    if (radius.trim() === "") {
      alert("Vui lòng nhập dữ liệu.");
      return;
    }

    // Check for duplicate radius iduration in the new radius
    if (isDuplicateRadius(radius, 0)) {
      alert("Dữ liệu đã tồn tại. Vui lòng chọn dữ liệu khác.");
      return;
    } else {
      dispatch(postRadius(newRadius));
    }
  };

  // Check if a radius iduration is a duplicate
  const isDuplicateRadius = (radius, id) => {
    return data.some(
      (row) => row.radius.toString() === radius && row.id !== id
    );
  };

  // Handle change in the current page for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Render the component
  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Danh sách cấu hình khoảng cách</h2>

          {/* Button for creating a new radius */}
          <div className="content-create-btn">
            <button onClick={handleCreate}>Tạo mới</button>
          </div>
        </div>

        {/* Render the modal for creating a new radius */}
        {isModalOpen && (
          <RadiusModal onClose={handleCloseModal} onSave={handleSaveModal} />
        )}

        {/* Render the radius data table if there are radii */}
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Bán kính khoảng cách (km)</th>
                <th>
                  <button
                    type="button"
                    onClick={() => handleSort()}
                    style={{
                      backgroundColor: "white",
                      border: "none",
                      fontWeight: "700",
                      color: "#2D83B5",
                      cursor: "pointer",
                    }}
                  >
                    Mặc định
                  </button>
                </th>
                <th>Chỉnh sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through paginated data to display radius rows */}
              {sliceData(data, currentPage, rowsPerPage).map((row, index) => (
                <tr key={row.id}>
                  <td>
                    <span>
                      {numberUpdate === index ? (
                        <input
                          type="text"
                          value={row.radius}
                          onChange={(e) => handleInputChange(row.id, e)}
                        />
                      ) : (
                        row.radius
                      )}
                    </span>
                  </td>
                  <td>
                    <span>
                      {numberUpdate === index ? (
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
                      {numberUpdate === index ? (
                        <img
                          src={SaveIcon}
                          alt=""
                          onClick={() => handleSave(row.id, index)}
                        />
                      ) : (
                        <img
                          src={PencilIcon}
                          alt=""
                          onClick={() => handleEdit(index, row.id)}
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
          // Display a message when there is no radius data
          <div className="empty-table">Không có dữ liệu!</div>
        )}

        {/* Render pagination buttons if there are radii */}
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

export default RadiusList;
