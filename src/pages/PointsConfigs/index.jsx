import React, { useEffect, useState } from "react";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
// import PointModal from "../NewConfigModal/pointModal";
import PencilIcon from "../../assets/icons/pencil.svg";
import SaveIcon from "../../assets/icons/save.svg";
// import TrashIcon from "../../assets/icons/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { getPoint, updatePoint } from "../../actions/configs";

function PointsList() {
  const dispatch = useDispatch();
  const listAllPoint= useSelector(
    (state) => state.listPointReducer.listPoint
  );
  // State for managing point configuration data
  const [data, setData] = useState([]);
  const [numberUpdate, setNumberUpdate] = useState(-1);
  const [numberPoint, setNumberPoint] = useState(0);

  useEffect(() => {
    dispatch(getPoint());
  }, [dispatch]);
  useEffect(() => {
    if (listAllPoint) {
      setData(listAllPoint);
    }
  }, [listAllPoint]);
  // State for managing modal visibility
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // State for managing current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of rows to display per page
  const rowsPerPage = 6;

  // Handle edit mode for a point configuration
  const handleEdit = (index) => {
    if (numberUpdate === index) {
      setNumberUpdate(-1);
    } else {
      setNumberUpdate(index);
    }
  };

  // Handle saving changes for a point configuration
  const handleSave = (id,index) => {
    // Get the edited point configuration
    const editedPoint = data.find((row) => row.id === id);

    // Check if the point configuration is empty
    if (editedPoint.points === "") {
      alert("Vui lòng nhập dữ liệu.");
      return;
    }

    // Check for duplicate point configuration
    // if (isDuplicatePoint(editedPoint.points, id)) {
    //   alert("Dữ liệu đã tồn tại. Vui lòng chọn dữ liệu khác.");
    //   return;
    // }

    // Update data to exit editing mode
    if (numberUpdate === index) {
      setNumberUpdate(-1);
      console.log(numberPoint)
      if (numberPoint && data.some((item)=>item.id !== numberPoint)) {
        const NewData = numberPoint
        dispatch(updatePoint(NewData));
      }
    } else {
      setNumberUpdate(index);
    }
  };

  // Handle input change for a point configuration
  const handleInputChange = (id, e) => {
    const inputValue = e.target.value;
    // Check if the input is a positive integer
    if (!/^\d+$/.test(inputValue) || parseFloat(inputValue) <= 0) {
      alert("Điểm mặc định không hợp lệ, vui lòng nhập lại.");
      return;
    }
    // Update data with the new point configuration
    setNumberPoint(inputValue)
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, points: inputValue } : row
      )
    );
  };

  // Handle change in the default filter for a point configuration
  // const handleFilterChange = (id, filter) => {
  //   setData((prevData) =>
  //     prevData.map((row) =>
  //       row.id === id ? { ...row, isDefault: filter === "true" } : row
  //     )
  //   );
  // };

  // Handle deletion of a point configuration
  // const handleDelete = (id) => {
  //   // Confirm deletion with the user
  //   const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");

  //   if (isConfirmed) {
  //     // Remove the point configuration from the data
  //     setData((prevData) => prevData.filter((row) => row.id !== id));
  //   }
  // };

  // Handle creating a new point configuration
  // const handleCreate = () => {
  //   setIsModalOpen(true);
  // };

  // Handle closing the modal
  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  // Handle saving changes for a new point configuration from the modal
  // const handleSaveModal = (newConfig) => {
  //   const { config } = newConfig;

  //   // Check if the new point configuration is empty
  //   if (config.trim() === "") {
  //     alert("Vui lòng nhập dữ liệu.");
  //     return;
  //   }

  //   // Check for duplicate point configuration in the new point
  //   if (isDuplicatePoint(config, 0)) {
  //     alert("Dữ liệu đã tồn tại. Vui lòng chọn dữ liệu khác.");
  //     return;
  //   }

  //   // Add the new point configuration to the data
  //   setData((prevData) => [
  //     ...prevData,
  //     {
  //       id: prevData.length + 1,
  //       ...newConfig,
  //       isEditing: false,
  //     },
  //   ]);
  // };

  // Check if a point configuration is a duplicate
  const isDuplicatePoint = (point, id) => {
    return data.some(
      (row) =>
        row.points.toString() === point && row.id !== id
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
          <h2>Cấu hình điểm mặc định</h2>

          {/* Button for creating a new point configuration */}
          {/* <div className="content-create-btn">
            <button onClick={handleCreate}>Tạo mới</button>
          </div> */}
        </div>

        {/* Render the modal for creating a new point configuration */}
        {/* {isModalOpen && (
          <PointModal onClose={handleCloseModal} onSave={handleSaveModal} />
        )} */}

        {/* Render the point configuration data table if there are points */}
        {data?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Điểm mặc định</th>
                <th>Chỉnh sửa</th>
                {/* <th>Xóa</th> */}
              </tr>
            </thead>
            <tbody>
              {/* Map and render each point configuration row */}
              {sliceData(data, currentPage, rowsPerPage).map((row,index) => (
                <tr key={row.id}>
                  {/* Render input field for editing or display the point configuration */}
                  <td>
                    <span>
                        {row.id}
                    </span>
                  </td>
                  <td>
                  <span>
                      {numberUpdate === index ? (
                        <input
                          type="text"
                          value={row.points}
                          onChange={(e) => handleInputChange(row.id, e)}
                        />
                      ) : (
                        row.points
                      )}
                    </span>
                  </td>
                  {/* Render dropdown for default filter or display default value */}
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
                  {/* Render delete icon for deleting a point configuration */}
                  {/* <td>
                    <span>
                      <img
                        src={TrashIcon}
                        alt=""
                        onClick={() => handleDelete(row.id)}
                      />
                    </span>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // Display a message when there is no point configuration data
          <div className="empty-table">Không có dữ liệu!</div>
        )}

        {/* Render pagination buttons if there are points */}
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

export default PointsList;
