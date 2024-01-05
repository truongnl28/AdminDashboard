import React, { useEffect, useState } from "react";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import NotificationModal from "../NewConfigModal/notificationModal";
import PencilIcon from "../../assets/icons/pencil.svg";
import SaveIcon from "../../assets/icons/save.svg";
import TrashIcon from "../../assets/icons/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteFrequency, getFrequency, postFrequency, updateFrequency } from "../../actions/configs";

function NotificationList() {
  const dispatch = useDispatch();
  const listAllFrequency = useSelector(
    (state) => state.listFrequencyReducer.listFrequency
  );
  // State for managing notification configuration data
  const [data, setData] = useState([]);
  const [numberUpdate, setNumberUpdate] = useState(-1);
  const [numberFrequency, setNumberFrequency] = useState(0);

  useEffect(() => {
    dispatch(getFrequency());
  }, [dispatch]);
  useEffect(() => {
    if (listAllFrequency) {
      setData(listAllFrequency);
    }
  }, [listAllFrequency]);
  // State for managing modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for managing current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of rows to display per page
  const rowsPerPage = 6;

  // Handle edit mode for a notification configuration
  const handleEdit = (index) => {
    if (numberUpdate === index) {
      setNumberUpdate(-1);
    } else {
      setNumberUpdate(index);
      dispatch(getFrequency());
    }
  };

  // Handle saving changes for a notification configuration
  const handleSave = (id, index) => {
    // Get the edited notification configuration
    const editedFrequency = data.find((row) => row.id === id);

    // Check if the notification configuration is empty
    if (editedFrequency.frequency === "") {
      alert("Vui lòng nhập dữ liệu.");
      return;
    }

    // Check for duplicate notification configuration
    if (isDuplicateFrequency(editedFrequency.frequency, id)) {
      alert("Dữ liệu đã tồn tại. Vui lòng chọn dữ liệu khác.");
      return;
    }

    // Update data to exit editing mode
    if (numberUpdate === index) {
      setNumberUpdate(-1);
      if (numberFrequency && data.some((item) => item.frequency !== numberFrequency)) {
        const NewData = numberFrequency;
        // console.log("first", NewData);
        dispatch(updateFrequency(NewData, id));
      }
    } else {
      setNumberUpdate(index);
    }
  };

  // Handle input change for a notification configuration
  const handleInputChange = (id, e) => {
    if (!/^\d+$/.test(e.target.value) || parseFloat(e.target.value) <= 0) {
      alert("Không hợp lệ, vui lòng nhập lại.");
      return;
    }
    setNumberFrequency(e.target.value)
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, frequency: e.target.value } : row
      )
    );
  };

  // Handle change in the default filter for a notification configuration
  // const handleFilterChange = (id, filter) => {
  //   setData((prevData) =>
  //     prevData.map((row) =>
  //       row.id === id ? { ...row, isDefault: filter === "true" } : row
  //     )
  //   );
  // };

  // Handle deletion of a notification configuration
  const handleDelete = (id) => {
    // Confirm deletion with the user
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");

    if (isConfirmed) {
      // Remove the notification configuration from the data
      setData((prevData) => prevData.filter((row) => row.id !== id));
      dispatch(deleteFrequency(id))
    }
  };

  // Handle creating a new notification configuration
  const handleCreate = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle saving changes for a new notification configuration from the modal
  const handleSaveModal = (newFrequency) => {
    const { frequency } = newFrequency;

    // Check if the new notification configuration is empty
    if (frequency.trim() === "") {
      alert("Vui lòng nhập dữ liệu.");
      return;
    }

    // Check for duplicate notification configuration in the new notification
    if (isDuplicateFrequency(frequency, 0)) {
      alert("Dữ liệu đã tồn tại. Vui lòng chọn dữ liệu khác.");
      return;
    }else{
      dispatch(postFrequency(frequency))
    }

    
  };

  // Check if a notification configuration is a duplicate
  const isDuplicateFrequency = (frequency, id) => {
    return data.some(
      (row) =>
        row.frequency.toString() === frequency && row.id !== id
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
          <h2>Danh sách cấu hình tần suất thông báo</h2>

          {/* Button for creating a new notification configuration */}
          <div className="content-create-btn">
            <button onClick={handleCreate}>Tạo mới</button>
          </div>
        </div>

        {/* Render the modal for creating a new notification configuration */}
        {isModalOpen && (
          <NotificationModal
            onClose={handleCloseModal}
            onSave={handleSaveModal}
          />
        )}

        {/* Render the notification configuration data table if there are notifications */}
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Cấu hình tần suất thông báo</th>
                <th>Tần suất</th>
                <th>Chỉnh sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {/* Map and render each notification configuration row */}
              {sliceData(data, currentPage, rowsPerPage).map((row,index) => (
                <tr key={row.id}>
                  {/* Render input field for editing or display the notification configuration */}
                  <td>
                    <span>
                        {row.id}
                    </span>
                  </td>
                  {/* Render dropdown for default filter or display default value */}
                  <td>
                  <span>
                      {numberUpdate === index ? (
                        <input
                          type="text"
                          value={row.frequency}
                          onChange={(e) => handleInputChange(row.id, e)}
                        />
                      ) : (
                        row.frequency
                      )}
                    </span>
                  </td>
                  {/* <td>
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
                  </td> */}
                  {/* Render save or edit icon based on edit mode */}
                  <td>
                    <span>
                      {numberUpdate === index ? (
                        <img
                          src={SaveIcon}
                          alt=""
                          onClick={() => handleSave(row.id,index)}
                        />
                      ) : (
                        <img
                          src={PencilIcon}
                          alt=""
                          onClick={() => handleEdit(index)}
                        />
                      )}
                    </span>
                  </td>
                  {/* Render delete icon for deleting a notification configuration */}
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
          // Display a message when there is no notification configuration data
          <div className="empty-table">Không có dữ liệu!</div>
        )}

        {/* Render pagination buttons if there are notifications */}
        <div className="content-footer">
          {data.length > 0 ? (
            <div className="paginationTable">
              {/* Display pagination buttons */}
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

export default NotificationList;
